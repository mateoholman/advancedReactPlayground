import React, { Component } from 'react';

class Toggle extends Component {
  static defaultProps = {onToggle: () => {}}
  state = {on: false}

  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => {
        this.props.onToggle(this.state.on)
      },
    )
    
  render() {
    const {on} = this.state
    return (
      <Switch on={on} onClick={this.toggle} />
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
