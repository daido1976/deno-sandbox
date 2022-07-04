import { DB } from "https://deno.land/x/sqlite@v3.4.0/mod.ts";

export type NewTodo = {
  title: string;
  body: string;
};

export type Todo = {
  id: number;
  title: string;
  body: string;
};

export type DBCommands = {
  getTodos: () => Todo[];
  createTodo: (todo: NewTodo) => Todo;
  updateTodo: (todo: Todo) => Todo;
  deleteTodo: (id: number) => Todo;
};

// TODO: initDb か initCommands のどちらかに一本化した方がいい気がするが、テスト用の処理が必要なため initCommands に一本化できない
export function initDb(dbName: string): DB {
  const db = new DB(dbName);
  db.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      body TEXT
    );`);

  return db;
}

export function initCommands(dbName: string): DBCommands {
  const db = initDb(dbName);
  return {
    getTodos: () => getTodos(db),
    createTodo: (todo: NewTodo) => createTodo(db, todo),
    updateTodo: (todo: Todo) => updateTodo(db, todo),
    deleteTodo: (id: number) => deleteTodo(db, id),
  };
}

function getTodos(db: DB): Todo[] {
  const todos = db.queryEntries<Todo>("SELECT * FROM todos;");
  return todos;
}

function createTodo(db: DB, todo: NewTodo): Todo {
  const todos = db.queryEntries<Todo>(
    "INSERT INTO todos (title, body) VALUES (:title, :body) RETURNING *;",
    todo
  );
  return todos[0];
}

function updateTodo(db: DB, todo: Todo): Todo {
  const todos = db.queryEntries<Todo>(
    "UPDATE todos SET title = :title, body = :body WHERE id = :id RETURNING *;",
    todo
  );
  return todos[0];
}

function deleteTodo(db: DB, id: number): Todo {
  const todos = db.queryEntries<Todo>(
    "DELETE FROM todos WHERE id = :id RETURNING *;",
    { id }
  );
  return todos[0];
}

export function closeDb(db: DB) {
  db.close();
}
