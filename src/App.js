import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import TodoHeader from "./components/TodoHeader";
import Main from "./components/Main";

import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <TodoHeader />
      <Main />
    </Provider>
  );
};

export default App;
