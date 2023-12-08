import { color } from '@/constants/color';
import Home from '@/modules/home';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutDown,
  Layout,
} from 'react-native-reanimated';
import IncomingRidesNavigation from './IncomingRides';
import ScanQRCode from '@/modules/ScanQRCode';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
        headerShown: false,
      })}
      tabBar={props => (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutDown}
          layout={Layout.duration(1000)}
        >
          <BottomTabBar {...props} />
        </Animated.View>
      )}
    >
      <Tab.Screen
        name="Dashboard"
        component={IncomingRidesNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconTop}>
              <Feather
                name="home"
                size={30}
                color={focused ? color.primary : color.text.light}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconTop}>
              <Ionicons
                name="search"
                size={30}
                color={focused ? color.primary : color.text.light}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={ScanQRCode}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.addItem}>
              <Ionicons
                name="qr-code"
                size={35}
                style={{
                  alignSelf: 'center',
                  shadowColor: color.black,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 2,
                  elevation: 2,
                }}
                color={focused ? color.primary : color.primary}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconTop}>
              <MaterialIcons
                name="category"
                size={30}
                color={focused ? color.primary : color.text.light}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconTop}>
              <MaterialIcons
                name="person-outline"
                size={30}
                color={focused ? color.primary : color.text.light}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTab;

const styles = StyleSheet.create({
  addItem: {
    top: -15,
    width: 60,
    height: 60,
    padding: 10,
    borderRadius: 35,
    backgroundColor: color.white,
    justifyContent: 'center',
    alignContent: 'center',
  },
  tabBarStyle: {
    display: 'flex',
    position: 'absolute',
    bottom: 20,
    left: 25,
    right: 25,
    elevation: 5,
    backgroundColor: '#F0F0F3',
    borderRadius: 30,
    height: 60,
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  iconTop: {
    top: Platform.OS === 'ios' ? 10 : 0,
  },
});
