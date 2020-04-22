import React from "react";

const Won = ({score, playAgain}) => (
  <div className="score-board">
    <div className="score">You scored {score} / 5 correct answers!</div>
    <div className="score">!!YOU WON THE GAME CONGRATS CHAMP!!</div>
    <button className="playBtn" onClick={playAgain}>
      Play again!
    </button>
  </div>
);

export default Won;
