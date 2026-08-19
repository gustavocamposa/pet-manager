import Login from "../src/pages/Login/Login.jsx";
import Pets from "./pages/Pets/Pets.jsx";
import { useEffect } from "react";

function App() {
  return (
    <>
      <h1>Pet Application</h1>
      <Login />
      <Pets />
    </>
  );
}
export default App;
