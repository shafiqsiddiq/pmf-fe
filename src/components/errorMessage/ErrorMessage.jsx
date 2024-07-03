import { ERROR } from "../../utils/path";

export function FieldError(props) {
  return (
    <div className="error-message-field-generic">
      <p>{props.message ? props.message : ERROR.SYSTEM_ERROR}</p>
    </div>
  );
}
