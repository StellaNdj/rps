const Scoreboard = ({ userScoreBoard, computerScoreBoard, tieScoreBoard }) => {
  return (
    <div className="scoreboard">
      <div className="scoreboard-card">USER <span>{userScoreBoard}</span> </div>
      <div className="scoreboard-card">COMPUTER <span>{computerScoreBoard}</span></div>
      <div className="scoreboard-card">TIE <span>{tieScoreBoard}</span></div>
    </div>
  )
}

export default Scoreboard;
