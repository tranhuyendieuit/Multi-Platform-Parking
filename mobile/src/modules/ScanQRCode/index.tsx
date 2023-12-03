import { color } from '@/constants/color';
import { FCC } from '@/types';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Button from '@/components/Button';
import Header from '@/components/Header/Header';
import React, { useEffect, useState } from 'react';
type Props = {};

const ScanQRCode: FCC<Props> = ({}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    alert(`Scanned QR code with data: ${data}`);
  };
  return (
    <SafeAreaView style={styles.root}>
      <Header
        onPressLeftButton={() => {}}
        leftBtnVariant="menu"
        onPressRightButton={() => {}}
        rightBtnVariant="profile"
      />

      <View style={styles.text}>
        <Text style={styles.title}>Scan QR Code</Text>
        <Text>Align the QR code within the frame to scan.</Text>
      </View>
      <View style={styles.container}>
        <BarCodeScanner
          style={{ flex: 1 }}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <Text style={{ textAlign: 'center', color: 'white' }}>
            {hasPermission
              ? scanned
                ? 'QR Code Scanned!'
                : 'Scanning...'
              : 'No access to camera'}
          </Text>
        </BarCodeScanner>
        <Button style={styles.button}>Validate</Button>
      </View>
    </SafeAreaView>
  );
};

export default ScanQRCode;

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
