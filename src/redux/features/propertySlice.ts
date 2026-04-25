import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';
import { Property } from '@/types/property';

interface PropertyState {
  properties: Property[];
  property: Property | {};
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
  property: {},
  loading: false,
  error: null,
};

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/properties');
      return response.data.properties;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const propertySlice = createSlice({
   name: 'properties',
   initialState,
   reducers: {
      single_property: (state, action: PayloadAction<number>) => {
         state.property = state.properties.find((p) => Number(p.id) === Number(action.payload)) || {};
      },
   },
   extraReducers: (builder) => {
      builder
        .addCase(fetchProperties.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProperties.fulfilled, (state, action) => {
          state.loading = false;
          state.properties = action.payload;
        })
        .addCase(fetchProperties.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
   },
});

export const { single_property } = propertySlice.actions;

// Selectors
export const selectProperties = (state: { properties: PropertyState }) => state?.properties?.properties;
export const selectProperty = (state: { properties: PropertyState }) => state?.properties?.property;

export default propertySlice.reducer;