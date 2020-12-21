import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Receiver from '../screens/ReceiverDetails';
import Home from '../screens/Home';

export const AppStackNavigator= createStackNavigator({
    Home:{
       screen:Home,
       navigationOptions:{
           headerShown:false
       }
    },
    Receiver:{
        screen:Receiver,
        navigationOptions:{
         headerShown:false
        }
    },
},
    {
        initialRouteName:'Home'
    }
)