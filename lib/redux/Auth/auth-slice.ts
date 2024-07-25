import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isAuth: boolean;
  id: string;
  email: string;
  refreshToken: string;
  accessToken: string;
};


const initialAuthState: AuthState = {
  isAuth: false,
  id: "",
  email: "",
  refreshToken: "",
  accessToken: ""
};


export const auth = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logOut: () => initialAuthState,
    logIn: (state, action: PayloadAction<AuthState>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.isAuth = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { logIn, logOut } = auth.actions;

const rootReducer = {
  auth: auth.reducer
};

export default rootReducer;
