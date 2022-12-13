import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      productName: "First product",
      description:
        "Ipsum Lorem is simply dummy text of the printing and typesetting industry.",
      category: "finTech",
      expireDate: "2022-12-19",
      costPrice: 80,
      sellPrice: 100,
      discount: 10,
    },
    {
      productName: "Secound product",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      category: "edTech",
      expireDate: "2022-12-17",
      costPrice: 100,
      sellPrice: 120,
      discount: 8,
    },
    {
      productName: "Third product",
      description:
        "simply Lorem Ipsum is dummy text of the printing and typesetting industry.",
      category: "itHub",
      expireDate: "2022-12-16",
      costPrice: 120,
      sellPrice: 140,
      discount: 10,
    },
    {
      productName: "Fourth product",
      description:
        "dummy Lorem Ipsum is simply text of the printing and typesetting industry.",
      category: "finTech",
      expireDate: "2022-12-14",
      costPrice: 140,
      sellPrice: 160,
      discount: 10,
    },
    {
      productName: "Fifth product",
      description:
        "Text Lorem Ipsum is simply dummy of the printing and typesetting industry.",
      category: "edTech",
      expireDate: "2022-12-18",
      costPrice: 160,
      sellPrice: 180,
      discount: 12,
    },
    // {
    //   productName: "Sixth product",
    //   description:
    //     "The Ipsum is simply dummy text of the printing and typesetting industry.",
    //   category: "itHub",
    //   expireDate: "2022-12-19",
    //   costPrice: 180,
    //   sellPrice: 200,
    //   discount: 18,
    // },
    // {
    //   productName: "Seventh product",
    //   description:
    //     "Printing Lorem Ipsum is simply dummy text of the and typesetting industry.",
    //   category: "finTech",
    //   expireDate: "2022-12-20",
    //   costPrice: 200,
    //   sellPrice: 220,
    //   discount: 4,
    // },
    // {
    //   productName: "Eighth product",
    //   description:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    //   category: "edTech",
    //   expireDate: "2022-12-21",
    //   costPrice: 120,
    //   sellPrice: 140,
    //   discount: 10,
    // },
    // {
    //   productName: "Nineth product",
    //   description:
    //     "Industry Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    //   category: "itHub",
    //   expireDate: "2022-12-22",
    //   costPrice: 299,
    //   sellPrice: 400,
    //   discount: 10,
    // },
  ],

  productsMap: [],

  currentFilterCategory: "all",
  sortType: null,

  showCheckBox: false,
  deleteProductList: [],

  searchQuery: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProductToList: (state, action) => {
      const {
        productName,
        description,
        discount,
        category,
        expireDate,
        costPrice,
        sellPrice,
      } = action.payload;

      let product = {
        productName,
        description,
        category,
        expireDate,
        costPrice: Number(costPrice),
        sellPrice: Number(sellPrice),
        discount: Number(discount),
      };

      state.products = [...state.products, product];
    },

    addDeleteProductList: (state, action) => {
      const { index } = action.payload;
      state.deleteProductList = [...state.deleteProductList, index];
    },

    removeDeleteProductList: (state, action) => {
      const { index } = action.payload;

      state.deleteProductList = [
        ...state.deleteProductList.filter((productIdx, idx) => idx !== index),
      ];
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload.value;
    },

    setProductsMap: (state, action) => {
      state.productsMap = action.payload.value;
    },

    filterByCategory: (state, action) => {
      const category = action.payload.value;

      state.currentFilterCategory = category;
    },

    setSortType: (state, action) => {
      const sortType = action.payload.value;

      state.sortType = sortType;
    },

    updateProductToList: (state, action) => {
      const {
        productName,
        description,
        discount,
        category,
        expireDate,
        costPrice,
        sellPrice,
        index,
      } = action.payload;

      let data = [...state.products];

      data[index] = {
        productName,
        description,
        category,
        expireDate,
        costPrice: Number(costPrice),
        sellPrice: Number(sellPrice),
        discount: Number(discount),
      };

      state.products = data;
    },

    deleteProducts: (state, action) => {
      state.products = [
        ...state.products.filter(
          (e, idx) => !state.deleteProductList.includes(idx)
        ),
      ];

      state.deleteProductList = [];
    },

    setShowCheckBox: (state, action) => {
      state.showCheckBox = action.payload.value;
    },

    removeProductToList: (state, action) => {
      const { index } = action.payload;
      state.products = [
        ...state.products.filter((product, idx) => idx !== index),
      ];
    },

    clearDeleteProductList: (state, action) => {
      state.deleteProductList = [];
    },

    clearForm: () => {},
  },

  extraReducers: (builder) => {},
});

export const {
  addProductToList,
  removeProductToList,
  updateProductToList,
  setShowCheckBox,
  addDeleteProductList,
  removeDeleteProductList,
  clearDeleteProductList,
  deleteProducts,
  setSearchQuery,
  filterByCategory,
  setSortType,
  setProductsMap,
} = productSlice.actions;

export const productState = (state) => state.product;

export default productSlice.reducer;
