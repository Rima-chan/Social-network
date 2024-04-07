import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./userSlice";
import _ from "lodash";

export type Post = {
  id: string;
  content: string;
  attachment: string | null;
  createdAt: string;
  updatedAt: string;
  user: User;
};

const postSlice = createSlice({
  name: "posts",
  initialState: {} as Record<string, Post>,
  reducers: {
    rSetPosts: (state, action: PayloadAction<Post[]>) => {
      const postsById = _.keyBy(action.payload, ({ id }) => id);
      state = postsById;
      return state;
    },
    rAddPost: (state, action: PayloadAction<Post>) => {
      const { id } = action.payload;
      state = { [id]: action.payload, ...state };
      return state;
    },
    rUpdatePost: (state, action: PayloadAction<Post>) => {
      const { id, ...updatedPost } = action.payload;
      const previousPost = state[id];
      state[id] = { ...previousPost, ...updatedPost };
    },
    rDeletePost: (state, action: PayloadAction<{ id: string }>) => {
      delete state[action.payload.id];
    },
  },
});

export const { rSetPosts, rAddPost, rUpdatePost, rDeletePost } =
  postSlice.actions;

export default postSlice.reducer;
