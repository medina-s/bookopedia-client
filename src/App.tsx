import React from "react";
import "./App.css";
import Mainpage from "./Mainpage";
import CssBaseline from '@mui/material/CssBaseline';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <CssBaseline />
      <div className="verticalCenter">
        <Mainpage />
      </div>
    </div>
  );
};

export default App;
