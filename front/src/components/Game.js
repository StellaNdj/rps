import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandBackFist, faHand, faHandScissors, faEraser, faBook } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import Scoreboard from "./Scoreboard";
import ChoiceButton from "./ChoiceButton";
import useSound from 'use-sound';
import successSound from '../sounds/Success.wav';
import failureSound from '../sounds/Failure.wav';

const Game = () => {
  // Initialize the scoreboards
  const [userScoreBoard, setUserScoreBoard] = useState(0);
  const [computerScoreBoard, setComputerScoreBoard] = useState(0);
  const [tieScoreBoard, setTieScoreBoard] = useState(0);

  const [finalMsg, setFinalMsg] = useState('');

  // Initialize sounds
  const [playSuccess] = useSound(successSound, { volume: 0.1 });
  const [playFailure] = useSound(failureSound, { volume: 0.1 });

  // Activate animation
  const [activeChoice, setActiveChoice] = useState(false);

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

    if(userChoice === random) {
      setTieScoreBoard(prevScore => prevScore + 1);
      setFinalMsg(`IT'S A TIE`)
    } else if ((userChoice === 0 && random === 2) ||
    (userChoice === 1 && random === 0) ||
    (userChoice === 2 && random === 1)) {
      setUserScoreBoard(prevScore => prevScore + 1);
      setFinalMsg(`YOU'VE WON! 👑`)
    } else {
      setComputerScoreBoard(prevScore => prevScore + 1);
      setFinalMsg(`YOU'VE LOST 😟`)
    }

    setTimeout(() => {
      setUserChoice(null);
      setComputerChoice(null);
      setActiveChoice(null);
      setFinalMsg('');
    }, 2000);
  }

  // Keyboard game navigation

  const handleKeyDown = (e) => {
    if (e.key === 'a' || e.key === 'A') {
      handlePlayerOption(0);
    } else if (e.key === 'z' || e.key === 'Z') {
      handlePlayerOption(1);
    } else if (e.key === 'e' || e.key === 'E') {
      handlePlayerOption(2);
    } else if (e.key === 'r' || e.key === 'R') {
      handleReset();
    } else if (e.key === 'o' || e.key === '0') {
      handleOpen();
    } else if (e.key === 'c' || e.key === 'C') {
      handleClose();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [])

  // Display with buttons each side choice's
  const displayChoices = (choice) => {
    return(
      <button
          className="display-choices-btn"
          aria-label={`Choice: ${options[choice]}`}>
            <FontAwesomeIcon icon={icons[choice]} size="2xl"/>
      </button>
    )
  }

  // Display final state of the game
  const finalState = (finalMsg) => {
    if (finalMsg === `YOU'VE WON! 👑`) {
      playSuccess();
    } else if (finalMsg === `YOU'VE LOST 😟`) {
      playFailure();
    }

    return (
      <button
        className="finalMsg"
        role="alert"
        aria-live="assertive"
        aria-atomic="true">
        {finalMsg}
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
              <p aria-live="polite">You've picked {options[userChoice]}</p>
              {displayChoices(userChoice)}
            </div>
          )}

          {finalMsg !== '' && (
            <>
            {finalState(finalMsg)}
            </>
          )}

          {computerChoice !== null && (
            <div>
            <p aria-live='polite'>Computer picked {options[computerChoice]}</p>
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
            disabled={activeChoice}
            onClick={() => handlePlayerOption(index)}/>
        ))}
      </div>

      <div className="rules-reset-btns">
        <button
          className="rules-reset-btn"
          onClick={handleOpen}
          aria-label="View rules">
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
        <button className="rules-reset-btn"
           onClick={handleReset}
           aria-label="Reset scoreboard">
          <FontAwesomeIcon icon={faEraser}/>Reset scoreboard
        </button>
      </div>
    </>
  )
}

export default Game;
