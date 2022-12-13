import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productName: "",
  description: "",
  category: "",
  expireDate: null,
  costPrice: null,
  sellPrice: null,
  discount: null,

  editingIndex: null,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setProductName: (state, action) => {
      state.productName = action.payload.value;
    },

    setDescription: (state, action) => {
      state.description = action.payload.value;
    },

    setCategory: (state, action) => {
      state.category = action.payload.value;
    },

    setExpireDate: (state, action) => {
      state.expireDate = action.payload.value;
    },

    setCostPrice: (state, action) => {
      state.costPrice = Number(action.payload.value);
    },

    setSellPrice: (state, action) => {
      state.sellPrice = Number(action.payload.value);
    },

    setDiscount: (state, action) => {
      state.discount = Number(action.payload.value);
    },

    setEditingIndex: (state, action) => {
      state.editingIndex = action.payload.index;
    },

    setDataToEdit: (state, action) => {
      const {
        productName,
        description,
        discount,
        category,
        expireDate,
        costPrice,
        sellPrice,
      } = action.payload;

      state.productName = productName;
      state.description = description;
      state.category = category;
      state.expireDate = expireDate;
      state.costPrice = costPrice;
      state.sellPrice = sellPrice;
      state.discount = discount;
    },

    clearForm: (state, action) => {
      state.productName = "";
      state.description = "";
      state.category = "";
      state.expireDate = null;
      state.costPrice = null;
      state.sellPrice = null;
      state.discount = null;
    },
  },

  extraReducers: (builder) => {},
});

export const {
  setProductName,
  setDescription,
  setCategory,
  setExpireDate,
  setCostPrice,
  setSellPrice,
  setDiscount,
  setEditingIndex,
  clearForm,
  setDataToEdit,
} = formSlice.actions;

export const formState = (state) => state.form;

export default formSlice.reducer;
