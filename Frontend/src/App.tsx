import { useState } from "react";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-[#F5F5F5] h-screen">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
