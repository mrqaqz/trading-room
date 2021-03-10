import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { products } from "./product.reducer";
import { leads } from "./lead.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  products,
  leads,
});

export default rootReducer;
