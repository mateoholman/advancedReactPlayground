import React, { Component } from 'react';
import Toggle from './CompoundComponent/Toggle';
import './App.css';

class App extends Component {
  render() {
    return (
        <Toggle
          onToggle={on => console.log('toggle', on)}
        >
          <Toggle.Button />
          <Toggle.On>Button On</Toggle.On>
          <Toggle.Off>Button Off</Toggle.Off>
        </Toggle>
    );
  }
}

export default App;
