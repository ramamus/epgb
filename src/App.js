import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Players from '../src/pages/Players';
import Reports from '../src/pages/Reports';

function App() {
  return (<Router>
    <div>
      <ul>
        <li>
          <Link to="/">Checkin</Link>
        </li>
        <li>
          <Link to="/reports">Reports</Link>
        </li>
      </ul>

      <hr />
      <Switch>
        <Route exact path="/">
          <Players />
        </Route>
        <Route path="/reports">
          <Reports />
        </Route>
      </Switch>
    </div>
  </Router>)
}

export default App;
