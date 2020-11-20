import React from "react";
import { Segment, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
const TodoHeader = () => {
  return (
    <Segment inverted padded>
      <Header as="h2" textAlign="center" content="Todo List" />
    </Segment>
  );
};

export default TodoHeader;
