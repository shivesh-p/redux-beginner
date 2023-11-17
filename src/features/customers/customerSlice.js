import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  createdAt: "",
  nationalId: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, { type, payload }) {
        state.fullName = payload.fullName;
        state.nationalId = payload.nationalId;
        state.createdAt = payload.createdAt;
      },
    },
    updateName(state, { type, payload }) {
      state.fullName = payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;
