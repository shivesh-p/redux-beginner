import { combineReducers, createStore } from "redux";
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  createdAt: "",
  nationalId: "",
};

function accountReducer(state = initialStateAccount, { type, payload }) {
  switch (type) {
    case "account/deposit":
      return { ...state, balance: state.balance + payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: payload.amount,
        loanPurpose: payload.purpose,
        balance: payload.amount + state.balance,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

//action creator functions---->they return actions
function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}
function withdraw(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      purpose,
    },
  };
}
function payLoan() {
  return {
    type: "account/payLoan",
  };
}

function customerReducer(state = initialStateCustomer, { type, payload }) {
  switch (type) {
    case "customer/create":
      return {
        ...state,
        fullName: payload.fullName,
        nationalId: payload.nationalId,
        createdAt: payload.createdAt,
      };

    case "customer/updateName":
      return { ...state, fullName: payload };

    default:
      return state;
  }
}

function createCustomer(fullName, nationalId) {
  return {
    action: "customer/create",
    payload: {
      fullName,
      nationalId,
      createdAt: new Date().toISOString(),
    },
  };
}
function updateName(fullName) {
  return {
    action: "customer/updateName",
    payload: fullName,
  };
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

store.dispatch({ type: "account/deposit", payload: 500 });
store.dispatch({ type: "account/deposit", payload: 500 });

store.dispatch({
  type: "account/requestLoan",
  payload: {
    amount: 1000,
    purpose: "Buy car",
  },
});
console.log(store.getState());
