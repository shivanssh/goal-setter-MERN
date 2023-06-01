import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register/";
import NotFound from "./pages/NotFound";
import "./App.scss";
import Header from "./components/Header/Header";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <div className="container">
    <Header />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <ToastContainer />
  </div>
);

export default App;
