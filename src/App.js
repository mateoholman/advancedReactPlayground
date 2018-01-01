import React, { Component } from 'react';
import {Toggle, MyToggle, MyEventComponent} from './HOCToggle/HOCToggle';
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
          <hr />
          <MyEventComponent 
            event="onClick"
            on={e => alert(e.type)}
          />
        </Toggle>
    );
  }
}

export default App;
