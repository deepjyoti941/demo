import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './HOC/Layout/Layout';
import Messenger from './Containers/Messenger/Messenger';
import Reader from './Containers/Reader/Reader';


class App extends Component {
  render () {
    console.log(this.props);
    return (
      <div>        
        <Layout>
          <Switch>
            <Route path="/reader" exact component={Reader} />
            <Route path="/" exact component={Messenger} />
          </Switch>          
        </Layout>
      </div>
    );
  }
}

export default App;
