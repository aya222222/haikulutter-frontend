import * as api from "../../api";
import {
  applyMiddleware,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  userId: "",
  username: "",
  profileBgImg: null,
  profileIconImg: null,
  bio: "",
  following: [],
  follower: [],
  totalPosts: null,
};

export const getProfile = createAsyncThunk("profile/getProfile", async () => {
  try {
    const { data } = await api.getProfile();
    console.log("profile data " + JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (profileData) => {
    try {
      const { data } = await api.createProfile(profileData);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (dataObj) => {
    try {
      const { data } = await api.updateProfile(
        dataObj.profileId,
        dataObj.profileData
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const followOrUnfollowCreator = createAsyncThunk(
  "profile/followOrUnfollowCreator",
  async (creator) => {
    try {
      const { data } = await api.followOrUnfollowCreator(creator);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logoutProfile = createAsyncThunk(
  "profile/logoutProfile",
  async () => {
    try {
      console.log("logout dispatched ");
    } catch (error) {
      console.log(error);
    }
  }
);

export const logInProfile = createAsyncThunk(
  "profile/logInProfile",
  async () => {
    try {
      console.log("login dispatched ");
    } catch (error) {
      console.log(error);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProfile.pending, (state, action) => {
        console.log("loading");
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        // return  {loggedIn:true, ...action.payload}
        //    state.loggedIn =  true;

        state.userId = action.payload.userId;
        state.username = action.payload.username;
        state.profileBgImg = action.payload.profileBgImg;
        state.profileIconImg = action.payload.profileIconImg;
        state.bio = action.payload.bio;
        state.follower = action.payload.follower;
        state.following = action.payload.following;
        state.totalPosts = action.payload.totalPosts;
        console.log("profile fetched" + action.payload);
      })
      .addCase(getProfile.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(createProfile.pending, (state, action) => {
        console.log("loading");
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        // return  {...state, ...action.payload}
        state.userId = action.payload.userId;
        state.username = action.payload.username;
        state.profileBgImg = action.payload.profileBgImg;
        state.profileIconImg = action.payload.profileIconImg;
        state.bio = action.payload.bio;
        state.follower = action.payload.follower;
        state.following = action.payload.following;
        state.totalPosts = action.payload.totalPosts;
      })
      .addCase(createProfile.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(updateProfile.pending, (state, action) => {
        console.log("loading");
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        // return  {...state, ...action.payload}
        state.username = action.payload.username;
        state.profileBgImg = action.payload.profileBgImg;
        state.profileIconImg = action.payload.profileIconImg;
        state.bio = action.payload.bio;
        state.follower = action.payload.follower;
        state.following = action.payload.following;
        state.totalPosts = action.payload.totalPosts;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(followOrUnfollowCreator.pending, (state, action) => {
        console.log("loading");
      })
      .addCase(followOrUnfollowCreator.fulfilled, (state, action) => {
        state.following = [...action.payload.following];
      })
      .addCase(followOrUnfollowCreator.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(logoutProfile.pending, (state, action) => {
        console.log("loading");
      })
      .addCase(logoutProfile.fulfilled, (state, action) => {
        state.loggedIn = false;
        state.userId = "";
        state.username = "";
        state.profileBgImg = null;
        state.profileIconImg = null;
        state.bio = "";
        state.following = [];
        state.follower = [];
        state.totalPosts = null;
      })
      .addCase(logoutProfile.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(logInProfile.pending, (state, action) => {
        console.log("loading");
      })
      .addCase(logInProfile.fulfilled, (state, action) => {
        state.loggedIn = true;
      })
      .addCase(logInProfile.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});

export default profileSlice.reducer;
