import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  places: [],
  place: { 
    name: "",
    description: "",
    file: { filepath: "" },
    author: { name: "" },
    latitude: 0,
    longitude: 0,
    visibility:0,
  },
  favorites_count: 0,
  favorited: true,
  page: 1,
  pages: [],
  isLoading: false,
  error: "",
  info: "",
  filter: { description: "", author: ""}
};

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    startLoadingPlaces: (state) => {
      state.isLoading = true;
    },
    setPlaces: (state, action) => {
      state.places = action.payload;
      state.isLoading = false;
    },
    setPlace: (state, action) => {
      state.place = action.payload;
      state.favorites_count = state.place.favorites_count;
      state.isLoading = false;
    },
    setInfo: (state, action) => {
      state.info = action.payload;
      state.error = "";
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.info = "";
      state.isLoading = false;
    },
    setFavorites: (state, action) => {
      state.favorites_count = action.payload;
    },
    setFavorited: (state, action) => {
      state.favorited = action.payload;
    },
    setPage: (state,action) => {
      state.page = action.payload
    },
    setPages: (state,action) => {
      state.pages = action.payload
    },
    setFilter: (state,action) => {
      state.filter = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  startLoadingPlaces,
  setPlaces,
  setPlace,
  setInfo,
  setError,
  setFavorited,
  setFavorites,
  setPage,
  setPages,
  setFilter
} = placeSlice.actions;
export default placeSlice.reducer;
