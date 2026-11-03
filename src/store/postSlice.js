import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },

    allPost: (state, action) => {
      state.posts = action.payload;
    },

    editPost: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.$id === action.payload.$id) {
          post = action.payload;
        }
        return post;
      });
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.$id !== action.payload.$id,
      );
    },
  },
});

export const { addPost, allPost, editPost, deletePost } =
  postSlice.actions;

export default postSlice.reducer;
