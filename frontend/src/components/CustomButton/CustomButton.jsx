import "./CustomButton.scss";

const CustomButton = ({ type, label }) => {
  return (
    <div className="custom-button">
      <button type={type}>{label}</button>
    </div>
  );
};

export default CustomButton;
