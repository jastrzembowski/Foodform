import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { orderSlice } from "./orderSlice";
export const store = configureStore({
  reducer: { order: orderSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
