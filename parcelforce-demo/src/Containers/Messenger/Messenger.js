import React, { Component } from 'react';
import axios from 'axios';
import classes from './Messenger.css';

class Messenger extends Component {
  state = {
    message: ''
  }

  handleSubmit = (e) => {    
    const data = this.state.message;

    const message = "{\"message\": \"" + data + "\"}" ;

    axios.post('http://lin19000307:8080/message', message ,  {
      headers: {
          'Content-Type': 'application/json',
      }
    })
     .then ( res => {
       this.setState({ message: ''});
     })
     .catch( err => {
       console.log('Something went worng', err);
     })
  };

  handleChange = (e) => {
    this.setState({ message: e.target.value});
  }

  render () {
    return (
      <div>
        <textarea
          className={classes.Messege}
          value={this.state.message}
          onChange={this.handleChange} />
        <button className={classes.Submit} onClick={this.handleSubmit}>Submit</button>
        
      </div>
    )
  }

}

export default Messenger;