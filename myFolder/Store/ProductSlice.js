import {createSlice} from '@reduxjs/toolkit';

const ProductSlice = createSlice({
  name: 'Product',

  initialState: {
    data: [],
  },

  reducers: {
    addProduct(state, action) {
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
      } else {
        state.data[myIndex].quantity = state.data[myIndex].quantity + 1;
      }
    },
    decrementItem(state, action) {
      var myIndex = -1;

      state.data.map((val, index) => {
        if (val._id === action.payload._id) {
          myIndex = index;
        }
      });

      if (myIndex === -1) {
      } else {
        state.data[myIndex].quantity = state.data[myIndex].quantity - 1;
      }
    },
    deleteProduct(state, action) {
      state.data = state.data.filter(item => item._id !== action.payload);
    },
  },
});

export const {addProduct, deleteProduct, decrementItem} = ProductSlice.actions;
export default ProductSlice.reducer;
