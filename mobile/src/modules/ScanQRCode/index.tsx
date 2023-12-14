import { checking } from '@/apis/auth';
import Button from '@/components/Button';
import Header from '@/components/Header/Header';
import { color } from '@/constants/color';
import { useHideBottomBar } from '@/hooks/useHideBottomBar';
import { FCC } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useMutation } from 'react-query';
type Props = {};

const ScanQRCode: FCC<Props> = ({}) => {
  const [scanned, setScanned] = useState(true);
  useHideBottomBar();
  const navigation = useNavigation();

  const { mutate } = useMutation(checking, {
    onSuccess: data => {
      console.log(data);
    },
    onError: e => {
      console.log(e);
    },
  });

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      await BarCodeScanner.requestPermissionsAsync();
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    mutate(data);
  };

  const onBack = () => {
    navigation.canGoBack() && navigation.goBack();
  };
  return (
    <>
      <Header
        onPressLeftButton={onBack}
        leftBtnVariant="back"
        onPressRightButton={() => {}}
        rightBtnVariant="profile"
      />
      <View style={{ height: 30 }} />
      <SafeAreaView style={styles.root}>
        <View style={styles.text}>
          <Text style={styles.title}>Scan QR Code</Text>
          <Text>Align the QR code within the frame to scan.</Text>
        </View>
        <View style={styles.container}>
          <BarCodeScanner
            style={styles.barCode}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
            <View style={styles.topLeft} />
            <View style={styles.topRight} />
            <View style={styles.bottomLeft} />
            <View style={styles.bottomRight} />
            <Ionicons name="camera" size={32} color={color.primary} />
          </BarCodeScanner>
        </View>
        <Button style={styles.button} onPress={() => setScanned(false)}>
          Validate
        </Button>
        <View />
      </SafeAreaView>
    </>
  );
};

export default ScanQRCode;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.white,
    justifyContent: 'space-between',
  },
  topLeft: {
    height: 30,
    width: 30,
    borderTopLeftRadius: 5,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: color.primary,
    top: 10,
    left: 10,
    position: 'absolute',
  },
  topRight: {
    height: 30,
    width: 30,
    borderTopRightRadius: 5,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: color.primary,
    top: 10,
    right: 10,
    position: 'absolute',
  },
  bottomLeft: {
    height: 30,
    width: 30,
    borderBottomLeftRadius: 5,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: color.primary,
    bottom: 10,
    left: 10,
    position: 'absolute',
  },
  bottomRight: {
    height: 30,
    width: 30,
    borderBottomRightRadius: 5,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: color.primary,
    bottom: 10,
    right: 10,
    position: 'absolute',
  },
  container: {
    flexDirection: 'column',
    backgroundColor: color.white,
    width: '90%',
    padding: '5%',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    aspectRatio: 1,
    borderRadius: 10,
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  barCode: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'center',
    width: '85%',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  text: {
    alignItems: 'center',
  },
});
