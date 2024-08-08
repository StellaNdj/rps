import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChoiceButton = ({ onClick, icon, isBouncing }) => {
  return(
    <button
      className={`choices-btn ${isBouncing ? 'bounce' : ''}`}
      onClick={onClick}>
        <FontAwesomeIcon icon={icon} size="2xl"/>
    </button>
  )
}

export default ChoiceButton;
