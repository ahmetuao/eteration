import { Box, Grid } from "@mui/material";
import Sort from "./Sort";
import Model from "./Model";
import Brands from "./Brands";

export default function Filters() {
  return (
    <Grid item xs={12} md={3}>
      <Box sx={{ position: "sticky", top: "30px", left: "0" }}>
        <Sort />
        <Brands />
        <Model />
      </Box>
    </Grid>
  );
}
