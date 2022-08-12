import "./App.css";
import { Movies } from "./component/Movie";
import React from "react";
import Details from "./pages/Details";

function App() {
  return (
    <div className="App">
      <Movies />
      {/* <Details /> */}
    </div>
  );
}

export default App;
