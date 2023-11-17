import { combineReducers, createStore, applyMiddleware } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//this store uses redux to basic level with
//redux dev toolkit and redux thunks

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// store.dispatch(deposit(500));
// store.dispatch(withdraw(200));

export default store;
