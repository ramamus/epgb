import React from 'react';
import './App.css';
import Reports from '../src/pages/Reports/index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PlayersHotloaders from '../src/components/hotloaders/PlayersHotloaders';
import Players from '../src/pages/Players';
import { Container, Content } from './styled/index';

function App() {
  return (
    <Container>
      <Content>
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
      </Content>
    </Container>
  );
}

export default App;
