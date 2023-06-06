import CustomButton from "../CustomButton/CustomButton";
import Input from "../Input/Input";
import "./Popup.scss";

// id,
//   name,
//   type,
//   placeholder,
//   value,
//   onChange,

function Popup({
  isShowModal,
  onClose,
  title,
  buttonLabel,
  onClick,
  onChange,
  placeholder = "",
  disabled,
}) {
  if (!isShowModal) return null;
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <section className="title">
          <Input
            label={title}
            id="text"
            name="text"
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        </section>
        <div className="pop-buttons">
          <CustomButton
            label={buttonLabel}
            type="button"
            onClick={onClick}
            disabled={disabled}
          />
          <CustomButton label="Cancel" type="button" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

export default Popup;
