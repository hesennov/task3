import Navbar from "./components/Navbar";
import "react-loading-skeleton/dist/skeleton.css";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import Fake from "./components/Fake";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/products" element={<Products />} /> */}
        <Route path="/products" element={<Fake />} />
        {/* <Route path="/products/:id" element={<Product />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
export default App;
