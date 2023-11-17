//this new slice is to be used with the redux toolkit latest method
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, { type, payload }) {
      state.balance = state.balance + payload;
      state.isLoading = false;
    },
    withdraw(state, { type, payload }) {
      state.balance = state.balance - payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, { type, payload }) {
        if (state.loan > 0) return;

        state.loan = payload.amount;
        state.loanPurpose = payload.purpose;
        state.balance += payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});
//redux is advanced enough and smart to figure out that the
//action creator is the function below for deposit and
//thunkis provided be default in redux toolkit
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
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;
