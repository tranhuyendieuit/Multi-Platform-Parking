import { color } from '@/constants/color';
import { FCC } from '@/types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  name: string;
  Icon: JSX.Element;
};

const CardOption: FCC<Props> = ({ Icon, name }) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.container}>
        {Icon && Icon}
        <Text style={styles.title}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '47%',
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
  container: {
    backgroundColor: color.white,
    display: 'flex',
    paddingHorizontal: '5%',
    width: '100%',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    color: color.text.dark,
    fontSize: 14,
    fontWeight: '400',
  },
});
export default CardOption;
