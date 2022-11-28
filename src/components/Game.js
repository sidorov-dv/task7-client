import { useEffect, useState } from "react";
import BoardCell from "../components/BoardCell";
import { calcWinner } from "../calcWinner";
import "./Game.css";

const Game = ({ socket, roomCode }) => {
  const [board, setBoard] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  });
  const [canPlay, setCanPlay] = useState(true);
  const [status, setStatus] = useState(false);

  const winner = calcWinner(board);

  useEffect(() => {
    socket.on("updateGame", (id) => {
      setBoard((data) => ({ ...data, [id]: "O" }));
      setCanPlay(true);
    });

    return () => socket.off("updateGame");
  });

  useEffect(() => {
    if (winner) {
      setStatus(true);
    }
  }, [winner]);

  useEffect(() => {
    const squares = Object.values(board);
    if (squares.filter((item) => item === "O" || item === "X").length === 9) {
      setStatus(true);
    }
  }, [board]);

  const handleCellClick = (e) => {
    if (winner) {
      return;
    }
    const id = e.currentTarget.id;
    if (canPlay && board[id] === "") {
      setBoard((data) => ({ ...data, [id]: "X" }));
      socket.emit("play", { id, roomCode });
      setCanPlay(false);
    }
  };

  const startGameHandler = () => {
    setBoard({
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
    });
    setStatus(false);
  };

  return (
    <>
      <main>
        <section className="main-section">
          <BoardCell
            handleCellClick={handleCellClick}
            id={"0"}
            text={board[0]}
          />
          <BoardCell
            handleCellClick={handleCellClick}
            id={"1"}
            text={board[1]}
          />
          <BoardCell
            handleCellClick={handleCellClick}
            id={"2"}
            text={board[2]}
          />

          <BoardCell
            handleCellClick={handleCellClick}
            id={"3"}
            text={board[3]}
          />
          <BoardCell
            handleCellClick={handleCellClick}
            id={"4"}
            text={board[4]}
          />
          <BoardCell
            handleCellClick={handleCellClick}
            id={"5"}
            text={board[5]}
          />

          <BoardCell
            handleCellClick={handleCellClick}
            id={"6"}
            text={board[6]}
          />
          <BoardCell
            handleCellClick={handleCellClick}
            id={"7"}
            text={board[7]}
          />
          <BoardCell
            handleCellClick={handleCellClick}
            id={"8"}
            text={board[8]}
          />
        </section>
      </main>
      <div className="row justify-content-center mt-3">
        {status && (
          <div className="col">
            <p className="text-center fs-3 fw-bold">Game over</p>
            <button
              className="btn btn-lg btn-primary d-block mx-auto fw-semibold"
              onClick={startGameHandler}
            >
              New game?
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Game;
