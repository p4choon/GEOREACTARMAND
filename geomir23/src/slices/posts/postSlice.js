import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  post: { 
    body: "",
    file: { filepath: "" },
    author: { name: "" },
    latitude: 0,
    longitude: 0,
    visibility:0,
  },
  likes_count: 0,
  liked: true,
  page: 1,
  pages: [],
  isLoading: false,
  error: "",
  info: "",
  filter: { body: "", author: ""}
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoadingPosts: (state) => {
      state.isLoading = true;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    },
    setPost: (state, action) => {
      state.post = action.payload;
      state.likes_count = state.post.likes_count;
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
    setLikes: (state, action) => {
      state.likes_count = action.payload;
    },
    setLiked: (state, action) => {
      state.liked = action.payload;
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
  startLoadingPosts,
  setPosts,
  setPost,
  setInfo,
  setError,
  setLiked,
  setLikes,
  setPage,
  setPages,
  setFilter
} = postSlice.actions;
export default postSlice.reducer;
