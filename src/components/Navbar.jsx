import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Home from "./Home";
import "./navbar.scss";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="flex">
        <Link to={"/"} className="no-drag">
          <Canvas camera={{ fov: 60, position: [5, 2, -1] }}>
            <OrbitControls enableZoom={false} autoRotate />
            <ambientLight intensity={1} />
            <directionalLight position={[3, 2, 1]} />
            <Home />
          </Canvas>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
