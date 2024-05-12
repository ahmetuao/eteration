import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import noImage from "../../../assets/images/no-image.webp";
import { useEffect, useState } from "react";
import CartCounts from "../../Cart/CartCounts";
import dayjs from "dayjs";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const [isValidImage, setIsValidImage] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = product.image;
    image.onload = () => setIsValidImage(true);
    image.onerror = () => setIsValidImage(false);
  }, [product?.image]);

  const navigate = useNavigate();
  return (
    <Grid key={product?.id} item xs={12} md={6} lg={4} xl={3}>
      <Card
        sx={{
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          sx={{
            height: 240,
            position: "relative",
            backgroundSize: "contain !important;",
            overflow: "hidden",
            ...(isValidImage
              ? {
                  "&:after": {
                    content: "''",
                    position: "absolute",
                    backgroundImage: `url(${product.image})`,
                    width: "90%",
                    height: "200px",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    marginLeft: "5%",
                    marginTop: "20px",
                  },
                  "&:before": {
                    content: "''",
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
                }
              : {
                  "&:after": {
                    content: "''",
                    position: "absolute",
                    backgroundImage: `url(${noImage})`,
                    width: "100%",
                    height: "100%",
                    backgroundSize: "contain",
                    backgroundPositionX: "center",
                    backgroundPositionY: "top",
                  },
                }),
          }}
          title="img"
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div">
            <strong> Product Name:</strong> {product?.name}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            <strong>Product Brand:</strong> {product?.brand}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            <strong>Product Model:</strong> {product?.model}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            <strong>Created At:</strong>{" "}
            {dayjs(product?.createdAt).format("YYYY-MM-DD HH:mm")}
          </Typography>

          <Typography
            sx={{
              marginTop: "1rem",
              display: "-webkit-box" /* or inline-block */,
              textOverflow: "ellipsis",
              wordWrap: "break-word",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              maxHeight: "3.6em",
              lineHeight: "1.8em",
            }}
            variant="body2"
            color="text.secondary"
          >
            {product?.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ marginTop: "auto" }}>
          <Button size="small">$ {product?.price}</Button>
        </CardActions>
        <CardActions
          onClick={() =>
            navigate(`/products/${product?.id}/details`, {
              state: {
                product: product,
              },
            })
          }
        >
          <Typography
            sx={{ cursor: "pointer", margin: "auto" }}
            color="primary"
            variant="body1"
          >
            See details
          </Typography>
        </CardActions>
        <CardActions sx={{ marginTop: "auto", justifyContent: "center" }}>
          <CartCounts item={product} itemId={product?.id} />
        </CardActions>
      </Card>
    </Grid>
  );
}
