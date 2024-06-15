import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  inventoryFilterCondition: "new",
  MSRPFilterCondition: "new",
  brandFilterCondition: [],
  durationFilterCondition: [],
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    populateData: (state, action) => {
      state.items = action.payload;
    },
    setInventoryFilterCondition: (state, action) => {
      state.inventoryFilterCondition = action.payload;
    },
    setMSRPFilterCondition: (state, action) => {
      state.MSRPFilterCondition = action.payload;
    },
    setBrandFilterCondition: (state, action) => {
      state.brandFilterCondition = action.payload;
    },
    setDurationFilterCondition: (state, action) => {
      state.durationFilterCondition = action.payload;
    },
  },
});

export const {
  populateData,
  setInventoryFilterCondition,
  setMSRPFilterCondition,
  setBrandFilterCondition,
  setDurationFilterCondition,
} = carSlice.actions;

const filterByDuration = (item, durationConditions) => {
  const now = new Date();
  const itemDate = new Date(item.timestamp);
  return durationConditions.some((condition) => {
    switch (condition) {
      case "Last Month":
        const lastMonths = new Date(now);
        lastMonths.setMonth(now.getMonth() - 1);
        return itemDate.getMonth() === lastMonths.getMonth();
      case "This Month":
        return (
          itemDate.getMonth() === now.getMonth() &&
          itemDate.getFullYear() === now.getFullYear()
        );
      case "Last 3 Months":
        if (now.getMonth() - 3 > 1) {
          const threeMonthsAgo = new Date(now);
          threeMonthsAgo.setMonth(now.getMonth() - 3);
          return (
            itemDate.getMonth() >= threeMonthsAgo.getMonth() &&
            itemDate.getMonth() < now.getMonth()
          );
        } else {
          return itemDate.getMonth() <= now.getMonth();
        }
      case "Last 6 Months":
        if (now.getMonth() - 6 > 1) {
          const sixMonthsAgo = new Date(now);
          sixMonthsAgo.setMonth(now.getMonth() - 6);
          return (
            itemDate.getMonth() >= sixMonthsAgo.getMonth() &&
            itemDate.getMonth() < now.getMonth()
          );
        } else {
          return itemDate.getMonth() <= now.getMonth();
        }
      case "This Year":
        return itemDate.getFullYear() === now.getFullYear();
      case "Last Year":
        return itemDate.getFullYear() === now.getFullYear() - 1;
      default:
        return true;
    }
  });
};

export const inventoryFilteredItems = (state) => {
  const {
    items,
    inventoryFilterCondition,
    brandFilterCondition,
    durationFilterCondition,
  } = state.car;
  return items
    .filter((item) => item.condition === inventoryFilterCondition)
    .filter((item) =>
      brandFilterCondition.length === 0
        ? item
        : brandFilterCondition.includes(item.brand)
    )
    .filter((item) =>
      durationFilterCondition.length === 0
        ? item
        : filterByDuration(item, durationFilterCondition)
    );
};

export const MSRPFilteredItems = (state) => {
  const {
    items,
    MSRPFilterCondition,
    brandFilterCondition,
    durationFilterCondition,
  } = state.car;
  return items
    .filter((item) => item.condition === MSRPFilterCondition)
    .filter((item) =>
      brandFilterCondition.length === 0
        ? item
        : brandFilterCondition.includes(item.brand)
    )
    .filter((item) =>
      durationFilterCondition.length === 0
        ? item
        : filterByDuration(item, durationFilterCondition)
    );
};

export default carSlice.reducer;
