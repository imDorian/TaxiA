import { create } from 'zustand'
// eslint-disable-next-line import/no-unresolved
import { URL } from '@env';


const useRevenueStore = create((set, state) => ({

    earnings: {
        amount: "",
        card: "",
        cash: ""
    },
    fuel: {
        type: "Gasolina",
        price: "",
        liters: "",
        date: new Date(),
        amount: ""
    },
    mistakes: {
        mistakes: "",
        amount: ""
    },
    apps: {
        uber: {},
        cabify: {},
        bolt: {},
        freeNow: {},
    },
    income: [],
    fuelExpenses: [],
    date: new Date(2025, 4, 16),
    description: "",
    total: "",
    totalFuel: "",
    totalApps: "",
    loadingBilling: false,
    autoCalculate: false,
    handleAutoCalculate: () => useRevenueStore.setState(prev => ({ ...prev, autoCalculate: !prev.autoCalculate }))
    ,

    handleChange: (key, key2, value) => {
        const regex = /^\d*\.?\d{0,2}$/;
        if (regex.test(value) || value === "") {
            set(prev => ({ ...prev, [key]: { ...prev[key], [key2]: value } }));
        }
    },
    createBilling: async () => {
        if (useRevenueStore.getState().earnings.amount === "") {
            console.log("No se puede crear una factura sin ingresos");
            return;
        } else {
            set(prev => ({ ...prev, loadingBilling: true }));
            const newBilling = {
                earnings: useRevenueStore.getState().earnings,
                fuel: useRevenueStore.getState().fuel,
                mistakes: useRevenueStore.getState().mistakes,
                apps: useRevenueStore.getState().apps,
                description: useRevenueStore.getState().description,
                date: useRevenueStore.getState().date,
            }

            const uri = URL + "/billing/create-billing";

            const response = await window.fetch(uri, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newBilling)
            })
            const data = await response.json();
            set(prev => ({ ...prev, loadingBilling: false, income: [data, ...prev.income] }));
        }
    },
    handleFuelType: (type) => {
        set(prev => ({ ...prev, fuel: { ...prev.fuel, type } }));
    },
    getIncomes: async () => {
        const uri = URL + "/billing/get-billing";
        const response = await window.fetch(uri);
        const data = await response.json();
        set(prev => ({ ...prev, income: data }));
    },



}))

export default useRevenueStore;