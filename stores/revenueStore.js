import { create } from 'zustand'
// eslint-disable-next-line import/no-unresolved
import { URL } from '@env';


const useRevenueStore = create((set) => ({

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
    date: new Date(),
    description: "",
    total: "",
    totalFuel: "",
    totalApps: "",
    loadingBilling: false,

    handleChange: (key, key2, value) => {
        const regex = /^\d*\.?\d{0,2}$/;
        if (regex.test(value) || value === "") {
            set(prev => ({ ...prev, [key]: { ...prev[key], [key2]: value } }));
        }
    },
    createBilling: async () => {
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
        console.log(uri);
        console.log(newBilling);

        const response = await window.fetch(uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBilling)
        })
        const data = await response.json();
        console.log(data, "response");
        set(prev => ({ ...prev, loadingBilling: false }));
    },
    handleFuelType: (type) => {
        set(prev => ({ ...prev, fuel: { ...prev.fuel, type } }));
    },



}))

export default useRevenueStore;