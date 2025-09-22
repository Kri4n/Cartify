import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNo?: string;
  isAdmin: boolean | null;
}

const initialState: UserState = {
  id: null,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  mobileNo: undefined,
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    unsetUser: () => initialState,
  },
});

export const { setUser, unsetUser } = userSlice.actions;
export default userSlice.reducer;
