import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'; 
import ProjectData from '../screens/ProjectData'
import AddSpecimen from '../screens/AddSpecimen'

const Tab = createBottomTabNavigator()

const Tabs =() => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'grey',
            tabBarStyle: {
                backgroundColor: '#f0f8ff'
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25,
                color: 'tomato'
            }
        }}>
            <Tab.Screen name={'Dados do contratante:'} component={ProjectData} options={{
              tabBarIcon: ({ focused }) => <MaterialIcons name={'description'}
              size={25}
              color={focused ? 'tomato' : 'black'}
               />              
            }}>                
            </Tab.Screen>
            <Tab.Screen name={'Dados (corpos de prova)'} component={AddSpecimen} options={{
              tabBarIcon: ({ focused }) => <MaterialIcons name={'format-list-numbered'}
              size={25}
              color={focused ? 'tomato' : 'black'}
               />              
            }}>                
            </Tab.Screen>

        </Tab.Navigator>
    )
}

export default Tabs