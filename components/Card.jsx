import { View } from "react-native";

export default function Card({ children, className }) {
  return (
    <View
      className={`flex-1 justify-center items-start p-5 max-w-full bg-[#1c1c1f] rounded-3xl gap-2 border-[0.5px] border-neutral-700 ${className}`}
    >
      {children}
    </View>
  );
}
