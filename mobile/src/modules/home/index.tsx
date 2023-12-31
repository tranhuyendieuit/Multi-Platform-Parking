import Header from '@/components/Header/Header';
import { color } from '@/constants/color';
import { FCC } from '@/types';
import React from 'react';

import { AntDesign, EvilIcons, Foundation, Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardOption from './components/CardOption';
import HeaderHome from './components/HeaderHome';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@/apis/auth';

const Home: FCC<{}> = () => {
  const navigation = useNavigation<any>();
  const onMenu = () => navigation.openDrawer();
  useUser();
  return (
    <SafeAreaView style={styles.root}>
      <Header onPressLeftButton={onMenu} leftBtnVariant="menu" />
      <HeaderHome />
      <View style={styles.container}>
        <CardOption
          Icon={
            <Ionicons
              size={48}
              name="notifications-circle"
              color={color.primary}
            />
          }
          name="Notifications"
          onPress={() => {}}
        />
        <CardOption
          Icon={<EvilIcons size={64} name="user" color={color.primary} />}
          name="View Incoming RIdes"
          onPress={() => navigation.navigate('incoming')}
        />
        <CardOption
          Icon={<Foundation size={48} name="web" color={color.primary} />}
          name="Parking History"
          onPress={() => {}}
        />
        <CardOption
          Icon={<AntDesign size={48} name="contacts" color={color.primary} />}
          name="Contact Police"
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.white,
    width: '100%',
    gap: 24,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    gap: 20,
    flexWrap: 'wrap',
    paddingHorizontal: '5%',
    marginTop: 24,
  },
});
