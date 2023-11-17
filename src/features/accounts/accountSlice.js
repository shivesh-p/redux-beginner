const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(
  state = initialStateAccount,
  { type, payload }
) {
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
export function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}
export function withdraw(amount) {
  return {
    type: "account/deposit",
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
