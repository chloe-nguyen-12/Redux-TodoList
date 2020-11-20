import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../actions/todoActions";
import { Form, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const AddForm = () => {
  const { todosTotal } = useSelector(state => state.todo);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleChange = (e, data) => {
    setInput(data.value);
  };

  const handleAdd = e => {
    e.preventDefault();
    let names = todosTotal.map(x => x.name.toLowerCase());
    if (input && !names.includes(input.toLowerCase())) {
      let newTodo = {
        name: input,
        isEdited: false,
        completed: false,
        date: new Date()
      };
      dispatch(addTodo(newTodo));
      setInput("");
    } else {
      setInput("");
    }
  };
  return (
    <Form onSubmit={handleAdd} inline size="small">
      <label size="large">Add</label>
      <Input value={input} onChange={handleChange} placeholder="Add new todo" />
    </Form>
  );
};

export default AddForm;
