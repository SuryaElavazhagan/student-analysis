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

/**
 * <center>
                <svg version="1.1" id="loader-1" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50">
                  <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                    <animateTransform attributeType="xml"
                      attributeName="transform"
                      type="rotate"
                      from="0 25 25"
                      to="360 25 25"
                      dur="0.6s"
                      repeatCount="indefinite"/>
                  </path>
                </svg>
                Downloading all necessary data, Please wait.....
              </center>
 */

export default App;
