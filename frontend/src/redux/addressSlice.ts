import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { AddressData } from "@/types/address";

interface AddressState {
  addresses: AddressData[];
  selectedAddress: AddressData | null;
  isLoading: boolean;
  error: string | null;
  showAddressSelector: boolean;
  formFilled: boolean; // Nuevo estado para indicar que el formulario ha sido rellenado
}

const initialState: AddressState = {
  addresses: [],
  selectedAddress: null,
  isLoading: false,
  error: null,
  showAddressSelector: false,
  formFilled: false,
};

// Thunk para obtener las direcciones desde la API
export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/addresses");
      if (!response.ok) {
        throw new Error("Error al obtener las direcciones");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    selectAddress: (state, action: PayloadAction<AddressData>) => {
      state.selectedAddress = action.payload;
      state.showAddressSelector = false;
      state.formFilled = true; // Indicar que el formulario debe ser rellenado
    },
    toggleAddressSelector: (state) => {
      state.showAddressSelector = !state.showAddressSelector;
    },
    closeAddressSelector: (state) => {
      state.showAddressSelector = false;
    },
    resetFormFilled: (state) => {
      state.formFilled = false; // Resetear el indicador después de que el formulario ha sido rellenado
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchAddresses.fulfilled,
        (state, action: PayloadAction<AddressData[]>) => {
          state.isLoading = false;
          state.addresses = action.payload;
        }
      )
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  selectAddress,
  toggleAddressSelector,
  closeAddressSelector,
  resetFormFilled,
} = addressSlice.actions;
export default addressSlice.reducer;
