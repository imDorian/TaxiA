import { create } from 'zustand'

const useRevenueStore = create((set) => ({

    earnings: {
        amount: "",
        card: "",
        cash: ""
    },
    fuel: {
        type: "Gasolina",
        total: "",
        price: "",
        liters: "",
        date: ""
    },
    error: {
        errors: "",
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

    handleChange: (key, key2, value) => {
        const regex = /^\d*\.?\d{0,2}$/;
        if (regex.test(value) || value === "") {
            set(prev => ({ ...prev, [key]: { ...prev[key], [key2]: value } }));
        }
    },
    handleFuelType: (type) => {
        set(prev => ({ ...prev, fuel: { ...prev.fuel, type: type } }));
    }
}))

export default useRevenueStore;