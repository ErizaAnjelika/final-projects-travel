import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRegister = createAsyncThunk(
  "register/fetchRegister",
  async (
    {
      name,
      email,
      password,
      passwordRepeat,
      role,
      profilePictureUrl,
      phoneNumber,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            passwordRepeat,
            role,
            profilePictureUrl,
            phoneNumber,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorData.message}`
        );
      }

      const data = await response.json();
      console.log("Response data:", data);
      return data.data;
    } catch (error) {
      console.error("Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    token: null,
    status: "idle",
    error: null,
  },

  reducers: {
    // Reducer untuk menangani reset state pendaftaran jika diperlukan
    resetRegisterState: (state) => {
      state.token = null;
      state.status = "idle";
      state.error = null;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(registerSlice.actions.resetRegisterState, (state) => {
        // Reset state saat pendaftaran direset
        state.token = null;
        state.status = "idle";
        state.error = null;
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;

export default registerSlice.reducer;
