import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

export const registerNewUser = createAsyncThunk(
  "authState/registerNewUser",
  async function (registerUser: any, { rejectWithValue, dispatch }) {
    console.log(registerUser);
    try {
      const req = await fetch("../api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(registerUser),
      });
      const data = await req.json();

      if (req.status === 400) {
        console.log(req);
        throw new Error("Такой пользователь уже существует");
      }
      if (req.status === 422) {
        console.log(req);
        throw new Error("Длинна логина/пароля должна быть более 6 символов");
      }
      dispatch(authActions.resetRegisteredUser());
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export enum registerUserStatus {
  Ready = "ready",
  Loading = "loading",
  Resolve = "resolve",
  Error = "error",
}

export enum loginUserStatus {
  Ready = "ready",
  Loading = "loading",
  Resolve = "resolve",
  Error = "error",
}

export interface IAuthSlice {
  authState: {
    registeredUser: {
      name: string;
      email: string;
      password: string;
    };
    registerUserStatus: registerUserStatus;
    registerUserErrorMessage: string | unknown;
    loginUserstatus: loginUserStatus;
    loginUserErrorMessage: string;
  };
}

interface IAuthState {
  registeredUser: {
    name: string;
    email: string;
    password: string;
  };
  registerUserStatus: registerUserStatus;
  registerUserErrorMessage: string | unknown;
  loginUserstatus: loginUserStatus;
  loginUserErrorMessage: string;
}

export const initAuthState: IAuthState = {
  registeredUser: {
    name: "",
    password: "",
    email: "",
  },
  registerUserStatus: registerUserStatus.Ready,
  registerUserErrorMessage: "",
  loginUserstatus: loginUserStatus.Ready,
  loginUserErrorMessage: "",
};

export const authSlice = createSlice({
  name: "authState",
  initialState: initAuthState,
  reducers: {
    setRegisterUserStatusToReady(state) {
      state.registerUserStatus = registerUserStatus.Ready;
    },
    setRegisteredName(state, action) {
      state.registeredUser.name = action.payload;
    },
    setRegisteredEmail(state, action) {
      state.registeredUser.email = action.payload;
    },
    setRegisteredPassword(state, action) {
      state.registeredUser.password = action.payload;
    },
    resetRegisteredUser(state) {
      state.registeredUser.name = "";
      state.registeredUser.email = "";
      state.registeredUser.password = "";
    },
    setLoginUserErrorMessage(state, action) {
      state.loginUserErrorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerNewUser.pending, (state) => {
      state.registerUserStatus = registerUserStatus.Loading;
    });
    builder.addCase(registerNewUser.fulfilled, (state) => {
      state.registerUserStatus = registerUserStatus.Resolve;
    });
    builder.addCase(registerNewUser.rejected, (state, action) => {
      console.log(action.payload);
      state.registerUserErrorMessage = action.payload;
      state.registerUserStatus = registerUserStatus.Error;
    });
  },
});

export const authActions = authSlice.actions;
