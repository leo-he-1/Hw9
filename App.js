import React, {useState} from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function DashboardScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dashboard</Text>
    </View>
  );
}
function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login</Text>
    </View>
  );
}
const Tab = createBottomTabNavigator();

export default function App() {
const[authToken, setAuthToken] = useState();

const resetData = async () =>{
  try {
    await AsyncStorage.setItem('AuthToken','');
  }catch(e){
    console.log('Data did not save');
  }
}

const saveData = async () =>{
  try {
    await AsyncStorage.setItem('AuthToken','Lasha');
  }catch(e){
    console.log('Data did not save');
  }
}
const getData = async () =>{
  try {
    const result = await AsyncStorage.getItem('AuthToken');
    setAuthToken(result);
  }catch (e){
    console.log('fetching data failed');
  }
}
saveData();
//getData();



  return (
    <NavigationContainer>
      <Button
        title="Login to Dashboard"
        onPress={() => getData()}
      /> 
      <Button
        title="Logout"
        onPress={() => [resetData(),getData()]}
      /> 
      <Tab.Navigator>
        {authToken === 'Lasha' ? (
        <><Tab.Screen name="Dashboard" component={DashboardScreen} /><Tab.Screen name="Home" component={HomeScreen} /></>)
        :
        (<Tab.Screen name="Login" component={LoginScreen} />)}
      </Tab.Navigator>
    </NavigationContainer>
  );
}