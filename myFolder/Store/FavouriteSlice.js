import {createSlice} from '@reduxjs/toolkit';

const FavouriteSlice = createSlice({
  name: 'Favourite',

  initialState: {
    data: [],
  },

  reducers: {
    addFProduct(state, action) {
      var myIndex = -1;

      if (state.data.length > 0) {
        state.data.map((val, index) => {
          if (val._id === action.payload._id) {
            myIndex = index;
          }
        });
      }

      if (myIndex === -1) {
        state.data.push({
          __v: action.payload.__v,
          _id: action.payload._id,
          category: action.payload.category,
          color_code: action.payload.color_code,
          created_at: action.payload.created_at,
          description: action.payload.description,
          image: action.payload.image,
          name: action.payload.name,
          price: action.payload.price,
          quantity: 1,
          size: action.payload.size,
          title: action.payload.title,
        });
      }
    },
    deleteFProduct(state, action) {
      state.data = state.data.filter(item => item._id !== action.payload);
    },
  },
});

export const {addFProduct, deleteFProduct} = FavouriteSlice.actions;
export default FavouriteSlice.reducer;
