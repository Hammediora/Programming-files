import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

// Sample query suggestions
const querySuggestions = [
  "Hip-hop",
  "Jazz",
  "Rock",
  "Pop",
  "Classical",
  "Electronic",
];

/**
 * Autocomplete Input Component
 * @param {String} value - Current input value
 * @param {Function} onChange - Function to handle value change
 */
function AutocompleteInput({ value, onChange }) {
  return (
  <Box flexGrow={1} gap={2}>
    <Autocomplete
      options={querySuggestions}
      freeSolo
      value={value} // Bind to current value
      onChange={(event, newValue) => {
        onChange(newValue || ""); // Update parent state when a value is selected
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Query"
          variant="outlined"
          fullWidth
          onChange={(e) => onChange(e.target.value)} // Update on typing
        />
      )}
    />
  </Box>
  );
}

export default AutocompleteInput;
