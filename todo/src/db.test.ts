import { assertEquals } from "https://deno.land/std@0.146.0/testing/asserts.ts";
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  it,
} from "https://deno.land/std@0.146.0/testing/bdd.ts";
import { initCommands, initDb, Todo } from "./db.ts";

const dbName = "test.db";
const testDb = initDb(dbName);
const commands = initCommands(testDb);

describe("commands", () => {
  afterAll(() => {
    Deno.removeSync(dbName);
  });

  afterEach(() => {
    testDb.query("DELETE FROM todos;");
    testDb.query("DELETE FROM sqlite_sequence WHERE name = 'todos';");
  });

  describe("getTodos", () => {
    beforeEach(() => {
      testDb.query("INSERT INTO todos (title, body) VALUES ('title', 'body');");
    });

    it("gets todos", () => {
      const todos = commands.getTodos();
      const expected: Todo[] = [
        {
          id: 1,
          title: "title",
          body: "body",
        },
      ];
      assertEquals(todos, expected);
    });
  });

  describe("createTodo", () => {
    it("crates the todo", () => {
      const newTodo = {
        title: "title",
        body: "body",
      };
      const expectedTodo = {
        id: 1,
        title: "title",
        body: "body",
      };
      const createdTodo = commands.createTodo(newTodo);
      assertEquals(createdTodo, expectedTodo);

      const todos = commands.getTodos();
      const expectedTodos: Todo[] = [
        {
          id: 1,
          title: "title",
          body: "body",
        },
      ];
      assertEquals(todos, expectedTodos);
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
      const updatedTodo = commands.updateTodo(todo);
      assertEquals(updatedTodo, todo);

      const todos = commands.getTodos();
      const expectedTodos: Todo[] = [
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
      assertEquals(todos, expectedTodos);
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
      const expectedTodo = {
        id: 1,
        title: "title1",
        body: "body1",
      };
      const deletedTodo = commands.deleteTodo(1);
      assertEquals(deletedTodo, expectedTodo);

      const todos = commands.getTodos();
      const expectedTodos: Todo[] = [
        {
          id: 2,
          title: "title2",
          body: "body2",
        },
      ];
      assertEquals(todos, expectedTodos);
    });
  });
});
