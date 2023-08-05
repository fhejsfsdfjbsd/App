import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import React from 'react';
import CentersScreen from '../screens/CentersScreen';
import ChatScreen from '../screens/ChatScreen';
import HomeScreen from '../screens/HomeScreen';
import MeditationScreen from '../screens/MeditationScreen';
import MeditationTipsScreen from '../screens/MeditationTipsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const MainContainer = () => {
    //Screen names
    const homeName = "HOME";
    const centersName = "CENTERS";
    const chatName = "CHAT";
    const meditationName = "MEDITATION";
    const meditationTipsName = "ARTICLES";

    const Tab = createBottomTabNavigator();

  return (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === centersName) {
              iconName = focused ? 'location' : 'location-outline';

            } else if (rn === chatName) {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            } 
            else if (rn === meditationName) {
                iconName = focused ? 'body' : 'body-outline';
              }
            else if (rn === meditationTipsName) {
                iconName = focused ? 'reader' : 'reader-outline';
              }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={26} color="#d0dbf2" />;
          },
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 60 },
          headerShown: false,
          tabBarStyle: {
            paddingTop: 10,
            backgroundColor: "#353787",
          },
        })}
        >

        <Tab.Screen name={homeName} component={HomeScreen} options={{tabBarLabelStyle: {color: "#d0dbf2"}}} />
        <Tab.Screen name={centersName} component={CentersScreen} options={{tabBarLabelStyle: {color: "#d0dbf2"}}} />
        <Tab.Screen name={chatName} component={ChatScreen} options={{tabBarLabelStyle: {color: "#d0dbf2"}}} />
        <Tab.Screen name={meditationName} component={MeditationScreen} options={{tabBarLabelStyle: {color: "#d0dbf2"}}} />
        <Tab.Screen name={meditationTipsName} component={MeditationTipsScreen} options={{tabBarLabelStyle: {color: "#d0dbf2"}}} />



      </Tab.Navigator>
  );
}

export default MainContainer;