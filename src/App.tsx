import "./App.css";
import { Movies } from "./component/Movies";
import React from "react";
import Details from "./pages/Details";
import SearchBy from "./component/SearchBy";

function App() {
  return (
    <div className="App">
      <Movies />
      {/* <Details /> */}
      {/* <SearchBy /> */}
    </div>
  );
}

export default App;
