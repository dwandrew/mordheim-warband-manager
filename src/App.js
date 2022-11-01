import React from 'react';
import ArmourScreen from './features/armour/Armour'
import EquipmentScreen from './features/equipment/equipment';
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
            <Route path="/equipment" element={<EquipmentScreen />} />
        </Routes>
        </header>
      </BrowserRouter>

    </div>
  );
}

export default App;
