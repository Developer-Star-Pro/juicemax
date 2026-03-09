import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk("products/fetchAll", async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
    headers: { "x-api-key": import.meta.env.VITE_API_KEY },
  });
  const data = await res.json();
  return data;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    all: [],
    filtered: [],
    categories: [],
    activeCategory: "All",
    loading: false,
    error: null,
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
      state.filtered = action.payload === "All"
        ? state.all
        : state.all.filter(p => p.category === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload.products;
        state.filtered = action.payload.products;
        state.categories = action.payload.categories;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load products";
      });
  },
});

export const { setActiveCategory } = productsSlice.actions;
export default productsSlice.reducer;