// rootReducer.js
import { combineReducers } from "redux";
import listItemsReducer from "./listItemsReducer";
import cartReducer from "./cartReducer";
import filtersReducer from "./filterReducer";

const rootReducer = combineReducers({
  listItems: listItemsReducer,
  cart: cartReducer,
  filters: filtersReducer,
});

export default rootReducer;
