import { AUTH_DO_LOGIN } from "../constant/auth";

const auth = (
  state = {
    credential: undefined
  },
  action
) => {
  switch (action.type) {
    case AUTH_DO_LOGIN:
      return {
        ...state,
        credential: action.payload
      };
    default:
      return state;
  }
};

export default auth;