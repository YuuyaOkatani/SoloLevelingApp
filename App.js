import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Homepage } from './pages/Homepage';
import { MainQuests } from './pages/MainQuests';
import { SideQuests } from './pages/SideQuests';
export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer >
      <Stack.Navigator  screenOptions={{headerShown: false}}  initialRouteName="Home">
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="MainQuests" component={MainQuests} />
        <Stack.Screen name="SideQuests" component={SideQuests} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
