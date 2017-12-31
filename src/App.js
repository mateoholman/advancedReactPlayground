import React, { Component } from 'react';
import {Toggle, MyToggle} from './FlexCompoundComp/FlexToggle';
import './App.css';

class App extends Component {

  render() {
    return (
        <Toggle
          onToggle={on => console.log('toggle', on)}
        >
          <Toggle.On>Button On</Toggle.On>
          <Toggle.Off>Button Off</Toggle.Off>
          <Toggle.Button />
          <hr />
          <MyToggle />
        </Toggle>
    );
  }
}

export default App;
