import "./App.css";
import { Movies } from "./pages/Movies";
import React from "react";
import Details from "./component/Details";
import SearchBy from "./component/SearchBy";
// import { Link } from "@mui/material";
import WatchListPage from "./pages/WatchList";
import WatchList from "./pages/WatchList";
import {
  Routes,
  Route,
  Link,
  Navigate,
  NavLink,
  useNavigate,
} from "react-router-dom";

function App() {
  return (
    <div className="bg-gradient-to-tl from-black via-blue-900 to-black w-ful h-full">
      <Routes>
        <Route path="/watch-list" element={<WatchListPage />} />
        <Route path="/" element={<Movies />} />
      </Routes>
    </div>
  );
}

export default App;
