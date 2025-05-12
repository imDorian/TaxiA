import { CartesianChart, Bar } from "victory-native";
import { View } from "react-native";

export default function Chart() {
    const days = ["L", "M", "X", "J", "V", "S", "D"];
    const ganancias = [300, 200, 100, 400, 500, 600, 700];

    const data = [
        { Dias: "", Ganancias: 0 }, // Espacio antes
        ...days.map((day, index) => ({
            Dias: day,
            Ganancias: ganancias[index],
        })),
        { Dias: "", Ganancias: 0 }, // Espacio después
    ];

    return (
        <View
            style={{
                height: 220,
                backgroundColor: "#1a1a1c",
                borderRadius: 16,
                padding: 10,
            }}
        >
            <CartesianChart
                data={data}
                xKey="Dias"
                yKeys={["Ganancias"]}

            >
                {({ points, chartBounds }) => (
                    <Bar
                        points={points.Ganancias}
                        chartBounds={chartBounds}
                        color="white"
                        roundedCorners={{ topLeft: 6, topRight: 6 }}
                        innerPadding={0.2}
                        barWidth={20}
                        opacity={0.8}
                        strokeWidth={3}
                    />
                )}
            </CartesianChart>
        </View>
    );
}
