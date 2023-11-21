import { color } from '@/constants/color';
import { FCC } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {};

const CardIncoming: FCC<Props> = () => {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Amanda</Text>
          <Text style={styles.space}>Space 4c</Text>
        </View>
        <Text style={styles.incomingId}>Unique ID: CPA-0129</Text>
        <View style={styles.column}>
          <Text style={styles.name}>Check-in Time:</Text>
          <Text style={styles.value}>11:00 am</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.name}>Check-out Time (Est):</Text>
          <Text style={styles.value}>05:00 pm</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.name}>Specifications</Text>
          <Text style={styles.value}>None</Text>
        </View>
        <View style={styles.qrButton}>
          <Ionicons name="qr-code" size={40} color={color.white} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    paddingHorizontal: '5%',
    borderRadius: 10,
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  qrButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: -30,
    width: 60,
    height: 60,
    backgroundColor: color.primary,
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: color.white,
    display: 'flex',
    paddingHorizontal: '5%',
    width: '100%',
    borderRadius: 10,
    paddingVertical: 8,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
    borderBottomColor: color.text.grey,
    borderBottomWidth: 1,
  },
  column: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: color.text.dark,
  },
  space: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: color.text.main,
  },
  incomingId: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
    color: color.primary,
  },
  name: {
    color: color.text.light,
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 24,
  },
  value: {
    color: color.text.dark,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default CardIncoming;
