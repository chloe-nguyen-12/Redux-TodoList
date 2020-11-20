import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setTotalList,
  sortTodos,
  sortComplete,
  sortNotComplete,
  searchTodo
} from "../actions/todoActions";
import { Menu, Form, Input, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const TodoMenu = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector(state => state.todo);
  const [input, setInput] = useState("");
  const handleTotalList = () => {
    dispatch(setTotalList());
  };
  const handleSort = () => {
    dispatch(sortTodos(todos));
  };
  const handleSortComplete = () => {
    dispatch(sortComplete());
  };

  const handleSortNotComplete = () => {
    dispatch(sortNotComplete());
  };
  const handleChange = (e, data) => {
    setInput(data.value);
  };
  const handleSearch = e => {
    e.preventDefault();
    dispatch(searchTodo(input));
    setInput("");
  };
  return (
    <Menu vertical compact color="gray" inverted>
      <Menu.Item onClick={handleTotalList}>Total list</Menu.Item>
      <Menu.Item onClick={handleSort}>Sort todo</Menu.Item>
      <Menu.Item onClick={handleSortNotComplete}>Not Complete</Menu.Item>
      <Menu.Item onClick={handleSortComplete}>Complete</Menu.Item>
      <Menu.Item>
        <Form onSubmit={handleSearch} size="tiny">
          <Input
            value={input}
            name="input"
            onChange={handleChange}
            placeholder="Search..."
            icon="search"
          />
          <Button onClick={handleSearch}>search</Button>
        </Form>
      </Menu.Item>
    </Menu>
  );
};

export default TodoMenu;
