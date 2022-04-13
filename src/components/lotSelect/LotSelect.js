const LotSelect = ({ lots, lot, setLot }) => {
  return (
    <select
      className="mt-4 border-4"
      value={lot?.name || lots[0]}
      onChange={(e) => setLot(e.target.value)}
    >
      {lots.map((lotName, i) => {
        return (
          <option key={i} value={lotName}>
            {lotName}
          </option>
        );
      })}
    </select>
  );
};

export default LotSelect;
