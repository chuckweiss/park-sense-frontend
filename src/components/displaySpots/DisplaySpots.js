const DisplaySpots = ({ lot }) => {
  return (
    <div className="mt-4 border-box border-4">
      {lot.spots.map((spots, row) => {
        return (
          <div className="flex flex-row justify-between" key={row}>
            {spots.map((status, col) => {
              let style = "";
              if (status === "empty") style += "border-4 bg-green-400";
              if (status === "full") style += "border-4 bg-red-400";

              return (
                <div className="flex flex-col items-center" key={col}>
                  <div className={`box-border h-16 w-12 mx-4 mt-4 ${style}`} />
                  <div className="mb-2"> {status && `(${row}, ${col})`} </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DisplaySpots;
