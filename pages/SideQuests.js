import React, {View, Text, StyleSheet} from 'react-native'

export const SideQuests = () => {
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