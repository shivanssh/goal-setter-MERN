import "./Input.scss";

const Input = ({
  label,
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
}) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
