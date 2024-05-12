import { Box, Container, Grid } from "@mui/material";
import Filters from "../../components/Products/Filters/Filters";
import ProductCards from "../../components/Products/ProductCards/ProductCards";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchListItems } from "../../redux/actions/actions";
import SearchArea from "../../components/Header/SearchArea";

export default function Products() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListItems());
  }, []);
  return (
    <Container maxWidth="xl" sx={{ marginTop: "3rem", marginBottom: "3rem" }}>
      <Grid container spacing={3}>
        <Box sx={{ display: { xs: "block", md: "none" }, width: "100%" }}>
          <SearchArea />
        </Box>
        <Filters />
        <ProductCards />
      </Grid>
    </Container>
  );
}
