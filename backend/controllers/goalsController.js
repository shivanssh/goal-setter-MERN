const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

/**
 * @desc Get goals
 * @route GET /v1/goals
 * @access Private
 */
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json({ message: "Get Goals", data: goals });
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

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(201).json({ message: "Set Goals", data: goal });
});

/**
 * @desc Update goal
 * @route PUT /v1/goal/:id
 * @access Private
 */
const updateGoal = asyncHandler(async (req, res) => {
  const goalId = req.params.id;
  const goal = await Goal.findById(goalId);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found!");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("You are not authorized to perform this action");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(goalId, req.body, {
    new: true,
  });
  res
    .status(200)
    .json({ message: `Updated Goal ${req.params.id}`, data: updatedGoal });
});

/**
 * @desc Delete goal
 * @route DELETE /v1/goal/:id
 * @access Private
 */
const deleteGoal = asyncHandler(async (req, res) => {
  const goalId = req.params.id;
  const goal = await Goal.findById(goalId);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found!");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("You are not authorized to perform this action");
  }

  await Goal.findByIdAndDelete(goalId);

  res
    .status(200)
    .json({ message: `Deleted Goal ${req.params.id}`, id: goalId });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
