import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Studio from "./pages/Studio";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="studio" element={<Studio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
