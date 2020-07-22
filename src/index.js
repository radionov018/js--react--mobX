import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
// import Devtools from "mobx-react-devtools";
import {
  observable,
  computed,
  extendObservable,
  configure,
  action,
} from "mobx";
import { observer, Provider, inject } from "mobx-react";

configure({ enforceActions: "observed" });

const nickName = observable(
  {
    firstName: "Rostislav",
    age: 28,
    get nickName() {
      console.log("Generate nickName!");
      return `${this.firstName + this.age}`;
    },

    increment() {
      this.age++;
    },
    decrement() {
      this.age--;
    },
  },
  {
    increment: action,
    decrement: action,
  }
);

// const counterState = observable({
//   count: 0,
// });

// nickName.increment = function () {
//   this.age++;
// };

// nickName.decrement = function () {
//   this.age--;
// };

const todos = observable([
  { learn: "learn React", id: "1" },
  { learn: "learn MobX", id: "2" },
]);

const states = {
  // counterState,
  nickName,
  todos,
};

@inject("nickName", "todos")
@observer
class Counter extends Component {
  handleIncrement = () => this.props.nickName.increment();
  handleDecrement = () => this.props.nickName.decrement();

  render() {
    return (
      <div className="App">
        {/* <Devtools /> */}
        <h1>{this.props.nickName.nickName}</h1>
        <button onClick={this.handleDecrement}>-1</button>
        <button onClick={this.handleIncrement}>+1</button>
        <ul>
          {this.props.todos.map((todo) => (
            <li key={todo.id}>{todo.learn}</li>
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider {...states}>
      <Counter />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// todos.push({ learn: "learn Hooks", id: "3" });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
