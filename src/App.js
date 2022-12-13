import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Form from "./components/form/App";
import List from "./components/tabel/App";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/create" element={<Form />} />
        <Route path="/" element={<List />} />
      </Routes>
    </div>
  );
}

export default App;
