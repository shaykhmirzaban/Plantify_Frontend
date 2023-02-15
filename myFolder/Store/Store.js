import {configureStore} from '@reduxjs/toolkit';
import ProductSlice from './ProductSlice';
import FavouriteSlice from './FavouriteSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    Product: ProductSlice,
    Favourite: FavouriteSlice,
    User: userSlice,
  },
});

export default store;
