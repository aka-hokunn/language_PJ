const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

const DB_PATH = process.env.SQLITE_PATH || path.join(__dirname, 'data', 'funwords.sqlite');

function toSqliteSql(sql) {
  return String(sql)
    .replace(/ORDER BY RAND\(\)/gi, 'ORDER BY RANDOM()')
    .replace(/CURDATE\(\)/gi, "date('now')")
    .replace(/INT\s+PRIMARY\s+KEY\s+AUTO_INCREMENT/gi, 'INTEGER PRIMARY KEY AUTOINCREMENT')
    .replace(/INT\s+AUTO_INCREMENT\s+PRIMARY\s+KEY/gi, 'INTEGER PRIMARY KEY AUTOINCREMENT')
    .replace(/AUTO_INCREMENT/gi, 'AUTOINCREMENT')
    .replace(/TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP/gi, "TEXT DEFAULT (datetime('now'))")
    .replace(/TIMESTAMP DEFAULT CURRENT_TIMESTAMP/gi, "TEXT DEFAULT (datetime('now'))")
    .replace(/VARCHAR\(\d+\)/gi, 'TEXT')
    .replace(/(\w+)\s+DATE\b/gi, '$1 TEXT')
    .replace(/\bINT\b/gi, 'INTEGER');
}

function isSelect(sql) {
  const trimmed = String(sql).trim().replace(/^\(/, '');
  return /^(SELECT|WITH|PRAGMA|SHOW|EXPLAIN)\b/i.test(trimmed);
}

async function createSqlitePool() {
  const SQL = await initSqlJs();
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

  let db;
  if (fs.existsSync(DB_PATH)) {
    db = new SQL.Database(fs.readFileSync(DB_PATH));
  } else {
    db = new SQL.Database();
  }
  db.run('PRAGMA foreign_keys = ON');

  const persist = () => {
    try {
      fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
    } catch (err) {
      console.warn('Không ghi được file SQLite (ổ đĩa tạm thời):', err.message);
    }
  };

  const query = async (sql, params = []) => {
    const sqliteSql = toSqliteSql(sql);
    const values = Array.isArray(params) ? params : [];

    if (isSelect(sqliteSql)) {
      const stmt = db.prepare(sqliteSql);
      if (values.length) stmt.bind(values);
      const rows = [];
      while (stmt.step()) {
        rows.push(stmt.getAsObject());
      }
      stmt.free();
      return [rows];
    }

    db.run(sqliteSql, values);
    const idRes = db.exec('SELECT last_insert_rowid() AS id');
    const insertId = idRes[0] ? idRes[0].values[0][0] : 0;
    persist();
    return [{ insertId, affectedRows: db.getRowsModified() }];
  };

  return {
    query,
    getConnection: async () => ({
      query,
      release() {}
    })
  };
}

module.exports = { createSqlitePool, DB_PATH, toSqliteSql, isSelect };
