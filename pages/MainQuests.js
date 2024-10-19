import React, { View, Text, StyleSheet, FlatList } from 'react-native'
import Scrollbar from 'react-scrollbars-custom'
import { useEffect, useState } from 'react'
import { collection, getDocs } from '@firebase/firestore'
import { db } from '../api/firebaseConfig'



export const MainQuests = () => {

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

    
    
    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Scrollbar>
                    <FlatList
                        data={Quests}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View>
                                <Text style={{ color: 'white' }}>{item.name}</Text>
                            </View>
                        )} />

                </Scrollbar>


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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#a1c2f7'
    },

    containerStats: {

        flexDirection: 'row',
    }
})