import { combineReducers, createStore } from "redux";
import accountReducer, {
  deposit,
  withdraw,
} from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
