import React from 'react';
import './App.css';
import Reports from '../src/pages/Reports/index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PlayersHotloaders from '../src/components/hotloaders/PlayersHotloaders';
import Players from '../src/pages/Players';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/reports">
              <Reports />
            </Route>
            <Route path="/">
              <header className="App-header">
                <PlayersHotloaders />
                <Players />
              </header>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
