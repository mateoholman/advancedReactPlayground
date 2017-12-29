// Compound component gives more rendering control to the user. The functionality of the component stays intact while how it looks and the order of the children can be changed at will. We get this functionality by using the special React.Children.map function to map over the children given to our <Toggle/> component. We map over the children to pass the on state as a prop to its children. We move the visual pieces of the component out into function components and add them as static properties to <Toggle/>.

import React, { Component } from 'react';

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
