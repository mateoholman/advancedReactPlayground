// Context acts like a portal in your application in which components can make data available to other components further down the tree without being passed through explictly as props.

import React, { Component } from 'react';
import PropTypes from 'prop-types';

function ToggleOn({on, children}){
  return on ? children : null;
}

function ToggleOff({on, children}){
  return on ? null : children;
}

function ToggleButton({on, toggle, ...props}){
  return <Switch on={on} onClick={toggle} {...props} />
}

class Toggle extends Component {
  static On = ToggleOn;
  static Off = ToggleOff;
  static Button = ToggleButton;
  static defaultProps = {onToggle: () => {}};
  state = {on: false};

  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => {
        this.props.onToggle(this.state.on)
      },
    )

  render() {
    const children = React.Children.map(
      this.props.children,
      child =>
        React.cloneElement(child, {
        on: this.state.on,
        toggle: this.toggle
      })
    );
    return (
      <div>{children}</div>
    )
  }
}

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

export default Toggle;
