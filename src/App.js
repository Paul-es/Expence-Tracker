import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Chart from "./components/chart";
import Bill from "./components/bill";
function App() {
  return (
    <Router>
      <Route exact path="/" component={Bill} />
      <Route exact path="/chart" component={Chart} />
    </Router>
  );
}

export default App;
