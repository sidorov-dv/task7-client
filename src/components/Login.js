import React, { useState } from "react";

const Login = ({ showForm, setShowForm, onGameParams }) => {
  const [userName, setUserName] = useState("");
  const [id, setId] = useState("");

  const userNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const roomIdHandler = (e) => {
    setId(e.target.value);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    onGameParams(userName, id);
    setUserName("");
    setId("");
    setShowForm(false);
  };
  return (
    <>
      {showForm && (
        <div className="row justify-content-center">
          <form
            className="col-6 mt-3 border border-dark border-2 rounded bg-light bg-gradient p-3"
            onSubmit={loginUser}
          >
            <div className="mb-3 form-floating">
              <input
                type="text"
                className="form-control"
                id="name"
                value={userName}
                onChange={userNameHandler}
                placeholder="User name"
                autoComplete="true"
                required
              />
              <label htmlFor="name">Enter name</label>
            </div>
            <div className="mb-3 form-floating">
              <input
                type="number"
                min={1}
                className="form-control"
                id="roomId"
                value={id}
                onChange={roomIdHandler}
                placeholder="Room id"
                required
              />
              <label htmlFor="roomId">Enter room id</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
