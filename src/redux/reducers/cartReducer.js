const initialState = {
  products: {
    cart: localStorage.getItem("products-cart")
      ? JSON.parse(localStorage.getItem("products-cart"))
      : [],
    totalPrice: 0,
  },
  services: {
    cart: localStorage.getItem("services-cart")
      ? JSON.parse(localStorage.getItem("services-cart"))
      : [],
    totalPrice: 0,
  },
};

function cartReducer(state = initialState, action) {
  let newItem, existingItem, updatedCart, totalPrice;

  switch (action.type) {
    case "ADD_TO_CART":
      console.log("ADD TO CART");
console.log(state, 'State 61616161');
      console.log(action.payload, "action patload");
      newItem = action.payload;
      existingItem = state[action.payload.cartType]?.cart?.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        updatedCart = state[action.payload.cartType].cart.map((item) =>
          item.id === newItem.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                ...newItem,
              }
            : item
        );
      } else {
        updatedCart = [
          ...state[action.payload.cartType].cart,
          { ...newItem, quantity: 1 },
        ];
      }

      return {
        ...state,
        [action.payload.cartType]: {
          ...state[action.payload.cartType],
          cart: updatedCart,
        },
      };

    case "UPDATE_CART":
      console.log("UPDATE CART");
      newItem = action.payload;
      updatedCart = state[action.payload.cartType].cart.map((item) =>
        item.id === newItem.id ? { ...item, ...newItem } : item
      );

      return {
        ...state,
        [action.payload.cartType]: {
          ...state[action.payload.cartType],
          cart: updatedCart,
        },
      };

    case "REMOVE_FROM_CART":
      updatedCart = state[action.payload.cartType].cart.filter(
        (item) => item.id !== action.payload.itemId
      );

      return {
        ...state,
        [action.payload.cartType]: {
          ...state[action.payload.cartType],
          cart: updatedCart,
        },
      };

    case "INCREMENT_QUANTITY":
    case "DECREMENT_QUANTITY":
      console.log(action, "action here");
      console.log(state, "action here");
      updatedCart = state[action.payload.cartType].cart.map((item) =>
        item.id === action.payload.itemId
          ? {
              ...item,
              quantity:
                item.quantity + (action.type === "INCREMENT_QUANTITY" ? 1 : -1),
            }
          : item
      );

      return {
        ...state,
        [action.payload.cartType]: {
          ...state[action.payload.cartType],
          cart: updatedCart,
        },
      };

    case "UPDATE_TOTAL_PRICE":
      totalPrice = state[action.payload.cartType].cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return {
        ...state,
        [action.payload.cartType]: {
          ...state[action.payload.cartType],
          totalPrice,
        },
      };

    case "CLEAR_CART":
      console.log(action.payload, "clear cart action payload");
      return {
        ...state,
        [action.payload.cartType]: {
          cart: [],
          totalPrice: 0,
        },
      };

    default:
      return state;
  }
}

export default cartReducer;
