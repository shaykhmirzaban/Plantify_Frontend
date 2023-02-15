import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'User',
  initialState: {
    email: '',
  },
  reducers: {
    addUser(state, action) {
      state.email = action.payload;
    },
  },
});

export const {addUser} = userSlice.actions;
export default userSlice.reducer;
