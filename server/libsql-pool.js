const { createClient } = require('@libsql/client');
const { toSqliteSql, isSelect } = require('./sqlite-pool');

function createLibsqlPool() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
  });

  const query = async (sql, params = []) => {
    const sqliteSql = toSqliteSql(sql);
    const result = await client.execute({ sql: sqliteSql, args: params || [] });

    if (isSelect(sqliteSql)) {
      return [result.rows.map(row => ({ ...row }))];
    }

    return [{
      insertId: Number(result.lastInsertRowid || 0),
      affectedRows: Number(result.rowsAffected || 0)
    }];
  };

  return {
    query,
    getConnection: async () => ({
      query,
      release() {}
    })
  };
}

module.exports = { createLibsqlPool };
