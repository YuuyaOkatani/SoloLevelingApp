import React, { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
// import { addDoc, collection, getDocs } from '@firebase/firestore'
// import { db } from '../api/firebaseConfig'
import { Close } from '@mui/icons-material'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { MMKV } from 'react-native-mmkv'
import { DBquery } from '../functions/DBquery'
const { v4: uuidv4 } = require('uuid');

import { questoes } from '../functions/System'
import { useFocusEffect } from '@react-navigation/native'
import { update } from 'firebase/database'



export const NewQuest = ({ route, navigation }) => {

    const storage = new MMKV()
    const updateQuery = new DBquery();
    let questList = route.params

    // const [questList, setQuestList] = useState('mainQuests');
    const [questName, setQuestName] = useState('');
    const [questDescription, setQuestDescription] = useState('');
    const [QuestTopic, setQuestTopic] = useState(questoes[0]);
    const [QuestSubTopic, setQuestSubTopic] = useState({});
    const [Quantity, setQuantity] = useState(0);
    const [error, setError] = useState(false);






    

    // const buffer = new ArrayBuffer(3)
    // const dataWriter = new Uint8Array(buffer)
    // dataWriter[0] = 1
    // dataWriter[1] = 100
    // dataWriter[2] = 255
    // storage.set('someToken', buffer)

    // const buffer = storage.getBuffer('someToken')
    // console.log(buffer) // [1, 100, 255]

    const addQuest = () => {

        let topico = undefined

        
       
        
        try {


           

            
            
            
            if (!QuestTopic.materia || !QuestSubTopic.topico  || !Quantity) {
                
                setError(true)
                return
            }
            else {
                setError(false)


                const collectionString = storage.getString(questList)



                let date = new Date();
       
                

                const Quests = collectionString ? JSON.parse(collectionString) : [];
                let newKey = uuidv4();
                let QuestRef = {
                    id: newKey,
                    name: questName,
                    description: questDescription,
                    completed: false,
                    class: questList,
                    quantity: Quantity,
                    topic: QuestTopic.materia,
                    subTopic: QuestSubTopic || topico ,
                    reward: Quantity * QuestSubTopic.xp ,
                    createAt: date


                }

                

                Quests.push(QuestRef);
                storage.set(questList, JSON.stringify(Quests));


    






                // const collectionRef = collection(db, questList);
                // addDoc(collectionRef, {
                //     name: questName,
                //     description: questDescription
                // });

                // setQuestName('');
                // setQuestDescription('');

            }


        } catch (error) {

            console.log("Erro ao tentar acessar dados: ", error);

        }
    }


    // const handleChange = (event) => {
    //     setQuestList(event.target.value);

    // };

    const handleChangeTopic = (event) => {
        let data = event.target.value;
        setQuestTopic(data);

        
        if(data.materia == 'Redação'){
            setQuestSubTopic(data.topicos[0]);
            setQuantity(1) 
            
            
            
        }
        


    };

    const handleChangeTopicSubTopic = (event) => {
        setQuestSubTopic(event.target.value);

    };

    
    useEffect(() => {
        console.log("Algo deu errado");
        
    }, [error])
   

    const handleTopic = () => {

    }

    const handleQuantity = () => {

    }


    useFocusEffect(
        useCallback(() => {
            // Função a ser executada ao mudar para esta tela
   
            questoes.forEach(quest => {
                setQuestName('');
                setQuestDescription('');

   
            })



            // Retorna uma função de limpeza se necessário
            return () => {
                setQuestName('');
                setQuestDescription('');

        
            };
        }, [])
    );




    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <View style={{ flexDirection: 'row-reverse' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Close style={{ color: 'white' }} />
                    </TouchableOpacity>
                </View>
                {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>

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
                </View> */}
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, }}>

                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={QuestTopic}
                            onChange={handleChangeTopic}
                            error={error}
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

                            {
                                questoes.map((item) => (
                                    <MenuItem value={item}>
                                        {item.materia}
                                    </MenuItem>
                                ))
                            }


                        </Select>
                        <FormHelperText
                                sx={{ color: 'white' }}>
                                {error && 'Seleção obrigatória'}

                            </FormHelperText>
                    </FormControl>

                    {QuestTopic.materia !== 'Redação' &&

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, }}>

                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={QuestSubTopic}
                                onChange={handleChangeTopicSubTopic}
                                error={error}
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

                                {
                                    QuestTopic.topicos.map((item) => (
                                        <MenuItem value={item}>
                                            {item.topico}
                                        </MenuItem>
                                    ))
                                }


                            </Select>
                            <FormHelperText
                                sx={{ color: 'white' }}>
                                {error && 'Seleção obrigatória'}

                            </FormHelperText>
                        </FormControl>}
                </View>

                { QuestTopic.materia != 'Redação' &&
                    <TextField
                    id="filled-number"
                    label="Número de exercícios / Tempo em minutos"
                    type="number"
                    variant="filled"
                    error={error}
                    helperText={error ? 'Este campo é obrigatório' : ''}
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'white', // Cor da fonte do input
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white', // Cor da fonte do label
                        },
                        '& .MuiFormHelperText-root': {
                            color: 'white', // Muda a cor do helperText

                        },

                    }}
                    onChange={(e) => { setQuantity(parseInt(e.target.value)) }}
                    required

                />
                }

                <TextField
                    id="filled-number"
                    label="Nome da missão"
                    type="text"
                    variant="filled"

                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'white', // Cor da fonte do input
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white', // Cor da fonte do label
                        },



                    }}
                    onChange={(e) => { setQuestName(e.target.value) }}

                />

                <TextField
                    id="filled-number"
                    label="Descrição"
                    type="text"
                    variant="filled"
                    multiline={true}
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'white', // Cor da fonte do input
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white', // Cor da fonte do label
                        },

                        flex: 1

                    }}
                    onChange={(e) => { setQuestDescription(e.target.value) }}

                />


                {/* <TextInput 
                placeholder='Quantidade de exercícios' 
                style={styles.questName} 
                onChangeText={(e) => setQuantity(parseInt(e))} />

                <TextInput 
                placeholder='Digite o nome da missão' 
                style={styles.questName} 
                onChangeText={(questName) => setQuestName(questName)}

                 />

                <TextInput 
                placeholder='Descrição' 
                style={styles.questDescription} 
                multiline={true} 
                onChangeText={(questDescription) => setQuestDescription(questDescription)}
                 /> */}


                <TouchableOpacity style={styles.addQuestButton} onPress={() => addQuest()}>
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

    // questButton: {
    //     borderWidth: 1,
    //     borderColor: 'white',
    //     alignItems: 'center',
    //     flexDirection: 'row',
    //     marginTop: 30,
    //     marginHorizontal: 5,
    //     height: 'auto', 
    //     padding: 10
    // },

    addQuestButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'white',
        height: 70
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