import { ArrowBackIos, Backup, Close, QueryStats, SaveAs } from '@mui/icons-material'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity, Text } from 'react-native'
import { database, db } from '../api/firebaseConfig';
import { child, get, ref, remove, set, update, } from 'firebase/database';
import { MMKV } from 'react-native-mmkv'
import { DBquery } from '../functions/DBquery';
const { v4: uuidv4 } = require('uuid');
export const SettingsPage = ({ navigation }) => {

    const storage = new MMKV()
    const [deleteDocument, setDeleteDocument] = useState(false)
    const [sure, setSure] = useState(false)
    const updateQuery = new DBquery();
    const createDocument = () => {
        const allData = storage.getAllKeys();

        let num = 0
        allData.forEach(async (key) => {
            let quests = updateQuery.getQuests(key);


            num++

            // const refs = get(ref(database, '/main'))

            await remove(ref(database, '/main/'))

            update(ref(database, '/main/' + key), {
                quests
            })
                .then(() => {
                    console.log("Documento criado com sucesso!");
                })
                .catch((error) => {
                    console.error("Erro ao criar documento: ", error);
                });


        })
        let newKey = uuidv4();

    };

    const Recover = async () => {
        try {

            const snapshot = await get(ref(database, '/main'))
            let snapshotGetted = snapshot.val()
            if (snapshot.val()) {
                // snapshot.val().forEach(
                //     element => snapshotGetted.push(element))
                let collectedData = [
                    { list: "mainQuests", ...snapshotGetted.mainQuests, },
                    { list: "currentQuests", ...snapshotGetted.currentQuests, },
                    { list: "completedQuests", ...snapshotGetted.completedQuests, },
                    { list: "dailyQuests", ...snapshotGetted.dailyQuests, },
                    { list: "sideQuests", ...snapshotGetted.sideQuests, },
                    // { list: "bossQuests",  ...snapshotGetted.bossQuests, },

                    // snapshotGetted.bossQuests,
                    // snapshotGetted.quests

                ]


                collectedData.forEach(element => {
                    if (element.quests) {
               
                        storage.set(element.list, JSON.stringify(element.quests))
                    }
                    else {
            
                        storage.delete(element.list)
               
                    }
                })

                // const bossQuests = updateQuery.getQuests('bossQuests')
                // const quests = updateQuery.getQuests('quests')




                // storage.set('mainQuests', JSON.stringify(collectedData[0]))
                // storage.set('currentQuests', JSON.stringify(collectedData[1]))
                // storage.set('completedQuests', JSON.stringify(collectedData[2]))
                // storage.set('dailyQuests', JSON.stringify(collectedData[3]))
                // storage.set('sideQuests', JSON.stringify(collectedData[4]))

                const mainQuests = updateQuery.getQuests('mainQuests')
                const currentQuests = updateQuery.getQuests('currentQuests')
                const completedQuests = updateQuery.getQuests('completedQuests')
                const dailyQuests = updateQuery.getQuests('dailyQuests')
                const sideQuests = updateQuery.getQuests('sideQuests')
                const levels = updateQuery.getQuests('levels')



            }
            // snapshotGetted.forEach(element => {
            //     console.log(element);

            // })

        } catch (error) {
            console.log("Erro ao tentar acessar dados: ", error);


        }
    }

    return (

        <View style={styles.container}>
            <View style={styles.container1}>
                <View style={{ flexDirection: 'row', marginBottom: 50 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowBackIos style={{ fontSize: 25, color: 'white', margin: 6 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.container2}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => createDocument()}

                    >
                        <Text>Save progress 💾</Text>
                        <Backup />

                    </TouchableOpacity>
                    {!sure &&
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setSure(!sure)}

                        >
                            <Text>Checkout 💿</Text>
                            <SaveAs />

                        </TouchableOpacity> ||

                        <TouchableOpacity
                            style={[styles.button, {backgroundColor: 'blue'}]}
                            onPress={() => {Recover(), setSure(!sure)}}

                        >
                            <Text style={{color: 'white'}}>Are you sure to checkout? 💿</Text>
                            <SaveAs />

                        </TouchableOpacity>
                    }

                    <TouchableOpacity
                        onPress={() => navigation.navigate('StatusPage')}
                        style={styles.button}

                    >
                        <Text>Stats</Text>
                        <QueryStats />

                    </TouchableOpacity>

                    {
                        !deleteDocument &&
                        <TouchableOpacity
                            onPress={() => setDeleteDocument(!deleteDocument)}
                            style={styles.button}

                        >
                            <Text> Apagar tudo</Text>
                            <Close />


                        </TouchableOpacity> ||

                        <TouchableOpacity
                            onPress={() => { setDeleteDocument(!deleteDocument), storage.clearAll(), updateQuery.setScore(), updateQuery.deleteAll() }}
                            style={[styles.button, { backgroundColor: 'red' }]}

                        >
                            <Text> Apagar tudo mesmo?</Text>
                            <Close />



                        </TouchableOpacity>

                    }
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
        borderColor: '#a1c2f7',


    },

    container2: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30
    },

    button: {
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue',
        width: 250,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        gap: 10
    }
})