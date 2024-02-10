import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLogin = createAsyncThunk(
    "login/fetchLogin",
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await fetch(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "apikey": "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
            body: JSON.stringify({ email, password }),  
          }
        );
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Server error:", errorData);
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
        }
  
        const data = await response.json();
        console.log("Response data:", data);
        localStorage.setItem("token", data.token);
        return data.data;
      } catch (error) {
        console.error("Error:", error);
        return rejectWithValue(error.message);
      }
    }
  );
  
  

const loginSlice = createSlice({
  //nama state
  name: "login",
  initialState: {
    token:
      typeof window !== "undefined"
        ? localStorage.getItem("token") || null
        : null,
    status: "idle",
    error: null,
  },

  //reducer
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loginSlice.actions.logoutUser, (state) => {
        // reset state saat logout
        state.token = null;
        state.status = "idle";
        state.error = null;
      });
  },
});

export const { logoutUser } = loginSlice.actions;

export default loginSlice.reducer;
