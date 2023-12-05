import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomTab from '.';

import Logo from '@/components/Logo';
import { color as constants } from '@/constants/color';
import { MaterialIcons } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const CustomSidebarMenu = props => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Logo />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <TouchableOpacity style={styles.customItem}>
          <MaterialIcons name="logout" size={24} color={constants.text.main} />
          <Text style={styles.itemText}>Logout</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  customItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    gap: 32,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '600',
    color: constants.text.main,
  },
});

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: () => null,
        drawerActiveTintColor: constants.success.light,
        drawerItemStyle: { marginVertical: 5 },
      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={BottomTab}
        options={{
          drawerIcon: ({ color, focused, size }) => (
            <MaterialIcons
              name="home"
              size={size}
              color={focused ? constants.primary : color}
            />
          ),
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="PaymentsMethods"
        component={NotificationsScreen}
        options={{
          drawerIcon: ({ color, focused, size }) => (
            <MaterialIcons
              name="payments"
              size={size}
              color={focused ? constants.primary : color}
            />
          ),
          title: 'Payments Methods',
        }}
      />
      <Drawer.Screen
        name="ParkingHistory"
        component={NotificationsScreen}
        options={{
          drawerIcon: ({ color, focused, size }) => (
            <MaterialIcons
              name="history"
              size={size}
              color={focused ? constants.primary : color}
            />
          ),
          title: 'Parking History',
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          drawerIcon: ({ color, focused, size }) => (
            <MaterialIcons
              name="notifications"
              size={size}
              color={focused ? constants.primary : color}
            />
          ),
          title: 'Notifications',
        }}
      />
    </Drawer.Navigator>
  );
}
