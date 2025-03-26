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
    },
    liveSessionButton: {
        position: 'absolute',
        bottom: 10,
        left: '5%',
        right: '5%',
        backgroundColor: COLORS.primary,
        paddingVertical: 14,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})