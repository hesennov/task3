import Navbar from "./components/Navbar";
import "react-loading-skeleton/dist/skeleton.css";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Fake from "./components/Fake";
import Detail from "./components/Detail";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Fake />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
