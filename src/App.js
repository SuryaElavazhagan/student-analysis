import React, { Component } from 'react';
import { BrowserRouter as Router , Route} from 'react-router-dom' 
import Header from './components/header'
import ChartAndSettings from './components/ChartAndSettings'
import {initiateClient} from './api/sheetsconfig';
import './style/app.css'

class App extends Component {

  componentDidMount(){
    initiateClient()
  }

  render() {
    return (
      <Router>
          <div className="container">
            <Header className="head"/>
            <Route path={'/:index'} component={ChartAndSettings}/>
            <Route path='/' render={() => (<div>
            </div>)}/>
          </div>
      </Router>
    );
  }
}

export default App;
