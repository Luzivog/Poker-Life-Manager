import React from "react";
import NavigationBar from "./navigation";
import { View } from "react-native";
import Constants from "expo-constants";
import { COLORS } from "@/config/variables";

export default function Index() {
	return (
		<View style={{ flex: 1, backgroundColor: COLORS.background }}>
			<View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
				<NavigationBar/>
			</View>
		</View>
	);
}
