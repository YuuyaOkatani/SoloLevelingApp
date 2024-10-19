import { collection, getDocs, addDoc, serverTimestamp, Timestamp, updateDoc, getDoc, doc, deleteDoc, arrayUnion, arrayRemove } from '@firebase/firestore'
import React, { View, Text, StyleSheet, FlatList } from 'react-native'
import { ProgressBar } from 'react-progressbar-fancy'
import { db } from '../api/firebaseConfig'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { TouchableOpacity } from 'react-native'
import Scrollbar from 'react-scrollbars-custom'
import { MainQuestsQuery, SideQuestsQuery, CompletedTasksQuery, CurrentTasksQuery } from '../functions/DBquery'
// import Animated from 'react-native-reanimated'

export const Homepage = ({ navigation }) => {

    const [MainQuests, setMainQuests] = useState([]);
    const [SideQuests, setSideQuests] = useState([]);
    const [CompletedTasks, setCompletedTasks] = useState([]);
    const [CurrentTasks, setCurrentTasks] = useState([]);

    const CurrentQuestsCollection = collection(db, 'currentQuests');
    const MainQuestsCollection = collection(db, 'mainQuests');
    const SideQuestsCollection = collection(db, 'sideQuests');
    const CompletedQuestsCollection = collection(db, 'completedTasks');


    const MainQuestsQuery = async () => {

        try {

            const MainQuestsQuerySnapshot = await getDocs(MainQuestsCollection)
            const MainQuestsData = [];
            MainQuestsQuerySnapshot.forEach((doc) => {
                MainQuestsData.push({ ...doc.data(), id: doc.id })

            });

            setMainQuests(MainQuestsData)



        } catch (error) {
            console.log("Erro ao tentar acessar dados: ", error);


        }
    }

    const SideQuestsQuery = async () => {
        try {
            const SideQuestsQuerySnapshot = await getDocs(SideQuestsCollection)
            const SideQuestsData = [];
            SideQuestsQuerySnapshot.forEach((doc) => {
                SideQuestsData.push({ ...doc.data(), id: doc.id })

            });

            setSideQuests(SideQuestsData)


 

        } catch (error) {
            console.log("Erro ao tentar acessar dados: ", error);

        }


    }
    const CompletedTasksQuery = async () => {
        try {
            const CompletedQuestsQuerySnapshot = await getDocs(CompletedQuestsCollection)
            const CompletedQuestsData = [];

            CompletedQuestsQuerySnapshot.forEach((doc) => {
                CompletedQuestsData.push({ ...doc.data(), id: doc.id })

            });

            setCompletedTasks(CompletedQuestsData)

   

        } catch (error) {
            console.log("Erro ao tentar acessar dados: ", error);

        }

    }

    const CurrentTasksQuery = async () => {
        try {

            const CurrentQuestsQuerySnapshot = await getDocs(CurrentQuestsCollection)
            const CurrentQuestsData = [];

            CurrentQuestsQuerySnapshot.forEach((doc) => {
                CurrentQuestsData.push({ ...doc.data(), id: doc.id })
            });

            setCurrentTasks(CurrentQuestsData)

            
          
            
        } catch (error) {
            console.log("Erro ao tentar acessar dados: ", error);

        }

    }

    useEffect(() => {

        MainQuestsQuery();
        SideQuestsQuery();
        CompletedTasksQuery();
        CurrentTasksQuery();
    }, [])



    const newQuest = async () => {
        navigation.navigate('MainQuests')

    }

    console.log(CurrentTasks);
    




 


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
                            Lvl
                        </Text>
                        <TouchableOpacity onPress={newQuest}>
                            <AddIcon style={{ fontSize: 25, color: 'white', margin: 6 }} />
                        </TouchableOpacity>

                    </View>
                    <View style={{flex: 1}}>
                        <Scrollbar>
                            <FlatList
                                data={CurrentTasks}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (

                                    <View >
                                        <Text style={{ color: 'white', fontSize: 25 }}>
                                            {item.name}
                                        </Text>

                                    </View>

                                )} />
                        </Scrollbar>

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

})