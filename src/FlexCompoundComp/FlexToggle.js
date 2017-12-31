// Context acts like a portal in your application in which components can make data available to other components further down the tree without being passed through explictly as props.

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TOGGLE_CONTEXT = '__toggle__';

const ToggleOn = withToggle(({children, on}) => {
  return on ? children : null;
});

const ToggleOff = withToggle(({children, on}) => {
  return on ? null : children;
});

const ToggleButton = withToggle(({on, toggle, ...props}) => {
  return <Switch on={on} onClick={toggle} {...props} />
});

class Toggle extends Component {
  static On = ToggleOn;
  static Off = ToggleOff;
  static Button = ToggleButton;
  static defaultProps = {onToggle: () => {}};
  static childContextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
  }
  state = {on: false};

  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => {
        this.props.onToggle(this.state.on)
      },
    )

  getChildContext() {
    return {
      [TOGGLE_CONTEXT]: {
        on: this.state.on,
        toggle: this.toggle
      }
    }
  }

  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

function withToggle(Component) {
  function Wrapper(props, context){
    const toggleContext = context[TOGGLE_CONTEXT];
    return (
      <Component {...toggleContext} {...props} />
    );
  };

  Wrapper.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
  };

  return Wrapper;
}

const MyToggle = withToggle(({on, toggle}) => (
  <button onClick={toggle}>
    {on ? 'on' : 'off'}
  </button>
));

/*
 *
 *
 * Below here are irrelevant
 * implementation details...
 *
 *
 */

function Switch({on, className = '', ...props}) {
  return (
    <div className="toggle">
      <input
        className="toggle-input"
        type="checkbox"
      />
      <button
        className={`${className} toggle-btn ${on
          ? 'toggle-btn-on'
          : 'toggle-btn-off'}`}
        aria-expanded={on}
        {...props}
      />
    </div>
  )
}

export {Toggle, MyToggle};
