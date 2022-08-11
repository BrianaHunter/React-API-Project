import "./App.css";
import { Movies } from "./component/Movie";
import React from "react";
import SearchMovie from "./component/SearchMovie";

function App() {
  return (
    <div className="App">
      <SearchMovie />
      <Movies />
    </div>
  );
}

export default App;
