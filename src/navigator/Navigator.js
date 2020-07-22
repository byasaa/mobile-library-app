import 'react-native-gesture-handler';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  LoadingScreen,
  AuthScreen,
  HomeScreen,
  RegisterScreen,
  DetailScreen,
  AccountScreen,
  HistoryScreen,
  FormAddScreen,
} from '../screens';
import {connect} from 'react-redux';
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
        component={HistoryScreen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({color}) => (
            <Icon name="file-tray-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color}) => (
            <Icon name="person-circle-outline" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

function Navigator(props) {
  return (
    <NavigationContainer>
      <Root>
        <Stack.Navigator>
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{headerShown: false}}
          />
          {props.auth.isLogin ? (
            <>
              <Stack.Screen
                name="Main"
                component={bottomBar}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{headerShown: false}}
              />
              {props.auth.data.role === 'admin' ? (
                <>
                  <Stack.Screen name="Add" component={FormAddScreen} />
                </>
              ) : null}
            </>
          ) : (
            <>
              <Stack.Screen
                name="Auth"
                component={AuthScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </Root>
    </NavigationContainer>
  );
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Navigator);
