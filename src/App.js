import React, { useEffect, useState } from "react";
import LotSelect from "./components/lotSelect/LotSelect";
import DisplaySpots from "./components/displaySpots/DisplaySpots";
import LotStatistics from "./components/lotStatistics/LotStatistics";

const last = (arr) => arr[arr.length - 1];

function App() {
  const [lots, setLots] = useState(undefined);
  const [lot, setLot] = useState(undefined);
  const [lotName, setLotName] = useState(undefined);

  const fetchLots = async () => {
    const res = await fetch("/api");
    const data = await res.json();
    return data;
  };

  const fetchLot = async (name) => {
    const res = await fetch(`/api/${name}`);
    const data = await res.json();
    return data;
  };

  // useEffect(() => {
  //   const getLots = async () => {
  //     const lots = await fetchLots();
  //     setLots(lots);
  //     setLotName(lots[0]);
  //   };
  //   getLots();
  // }, []);

  useEffect(() => {
    const getLot = async (name) => {
      if (name) {
        const lot = await fetchLot(name);
        lot.sort((a, b) => a.date > b.date);
        setLot(lot);
      }
    };
    getLot(lotName);
  }, [lotName]);

  useEffect(() => {
    const f = () => {
      const getLots = async () => {
        const lots = await fetchLots();
        setLots(lots);
        setLotName("");
        setLotName(lots[0]);
      };
      getLots();
    }
    
    f();
    const interval = setInterval(f, 1000);

    return () => clearInterval(interval);
  }, []);

  // console.log(lots, lot.length, lot);

  return (
    <div className="flex flex-col items-center">
      {lot && lot.length > 0 && lots && (
        <>
          <LotSelect lots={lots} lot={last(lot)} setLot={setLotName} />
          <DisplaySpots lot={last(lot)} />
          <LotStatistics lot={lot} />
        </>
      )}
    </div>
  );
}

export default App;
