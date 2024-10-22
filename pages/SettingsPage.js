import { Backup, QueryStats } from '@mui/icons-material'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity, Text } from 'react-native'
import {database, db } from '../api/firebaseConfig';
import { ref, set } from 'firebase/database';
import { MMKV } from 'react-native-mmkv'
import { DBquery } from '../functions/DBquery';
const { v4: uuidv4 } = require('uuid');
export const SettingsPage = ({navigation}) => {

    const storage = new MMKV()

    const updateQuery = new DBquery();
    const createDocument = (name, email) => {
        const allData = storage.getAllKeys();
        console.log(allData);
        let num = 0
        allData.forEach((key) => {
            let quests = updateQuery.getQuests(key);
            
            console.log(`Quests n${num} : `, quests);
            num++

            set(ref(database, '/main/' + key ), {
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
      
    return (

        <View style={styles.container}>
            <View style={styles.container1}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => createDocument("meme", "memeEmail")}

                >
                    <Text>Sincronizar</Text>
                    <Backup />

                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => navigation.navigate('StatusPage')}
                    style={styles.button}

                >
                    <Text>Stats</Text>
                    <QueryStats/>

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
        borderColor: '#a1c2f7',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },

    button: {
        borderWidth: 1, 
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue',
        width: 200,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        gap: 10
    }
})