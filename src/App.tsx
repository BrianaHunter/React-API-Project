import "./App.css";
import { Movies } from "./component/Movies";
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
