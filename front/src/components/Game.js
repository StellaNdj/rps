import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandBackFist, faHand, faHandScissors, faEraser, faBook } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import Scoreboard from "./Scoreboard";
import ChoiceButton from "./ChoiceButton";

const Game = () => {
  // Initialize the scoreboards
  const [userScoreBoard, setUserScoreBoard] = useState(0);
  const [computerScoreBoard, setComputerScoreBoard] = useState(0);
  const [tieScoreBoard, setTieScoreBoard] = useState(0);

  // Activate animation
  const [activeChoice, setActiveChoice] = useState(null);

  // Store computer and user choices
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);

  // Tracking modal state
  const [modalOpen, setModalOpen] = useState(false);

  // Initialize the possible game & icons options
  const options = ['Rock', 'Paper', 'Scissors'];
  const icons = [faHandBackFist, faHand, faHandScissors];

  // Load scoreboard from the local storage
  useEffect(() => {
    const storedUserScore = localStorage.getItem('userScore');
    const storedComputerScore = localStorage.getItem('computerScore');
    const storedTieScore = localStorage.getItem('tieScore');

    if(storedUserScore !== null) setUserScoreBoard(parseInt(storedUserScore, 10));
    if(storedComputerScore !== null) setComputerScoreBoard(parseInt(storedComputerScore, 10));
    if(storedTieScore !== null) setTieScoreBoard(parseInt(storedTieScore, 10));
  }, [])


  // Save scores whenever they change
  useEffect(() => {
    localStorage.setItem('userScore', userScoreBoard)
  }, [userScoreBoard]);

  useEffect(() => {
    localStorage.setItem('computerScore', computerScoreBoard)
  }, [computerScoreBoard]);

  useEffect(() => {
    localStorage.setItem('tieScore', tieScoreBoard)
  }, [tieScoreBoard])

  // Determine the winner of the game
  const handlePlayerOption = (userChoice) => {

    setActiveChoice(userChoice);
    const random = Math.floor(Math.random()* 3);

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
      setActiveChoice(null);
    }, 2000)

  }

  // Display with buttons each side choice's
  const displayChoices = (choice) => {
    return(
      <button
          className="display-choices-btn">
            <FontAwesomeIcon icon={icons[choice]} size="2xl"/>
      </button>
    )
  }

  // Open & close the modal
  const handleOpen = () => {
    setModalOpen(true);
  }

  const handleClose = () => {
    setModalOpen(false);
  }

  // Clear the scoreboard
  const handleReset = () => {
    setUserScoreBoard(0);
    setComputerScoreBoard(0);
    setTieScoreBoard(0);

    localStorage.setItem('userScore', 0);
    localStorage.setItem('computerScore', 0);
    localStorage.setItem('tieScore', 0);
  }

  return (
    <>
      <Scoreboard
        userScoreBoard={userScoreBoard}
        computerScoreBoard={computerScoreBoard}
        tieScoreBoard={tieScoreBoard}/>

      <div>
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
        {options.map((option, index) => (
          <ChoiceButton
            key={option}
            icon={icons[index]}
            isBouncing={activeChoice === index}
            onClick={() => handlePlayerOption(index)}/>
        ))}
      </div>

      <div className="rules-reset-btns">
        <button className="rules-reset-btn"
          onClick={handleOpen}>
            <FontAwesomeIcon icon={faBook}/>
            Rules
        </button>
        {modalOpen && (
          <div className="modal-overlay">
            <Modal
              onClose={handleClose}
              text="
              Rock wins against scissors.
              Scissors win against paper.
              Paper wins against rock."/>
          </div>
        )}
        <button className="rules-reset-btn" onClick={handleReset}>
          <FontAwesomeIcon icon={faEraser}/>Reset scoreboard
        </button>
      </div>
    </>
  )
}

export default Game;
