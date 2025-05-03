
import { View } from 'react-native'
import { NavBar } from './NavBar'
export default function Screen({ children }) {
    return (
        <View className="flex-1 justify-start items-start p-5  bg-[#0f0f11] gap-3">
            {children}
            <NavBar />
        </View>
    )
}

