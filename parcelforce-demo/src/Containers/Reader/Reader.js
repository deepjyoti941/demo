import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import Message from '../../components/Message/Message';

class Reader extends Component {
  state = {
    messages: null,
    loading: true
  };
  
  componentDidMount () {
    axios.get('http://lin19000307:8080/message')
    .then( res => {
      this.setState({ loading: false, messages: res.data });      
    })
    .catch(err => {
      console.log('something went wrong.....', err);      
    })
  }

  render () {
    console.log(this.state.messages);
    return (
      <div>
        {
          this.state.loading ?
          <Spinner />
          : <Message message={this.state.messages.message}/>
        }        
      </div>
    )
  }
}

export default Reader;