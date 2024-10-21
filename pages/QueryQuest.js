import React, { useCallback } from 'react'

import { db } from '../api/firebaseConfig';
import { collection, getDocs } from '@firebase/firestore'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Scrollbar from 'react-scrollbars-custom'
import { useEffect, useState } from 'react'
import { Checkbox, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Close, RemoveCircle } from '@mui/icons-material'
import { MMKV } from 'react-native-mmkv';
import { DBquery } from '../functions/DBquery';
import { useFocusEffect } from '@react-navigation/native';

export const QueryQuest = ({ navigation }) => {

    const [Quests, setQuests] = useState([]);
    const [questList, setQuestList] = useState('');
    const [deleteState, setDeleteState] = useState(false);
    const updateQuery = new DBquery();
    const QuestsQuery = async (collectionName) => {
        // const collectionRef = collection(db, collectionName);

        try {
            // const QuerySnapshot = await getDocs(collectionRef);
            // const Data = [];

            // QuerySnapshot.forEach((doc) => {
            //     Data.push({ ...doc.data(), id: doc.id })
            // })



            let Quests = updateQuery.getQuests(collectionName)


            setQuests(Quests)

        } catch (error) {

            console.log("Erro ao tentar acessar dados: ", error);

        }
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

    const handleChange = (event) => {
        setQuestList(event.target.value);
        QuestsQuery(event.target.value);
        setDeleteState(false);
    };

    useFocusEffect(
        useCallback(() => {
            // Função a ser executada ao mudar para esta tela
            console.log('Tela ativada');
            QuestsQuery('mainQuests'); // Carrega os dados da coleção principal quests quando a tela é ativada
            setQuestList('mainQuests');
            // Retorna uma função de limpeza se necessário
            return () => {
                console.log('Saindo da tela');
            };
        }, [])
    );




    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <View>
                    <View style={{ flexDirection: 'row-reverse' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Close style={{ color: 'white' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, }}>

                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={questList == '' ? 'mainQuests' : questList}
                                onChange={handleChange}
                                style={{ color: 'white', fontSize: 25 }}
                                inputProps={{ 'aria-label': 'Without label', }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: '#031b40',
                                            color: 'white', // Fundo transparente
                                            fontSize: 25,
                                        },
                                    },
                                }}
                            >
                                <MenuItem value={'mainQuests'} >
                                    Main quests
                                </MenuItem>

                                <MenuItem value={'currentQuests'}>
                                    Current quests
                                </MenuItem>
                                <MenuItem value={'sideQuests'}>
                                    Side quests
                                </MenuItem>
                                <MenuItem value={'completedQuests'}>
                                    Completed quests
                                </MenuItem>
                                <MenuItem value={'dailyQuests'}>
                                    Daily quests
                                </MenuItem>

                            </Select>
                        </FormControl>
                    </View>

                </View>
                <Scrollbar>
                    <FlatList

                        data={Quests}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.questButton}>
                                <Checkbox />

                                <TouchableOpacity
                                    onPress={() => QuestDetails(item)}
                                    onLongPress={() => setDeleteState(!deleteState)}
                                    style={{ flex: 1 }}
                                    

                                >

                                    <Text style={{ color: 'white', fontSize: 25 }}>{item.name || 'error '}</Text>


                                </TouchableOpacity>

                                {deleteState &&

                                    <View style={{marginHorizontal: 15}}>
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

