import React, {View, Text, StyleSheet} from 'react-native'
import { collection } from '@firebase/firestore';
import { db } from '../api/firebaseConfig';
import { useEffect, useState } from 'react';
export const SideQuests = () => {

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
        QuestsQuery('sideQuests');
    }, [])


  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.containerStats}>

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
  
    container1:{
      flex: 1,
      backgroundColor: '#031b40',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderWidth: 1, 
      borderColor: '#a1c2f7'
    },
  
    containerStats:{
  
      flexDirection: 'row',
    }
  })