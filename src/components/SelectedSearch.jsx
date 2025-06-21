import React from "react";

const SelectedSearch = ({message, isAddressChosen = false}) => {
  return (
    <div className="selected-search">
      {isAddressChosen ? (
        <div>
          <p>{message}</p>
          <button>Continuer</button>
        </div>
      ) : (
        <h3>Aucun restaurant séléctionné</h3>
      )}
    </div>
  );
};

export default SelectedSearch;
