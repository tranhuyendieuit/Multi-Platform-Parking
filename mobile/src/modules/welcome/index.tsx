import Button from '@/components/Button';
import Logo from '@/components/Logo';
import { color } from '@/constants/color';
import { FCC } from '@/types';
import { RootStackRoute } from '@/types/navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import {
  Animated,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
} from 'react-native';

const images = [
  'https://img.freepik.com/free-photo/top-view-electric-cars-parking-lot_23-2148972403.jpg?w=1380&t=st=1700583598~exp=1700584198~hmac=a71fa1f3ab8158578bb3e462280973ed2e4597864bf9eba7eff3db45ec29f730',
  'https://img.freepik.com/premium-photo/cars-parked-road_10541-812.jpg?w=1060',
  'https://img.freepik.com/premium-photo/cars-parking-lot-evening-light-sun_150893-219.jpg?w=1060',
];

const Welcome: FCC<{}> = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();

  const navigation = useNavigation<NavigationProp<RootStackRoute, 'welcome'>>();

  const onRegister = () => {
    navigation.navigate('register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={1}
        >
          {images.map((image, imageIndex) => {
            return (
              <View
                style={{ width: windowWidth, height: 250 }}
                key={imageIndex}
              >
                <ImageBackground source={{ uri: image }} style={styles.card} />
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {images.map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
              ],
              outputRange: [11, 40, 11],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[styles.normalDot, { width }]}
              />
            );
          })}
        </View>
      </View>

      <View style={styles.title}>
        <Text>Welcome to Parking Lot</Text>
      </View>
      <View style={{ flexDirection: 'column', gap: 10, bottom: 0 }}>
        <Button style={{ width: windowWidth - 50 }} onPress={onRegister}>
          Next
        </Button>
        <Button
          style={{ width: windowWidth - 50 }}
          variants="outlined"
          onPress={onRegister}
        >
          Skip
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    alignItems: 'center',
    gap: 58,
  },
  scrollContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -35
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  normalDot: {
    height: 11,
    width: 11,
    borderRadius: 10,
    backgroundColor: color.primary,
    marginHorizontal: 5,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    height: 171,
    top: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.black,
  },
});
