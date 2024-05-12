import { Box, Grid, Pagination, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

export default function ProductCards() {
  const products = useSelector((state) => state.listItems.listItems);

  const [page, setPage] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const filters = useSelector((state) => state.filters.filters);
  const sort = useSelector((state) => state.filters.sort);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  console.log(products, "products61");
  console.log(sort, "sort");

  // useEffect(() => {
  //   console.log(filters, "filters in products");
  //   const filteredProductsTemp = products?.filter((product) => {
  //     if (!filters?.brands?.length && !filters?.models.length) {
  //       return products;
  //     } else {
  //       return (
  //         filters?.brands?.includes(product.brand) +
  //         filters?.models?.includes(product?.model)
  //       );
  //     }
  //   });
  //   setFilteredProducts(filteredProductsTemp);
  //   console.log(filteredProductsTemp, "filtered products");
  // }, [filters]);
  useEffect(() => {
    console.log(filters, "filters in products");
    let filteredProductsTemp = products?.filter((product) => {
      // Eğer marka veya model seçili değilse, tüm ürünleri döndür
      if (
        !filters?.brands?.length &&
        !filters?.models?.length &&
        !filters.search
      ) {
        return true;
      }

      // Marka filtresi kontrolü
      const brandMatches = filters.brands.length
        ? filters.brands.includes(product.brand)
        : true;

      // Model filtresi kontrolü
      const modelMatches = filters.models.length
        ? filters.models.includes(product.model)
        : true;

      const searchMatches = filters.search
        ? product?.name
            ?.toLocaleLowerCase()
            .includes(filters.search?.toLocaleLowerCase())
        : true;

      // Hem marka hem de modelin eşleşmesi gerekiyor
      return brandMatches && modelMatches && searchMatches;
    });

    // Sıralama
    if (sort.field && sort.order) {
      console.log(sort.order, "sort order");
      filteredProductsTemp = filteredProductsTemp.sort((a, b) => {
        if (sort.order === "low-to-high" || sort.order === "high-to-low") {
          console.log("buyrası111");
          return sort.order === "low-to-high"
            ? a.price - b.price
            : b.price - a.price;
        }
        if (sort.order === "new-to-old" || sort.order === "old-to-new") {
          console.log("buyrası");
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);

          console.log(dateA, "AAA");
          return sort.order === "new-to-old" ? dateB - dateA : dateA - dateB;
        }
        return 0;
      });
    }

    setFilteredProducts(filteredProductsTemp);
    console.log(filteredProductsTemp, "filtered products");
  }, [products, filters, sort]);

  useEffect(() => {
    setPage(0);
  }, [filters]);

  return (
    <Grid item xs={12} md={9}>
      {filters?.brands?.length || filters?.models?.length || filters?.search ? (
        <Box sx={{ marginBottom: "2rem" }}>
          <Typography
            sx={{
              borderBottom: "1px solid #cfcfcf",
              width: "fit-content",
              paddingBottom: ".25rem",
              marginBottom: ".5rem",
            }}
          >
            Selected Filter
            {filters?.brands?.length > 1 ||
            filters?.models?.length > 1 ||
            (filters?.models?.length && filters?.brands?.length)
              ? "s"
              : ""}{" "}
          </Typography>
          {filters?.brands?.length ? (
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ marginRight: ".5rem" }}>
                <strong>Brands:</strong>
              </Typography>
              {filters?.brands?.map((brand, idx) => {
                return (
                  <Typography
                    sx={{
                      marginRight:
                        filters?.brands?.length !== idx + 1 ? ".25rem  " : " 0",
                    }}
                  >
                    {brand}
                    {filters?.brands?.length !== idx + 1 ? "," : " "}
                  </Typography>
                );
              })}
            </Box>
          ) : null}
          {filters?.models?.length ? (
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ marginRight: ".5rem" }}>
                <strong>Models:</strong>
              </Typography>
              {filters?.models?.map((model, idx) => {
                return (
                  <Typography
                    sx={{
                      marginRight:
                        filters?.models?.length !== idx + 1 ? ".25rem  " : " 0",
                    }}
                  >
                    {model}
                    {filters?.models?.length !== idx + 1 ? "," : " "}
                  </Typography>
                );
              })}
            </Box>
          ) : null}
        </Box>
      ) : null}

      <Grid container spacing={3}>
        {filteredProducts?.length ? (
          filteredProducts
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product) => {
              return <ProductCard product={product} />;
            })
        ) : (
          <Box
            sx={{ justifyContent: "center", width: "100%", marginTop: "3rem" }}
          >
            <Typography
              sx={{ justifyContent: "center", textAlign: "center" }}
              variant="h5"
            >
              No Products Found!
            </Typography>
          </Box>
        )}
      </Grid>
      {filteredProducts?.length ? (
        <Pagination
          count={Math.ceil(filteredProducts?.length / rowsPerPage)}
          page={page + 1} // MUI'nin Pagination bileşeni 1 tabanlıdır, bu nedenle +1 eklenir.
          onChange={(event, newPage) => handleChangePage(event, newPage - 1)} // Sayfa değişikliğini işleyin, -1 eklemeyi unutmayın!
          variant="outlined"
          shape="rounded"
          sx={{ mt: 10, display: "flex", justifyContent: "center" }} // Üstten biraz boşluk eklemek için
        />
      ) : null}
    </Grid>
  );
}
