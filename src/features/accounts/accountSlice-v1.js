const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(
  state = initialStateAccount,
  { type, payload }
) {
  switch (type) {
    case "account/deposit":
      return { ...state, balance: state.balance + payload, isLoading: false };

    case "account/withdraw":
      return { ...state, balance: state.balance - payload };
    case "account/convertingCurrency":
      return { ...state, isLoading: true };
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
export function deposit(amount, currency) {
  if (currency === "USD") {
    return {
      type: "account/deposit",
      payload: amount,
    };
  }
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    //API Call
    const host = "api.frankfurter.app";
    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convertedData = data.rates.USD;
    //return Action
    dispatch({
      type: "account/deposit",
      payload: convertedData,
    });
  };
}
export function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}
export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      purpose,
    },
  };
}
export function payLoan() {
  return {
    type: "account/payLoan",
  };
}
