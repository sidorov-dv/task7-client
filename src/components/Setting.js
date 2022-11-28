import React from "react";

const Setting = ({ setShowForm }) => {
  return (
    <div className="row text-center my-4">
      <div className="col">
        <button
          className="btn btn-lg btn-info fw-semibold"
          onClick={() => setShowForm(true)}
        >
          New game settings?
        </button>
      </div>
    </div>
  );
};

export default Setting;
