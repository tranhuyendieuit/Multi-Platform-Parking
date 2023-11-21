import Header from '@/components/Header/Header';
import { color } from '@/constants/color';
import { FCC } from '@/types';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import CardIncoming from './components/CardIncoming';
import { useHideBottomBar } from '@/hooks/useHideBottomBar';
import Button from '@/components/Button';

const IncomingRides: FCC = () => {
  useHideBottomBar();
  return (
    <SafeAreaView style={styles.root}>
      <Header
        title="Incoming Rides"
        onPressLeftButton={() => {}}
        leftBtnVariant="menu"
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
