import { COLORS } from "@/config/variables";
import { StyleSheet } from "react-native";

const baseTextButton = {
    color: COLORS.primary,
    fontSize: 16,
};

const baseIconButton = {
    color: COLORS.primary,
    fontSize: 30,
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    screenHeader: {
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 10,
    },
    screenTitle: {
        color: "white",
        paddingHorizontal: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    slideUpMenuContainer: {
        backgroundColor: COLORS.background,
        height: "60%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    textButton: baseTextButton,
    leftTextButton: {
        ...baseTextButton,
        paddingRight: 20
    },
    rightTextButton: {
        ...baseTextButton,
        paddingLeft: 20
    },
    iconButton: baseIconButton,
    leftIconButton: {
        ...baseIconButton,
        paddingRight: 20
    },
    rightIconButton: {
        ...baseIconButton,
        paddingLeft: 20
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end", // align modal to bottom
        backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background to dim the screen
    },
    menuHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 20,
    }
})