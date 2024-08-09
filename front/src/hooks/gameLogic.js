const determineOutcome = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return {
      result: 'tie',
      message: "IT'S A TIE",
    };
  } else if (
    (userChoice === 0 && computerChoice === 2) ||
    (userChoice === 1 && computerChoice === 0) ||
    (userChoice === 2 && computerChoice === 1)
  ) {
    return {
      result: 'win',
      message: "YOU'VE WON! 👑"
    }
  } else {
    return {
      result: 'lose',
      message: "YOU'VE LOST 😟"
    }
  }
}

export default determineOutcome;
