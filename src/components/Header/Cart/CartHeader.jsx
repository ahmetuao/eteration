import { Box, Typography } from "@mui/material";
import CartCounts from "../../Cart/CartCounts";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useRef, useState } from "react";

export default function CartHeader() {
  const [openCartMenu, setOpenCartMenu] = useState(false);
  let serviceType = "cartProducts";
  const cart = useSelector((state) =>
    serviceType === "cartProducts"
      ? state.cart.cartProducts?.cart
      : state.cart.cartServices?.cart
  );

  const calculateTotalQuantity = () => {
    let cartProductQuantity = 0;

    cart.forEach((cart) => {
      cartProductQuantity += cart?.quantity || 0;
    });

    return cart.length ? Number(cartProductQuantity) : null;
  };

  const calculateTotalPrice = () => {
    let cartProductPrice = 0;

    cart.forEach((cart) => {
      cartProductPrice += cart?.quantity * cart?.price || 0;
    });

    return cart.length ? Number(cartProductPrice) : null;
  };

  const cartRef = useRef();
  // Dış tıklamaları kontrol etmek için bir fonksiyon
  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setOpenCartMenu(false);
    }
  };

  useEffect(() => {
    // Dış tıklamaları dinlemek için olay dinleyicisini ekleyin
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Component unmount edildiğinde olay dinleyicisini kaldırın
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dispatch = useDispatch();
  return (
    <>
      <Box
        ref={cartRef}
        sx={{
          position: "relative",
          marginRight: { xs: "0", md: "2rem" },
          cursor: "pointer",
        }}
      >
        <Box onClick={() => setOpenCartMenu(!openCartMenu)}>
          <ShoppingCartIcon sx={{ fontSize: "32px" }} />
          {calculateTotalQuantity() > 0 ? (
            <Box
              sx={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                zIndex: 99,
                backgroundColor: "#bf0000",
                color: "#ffffff",
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "100%",
              }}
            >
              <Typography variant="body1">
                {calculateTotalQuantity()}
              </Typography>
            </Box>
          ) : null}
        </Box>
        {openCartMenu ? (
          <Box
            sx={{
              position: "absolute",
              top: "50px",
              right: { xs: "calc(50% - 120px)", md: "0" },
              zIndex: 99,
              background: "#ffffff",
              color: "#000000",
              padding: "1rem",
              borderRadius: ".25rem",
              minWidth: "max-content",
              boxShadow: "0px 0px 3px #909090",
            }}
          >
            {calculateTotalQuantity() > 0 ? (
              <>
                {cart?.map((item, idx) => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        marginBottom: "1rem",
                        paddingBottom: cart?.length !== idx + 1 ? "1rem" : "0",
                        borderBottom:
                          cart?.length !== idx + 1
                            ? "1px solid #efefef"
                            : "unset",
                      }}
                    >
                      <img
                        style={{ borderRadius: "100%", marginRight: ".5rem" }}
                        src={item.image}
                        width={50}
                        height={50}
                      />
                      <Box>
                        <Box sx={{ marginBottom: ".5rem" }}>
                          <Typography>{item.name}</Typography>
                          <Typography>$ {item.price}</Typography>
                        </Box>

                        <CartCounts item={item} itemId={item.id} />
                      </Box>
                    </Box>
                  );
                })}
                <Typography variant="h6">
                  <strong>Total Price:</strong> ${calculateTotalPrice()}
                </Typography>
              </>
            ) : (
              <Typography>Basket Empty!</Typography>
            )}
          </Box>
        ) : null}
      </Box>
    </>
  );
}
