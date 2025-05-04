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
    due_date TEXT,
    completed_at TEXT,
    assigned_to_user_id TEXT,
    created_by_user_id TEXT,
    summary TEXT,
    tags TEXT,
    category TEXT,
    postponed_count INTEGER DEFAULT 0,
    postponed_dates TEXT
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
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
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
      due_date: row[4],
      completed_at: row[5],
      assigned_to_user_id: row[6],
      created_by_user_id: row[7],
      summary: row[8],
      tags: row[9] ? row[9].split(',') : [],
      category: row[10] || '',
      postponed_count: row[11] || 0,
      postponed_dates: row[12] ? JSON.parse(row[12]) : []
    }));
  }
  return [];
}

// Görev ekle
export async function addTask({ title, status = 'Açık', summary = '', tags = [], category = '', due_date = '', assigned_to_user_id = '', created_by_user_id = '' }) {
  await initDb();
  const created_at = new Date().toISOString();
  db.run(
    'INSERT INTO tasks (title, status, created_at, due_date, summary, tags, category, assigned_to_user_id, created_by_user_id, postponed_count, postponed_dates) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [title, status, created_at, due_date, summary, tags.join(','), category, assigned_to_user_id, created_by_user_id, 0, JSON.stringify([])]
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

// Görev güncelle
export async function updateTask({ id, title, status, summary, tags, category, due_date, completed_at, assigned_to_user_id, postponed_count, postponed_dates }) {
  await initDb();
  db.run(
    'UPDATE tasks SET title = ?, status = ?, summary = ?, tags = ?, category = ?, due_date = ?, completed_at = ?, assigned_to_user_id = ?, postponed_count = ?, postponed_dates = ? WHERE id = ?',
    [title, status, summary, (tags || []).join(','), category, due_date, completed_at, assigned_to_user_id, postponed_count, JSON.stringify(postponed_dates || []), id]
  );
}

// Görev sil
export async function deleteTask(id) {
  await initDb();
  db.run('DELETE FROM tasks WHERE id = ?', [id]);
}

// Not güncelle
export async function updateNote({ id, title, summary, category }) {
  await initDb();
  db.run(
    'UPDATE notes SET title = ?, summary = ?, category = ? WHERE id = ?',
    [title, summary, category, id]
  );
}

// Not sil
export async function deleteNote(id) {
  await initDb();
  db.run('DELETE FROM notes WHERE id = ?', [id]);
}

// Liste güncelle
export async function updateList({ id, title, category }) {
  await initDb();
  db.run(
    'UPDATE lists SET title = ?, category = ? WHERE id = ?',
    [title, category, id]
  );
}

// Liste sil
export async function deleteList(id) {
  await initDb();
  db.run('DELETE FROM lists WHERE id = ?', [id]);
}

// Kategorileri getir
export async function getCategories() {
  await initDb();
  const res = db.exec('SELECT * FROM categories ORDER BY name ASC');
  if (res[0]) {
    return res[0].values.map(row => ({ id: row[0], name: row[1] }));
  }
  return [];
}

// Kategori ekle
export async function addCategory(name) {
  await initDb();
  db.run('INSERT INTO categories (name) VALUES (?)', [name]);
}

// Kategori sil
export async function deleteCategory(id) {
  await initDb();
  db.run('DELETE FROM categories WHERE id = ?', [id]);
}

// Kategori güncelle
export async function updateCategory({ id, name }) {
  await initDb();
  db.run('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
} 