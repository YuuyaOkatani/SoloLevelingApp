import RadarChart from "react-animate-radar-chart";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { View, TouchableOpacity, Text } from "react-native";
import { ArrowBack, ArrowBackIos } from "@mui/icons-material";
import { ProgressBar } from "react-progressbar-fancy";
import { questoes } from "../functions/System";
import { useFocusEffect } from "@react-navigation/native";
import { DBquery } from "../functions/DBquery";


// const data = [
//     { name: 'Matemática - Lvl.4', value: 0.515 },
//     { name: 'Física - Lvl.3', value: 0.415 },
//     { name: 'Biologia - Lvl.0', value: 0.315 },
//     { name: 'Geografia - Lvl.0', value: 0.215 },
//     { name: 'História - Lvl.0', value: 0.115 },
//     { name: 'Química - Lvl.0', value: 0.015 },
//     { name: 'Língua Portuguesa - Lvl.0', value: 0.015 },
// ];

const colors = {
    lineColor: "rgb(255,255,255)",
    innerColor: "rgba(109,200,236,0.45)",
    outerColor: "transparent",
    fontColor: "rgb(255,255,255)",
    borderColor: "rgb(109,200,236)",
};

const updateQuery = new DBquery();
// let data = updateQuery.setScore().map( (quest) => (  { name: quest.materia, value: quest.value, level: quest.level } ))
let data = [];


let data2 = updateQuery.checkStats()

export const StatusPage = ({ navigation }) => {
    const [showData, setShowData] = useState(false);

    let data3 = []
    
    useFocusEffect(
        useCallback(() => {
            // Função a ser executada ao mudar para esta tela
    
            setShowData(!showData)
     
            data2 = updateQuery.checkStats()
            setLevelValue()
            

            // Retorna uma função de limpeza se necessário
            return () => {


                console.log('Saindo da tela');
            };
        }, [])
    );

    const setLevelValue = () => {
        data = []
        updateQuery.setScore().forEach( (quest) => {
            if(quest.level !== undefined){
                data.push({
                     name: quest.materia, value: quest.value, level: quest.level, color1: quest.color1, color2: quest.color2
                     })
                
            }
        })

    }



    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowBackIos style={{ fontSize: 25, color: 'white', margin: 6 }} />
                    </TouchableOpacity>
                </View>
                {
                    data2  && 
                    <RadarChart
                    data={data2}
                    showData={showData}
                    size={280}
                    colors={colors}

                />
                }

                <View style={styles.container2}>
                    <FlatList
                        style={{ width: '100%', height: 300 }}
                        data={data}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => (
                            <View style={{ marginTop: 40 }}>
                                <Text style={{ color: 'white', fontSize: 16 }}>{item.name} - Lvl.{item.level}</Text>
                                <ProgressBar hideText={true} primaryColor={item.color1} secondaryColor={item.color2} score={item.value * 100} />
                            </View>
                        )} />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setShowData(!showData)}
                    >
                        <Text>{showData ? "Hide" : "Show"} Data</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 10
    },

    container1: {
        flex: 1,
        backgroundColor: '#031b40',
        padding: 10,
        borderWidth: 1,
        borderColor: '#a1c2f7'
    },
    container2: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        gap: 10
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue',
        width: 200,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
    }
});

