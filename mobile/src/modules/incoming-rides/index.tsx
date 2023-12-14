import Button from '@/components/Button';
import Header from '@/components/Header/Header';
import { color } from '@/constants/color';
import { FCC } from '@/types';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import CardIncoming from './components/CardIncoming';

const IncomingRides: FCC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation?.getParent().setOptions({
      tabBarStyle: { display: 'none' },
      tabBarVisible: false,
    });
    return () =>
      navigation?.getParent().setOptions({
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
        tabBarVisible: undefined,
      });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.root}>
      <Header
        title="Incoming Rides"
        onPressLeftButton={() => navigation.canGoBack() && navigation.goBack()}
        leftBtnVariant="back"
        onPressRightButton={() => {}}
        rightBtnVariant="profile"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        <View style={styles.container}>
          <CardIncoming />
          <CardIncoming />
          <CardIncoming />
          <CardIncoming />
          <CardIncoming />
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
      <Button style={styles.button}>Back to Home</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.white,
  },
  scrollContainer: {
    marginVertical: 20,
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: color.white,
    gap: 45,
  },
  button: {
    alignSelf: 'center',
    width: '85%',
  },
});
export default IncomingRides;
