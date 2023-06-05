import "./CustomButton.scss";

const CustomButton = ({ type, label, ...other }) => {
  return (
    <div className="custom-button">
      <button type={type} {...other}>
        {label}
      </button>
    </div>
  );
};

export default CustomButton;
