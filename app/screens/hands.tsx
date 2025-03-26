import { globalStyles } from "@/config/styles";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function HandsScreen() {
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.screenHeader}>
        <Text style={globalStyles.screenTitle}>Hand History</Text>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="add" style={globalStyles.rightIconButton}></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
}
