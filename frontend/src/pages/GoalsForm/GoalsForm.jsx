import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addGoal } from "../../features/goals/goalsSlice";
import CustomButton from "../../components/CustomButton/CustomButton";
import Input from "../../components/Input/Input";
import Spinner from "../../components/Spinner/Spinner";

import "./GoalsForm.scss";

function GoalsForm() {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.goals
  );

  const [text, setText] = useState("");

  useEffect(() => {
    if (isError) {
      toast(message);
    }

    // if (isSuccess) {
    //   toast("Goal added successfully");
    // }

    return () => {};
  }, [dispatch, isError, isSuccess, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addGoal({ text }));
    setText("");
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Input
            id="text"
            name="text"
            type="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Add your goal"
          />
          <CustomButton label="Add Goal" type="submit" disabled={!text} />
        </div>
      </form>
    </section>
  );
}

export default GoalsForm;
