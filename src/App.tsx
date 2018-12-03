import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import CasteClassification from "./components/CasteClassification";
import NavBar from "./components/NavBar";
import NonAcademicData from "./components/NonAcademicData";
import StudentAnalysis from "./components/StudentAnalysis";
import Welcome from "./components/Welcome";
import ArrearAnalysis from "./containers/ArrearAnalysis";
import SemesterAnalysis from "./containers/SemesterAnalysis";

interface IState {
  toggleOption: boolean;
}

class App extends React.Component<{}, IState> {

  public state : IState = {
    toggleOption: false
  }

  public options = [
    {
      component: SemesterAnalysis,
      name: 'Semester Analysis'
    },
    {
      component: StudentAnalysis,
      name: 'Student wise analysis',
    },
    {
      component: ArrearAnalysis,
      name: 'Arrear analysis',
    },
    {
      component: CasteClassification,
      name: 'Caste classification',
    },
    {
      component: NonAcademicData,
      name: 'Non-Academic data',
    },
  ]
  
  public toggleOptions = (): void =>{
    const toggleOption = document.getElementById('options') ? false : true;
    this.setState({
      toggleOption
    });
  }

  public render() {
    return (
      <Router>
        <div>
          <NavBar navHeaderName="Student Analytics" options={this.options.map((option) => option.name)}/>
          <Route path="/" exact={true} component={Welcome} />
          {
            this.options.map(option => (
              <Route key={option.name} path={`/${option.name}/`} component={option.component}/>
            ))
          }
        </div>
      </Router>
    );
  }
}

export default App;
