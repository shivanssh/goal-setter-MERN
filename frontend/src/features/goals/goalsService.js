import axios from "axios";

const API_URL = "/v1/goals";

// One way of adding a header authorization use local storage to access the token
// axios.defaults.headers.common = {
//   Authorization: `Bearer ${user?.data?.token}`,
// };

// Create/Add goals
const addGoal = async (goal, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goal, config);

  return response.data;
};

// Get goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response?.data?.data;
};

// Update goal
const updateGoal = async (id, updatedGoal, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${id}`, updatedGoal, config);
  return response.data;
};

// Delete goal
const deleteGoal = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${id}`, config);

  return response.data;
};

const goalsService = { addGoal, getGoals, updateGoal, deleteGoal };

export default goalsService;
