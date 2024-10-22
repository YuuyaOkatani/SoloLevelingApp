import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, TouchableOpacity } from 'react-native'
export const SincronizeButton = () => {
    return (

        <View style={styles.container}>
            <View style={styles.container1}>

                <TouchableOpacity
                    style={styles.button}
          
                >
                    <Text>Sincronizar</Text>
                   
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

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue',
        width: 200,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
    }
})