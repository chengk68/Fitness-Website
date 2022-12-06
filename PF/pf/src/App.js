import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Studio from "./pages/Studio";
import Subscription from "./pages/Subscription";
import Subscribe from "./pages/Subscribe";
import CardInfo from "./pages/CardInfo";
import Payment from "./pages/Payment";
import MySchedule from "./pages/MySchedule";
import MyHistory from "./pages/MyHistory";
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
          <Route path="subscription" element={<Subscription />} />
          <Route path="myschedule" element={<MySchedule />} />
          <Route path="myhistory" element={<MyHistory />} />
          <Route path="subscribe" element={<Subscribe />} />
          <Route path="cardInfo" element={<CardInfo />} />
          <Route path="payment/:id" element={<Payment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
