import { create } from "zustand";
// eslint-disable-next-line import/no-unresolved
import { URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useRevenueStore = create((set, state) => ({
  earnings: {
    amount: "",
    card: "",
    cash: "",
  },
  fuel: {
    type: "Gasolina",
    price: "",
    liters: "",
    date: new Date(),
    amount: "",
  },
  mistakes: {
    mistakes: "",
    amount: "",
  },
  apps: {
    uber: {},
    cabify: {},
    bolt: {},
    freeNow: {},
  },
  income: [],
  fuelExpenses: [],
  date: new Date(),
  description: "",
  total: "",
  totalFuel: "",
  totalApps: "",
  loadingBilling: false,
  autoCalculate: true,
  user: "",
  name: "",
  lastName: "",
  number: "",
  email: "",
  chat: [],
  handleAutoCalculate: () =>
    useRevenueStore.setState((prev) => ({
      ...prev,
      autoCalculate: !prev.autoCalculate,
    })),
  handleChange: (key, key2, value) => {
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(value) || value === "") {
      set((prev) => ({ ...prev, [key]: { ...prev[key], [key2]: value } }));
    }
  },
  createBilling: async () => {
    const token = await AsyncStorage.getItem("token");
    if (useRevenueStore.getState().earnings.amount === "") {
      console.log("No se puede crear una factura sin ingresos");
      return;
    } else {
      set((prev) => ({ ...prev, loadingBilling: true }));
      const newBilling = {
        earnings: useRevenueStore.getState().earnings,
        fuel: useRevenueStore.getState().fuel,
        mistakes: useRevenueStore.getState().mistakes,
        apps: useRevenueStore.getState().apps,
        description: useRevenueStore.getState().description,
        date: useRevenueStore.getState().date,
        user: useRevenueStore.getState().user,
      };

      const uri = URL + "/billing/create-billing";

      const response = await window.fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBilling),
      });
      const data = await response.json();
      set((prev) => ({
        ...prev,
        loadingBilling: false,
        income: [data, ...prev.income],
      }));
    }
  },
  handleFuelType: (type) => {
    set((prev) => ({ ...prev, fuel: { ...prev.fuel, type } }));
  },
  getIncomes: async (token) => {
    const uri =
      URL + "/billing/get-billings/" + useRevenueStore.getState().user;
    const response = await window.fetch(uri, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    set((prev) => ({ ...prev, income: data }));
  },
  deleteBilling: async (id) => {
    const token = await AsyncStorage.getItem("token");
    const uri = URL + "/billing/delete-billing/" + id;
    const response = await window.fetch(uri, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      set((prev) => ({
        ...prev,
        income: prev.income.filter((item) => item._id !== id),
      }));
    }
  },
}));

export default useRevenueStore;
