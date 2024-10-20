import { collection, getDocs } from '@firebase/firestore'
import React, { View, Text, StyleSheet, FlatList } from 'react-native'
import { ProgressBar } from 'react-progressbar-fancy'
import { db } from '../api/firebaseConfig'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { TouchableOpacity } from 'react-native'
import Scrollbar from 'react-scrollbars-custom'
import { Checkbox } from '@mui/material'
// import Animated from 'react-native-reanimated'

export const Homepage = ({ navigation }) => {




    const [Quests, setQuests] = useState([]);

    const QuestsQuery = async (collectionName) => {
        const collectionRef = collection(db, collectionName);

        try {
            const QuerySnapshot = await getDocs(collectionRef);
            const Data = [];

            QuerySnapshot.forEach((doc) => {
                Data.push({ ...doc.data(), id: doc.id })
            })

            setQuests(Data)

        } catch (error) {

            console.log("Erro ao tentar acessar dados: ", error);

        }
    }



    useEffect(() => {
        QuestsQuery('currentQuests');
    }, [])

    QuestsQuery('currentQuests');

    const newQuest = async () => {
        navigation.navigate('QueryQuest')

    }


    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <View style={styles.containerStats}>
                    <View style={styles.statsBox}   >
                        <Text style={styles.textStyle}>
                            XP
                        </Text>
                        <ProgressBar primaryColor='white' secondaryColor='#05e6ff' score={100} hideText={true} />

                    </View>
                    <View style={styles.levelBox}>
                        <Text style={styles.textStyle}>
                            100
                        </Text>
                        <Text style={styles.textStyle}>
                            Lvl
                        </Text>

                    </View>
                </View>
                <View style={styles.taskBox}>
                    <View style={styles.taskBar}>
                        <Text style={[styles.textStyle, { flex: 1 }]}>
                            Current Quests
                        </Text>
                        <TouchableOpacity onPress={newQuest}>
                            <AddIcon style={{ fontSize: 25, color: 'white', margin: 6 }} />
                        </TouchableOpacity>

                    </View>
                    <View style={{ flex: 1, marginTop: 10 }}>
                        <Scrollbar>
                            <FlatList
                                data={Quests}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (


                                    <View style={styles.questButton}>
                                        <Checkbox style={{marginRight: 10}} />

                                        <TouchableOpacity style={{ flex: 1 }}>
                                            <Text style={{ color: 'white', fontSize: 20 }}>{item.name}</Text>
                                        </TouchableOpacity>
                                    </View>


                                )} />
                        </Scrollbar>
                        <TouchableOpacity style={styles.addQuestButton} onPress={() => navigation.navigate('NewQuest')}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Add Quest</Text>
                        </TouchableOpacity>

                    </View>




                </View>
            </View>

        </View>
    )
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

    containerStats: {

        flexDirection: 'row',
    },
    statsBox: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },


    levelBox: {

        height: 100,
        width: 100,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'

    },

    textStyle: {
        color: 'white',
        fontSize: 25,
    },

    taskBox: {
        flex: 1,
        padding: 10,
    },
    taskBar: {
        flexDirection: 'row'
    },

    questButton: {
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 30,
        marginHorizontal: 5,
        height: 70
    },

    addQuestButton: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30
    }



})