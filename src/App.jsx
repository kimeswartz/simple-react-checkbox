import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

// key to use for our useEffect function.
const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  /*  Functiom to load our todos. We only call this function once, right when our component loads.
      And to only set the stored todos, if there are any. */
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  // Function to toggle our todo, taking the id from the toggle. we create a copy of todo and mofidy the copy.
  function toggleTodo(id) {
    const newTodos = [...todos];  
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  //Anytime our Array is updated {array}, this function will update and save.
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos () {
    const newTodos = todos.filter(todo => !todo.complete)
     setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
