const initialStateCustomer = {
  fullName: "",
  createdAt: "",
  nationalId: "",
};
export default function customerReducer(
  state = initialStateCustomer,
  { type, payload }
) {
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

export function createCustomer(fullName, nationalId) {
  return {
    type: "customer/create",
    payload: {
      fullName,
      nationalId,
      createdAt: new Date().toISOString(),
    },
  };
}
export function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}
