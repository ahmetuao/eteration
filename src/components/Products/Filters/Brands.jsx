import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../../redux/actions/filterActions";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const products = useSelector((state) => state.listItems.listItems);
  const selectedBrands = useSelector((state) => state.filters.filters.brands);
  const filters = useSelector((state) => state.filters.filters);

  console.log(filters);
  const dispatch = useDispatch();

  useEffect(() => {
    if (products?.length) {
      const brandSet = new Set();
      products.forEach((product) => {
        if (product?.brand) {
          brandSet.add(product.brand);
        }
      });
      const uniqueBrands = Array.from(brandSet);
      setBrands(uniqueBrands);
      console.log(uniqueBrands, "unique brands");
    }
  }, [products]);

  const handleBrandChange = (brand) => {
    const newSelectedBrands = selectedBrands?.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    dispatch(setFilter("brands", newSelectedBrands));
  };

  return (
    <Box sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
      <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
        Brands
      </Typography>
      <Box sx={{ boxShadow: "0px 0px 10px #efefef", padding: "1rem" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormGroup
            sx={{
              maxHeight: "200px",
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
              overflow: "auto",
            }}
          >
            {brands.map((brand) => (
              <FormControlLabel
                key={brand}
                control={
                  <Checkbox
                    checked={selectedBrands?.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                }
                label={brand}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
}
