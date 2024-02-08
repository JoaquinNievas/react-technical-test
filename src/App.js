import React, { useState } from "react";
import { DataTable } from "./data-table/table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./App.css";

function App() {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    setApiData(data);
    setIsLoading(false);
  };

  return (
    <>
      {apiData.length === 0 && (
        <Container className="center-content">
          <Button onClick={fetchData} className="fetch_button">
            Fetch Data
          </Button>
          {isLoading ? (
            <p>Loading...</p>
          ) : apiData.length === 0 ? (
            <p>No data</p>
          ) : null}
        </Container>
      )}
      {apiData.length > 0 && <DataTable inputData={apiData} />}
    </>
  );
}

export default App;
