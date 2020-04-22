import React from "react";

const NextLvl = ({score, nextLvl}) => (
  <div className="score-board">
    <div className="score">You scored {score} / 5 correct answers!</div>
    <div className="score">Congrats you passed to the next level!</div>
    <button className="playBtn" onClick={nextLvl}>
      Next Level!
    </button>
  </div>
);

export default NextLvl;
