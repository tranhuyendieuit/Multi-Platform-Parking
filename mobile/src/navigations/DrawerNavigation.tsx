import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomTab from '.';

import { color as constants } from '@/constants/color';
import { useAuthStore } from '@/store';
import { MaterialIcons } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const CustomSidebarMenu = props => {
  const { user, updateIsLogin, updateUser } = useAuthStore(state => state);
  const onLogOut = () => {
    updateIsLogin(false);
    updateUser(undefined);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.root}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg',
          }}
          alt="Avatar"
        />
        <View style={styles.boxInfo}>
          <Text style={styles.header}>
            {user.first_name + ' ' + user.last_name}
          </Text>
          <Text style={styles.subheader}>
            {user.vehicles.length > 0 && user.vehicles[0].plate_number}
          </Text>
          <Text style={styles.subheader}>{user.email}</Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <TouchableOpacity style={styles.customItem} onPress={onLogOut}>
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
  root: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    alignSelf: 'center',
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  boxInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: constants.text.dark,
  },
  subheader: {
    fontSize: 16,
    fontWeight: '400',
    color: constants.text.light,
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
