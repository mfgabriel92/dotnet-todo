import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import todoSlice from "./features/todos/todosSlice";

const makeStore = configureStore({
  reducer: {
    [todoSlice.reducerPath]: todoSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todoSlice.middleware)
});

type RootState = ReturnType<typeof makeStore.getState>;
type AppDispatch = typeof makeStore.dispatch;

export { makeStore };
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>(); 