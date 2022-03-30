import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import InventoryTracker from "./components/inventoryTracker/InventoryTracker";
import NavBar from "./components/navBar/NavBar";
import {DropDown, Option} from "./components/dropDown/DropDown"

function App() {
  const serverURL = "http://localhost:5000";
  const inventoryURL = "inventory";
  const lotStatusURL = "lotStatus";
  const lotHistoryURL = "lotHistory";

  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState("Loading...");
  const [optionValue, setOptionValue] = useState("");

  // Get inventory on page load
  useEffect(() => {
    setLoading("Loading..."); // I don't think this is working

    const getInventory = async () => {
      const inventory = await fetchInventory();
      setInventory(inventory);
    };
    getInventory();

    inventory.length === 0 && setLoading("No Items"); // see above
  }, []);

  // Fetch Inventory
  const fetchInventory = async () => {
    const res = await fetch(`${serverURL}/${inventoryURL}`);
    const data = await res.json();
    return data;
  };

  // Add Item
  const addItem = async (item) => {
    const res = await fetch(`${serverURL}/${inventoryURL}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    });

    const data = await res.json();

    // I think this causes useEffect meaning we do the same thing twice
    setInventory([...inventory, data]);
  };

  const deleteItem = async (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
    await fetch(`${serverURL}/${inventoryURL}/${id}`, {
      method: "DELETE",
    });
  };

const handleSelect = (e) => {
  console.log(e.target.value);
  setOptionValue(e.target.value);
}

  return (
    <Router>
      <div className="">
        <h1>Select Parking Lot</h1>
        <DropDown 
          //formLabel="Parking Lot Options"
          buttonText="Pull Lot Data (test button)"
          onChange={handleSelect}
          action="https://jsonplaceholder.typicode.com/posts"
        >
          <Option selected value="Click to see options" />
          <Option value="Duthie Side Lot" />
          <Option value="Other example" />
        </DropDown>
        <Routes>
          <Route
            path={`/${inventoryURL}`}
            element={
              <InventoryTracker
                inventory={inventory}
                addItem={addItem}
                deleteItem={deleteItem}
                loading={loading}
              />
            }
          />
          <Route path="/" element={<Navigate to={inventoryURL} />} />
        </Routes>
        <NavBar />
      </div>
    </Router>
  );
}

export default App;
