import initSqlJs from 'sql.js';

let db = null;

// Veritabanını başlat ve görevler, notlar, listeler tablosunu oluştur
export async function initDb() {
  if (db) return db;
  const SQL = await initSqlJs({ locateFile: file => `https://sql.js.org/dist/${file}` });
  db = new SQL.Database();
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TEXT NOT NULL,
    summary TEXT,
    tags TEXT,
    category TEXT
  );`);
  db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    summary TEXT,
    created_at TEXT NOT NULL,
    category TEXT
  );`);
  db.run(`CREATE TABLE IF NOT EXISTS lists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    created_at TEXT NOT NULL,
    category TEXT
  );`);
  return db;
}

// Tüm görevleri getir
export async function getTasks() {
  await initDb();
  const res = db.exec('SELECT * FROM tasks ORDER BY id DESC');
  if (res[0]) {
    return res[0].values.map(row => ({
      id: row[0],
      title: row[1],
      status: row[2],
      created_at: row[3],
      summary: row[4],
      tags: row[5] ? row[5].split(',') : [],
      category: row[6] || ''
    }));
  }
  return [];
}

// Görev ekle
export async function addTask({ title, status = 'Açık', summary = '', tags = [], category = '' }) {
  await initDb();
  const created_at = new Date().toISOString();
  db.run(
    'INSERT INTO tasks (title, status, created_at, summary, tags, category) VALUES (?, ?, ?, ?, ?, ?)',
    [title, status, created_at, summary, tags.join(','), category]
  );
}

// Tüm notları getir
export async function getNotes() {
  await initDb();
  const res = db.exec('SELECT * FROM notes ORDER BY id DESC');
  if (res[0]) {
    return res[0].values.map(row => ({
      id: row[0],
      title: row[1],
      summary: row[2],
      created_at: row[3],
      category: row[4] || ''
    }));
  }
  return [];
}

// Not ekle
export async function addNote({ title, summary = '', category = '' }) {
  await initDb();
  const created_at = new Date().toISOString();
  db.run(
    'INSERT INTO notes (title, summary, created_at, category) VALUES (?, ?, ?, ?)',
    [title, summary, created_at, category]
  );
}

// Tüm listeleri getir
export async function getLists() {
  await initDb();
  const res = db.exec('SELECT * FROM lists ORDER BY id DESC');
  if (res[0]) {
    return res[0].values.map(row => ({
      id: row[0],
      title: row[1],
      created_at: row[2],
      category: row[3] || ''
    }));
  }
  return [];
}

// Liste ekle
export async function addList({ title, category = '' }) {
  await initDb();
  const created_at = new Date().toISOString();
  db.run(
    'INSERT INTO lists (title, created_at, category) VALUES (?, ?, ?)',
    [title, created_at, category]
  );
} 