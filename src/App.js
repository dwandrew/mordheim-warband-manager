import React from 'react';
import ArmourScreen from './features/armour/Armour'
import EquipmentScreen from './features/equipment/equipment';
import Dashboard from './features/dashboard/dash'
import MutationsScreen from './features/mutations/mutations';
import ScenarioScreen from './features/scenarios/scenarios';
import SkillScreen from './features/skills/skills';
import SpellScreen from './features/spells/spells';
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
            <Route path="/mutations" element={<MutationsScreen />} />
            <Route path="/scenarios" element={<ScenarioScreen />} />
            <Route path="/skills" element={<SkillScreen />} />
            <Route path="/spells" element={<SpellScreen />} />
        </Routes>
        </header>
      </BrowserRouter>

    </div>
  );
}

export default App;
