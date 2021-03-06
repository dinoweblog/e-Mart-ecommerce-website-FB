import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { addressReducer } from "./Address/reducer";
import { cartProductsReducer } from "./Cart/reducer";
import { loginReducer } from "./Login/reducer";

import { productsReducer } from "./Products/reducer";
import { searchProductsReducer } from "./Search/reducer";
import { wishlistProductsReducer } from "./Wishlist/reducer";
import { orderProductsReducer } from "./YourOrder/reducer";

export const rootReducer = combineReducers({
  products: productsReducer,
  cart_products: cartProductsReducer,
  login: loginReducer,
  address: addressReducer,
  orderProducts: orderProductsReducer,
  wishlistProducts: wishlistProductsReducer,
  searchProducts: searchProductsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
