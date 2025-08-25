import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  value: any;
}
const initialState: IInitialState = {
  value: null,
};

export const userUpdateSlice = createSlice({
  name: "userUpdateSlice",
  reducers: {
    setUpdatingUser: (state: any, actions: PayloadAction<any>) => {
      state.value = actions.payload;
    },
  },
  initialState,
});

export const { setUpdatingUser } = userUpdateSlice.actions;
export default userUpdateSlice.reducer;
