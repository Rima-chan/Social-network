import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type User = {
  id: string;
  pseudo: string;
  avatar: string;
};

export const EMPTY_USER: User = {
  id: "",
  pseudo: "",
  avatar: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: EMPTY_USER,
  reducers: {
    rSetUser: (_, action: PayloadAction<User>) => action.payload,
  },
});

export const { rSetUser } = userSlice.actions;

export default userSlice.reducer;
