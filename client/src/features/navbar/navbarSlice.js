import { createSlice } from "@reduxjs/toolkit";
import { fetchAllItem_navbar } from "./navbarAPI";
const initialState = {
  searchText: "",
  cartCount: 0,
  filteredItems: [],
  isSubmit: false,
  allItems: {
    loading: false,
    data: [],
    error: "",
  },
  navbarUiFlags: {
    showDropdown: false,
    showMobileMenu: false,
    showMobileCategories: false,
    searchVisible: false,
  },
};
const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    setFillteredItems: (state, action) => {
      state.filteredItems = action.payload;
    },
    setIsSubmit: (state, action) => {
      state.isSubmit = action.payload;
    },
    setUiFlags: (state, action) => {
      if (action.payload.name === "showDropdown") {
        state.navbarUiFlags.showDropdown = action.payload.value;
      } else if (action.payload.name === "showMobileMenu") {
        state.navbarUiFlags.showMobileMenu = action.payload.value;
      } else if (action.payload.name === "showMobileCategories") {
        state.navbarUiFlags.showMobileCategories = action.payload.value;
      } else if (action.payload.name === "searchVisible") {
        state.navbarUiFlags.searchVisible = action.payload.value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllItem_navbar.pending, (state) => {
        state.allItems.loading = true;
      })
      .addCase(fetchAllItem_navbar.fulfilled, (state, action) => {
        state.allItems.loading = false;
        state.allItems.data = action.payload;
      })
      .addCase(fetchAllItem_navbar.rejected, (state, action) => {
        state.allItems.loading = false;
        state.allItems.error = action.error.message;
      });
  },
});
export const { setSearchText, setFillteredItems, setIsSubmit, setUiFlags,setCartCount } =
  navbarSlice.actions;
export default navbarSlice.reducer;
