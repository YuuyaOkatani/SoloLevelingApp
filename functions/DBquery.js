import React from 'react'
import { db } from '../api/firebaseConfig';
import { collection, getDocs, addDoc, serverTimestamp, Timestamp, updateDoc, getDoc, doc, deleteDoc, arrayUnion, arrayRemove } from '@firebase/firestore'

import { View, Text, Button, FlatList, Alert, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react'




