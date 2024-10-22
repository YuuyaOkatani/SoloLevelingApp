import { collection, getDocs } from '@firebase/firestore'
import React, { View, Text, StyleSheet, FlatList } from 'react-native'
import { ProgressBar } from 'react-progressbar-fancy'
import { db } from '../api/firebaseConfig'
import { useCallback, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { TouchableOpacity } from 'react-native'
import Scrollbar from 'react-scrollbars-custom'
import { Checkbox } from '@mui/material'
import { MMKV } from 'react-native-mmkv'
import { DBquery } from '../functions/DBquery'
import { useFocusEffect } from '@react-navigation/native'
import { RemoveCircle, Settings } from '@mui/icons-material'
// import Animated from 'react-native-reanimated'

export const Homepage = ({ navigation }) => {


    const storage = new MMKV()

    const [deleteState, setDeleteState] = useState(false);
    const [Quests, setQuests] = useState([]);
    const [error, setError] = useState(false);

    const updateQuery = new DBquery();

    const QuestsQuery = () => {
        // const collectionRef = collection(db, collectionName);

        try {
            // const QuerySnapshot = await getDocs(collectionRef);
            // const Data = [];

            // QuerySnapshot.forEach((doc) => {
            //     Data.push({ ...doc.data(), id: doc.id })
            // })
            let currentQuests = updateQuery.getQuests('currentQuests');


            setQuests(currentQuests);

            updateQuery.setScore();

            



        } catch (error) {

            console.log("Erro ao tentar acessar dados: ", error);

        }
    }



    const containUndefinedOrNull = () => {
   
        let Quests = []
        storage.getAllKeys().forEach(key => {
            let stringKey = storage.getString(key)
            Quests = stringKey ? JSON.parse(stringKey) : [];
            Quests.forEach(quest => {

                if (quest === undefined || quest === null) {
                    setError(true);
                    deleteAll()
                }
                else{
                    setError(false);
                }
            })
            console.log(Quests);
        });
        
       
        
    }


    const deleteAll = () => {
        storage.clearAll()
        QuestsQuery()
        setError(false);
    }

    const newQuest = async () => {
        navigation.navigate('QueryQuest')

    }


    const QuestDetails = (item) => {
        console.log(item);
        setDeleteState(false);
        navigation.navigate('QuestDetails', item);
    }

    const deleteQuestF = (item) => {
        console.log(item);
        updateQuery.deleteQuest(item);
        QuestsQuery(item.class);
    }

    const setCompletedList = (item) => {
        updateQuery.updateQuests(item, item.name, item.description, 'completedQuests', true, item.quantity, item.topic)
        QuestsQuery();

    }


    useFocusEffect(
        useCallback(() => {
            // Função a ser executada ao mudar para esta tela
            console.log('Tela ativada');
            QuestsQuery();
            containUndefinedOrNull();
           
            // Retorna uma função de limpeza se necessário
            return () => {
                console.log('Saindo da tela');
            };
        }, [])
    );


    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <View style={{flexDirection: 'row-reverse'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('SettingsPage')}>
                        <Settings style={{ fontSize: 25, color: 'white', margin: 6 }} />
                    </TouchableOpacity>
                </View>
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
                       
                                renderItem={({ item }) => (


                                    <View style={styles.questButton}>
                                        <Checkbox style={{ marginRight: 10 }} onChange={() => {setCompletedList(item)}} />

                                        <TouchableOpacity style={{ flex: 1 }}

                                        onPress={() => QuestDetails(item)}
                                        onLongPress={() => setDeleteState(!deleteState)}
                                        
                                        >
                                            <Text style={{ color: 'white', fontSize: 20 }}>{item.name || 'error'}</Text>
                                        </TouchableOpacity>

                                        {deleteState &&

                                            <View style={{ marginHorizontal: 15 }}>
                                                <TouchableOpacity onPress={() => deleteQuestF(item)}>
                                                    <RemoveCircle style={{ color: 'red', fontSize: 30 }} />
                                                </TouchableOpacity>
                                            </View>

                                        }
                                    </View>


                                )} />
                        </Scrollbar>
                        <TouchableOpacity style={styles.addQuestButton} onPress={() => navigation.navigate('NewQuest')}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Add Quest</Text>
                        </TouchableOpacity>

                        {
                            error && 
                        
                        <TouchableOpacity style={styles.addQuestButton} onPress={deleteAll}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Delete all data (for emergency only)</Text>
                        </TouchableOpacity>
                        
                        }



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
        padding: 15
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
        marginTop: 30,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'white',
        height: 70
    }



})