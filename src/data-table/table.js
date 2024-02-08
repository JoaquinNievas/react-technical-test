import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import "./table.css";

export const DataTable = ({ inputData }) => {
  const [sortOrderTitle, setSortOrderTitle] = useState(true);
  const [sortOrderUserId, setSortOrderUserId] = useState(true);
  const [isTitleSorted, setIsTitleSorted] = useState(false);
  const [isUserIdSorted, setIsUserIdSorted] = useState(false);
  const [filterText, setFilterText] = useState("");

  const sortDataByTitle = () => {
    if (sortOrderTitle) {
      inputData.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      inputData.sort((a, b) => b.title.localeCompare(a.title));
    }
    setSortOrderTitle(!sortOrderTitle);
    setIsTitleSorted(true);
    setIsUserIdSorted(false);
  };

  const sortDataByUserId = () => {
    if (sortOrderUserId) {
      inputData.sort((a, b) => a.userId - b.userId);
    } else {
      inputData.sort((a, b) => b.userId - a.userId);
    }
    setSortOrderUserId(!sortOrderUserId);
    setIsUserIdSorted(true);
    setIsTitleSorted(false);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredData = inputData.filter((item) =>
    item.body.includes(filterText)
  );

  return (
    <Container>
      <Form.Control
        type="text"
        placeholder="Filter by body text"
        value={filterText}
        onChange={handleFilterChange}
        className="input_filter"
      />
      <Table>
        <thead>
          <tr>
            <th className="table_column_user_id">
              <Button onClick={sortDataByUserId}>
                UserId {isUserIdSorted ? (sortOrderUserId ? "↑" : "↓") : ""}
              </Button>
            </th>
            <th className="table_column_id">Id</th>
            <th className="table_column_title">
              <Button onClick={sortDataByTitle}>
                Title {isTitleSorted ? (sortOrderTitle ? "↑" : "↓") : ""}
              </Button>
            </th>
            <th className="table_column_body">Body</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.userId}</td>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
