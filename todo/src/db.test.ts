import { assertEquals } from "https://deno.land/std@0.146.0/testing/asserts.ts";
import {
  afterEach,
  beforeEach,
  describe,
  it,
} from "https://deno.land/std@0.146.0/testing/bdd.ts";
import {
  createTodo,
  deleteTodo,
  getTodos,
  initDb,
  Todo,
  updateTodo,
} from "./db.ts";

const testDb = initDb("test.db");

describe("db", () => {
  afterEach(() => {
    testDb.query("DELETE FROM todos;");
    testDb.query("DELETE FROM sqlite_sequence WHERE name = 'todos';");
  });

  describe("getTodos", () => {
    beforeEach(() => {
      testDb.query("INSERT INTO todos (title, body) VALUES ('title', 'body');");
    });

    it("gets todos", () => {
      const todos = getTodos(testDb);
      const exptected: Todo[] = [
        {
          id: 1,
          title: "title",
          body: "body",
        },
      ];
      assertEquals(todos, exptected);
    });
  });

  describe("createTodo", () => {
    it("crates the todo", () => {
      const newTodo = {
        title: "title",
        body: "body",
      };
      const exptectedTodo = {
        id: 1,
        title: "title",
        body: "body",
      };
      const createdTodo = createTodo(testDb, newTodo);
      assertEquals(createdTodo, exptectedTodo);

      const todos = getTodos(testDb);
      const exptectedTodos: Todo[] = [
        {
          id: 1,
          title: "title",
          body: "body",
        },
      ];
      assertEquals(todos, exptectedTodos);
    });
  });

  describe("updateTodo", () => {
    beforeEach(() => {
      testDb.query(
        "INSERT INTO todos (title, body) VALUES ('title1', 'body1');"
      );
      testDb.query(
        "INSERT INTO todos (title, body) VALUES ('title2', 'body2');"
      );
    });

    it("updates the todo", () => {
      const todo = {
        id: 1,
        title: "updated title",
        body: "updated body",
      };
      const updatedTodo = updateTodo(testDb, todo);
      assertEquals(updatedTodo, todo);

      const todos = getTodos(testDb);
      const exptectedTodos: Todo[] = [
        {
          id: 1,
          title: "updated title",
          body: "updated body",
        },
        {
          id: 2,
          title: "title2",
          body: "body2",
        },
      ];
      assertEquals(todos, exptectedTodos);
    });
  });

  describe("deleteTodo", () => {
    beforeEach(() => {
      testDb.query(
        "INSERT INTO todos (title, body) VALUES ('title1', 'body1');"
      );
      testDb.query(
        "INSERT INTO todos (title, body) VALUES ('title2', 'body2');"
      );
    });

    it("deletes the todo", () => {
      const exptectedTodo = {
        id: 1,
        title: "title1",
        body: "body1",
      };
      const deletedTodo = deleteTodo(testDb, 1);
      assertEquals(deletedTodo, exptectedTodo);

      const todos = getTodos(testDb);
      const exptectedTodos: Todo[] = [
        {
          id: 2,
          title: "title2",
          body: "body2",
        },
      ];
      assertEquals(todos, exptectedTodos);
    });
  });
});
