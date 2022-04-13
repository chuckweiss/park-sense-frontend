const countNulls = (arr) => {
  return arr.length - arr.filter((n) => n).length;
};

const LotStatistics = ({ lot }) => {
  const nulls = countNulls(lot[0].spots.flat());

  const average = (array) =>
    Math.round(array.reduce((a, b) => a + b) / (array.length - nulls));

  let stats = Array(lot[0].size[1])
    .fill(0)
    .map(() => Array(lot[0].size[0]).fill(0));

  lot.forEach((lot, count) => {
    lot.spots.forEach((spots, i) => {
      spots.forEach((spot, j) => {
        if (spot === "full") {
          stats[i][j] += 1;
        }
      });
    });
  });

  stats = stats.map((spot) => {
    return spot.map((num) => Math.round((num * 100) / lot.length));
  });

  return (
    <div className="flex flex-col">
      <div className="border-4 m-2 p-1">
        Lot is {average(stats.flat())}% full on average
      </div>

      {stats.map((stat, row) => {
        return stat.map((num, col) => {
          if (lot[0].spots[row][col])
            return (
              <div className="m-2 border-4 p-1" key={col}>
                Spot ({row}, {col}) is full {num}% of the time
              </div>
            );
          return null;
        });
      })}
    </div>
  );
};

export default LotStatistics;
