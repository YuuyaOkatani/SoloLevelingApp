import React from 'react'
import { db } from '../api/firebaseConfig';
import { collection, getDocs, addDoc, serverTimestamp, Timestamp, updateDoc, getDoc, doc, deleteDoc, arrayUnion, arrayRemove } from '@firebase/firestore'

import { View, Text, Button, FlatList, Alert, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react'
import { MMKV } from 'react-native-mmkv';


export class DBquery {

    storage = new MMKV()


    constructor() {

    }



    getQuests(collectionName) {

        const collectionString = this.storage.getString(collectionName)

        const Quests = collectionString ? JSON.parse(collectionString) : [];



        return Quests



    }

    setQuests(Quest, QuestList) {
        this.storage.set(Quest.class, JSON.stringify(QuestList))
    }

    addQuest(quest , questList) {

        const collectionString = this.storage.getString(questList)

        let Quests = []
        Quests = this.getQuests(questList); 


        Quests.push(quest); 

        this.storage.set(questList, JSON.stringify(Quests));

        
    }

    updateQuests(Quest, name, description, questList) {

        let updatedQuest = {
            ...Quest,
            name: name,
            description: description,
            class: questList
        }

        console.log(updatedQuest);


        const Quests = this.getQuests(Quest.class)
        console.log(Quests);


        let updatedQuestList = []

        if (Quest.class !== questList) {
            this.deleteQuest(Quest);
            this.addQuest(updatedQuest, questList);

        }
        else{
            
            updatedQuestList = Quests.map(quest => {
                if (quest.id === Quest.id) {
                    quest = updatedQuest
                    return quest
                }
                
            })

            this.storage.set(questList, JSON.stringify(updatedQuestList));
        }



        console.log(updatedQuestList);







    }

    deleteQuest(Quest) {
        const Quests = this.getQuests(Quest.class)


        let updatedQuestList = Quests.filter(quest => quest.id !== Quest.id)
        console.log(updatedQuestList);

        this.storage.set(Quest.class, JSON.stringify(updatedQuestList));
    }
}
