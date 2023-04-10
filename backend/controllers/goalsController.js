const asyncHandler = require("express-async-handler");

/**
 * @desc Get goals
 * @route GET /v1/goals
 * @access Private
 */
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Goals" });
});

/**
 * @desc Set goal
 * @route POST /v1/goal/
 * @access Private
 */
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please fill text field");
  }
  console.log(req.body);
  res.status(201).json({ message: "Set Goals" });
});

/**
 * @desc Update goal
 * @route PUT /v1/goal/:id
 * @access Private
 */
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Goal ${req.params.id}` });
});

/**
 * @desc Delete goal
 * @route DELETE /v1/goal/:id
 * @access Private
 */
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Deleted Goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
