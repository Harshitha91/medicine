import { StyleSheet } from "react-native";

import Style from "styles";
import { moderateScale, normalize, verticalScale } from "util/sizes";

const theme = Style.get();

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: theme.componentBackground.listItem,
        paddingTop: moderateScale(10),
        paddingBottom: moderateScale(10),
        paddingRight: moderateScale(10),
        margin: moderateScale(2),
        borderRadius: moderateScale(5),
        marginBottom:20,
        width:'96%',
        left: '2%',
        right:'2%',
        zIndex:0
    },
    iconContainer: {
        display: "flex",
        flexDirection: "column",
        flexGrow: moderateScale(0.02),
        alignItems: "center",
        justifyContent: "center"
    },
    linkIcon: {
        justifyContent: "center",
        padding: moderateScale(3)
    },
    listItemText: {
        fontSize: normalize(theme.text.titleSize),
        color: theme.text.textColor
    },
});

export default styles;