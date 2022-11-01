import React from 'react';
import ArmourScreen from './features/armour/Armour'
import Dashboard from './features/dashboard/dash'
import './App.css';
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <header className="App-header">
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/armour" element={<ArmourScreen />} />
        </Routes>
        </header>
      </BrowserRouter>

    </div>
  );
}

export default App;
