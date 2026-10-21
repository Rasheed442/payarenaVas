import { FormControl, MenuItem, Select } from "@mui/material";

export default function RegistrationSelect({ value, onChange, options, placeholder, ariaLabel, required = false, controlHeight = 36, fontSize = 11 }) {
  return (
    <FormControl fullWidth size="small" required={required}>
      <Select
        displayEmpty
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        inputProps={{ "aria-label": ariaLabel }}
        renderValue={(selected) => selected || <span className="text-[#a6a6ad]">{placeholder}</span>}
        MenuProps={{
          PaperProps: {
            sx: {
              mt: 0.5,
              maxHeight: 280,
              border: "1px solid #e1e1e4",
              borderRadius: "10px",
              boxShadow: "0 12px 28px rgb(35 35 45 / 14%)",
              "& .MuiMenuItem-root": {
                minHeight: 36,
                fontFamily: '"Host Grotesk", sans-serif',
                fontSize: 12,
              },
              "& .MuiMenuItem-root.Mui-selected": { backgroundColor: "#fff2eb", color: "#d95422" },
              "& .MuiMenuItem-root.Mui-selected:hover": { backgroundColor: "#ffe7d9" },
            },
          },
        }}
        sx={{
          height: controlHeight,
          borderRadius: "7px",
          backgroundColor: "#fff",
          color: "#35353a",
          fontFamily: '"Host Grotesk", sans-serif',
          fontSize,
          "& .MuiSelect-select": { px: 1.5, py: 1 },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#dedee1" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#c5c5ca" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#16a6ed", borderWidth: 1 },
        }}
      >
        {options.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
      </Select>
    </FormControl>
  );
}
