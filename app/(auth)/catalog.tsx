import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CatalogLayout = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>CatalogLayout</Text>
        </View>
    );
}

export default CatalogLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
});