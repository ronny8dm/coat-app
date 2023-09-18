import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import cameraComponent from './CameraComponent';

const Tab = createBottomTabNavigator();



const Tabs = () => {
    
    return (
          <Tab.Navigator
          initialRouteName="Take a Picture"
            screenOptions={{
              tabBarActiveTintColor: '#4E4FEB',
              tabBarInactiveTintColor: '#000000',
              headerTintColor: '#000000',
              headerStyle: {
                  backgroundColor: '#FFFFFF',
              },
              headerTitleStyle: {
                  fontWeight: 'bold',
              }
              
            }}>
            <Tab.Screen
              name={'Colours'}
              component={cameraComponent}
              options={{
                tabBarIcon: ({focused}) => <Icon name="th-large" size={30} />,
              }}
            />
            <Tab.Screen
              name={'Take a Picture'}
              component={cameraComponent} 
              options={{
                tabBarIcon: ({focused}) => <Icon name="camera" size={30} />,
              }}
            />
            <Tab.Screen
              name={'Settings'}
              component={cameraComponent}
              options={{
                tabBarIcon: ({focused}) => <Icon name="ellipsis-v" size={30} />,
              }}
            />
          </Tab.Navigator>
      );
    };

    // export type RootStackParamList = {
    //     ImagePreview: { Image: string };
    //   };

export default Tabs;
