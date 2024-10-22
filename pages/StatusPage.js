import RadarChart from "react-animate-radar-chart";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { View, TouchableOpacity, Text } from "react-native";


const data = [
    {
        name: "Matematica",
        value: 0.5,
    },
    {
        name: "Física",
        value: 0.4,
    },
    {
        name: "Química",
        value: 0.8,
    },
    {
        name: "Biologia",
        value: 0.7,
    },
    {
        name: "Geografia",
        value: 0.2,
    },
    {
        name: "Historia",
        value: 0.3  ,
    },
    {
        name: "Filosofia",
        value: 0.6,
    }
];

const colors = {
    lineColor: "rgb(255,255,255)",
    innerColor: "rgba(109,200,236,0.45)",
    outerColor: "transparent",
    fontColor: "rgb(255,255,255)",
    borderColor: "rgb(109,200,236)",
};

export const StatusPage = () => {
    const [showData, setShowData] = useState(false);
    return (
        <View style={styles.container}>
            <RadarChart
                data={data}
                showData={showData}
                size={380}
                colors={colors}
                
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => setShowData(!showData)}
            >
                <Text>{showData ? "Hide" : "Show"} Data</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#031b40',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue',
        width: 200,
        height: 50,
        borderRadius: 10, 
        borderWidth: 1,
    }
});

