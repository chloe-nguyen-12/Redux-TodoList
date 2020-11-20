import React, { useState } from "react";
import TodoMenu from "./TodoMenu";
import AddForm from "./AddForm";
import TodoList from "./TodoList";
import { Grid, Checkbox, Sidebar } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const Main = () => {
  const [visible, setVisible] = useState("");
  const handleChange = (e, data) => {
    setVisible(data.checked);
  };
  const handleHide = () => {
    setVisible(false);
  };
  return (
    <Grid columns={1}>
      <Grid.Column>
        <Checkbox checked={visible} label="Menu" onChange={handleChange} />
      </Grid.Column>
      <Grid.Column>
        <Sidebar.Pushable as="Segment">
          <Sidebar as="Menu" visible={visible} onHide={handleHide}>
            <TodoMenu />
          </Sidebar>
          <Sidebar.Pusher>
            <AddForm />
            <TodoList />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
  );
};

export default Main;
