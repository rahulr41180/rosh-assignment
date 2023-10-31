
import './App.css';

import { Header } from "./Components/Header";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
        
          <Header />

        </>
      } />
    </Routes>
  );
}

export default App;
