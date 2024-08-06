import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandBackFist, faHand,  faHandScissors} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Game = () => {
  // Initialize the scoreboards
  const [userScoreBoard, setUserScoreBoard] = useState(0);
  const [computerScoreBoard, setComputerScoreBoard] = useState(0);
  const [tieScoreBoard, setTieScoreBoard] = useState(0);

  // Store computer and user choices
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);

  // Initialize the possible options for the game
  const options = ['Rock', 'Paper', 'Scissors'];
  const random = Math.floor(Math.random()* 3);

  // Determine the winner of the game
  const handlePlayerOption = (userChoice) => {
    setUserChoice(userChoice);
    setComputerChoice(random);

    setTimeout(() => {
      if(userChoice === random) {
        setTieScoreBoard(prevScore => prevScore + 1);
      } else if ((userChoice === 0 && random === 2) ||
                  (userChoice === 1 && random === 0) ||
                  (userChoice === 2 && random === 1)) {
        setUserScoreBoard(prevScore => prevScore + 1)
      } else {
        setComputerScoreBoard(prevScore => prevScore + 1);
      }

      setUserChoice(null);
      setComputerChoice(null);
    }, 1000)

  }

  const displayChoices = (choice) => {
    const icons = [faHandBackFist, faHand, faHandScissors];
    return(
      <button
          className="display-choices-btn">
            <FontAwesomeIcon icon={icons[choice]} size="2xl"/>
      </button>
    )
  }

  return (
    <>
      <div className="scoreboard">
        <div className="scoreboard-card">USER <span>{userScoreBoard}</span> </div>
        <div className="scoreboard-card">COMPUTER <span>{computerScoreBoard}</span></div>
        <div className="scoreboard-card">TIE <span>{tieScoreBoard}</span></div>
      </div>

      <div>
        <h3>Fight!</h3>
        <div className="display-choices">
          {userChoice !== null && (
            <div>
              <p>You've picked</p>
              {displayChoices(userChoice)}
            </div>
          )}

          {computerChoice !== null && (
            <div>
            <p>Computer picked</p>
            {displayChoices(computerChoice)}
            </div>
          )}
        </div>

      </div>

      <div>
        <button
          className="choices-btn"
          onClick={() => handlePlayerOption(0)}>
            <FontAwesomeIcon icon={faHandBackFist} size="2xl"/>
        </button>
        <button
          className="choices-btn"
          onClick={() => handlePlayerOption(1)}>
            <FontAwesomeIcon icon={faHand} size="2xl"/>
        </button>
        <button
          className="choices-btn"
          onClick={() => handlePlayerOption(2)}>
            <FontAwesomeIcon icon={faHandScissors} size="2xl"/>
        </button>
      </div>

      <div>
        <button>Rules</button>
        <button>Reset scoreboard</button>
      </div>
    </>
  )
}

export default Game;
