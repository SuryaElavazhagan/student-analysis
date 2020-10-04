import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from 'react-router-dom';
import { students } from './api/students';
import { Semester } from './views/Semester';
import { Sprite } from './components/Sprite';
import { SchoolAndCollege } from './views/SchoolAndCollege';
import { StudentsStats } from './views/StudentsStats';
import { Caste } from './views/Caste';
import { ArrearAnalysis } from './views/ArrearAnalysis';

function App() {
  const [googleAPILoaded, setGoogleAPILoaded] = useState(false);

  function handleGAPILoaded() {
    setGoogleAPILoaded(true);
  }

  useEffect(() => {
    students.init(handleGAPILoaded);
  }, []);

  function renderDOM() {
    return (
      <Router>
        <div>
          <header className="py-3 shadow">
            <h2 className="font-semibold text-2xl text-center">Student Analytics</h2>
          </header>
          <div className="container mx-auto flex">
            <aside className="hidden sm:flex lg:w-1/4 xl:w-1/5">
              <nav className="px-6 pt-6 overflow-y-auto text-base lg:text-sm lg:py-12 lg:pl-6 lg:pr-8 sticky?lg:h-(screen-16)">
                <ul>
                  <li className="mb-3 lg:mb-1">
                    <Link
                      className="px-2 -mx-2 py-1 transition duration-200 ease-in-out relative block hover:translate-x-2px hover:text-gray-900 text-gray-600 font-medium"
                      to="/semester"
                    >
                      Semester Analysis
                    </Link>
                  </li>
                  <li className="mb-3 lg:mb-1">
                    <Link
                      className="px-2 -mx-2 py-1 transition duration-200 ease-in-out relative block hover:translate-x-2px hover:text-gray-900 text-gray-600 font-medium"
                      to="/high-school-vs-college"
                    >
                      High School vs College
                    </Link>
                  </li>
                  <li className="mb-3 lg:mb-1">
                    <Link
                      className="px-2 -mx-2 py-1 transition duration-200 ease-in-out relative block hover:translate-x-2px hover:text-gray-900 text-gray-600 font-medium"
                      to="/student-stats"
                    >
                      Students Stats
                    </Link>
                  </li>
                  <li className="mb-3 lg:mb-1">
                    <Link
                      className="px-2 -mx-2 py-1 transition duration-200 ease-in-out relative block hover:translate-x-2px hover:text-gray-900 text-gray-600 font-medium"
                      to="/caste"
                    >
                      Caste
                    </Link>
                  </li>
                  <li className="mb-3 lg:mb-1">
                    <Link
                      className="px-2 -mx-2 py-1 transition duration-200 ease-in-out relative block hover:translate-x-2px hover:text-gray-900 text-gray-600 font-medium"
                      to="/hoa-and-sa"
                    >
                      HOA & SA
                    </Link>
                  </li>
                </ul>
              </nav>
            </aside>
            <Switch>
              <Route exact path="/">
                <Redirect to="/semester"></Redirect>
              </Route>
              <Route path="/semester">
                <Semester />
              </Route>
              <Route path="/high-school-vs-college">
                <SchoolAndCollege />
              </Route>
              <Route path="/student-stats">
                <StudentsStats />
              </Route>
              <Route path="/caste">
                <Caste />
              </Route>
              <Route path="/hoa-and-sa">
                <ArrearAnalysis />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
  
  if (googleAPILoaded) {
    return renderDOM();
  } else {
    return (
      <div className="flex justify-center items-center max-h-full max-w-full">
        <Sprite name="loading" />
      </div>
    )
  }
}

export default App;
