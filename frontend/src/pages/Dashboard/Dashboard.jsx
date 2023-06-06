import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGoal,
  getGoals,
  reset,
  updateGoal,
} from "../../features/goals/goalsSlice";
import CustomButton from "../../components/CustomButton/CustomButton";
import GoalsForm from "../GoalsForm/GoalsForm";
import Popup from "../../components/Popup/Popup";
import Spinner from "../../components/Spinner/Spinner";

import "./Dashboard.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  const [showEditModal, setShowEditModal] = useState(false);
  const [updatedText, setUpdatedText] = useState("");
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }
  }, [user, navigate, isError, message]);

  useEffect(() => {
    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleEdit = (id) => {
    setCurrentId(id);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteGoal(id));
  };

  const handleUpdate = () => {
    dispatch(updateGoal({ id: currentId, text: updatedText }));
    setShowEditModal(false);
  };

  const handleChange = (inputValue) => {
    setUpdatedText(inputValue);
  };

  const editDeleteButton = (item) => (
    <section className="edit-update-button">
      <CustomButton
        label="Edit"
        type="button"
        onClick={() => handleEdit(item._id)}
      />
      <CustomButton
        label="Delete"
        type="button"
        onClick={() => handleDelete(item._id)}
      />
    </section>
  );

  const currentGoal = goals.find((item) => item._id === currentId);

  return (
    <main className="dashboard-container">
      <Popup
        isShowModal={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Update Goal"
        buttonLabel="Update"
        onClick={handleUpdate}
        onChange={handleChange}
        placeholder={currentGoal?.text}
        disabled={!updatedText}
      />
      <section>
        <h1>Welcome {user?.data?.name || "Customer"}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalsForm />
      <table>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Goal</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((item, idx) => {
            return (
              <tr key={item._id}>
                <th>{idx + 1}</th>
                <th>{item.text}</th>
                <th>{editDeleteButton(item)}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};

export default Dashboard;
