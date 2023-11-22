import { FCC } from '@/types';
import React from 'react';
import { Image, ImageProps, StyleProp, StyleSheet } from 'react-native';

type Props = {
  style?: StyleProp<ImageProps>;
};

const Logo: FCC<Props> = ({ style, ...props }) => {
  return (
    <Image
      style={[styles.image, style]}
      source={require('@/assets/logo.png')}
      alt="Logo Image"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    height: 100,
    width: 240,
    marginTop: 24,
  },
});
export default Logo;
