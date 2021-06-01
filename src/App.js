import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import './App.css';
import "./css/view.css";
import { Container } from 'react-bootstrap';
import NavBar from "./components/home/navbar";
import View from "./components/view/lineupView";

function App() {
  return (
    <Router>
      <Container className="p-3">
        <NavBar />
      </Container>
      <Switch>
        <Route exact path="/">
          <View />
        </Route>
        <Route path="/create">
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
