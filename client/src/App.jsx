
import './App.css';

import { Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header";
import { SaveFiles } from './Components/SaveFiles';
import { GetFile } from './Components/GetFiles';
import { useState } from "react";


function App() {
  const [fetch, setFetch] = useState(false)

  // Checking updated data status
  const addData = (status) => {
    console.log('status:', status)
    if (status) {
      setFetch(true);
    }
  }

  return (

    <Routes>
      <Route path="/" element={
        <>
          <Header />
          <SaveFiles addData={addData} />
          <GetFile fetch={fetch} addData={addData} />
        </>
      } />
    </Routes>
  );
}


export default App;