import React, { Component } from 'react';
import Left from './Left';
import Right from './Right';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Left />
        <Right />
      </div>
    );
  }
}

export default App;
