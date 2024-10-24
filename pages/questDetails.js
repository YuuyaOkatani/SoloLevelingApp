import React, { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
// import { addDoc, collection, getDocs } from '@firebase/firestore'
// import { db } from '../api/firebaseConfig'
import { Close } from '@mui/icons-material'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { MMKV } from 'react-native-mmkv'
import { DBquery } from '../functions/DBquery'
import { questoes, Questoes, QuestType } from '../functions/System'
import { useFocusEffect } from '@react-navigation/native'




export const QuestDetails = ({ route, navigation }) => {

    const storage = new MMKV()
    const updateQuery = new DBquery();

    let obj = route.params;
 
    const [questList, setQuestList] = useState({});
    const [questListB, setQuestListB] = useState({});
    const [questName, setQuestName] = useState('');
    const [questDescription, setQuestDescription] = useState('');
    const [QuestTopic, setQuestTopic] = useState(obj.subTopic);
    const [Quantity, setQuantity] = useState(0);
    const [collectionRef, setCollectionRef] = useState(obj.class);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    useFocusEffect(
        useCallback(() => {
            // Função a ser executada ao mudar para esta tela

            
            setQuestTopic(obj.subTopic);
            setQuestListB(updateQuery.getMateria(obj.topic))
            setQuantity(obj.quantity);

            handleChangeTopic();
            setTopic();
   
            // Retorna uma função de limpeza se necessário
            return () => {
                console.log('Saindo da tela');
            };
        }, [])
    );

    const setTopic = () => {
        let list = updateQuery.getMateria(obj.topic);
        setQuestList(list);



    }





    const handleChange = (event) => {
        setQuestList(event.target.value);

    };

    const handleChangeTopic = (event) => {



        if (event === undefined) {
            const materia = updateQuery.getMateria(obj.topic)
            let objeto = {}


            materia.topicos.forEach((quest) => {
                if (quest.topico === QuestTopic.topico) {
                    objeto = quest
                }
            })

            setQuestTopic(objeto);
        }
        else {
            setQuestTopic(event.target.value);
       
        }


    };

    const handleChangeCollection = (event) => {
        setCollectionRef(event.target.value);
    };

    const updateQuest = () => {
        if (!Quantity || !QuestTopic.topico || !questList.materia) {
            setError(true);


            return;

        }
        else {
            setError(false);
            updateQuery.updateQuests(obj, questName || obj.name, questDescription || obj.description, collectionRef || obj.class, false, Quantity || obj.quantity, QuestTopic || obj.subTopic, questList.materia || obj.topic)
        }
    }

    useEffect(() => {


        // setTopic();

        if (questList.materia != questListB.materia) {
            setQuestListB(questList);
            setQuestTopic({})
        }




    }, [change, questList]); // Isso será executado sempre que o estado QuestTopic mudar





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
                            value={collectionRef}
                            onChange={handleChangeCollection}
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
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, }}>

                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={questList}
                            onChange={handleChange}
                            error={error}
                            style={{ color: 'white', fontSize: 25 }}
                            inputProps={{ 'aria-label': 'Without label', }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        backgroundColor: '#031b40',
                                        color: 'white', // Fundo transparente
                                        fontSize: 25,
                                        '& .MuiFormHelperText-root': {
                                            color: 'white', // Muda a cor do helperText

                                        },
                                    },
                                },
                            }}
                        >
                            {/* TODO colocar isso como uma lista de objetos */}
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

                    {
                        questList.topicos && questList.materia != 'Redação' &&

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, }}>

                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={QuestTopic}
                                error={error}
                                onChange={handleChangeTopic}

                                style={{ color: 'white', fontSize: 25 }}
                                inputProps={{ 'aria-label': 'Without label', }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: '#031b40',
                                            color: 'white', // Fundo transparente
                                            fontSize: 25,
                                            '& .MuiFormHelperText-root': {
                                                color: 'white', // Muda a cor do helperText

                                            },
                                        },
                                    },
                                }}
                            >

                                {
                                    questList.topicos.map((item) => (
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
                        </FormControl>
                    }
                </View>

                <TextField
                    id="filled-number"
                    label="Número de exercícios / Tempo em minutos"
                    type="number"
                    variant="filled"
                    helperText={error ? 'Este campo é obrigatório' : ''}
                    defaultValue={parseInt(obj.quantity)}
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
                    onChange={(e) => { setQuantity(e.target.value) }}

                />

                <TextField
                    id="filled-number"
                    label="Nome da missão"
                    type="text"
                    variant="filled"
                    defaultValue={obj.name}
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
                    defaultValue={obj.description}
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

                {/* <TextInput defaultValue={obj.quantity} placeholder='Quantidade de exercícios' style={styles.questName} onChangeText={(e) => setQuantity(parseInt(e))} /> */}
                {/* <TextInput defaultValue={obj.name} placeholder='Digite o nome da missão' style={styles.questName} onChangeText={(questName) => setQuestName(questName)} />
                <TextInput defaultValue={obj.description} placeholder='Descrição' style={styles.questDescription} multiline={true} onChangeText={(questDescription) => setQuestDescription(questDescription)} /> */}


                <TouchableOpacity style={styles.questButton} onPress={() => updateQuest()}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Update Quest</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'white',
        height: 80
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