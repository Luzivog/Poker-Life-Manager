import { globalStyles } from "@/config/styles";
import { Text, View } from "react-native";

export default function StatisticsScreen() {
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.screenHeader}>
        <Text style={globalStyles.screenTitle}>Statistics</Text>
      </View>
    </View>
  );
}
