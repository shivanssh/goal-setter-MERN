import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Dashboard.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return <div className="dashboard-container">Dashboard</div>;
};

export default Dashboard;
