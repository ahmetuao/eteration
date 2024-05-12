import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk"; // Redux thunk import düzeltildi
import rootReducer from "../reducers/rootReducer";

// Başlangıç state'ini yüklerken "products-cart" ve "services-cart" için ayrı ayrı kontrol et
const initialState = {
  listItems: localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [],

    cart: {
      cartProducts: {
        cart: localStorage.getItem("products-cart")
          ? JSON.parse(localStorage.getItem("products-cart"))
          : [],
        totalPrice: 0,
      },
      cartServices: {
        cart: localStorage.getItem("services-cart")
          ? JSON.parse(localStorage.getItem("services-cart"))
          : [],
        totalPrice: 0,
      },
    },
};

export const store = createStore(
  rootReducer,
  initialState, // Başlangıç state'i olarak yukarıda tanımlanan initialState kullanılır
  applyMiddleware(thunk)
);

// Her state güncellemesinde, "products-cart" ve "services-cart" için localStorage'ı güncelle
store.subscribe(() => {
    const { cartProducts, cartServices } = store.getState().cart;
  const { listItems } = store.getState();
    localStorage.setItem("products-cart", JSON.stringify(cartProducts.cart));
    localStorage.setItem("services-cart", JSON.stringify(cartServices.cart));
  localStorage.setItem("products", JSON.stringify(listItems));
});
