import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHomeData = createAsyncThunk(`${import.meta.env.VITE_API_URL}/home`, async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/home`, {
    headers: {
      "x-api-key": import.meta.env.VITE_API_KEY,
    },
  });
  const data = await res.json();
  return data;
});

const homeSlice = createSlice({
  name: "home",
  initialState: {
    bestSellers: [],
    justLanded: [],
    dealsOfTheDay: [],
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.bestSellers = action.payload.bestSellers;
        state.justLanded = action.payload.justLanded;
        state.dealsOfTheDay = action.payload.dealsOfTheDay; // ← array now
        state.categories = action.payload.categories;
      })
      .addCase(fetchHomeData.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  },
});

export default homeSlice.reducer;