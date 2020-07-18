import 'react-native-gesture-handler';
import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  LoadingScreen,
  AuthScreen,
  HomeScreen,
  RegisterScreen,
  DetailScreen,
} from '../screens';
import {Root} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const bottomBar = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          shadowOffset: {width: 3, height: 5},
          shadowColor: 'black',
          shadowOpacity: 0.5,
          elevation: 5,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({tintColor}) => (
            <Icon name="home-outline" color={tintColor} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={AuthScreen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({tintColor}) => (
            <Icon name="file-tray-outline" color={tintColor} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={RegisterScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({tintColor}) => (
            <Icon name="person-circle-outline" color={tintColor} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Root>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={bottomBar}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{headerTransparent: true, headerTitle: null}}
          />
        </Stack.Navigator>
      </Root>
    </NavigationContainer>
  );
}
