const { VOCABULARY, FILL_BLANK_DATA } = require('./init-db');
const SAMPLE_UNITS = require('./sample-units');

const CAT_MAP = {
  animals: { vi: 'Động vật', emoji: '🐾' },
  fruits: { vi: 'Trái cây', emoji: '🍎' },
  colors: { vi: 'Màu sắc', emoji: '🎨' },
  family: { vi: 'Gia đình', emoji: '👨‍👩‍👧‍👦' },
  food: { vi: 'Đồ ăn', emoji: '🍕' },
  school: { vi: 'Trường học', emoji: '🏫' },
  body: { vi: 'Cơ thể', emoji: '🧍' },
  weather: { vi: 'Thời tiết', emoji: '🌤️' },
  transport: { vi: 'Phương tiện', emoji: '🚗' },
  nature: { vi: 'Thiên nhiên', emoji: '🌿' }
};

async function seedSqlite(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL UNIQUE,
      name_vi TEXT,
      emoji TEXT
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS words (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL,
      word_en TEXT NOT NULL,
      word_vi TEXT,
      emoji TEXT,
      phonetic TEXT,
      example TEXT,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS fill_blank_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sentence TEXT NOT NULL,
      answer TEXT NOT NULL,
      options_str TEXT NOT NULL,
      hint TEXT
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS units (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      unit_number INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      icon TEXT DEFAULT '📘',
      color TEXT DEFAULT '#6C63FF',
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS parts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      unit_id INTEGER NOT NULL,
      part_number INTEGER NOT NULL,
      title TEXT NOT NULL,
      game_type TEXT NOT NULL,
      category_code TEXT DEFAULT 'animals',
      description TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS part_words (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      part_id INTEGER NOT NULL,
      word_en TEXT NOT NULL,
      word_vi TEXT NOT NULL,
      emoji TEXT,
      phonetic TEXT,
      example TEXT,
      FOREIGN KEY (part_id) REFERENCES parts(id) ON DELETE CASCADE
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS part_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      part_id INTEGER NOT NULL,
      sentence TEXT NOT NULL,
      answer TEXT NOT NULL,
      options_str TEXT NOT NULL,
      hint TEXT,
      FOREIGN KEY (part_id) REFERENCES parts(id) ON DELETE CASCADE
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT DEFAULT 'Bé Yêu',
      age INTEGER DEFAULT 7,
      avatar TEXT DEFAULT '🦊',
      total_stars INTEGER DEFAULT 0,
      games_played INTEGER DEFAULT 0,
      words_learned INTEGER DEFAULT 0,
      streak INTEGER DEFAULT 1,
      last_active_date TEXT DEFAULT NULL,
      unlocked_badges TEXT DEFAULT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);

  const [existingWords] = await pool.query('SELECT COUNT(*) AS total FROM words');
  if ((existingWords[0]?.total || 0) > 0) {
    return;
  }

  for (const [code, meta] of Object.entries(CAT_MAP)) {
    const [catResult] = await pool.query(
      'INSERT INTO categories (code, name_vi, emoji) VALUES (?, ?, ?)',
      [code, meta.vi, meta.emoji]
    );
    const wordsList = VOCABULARY[code] || [];
    for (const word of wordsList) {
      await pool.query(
        'INSERT INTO words (category_id, word_en, word_vi, emoji, phonetic, example) VALUES (?, ?, ?, ?, ?, ?)',
        [catResult.insertId, word.en, word.vi, word.emoji, word.phonetic, word.example]
      );
    }
  }

  for (const question of FILL_BLANK_DATA) {
    await pool.query(
      'INSERT INTO fill_blank_questions (sentence, answer, options_str, hint) VALUES (?, ?, ?, ?)',
      [question.sentence, question.answer, question.options, question.hint]
    );
  }

  for (const unit of SAMPLE_UNITS) {
    const [unitResult] = await pool.query(
      'INSERT INTO units (unit_number, title, description, icon, color) VALUES (?, ?, ?, ?, ?)',
      [unit.unit_number, unit.title, unit.description, unit.icon, unit.color]
    );
    for (const part of unit.parts) {
      const [partResult] = await pool.query(
        'INSERT INTO parts (unit_id, part_number, title, game_type, category_code, description) VALUES (?, ?, ?, ?, ?, ?)',
        [unitResult.insertId, part.part_number, part.title, part.game_type, part.category_code, part.description]
      );
      for (const word of part.custom_words || []) {
        await pool.query(
          'INSERT INTO part_words (part_id, word_en, word_vi, emoji, phonetic, example) VALUES (?, ?, ?, ?, ?, ?)',
          [partResult.insertId, word.en, word.vi, word.emoji, word.phonetic, word.example]
        );
      }
      for (const question of part.custom_questions || []) {
        await pool.query(
          'INSERT INTO part_questions (part_id, sentence, answer, options_str, hint) VALUES (?, ?, ?, ?, ?)',
          [partResult.insertId, question.sentence, question.answer, question.options_str, question.hint]
        );
      }
    }
  }

  console.log('✅ Đã nạp dữ liệu mẫu vào SQLite (chế độ host miễn phí)');
}

module.exports = { seedSqlite };
