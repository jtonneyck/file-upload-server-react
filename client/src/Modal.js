import React, { Component } from 'react'

export default class Modal extends Component {
    state = {
        active: true
    }
  toggleActive = ()=>{
    this.setState({active: !this.state.active})
    this.props.history.goBack()
  }  
  render() {
    let classes = this.state.active? "modal is-active": "modal"
    return (
      <div>
        <div className={classes}>
            <div className="modal-background"></div>
            <div className="modal-content">
                Any other Bulma elements you want
            </div>
            <button onClick={this.toggleActive} className="modal-close is-large" aria-label="close"></button>
            </div>
      </div>
    )
  }
}
