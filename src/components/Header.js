const Header = ({ user, id }) => {
  return (
    <header className="row text-center mb-4">
      {user && id && (
        <div className="col">
          <h1 className="text-dark fw-bold">Multiplayer Tic Tac Toe</h1>
          <h2 className="text-primary fw-semibold">
            Welcome {user}. Your room is {id}
          </h2>
        </div>
      )}
    </header>
  );
};

export default Header;
