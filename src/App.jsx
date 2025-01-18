import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import Slider from "./Components/Slider";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
      <Navbar />
      <Slider genreId={28} />
    </div>
  );
}

export default App;
