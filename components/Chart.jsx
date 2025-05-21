import { CartesianChart, Bar } from "victory-native";
import { View } from "react-native";
import { useFont } from "@shopify/react-native-skia";
import Roboto from "../assets/fonts/Roboto/Roboto.ttf";
import useRevenueStore from "../stores/revenueStore";

const days = ["L", "M", "X", "J", "V", "S", "D"];

const getStartOfWeek = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = domingo, 1 = lunes...
  const diff = (day === 0 ? -6 : 1) - day;
  const monday = new Date(now.setDate(now.getDate() + diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
};

const getWeekDates = () => {
  const start = getStartOfWeek();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d.toISOString().split("T")[0];
  });
};

export default function Chart() {
  const { income } = useRevenueStore();
  const font = useFont(Roboto, 12);
  const weekDates = getWeekDates();

  const ganancias = weekDates.map((date) => {
    const dayIncome = income.find(
      (item) =>
        new Date(item.date).toDateString() === new Date(date).toDateString(),
    );
    return dayIncome ? Number(dayIncome.earnings.amount) : 0;
  });
  const data = days.map((day, index) => ({
    Dias: day,
    Ganancias: ganancias[index],
  }));

  return (
    <View
      style={{
        height: 220,
        backgroundColor: "transparent",
        borderRadius: 16,
        padding: 10,
      }}
    >
      <CartesianChart
        data={data}
        xKey="Dias"
        xAxis={{
          font,
          labelColor: "gray",
        }}
        yKeys={["Ganancias"]}
        domainPadding={{ left: 30, right: 20, top: 30 }}
        axisOptions={{
          font,
          labelColor: "gray",
          formatXLabel: (tick) => tick,
          lineWidth: 0,
        }}
      >
        {({ points, chartBounds }) => (
          <Bar
            points={points.Ganancias}
            chartBounds={chartBounds}
            color="white"
            roundedCorners={{
              topLeft: 6,
              topRight: 6,
              bottomLeft: 6,
              bottomRight: 6,
            }}
            barWidth={35}
            opacity={0.8}
            strokeWidth={0}
          />
        )}
      </CartesianChart>
    </View>
  );
}
