import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChoiceButton = ({ onClick, icon, isBouncing, activeChoice }) => {
  return(
    <button
      className={`choices-btn ${isBouncing ? 'bounce' : ''}`}
      onClick={onClick}
      disabled={activeChoice}>
        <FontAwesomeIcon icon={icon} size="2xl"/>
    </button>
  )
}

export default ChoiceButton;
