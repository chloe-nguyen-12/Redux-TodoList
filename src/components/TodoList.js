import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTodos,
  setEdit,
  saveTodo,
  deleteTodo,
  setComplete
} from "../actions/todoActions";
import Loading from "./Loading";
import {
  List,
  Container,
  Form,
  Input,
  Button,
  Header,
  Grid,
  Checkbox
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { format } from "date-fns";
import "../App.css";

const TodoList = () => {
  const { todos, todosTotal, loading, current } = useSelector(
    state => state.todo
  );
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  useEffect(() => dispatch(getTodos()), []);

  const handleChange = (e, data) => {
    setInput(data.value);
  };
  //luu y nay ne,
  const handleEdit = todo => () => {
    setInput(todo.name);
    dispatch(setEdit(todo));
  };

  const handleSave = e => {
    e.preventDefault();
    console.log(todosTotal);
    console.log(current);
    const names = todosTotal
      .filter(x => x.id !== current.id)
      .map(x => x.name.toLowerCase());
    if (input && !names.includes(input)) {
      dispatch(saveTodo(current, input));
      setInput("");
    } else {
      setInput("");
    }
  };

  const handleDelete = todo => () => {
    dispatch(deleteTodo(todo.id));
  };
  const getComplete = todo => (todo.completed ? "complete" : "");

  //cach 1
  // const handleComplete = todo => (e, data) => {
  //   let newTodo = { ...todo, completed: data.checked }; //
  //   console.log(newTodo);
  //   dispatch(setComplete(newTodo));
  // };

  //cach 2:
  const handleComplete = todo => (e, data) => {
    dispatch(setComplete(todo, data.checked));
  };

  const formatDate = date => {
    let newDate = format(new Date(date), "h:MMaaaa MM/dd/yyyy");
    return newDate;
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {todos.length === 0 ? (
        <Container>
          <Header as="h4">There's nothing to do</Header>
        </Container>
      ) : (
        <List>
          {todos.map(todo => {
            if (todo.isEdited) {
              return (
                <List.Item>
                  <Form size="small" inline>
                    <label> Edit:</label>
                    <Input value={input} onChange={handleChange} />
                    <Button onClick={handleSave} size="small">
                      Save
                    </Button>
                  </Form>
                </List.Item>
              );
            } else {
              return (
                <List.Item key={todo.id} className="todoItem">
                  <Grid columns={2}>
                    <Grid.Column className={getComplete(todo)}>
                      <List.Header as="h4">{todo.name}</List.Header>
                      <List.Description>
                        Date created:{formatDate(todo.date)}
                      </List.Description>
                    </Grid.Column>
                    <Grid.Column>
                      <Button onClick={handleEdit(todo)} size="small">
                        Edit
                      </Button>
                      <Button onClick={handleDelete(todo)} size="small">
                        X
                      </Button>
                      <Checkbox
                        checked={todo.completed}
                        onClick={handleComplete(todo)}
                      />
                    </Grid.Column>
                  </Grid>
                </List.Item>
              );
            }
          })}
        </List>
      )}
    </>
  );
};

export default TodoList;
