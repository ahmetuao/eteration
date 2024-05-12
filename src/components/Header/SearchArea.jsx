import { Box, Button, TextField } from "@mui/material";
import { setFilter } from "../../redux/actions/filterActions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function SearchArea() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSearchTerm(value);
  };

  const handleSearch = () => {
    dispatch(setFilter("search", searchTerm));
    navigate("/products");
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#ffffff",
        padding: ".375rem",
        margin: "1rem",
        borderRadius: ".25rem",
      }}
    >
      <TextField
        sx={{
          width: "100%",
        }}
        value={searchTerm || ""}
        onChange={handleChange}
        name="search-product"
        id="outlined-basic"
        label="Search Product"
        variant="outlined"
        type="text"
      />
      <Button
        variant="contained"
        sx={{
          borderRadius: "100%",
          width: "40px",
          height: "40px",
          minWidth: "unset",
          marginLeft: ".5rem",
          marginTop: "auto",
          marginBottom: "auto",
        }}
        color="primary"
        onClick={handleSearch}
      >
        <SearchIcon sx={{ fontSize: "24px" }} onClick={handleSearch} />
      </Button>
    </Box>
  );
}
