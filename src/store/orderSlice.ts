import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderState, Product } from "../models/model";
import axios from "axios";
import { createDish } from "./orderService";

axios.defaults.baseURL =
  "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/ ";

const initialState: OrderState = {
  list: [],
  status: "idle",
};

export const addDishAsync = createAsyncThunk(
  "order/addDishAsync",
  async (data: Product, thunkAPI) => {
    try {
      const response = createDish(data);
      if (response) return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const orderSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addDishAsync.pending, (state) => {
      state.status = "pendingAddItem";
    });
    builder.addCase(addDishAsync.fulfilled, (state, action) => {
      state.list = action.payload;
      state.status = "idle";
    });
    builder.addCase(addDishAsync.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export default orderSlice.reducer;
