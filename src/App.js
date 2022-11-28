import Login from "./components/Login";
import Header from "./components/Header";
import Game from "./components/Game";
import Setting from "./components/Setting";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5555");

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    if (roomCode) {
      socket.emit("joinRoom", roomCode);
    }
  }, [roomCode]);

  const gameHandler = (name, id) => {
    setCurrentUser(name);
    setRoomCode(id);
  };

  return (
    <div className="container">
      <Login
        showForm={showForm}
        setShowForm={setShowForm}
        onGameParams={gameHandler}
      />
      {!showForm && <Setting setShowForm={setShowForm} />}
      {!showForm && <Header user={currentUser} id={roomCode} />}
      {!showForm && <Game socket={socket} roomCode={roomCode} />}
    </div>
  );
}

export default App;
