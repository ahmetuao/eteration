import {
  Box,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import CartCounts from "../../components/Cart/CartCounts";

export default function ProductDetails() {
  const location = useLocation();
  const [loader, setLoader] = useState(true);
  const [productDetails, setProductDetails] = useState();
  const { product } = location.state || {};
  const { productId } = useParams();

  const getProductDetails = async () => {
    setLoader(true);
    try {
      const url = `https://5fc9346b2af77700165ae514.mockapi.io/products/${
        product?.id || productId
      }`;
      const response = await axios.get(url);

      setProductDetails(response.data);
      // State'i güncelle
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <Container maxWidth="lg" sx={{ marginTop: "3rem" }}>
      {loader ? (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "calc(50% - 20px)",
            left: "calc(50% - 20px)",
          }}
        />
      ) : (
        // <QuoteDetilsComp quoteDetails={quoteDetails} loader={loader} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                margin: "auto",
              }}
            >
              <CardMedia
                sx={{
                  width: "100%",
                  height: { xs: "400px", md: "auto" },
                  position: "relative",
                  backgroundSize: "contain !important;",
                  borderRadius: ".5rem",
                  overflow: "hidden",
                  "&:after": {
                    content: "''",
                    position: "absolute",
                    backgroundImage: `url(${product.image})`,
                    width: "90%",
                    height: "90%",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    marginLeft: "5%",
                    marginTop: "20px",
                    borderRadius: "1rem",
                  },
                  "&:before": {
                    content: "''",
                    borderRadius: "1rem",
                    position: "absolute",
                    backgroundImage: `url(${product.image})`,
                    width: "100%",
                    height: "100%",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPositionX: "center",
                    backgroundPositionY: "top",
                    opacity: ".8",
                    filter: "blur(5px)",
                  },
                }}
                title="img"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  borderBottom: "1px solid #afafaf",
                  paddingBottom: ".25rem",
                }}
              >
                <strong>{productDetails?.name}</strong>
              </Typography>
              <Box sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
                <Typography variant="h6">
                  <strong>Brand:</strong> {productDetails?.brand}
                </Typography>
                <Typography variant="h6">
                  <strong>Model:</strong> {productDetails?.model}
                </Typography>
                <Typography variant="h6">
                  <strong>Price:</strong> {productDetails?.price}
                </Typography>
              </Box>

              <Typography variant="body1">
                <strong>Description:</strong>
                {productDetails?.description}
              </Typography>

              <Box sx={{ marginTop: "1rem" }}>
                <CartCounts item={product} itemId={product?.id} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
