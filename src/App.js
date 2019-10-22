import React from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import PlayersHotloaders from '../src/components/hotloaders/PlayersHotloaders'

function App() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
      <header className="App-header" >
          <PlayersHotloaders />
          <Button>HELLO</Button>
      </header>
    </div>
  );
}

export default App;
