import React from 'react'

import { db } from '../api/firebaseConfig';
import { collection, getDocs } from '@firebase/firestore'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Scrollbar from 'react-scrollbars-custom'
import { useEffect, useState } from 'react'
import { Checkbox, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Close } from '@mui/icons-material'

export const QueryQuest = ({ navigation }) => {

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
        QuestsQuery('mainQuests');
    }, [])

    const [questList, setQuestList] = useState('');

    const handleChange = (event) => {
        setQuestList(event.target.value);
        QuestsQuery(event.target.value);
    };



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
                                value={questList == ''? 'mainQuests': questList}
                                onChange={handleChange} 
                                style={{ color: 'white', fontSize: 25}}
                                inputProps={{ 'aria-label': 'Without label',   }}
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

                                <Text style={{ color: 'white', fontSize: 25 }}>{item.name}</Text>
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
        margin: 30
    }
})

