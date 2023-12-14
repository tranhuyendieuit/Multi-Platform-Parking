import { color } from '@/constants/color';
import { useAuthStore } from '@/store';
import { FCC } from '@/types';
import { View } from 'moti';
import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';

const HeaderHome: FCC = () => {
  const { user } = useAuthStore(state => state);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lekki Gardens Car Park A Security</Text>
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
          <Text style={styles.subheader}>{user.email}</Text>
          <Text style={styles.subheader}>
            {user.vehicles.length > 0 && user.vehicles[0].plate_number}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: 20,
  },
  avatar: {
    alignSelf: 'center',
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  boxInfo: {
    flex: 0.7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: color.text.dark,
  },
  subheader: {
    fontSize: 16,
    fontWeight: '400',
    color: color.text.light,
  },
});

export default HeaderHome;
