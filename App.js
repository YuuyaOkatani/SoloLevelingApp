
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Homepage } from './pages/Homepage';
import { NewQuest } from './pages/NewQuest';
import { QueryQuest } from './pages/QueryQuest';
import { QuestDetails } from './pages/questDetails';
import { StatusPage } from './pages/StatusPage';
import { SincronizeButton } from './pages/SincronizeButton';
import { SettingsPage } from './pages/SettingsPage';
export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer >
      <Stack.Navigator  screenOptions={{headerShown: false}}  initialRouteName="Home">
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="NewQuest" component={NewQuest} />
        <Stack.Screen name="QueryQuest" component={QueryQuest} />
        <Stack.Screen name="QuestDetails" component={QuestDetails } />
        <Stack.Screen name="StatusPage" component={StatusPage} />
        <Stack.Screen name="SincronizeButton" component={SincronizeButton} />
        <Stack.Screen name="SettingsPage" component={SettingsPage} />
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
