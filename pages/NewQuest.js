import React, { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
// import { addDoc, collection, getDocs } from '@firebase/firestore'
// import { db } from '../api/firebaseConfig'
import { Close } from '@mui/icons-material'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { MMKV } from 'react-native-mmkv'
import { DBquery } from '../functions/DBquery'




export const NewQuest = ({ navigation }) => {

    const storage = new MMKV()
    const updateQuery = new DBquery();


    const [questList, setQuestList] = useState('mainQuests');
    const [questName, setQuestName] = useState('');
    const [questDescription, setQuestDescription] = useState('');
    



    // const buffer = new ArrayBuffer(3)
    // const dataWriter = new Uint8Array(buffer)
    // dataWriter[0] = 1
    // dataWriter[1] = 100
    // dataWriter[2] = 255
    // storage.set('someToken', buffer)

    // const buffer = storage.getBuffer('someToken')
    // console.log(buffer) // [1, 100, 255]

    const addQuest = () => {
        try {
            

            const collectionString = storage.getString(questList)

            const Quests = collectionString ? JSON.parse(collectionString) : []; 

            let Quest = {
                id: Quests.length + 1,
                name: questName,
                description: questDescription,
                completed: false,
                class: questList,
                // level: 1,
                // progress: 0,
                // reward: {
            }

            Quests.push(Quest);
            storage.set(questList, JSON.stringify(Quests));


            console.log(Quests);






            // const collectionRef = collection(db, questList);
            // addDoc(collectionRef, {
            //     name: questName,
            //     description: questDescription
            // });

            setQuestName('');
            setQuestDescription('');

      

        } catch (error) {

            console.log("Erro ao tentar acessar dados: ", error);

        }
    }


    const handleChange = (event) => {
        setQuestList(event.target.value);
      
    };

    



    return (
        <View style={styles.container}>
            <View style={styles.container1}>
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
                            value={questList}
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
                <TextInput placeholder='Digite o nome da missão' style={styles.questName} onChangeText={(questName) => setQuestName(questName)} />
                <TextInput placeholder='Descrição' style={styles.questDescription} multiline={true} onChangeText={(questDescription) => setQuestDescription(questDescription)} />


                <TouchableOpacity style={styles.questButton} onPress={() => addQuest()}>
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
        justifyContent: 'center',
        flexDirection: 'row',
        height: 50
    },

    questName: {
        color: 'white',
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        height: 50
    },

    questDescription: {
        marginTop: 10,
        color: 'white',
        fontSize: 20,
        flex: 1
    }
})