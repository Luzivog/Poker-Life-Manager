import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/home";
import SessionsScreen from "./screens/sessions";
import HandsScreen from "./screens/hands";
import ExpensesScreen from "./screens/expenses";
import StatisticsScreen from "./screens/statistics";
import { COLORS } from "../config/variables";

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    backgroundColor: COLORS.background, // set your desired background color here
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    // Set icon names based on route name
                    switch (route.name) {
                        case "Home":
                            iconName = "home";
                            break;
                        case "Sessions":
                            iconName = "time";
                            break;
                        case "Hands":
                            iconName = "hand-left";
                            break;
                        case "Expenses":
                            iconName = "card";
                            break;
                        case "Statistics":
                            iconName = "stats-chart";
                            break;
                        default:
                            iconName = "ellipse";
                    }

                    // Return the icon component
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Sessions" component={SessionsScreen} />
            <Tab.Screen name="Hands" component={HandsScreen} />
            <Tab.Screen name="Expenses" component={ExpensesScreen} />
            <Tab.Screen name="Statistics" component={StatisticsScreen} />
        </Tab.Navigator>
    );
}
