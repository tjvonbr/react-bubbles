import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import BubblePage from './components/BubblePage';
import PrivateRoute from './components/PrivateRoute';

import Login from "./components/Login";
import "./styles.scss";

function App() {
  const [colorList, setColorList] = useState([]);
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/api/colors" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
