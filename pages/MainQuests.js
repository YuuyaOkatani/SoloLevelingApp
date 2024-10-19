import React, { View, Text, StyleSheet, FlatList } from 'react-native'
import Scrollbar from 'react-scrollbars-custom'
import { MainQuestsQuery } from '../functions/DBquery'
import { useEffect, useState } from 'react'




export const MainQuests = () => {

    
    
    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Scrollbar>
                    <FlatList
                        data={MainQuestsQuery()}
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