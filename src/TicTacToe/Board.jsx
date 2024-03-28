import  { useState, useEffect } from "react";
import Square from "./Square";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXturn] = useState(true);
  const [scoreX, setScoreX] = useState(() => parseInt(localStorage.getItem("scoreX")) || 0);
  const [scoreO, setScoreO] = useState(() => parseInt(localStorage.getItem("scoreO")) || 0);
  const [winner,setWinner]=useState('')

  useEffect(() => {
    localStorage.setItem("scoreX", scoreX.toString());
    localStorage.setItem("scoreO", scoreO.toString());
  }, [scoreX, scoreO]);

  const handleclick = (index) => {
    if (state[index] !== null) {
      return;
    }
    const copystate = [...state];
    copystate[index] = isXTurn ? "X" : "O";
    setState(copystate);
    setIsXturn(!isXTurn);
    const winner = checkWinner(copystate);
    if (winner) {
        setWinner(winner)
      if (winner === "X") {
        setScoreX(scoreX + 1);
      } else {
        setScoreO(scoreO + 1);
      }
      setState(Array(9).fill(null));
    }
  };

  const checkWinner = (state) => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
    return null;
  };

const startNewgame =()=>{
    window.location.reload();
    localStorage.setItem("scoreX", 0);
    localStorage.setItem("scoreO", 0);
}

  return (
    <div className="flex flex-col justify-center items-center m-5">
      <div className="flex items-center justify-center w-full mb-5">
      <div>
        <div className="font-bold ">Tic Tac Toc Game</div>
        <div>Player X Score: {scoreX}</div>
        <div>Player O Score: {scoreO}</div>
      </div>
       
      </div>
      {
        winner ? <>
         <h1>{winner} won the game</h1>
          <button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" onClick={() => setState(Array(9).fill(null),setWinner(''))}>Play Again</button>
          <button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" onClick={startNewgame}>New Game</button>
      
        </>:
         <>
         <h1>Player {isXTurn ? "X" : "O"} Please Move</h1>
         <div className="flex">
           <Square onClick={() => handleclick(0)} value={state[0]} />
           <Square onClick={() => handleclick(1)} value={state[1]} />
           <Square onClick={() => handleclick(2)} value={state[2]} />
         </div>
         <div className="flex">
           <Square onClick={() => handleclick(3)} value={state[3]} />
           <Square onClick={() => handleclick(4)} value={state[4]} />
           <Square onClick={() => handleclick(5)} value={state[5]} />
         </div>
         <div className="flex">
           <Square onClick={() => handleclick(6)} value={state[6]} />
           <Square onClick={() => handleclick(7)} value={state[7]} />
           <Square onClick={() => handleclick(8)} value={state[8]} />
         </div>
       </>
      }
     
       
    </div>
  );
};

export default Board;
