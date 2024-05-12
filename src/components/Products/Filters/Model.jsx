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

export default function Model() {
  const [models, setModels] = useState([]);
  const products = useSelector((state) => state.listItems.listItems);
  const selectedModels = useSelector((state) => state.filters.filters.models);
  const selectedBrands = useSelector((state) => state.filters.filters.brands);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (products?.length) {
  //     const modelSet = new Set();
  //     // Sadece seçili markalara ait ürünleri filtrele
  //     products.forEach((product) => {
  //       if (
  //         product?.model &&
  //         (!selectedBrands.length || selectedBrands.includes(product.brand))
  //       ) {
  //         modelSet.add(product.model);
  //       }
  //     });
  //     const uniqueModels = Array.from(modelSet);
  //     setModels(uniqueModels);
  //   }
  // }, [products, selectedBrands]); // selectedBrands bağımlılık listesine eklendi

  useEffect(() => {
    if (products?.length) {
      const modelSet = new Set();
      products.forEach((product) => {
        if (
          product?.model &&
          (!selectedBrands.length || selectedBrands.includes(product.brand))
        ) {
          modelSet.add(product.model);
        }
      });
      const uniqueModels = Array.from(modelSet);
      setModels(uniqueModels);

      // Temizleme işlemi: Seçili modellerden artık geçerli olmayanları kaldır
      const validSelectedModels = selectedModels.filter((model) =>
        uniqueModels.includes(model)
      );
      if (validSelectedModels.length !== selectedModels.length) {
        dispatch(setFilter("models", validSelectedModels));
      }
    }
  }, [products, selectedBrands, selectedModels, dispatch]);

  const handleModelChange = (model) => {
    const newSelectedModels = selectedModels?.includes(model)
      ? selectedModels.filter((b) => b !== model)
      : [...selectedModels, model];
    dispatch(setFilter("models", newSelectedModels));
  };

  return (
    <Box sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
      <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
        Model
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
            {models?.map((model) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedModels?.includes(model)}
                      onChange={() => handleModelChange(model)}
                    />
                  }
                  label={model}
                />
              );
            })}
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
}
