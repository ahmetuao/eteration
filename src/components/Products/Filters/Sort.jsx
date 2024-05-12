import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setSort } from "../../../redux/actions/filterActions"; // Yolunuzun doğru olduğundan emin olun

export default function Sort() {
  const dispatch = useDispatch();

  const handleSortChange = (event, sortField) => {
    const value = event.target.value;
    dispatch(setSort(sortField, value));
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
        Sort By
      </Typography>
      <Box sx={{ boxShadow: "0px 0px 10px #efefef", padding: "1rem" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl sx={{ marginBottom: "1rem" }}>
            <RadioGroup
              aria-labelledby="sortBy"
              name="sortBy"
              onChange={(e) => handleSortChange(e, "sortBy")}
            >
              <FormControlLabel
                value="old-to-new"
                control={<Radio />}
                label="Old to new"
              />
              <FormControlLabel
                value="new-to-old"
                control={<Radio />}
                label="New to old"
              />
              <FormControlLabel
                value="high-to-low"
                control={<Radio />}
                label="High to low"
              />
              <FormControlLabel
                value="low-to-high"
                control={<Radio />}
                label="Low to high"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
