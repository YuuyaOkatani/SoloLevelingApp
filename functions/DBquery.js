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
}

