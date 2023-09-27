import { configureStore } from '@reduxjs/toolkit';
import reducers from './slice';

const store = configureStore({
    reducer: reducers,
    devTools: true,
});

const { dispatch } = store;
export { store, dispatch };
