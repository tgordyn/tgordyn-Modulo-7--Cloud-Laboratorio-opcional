import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

interface SearchBarProps {
  organization: string;
  setOrganization: (org: string) => void;
  fetchMembers: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ organization, setOrganization, fetchMembers }) => {
  const [inputValue, setInputValue] = useState(organization);

  const handleSearch = () => {
    setOrganization(inputValue);
    fetchMembers();
  };

  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
      <TextField
        label="Organization"
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        size="small"
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};
