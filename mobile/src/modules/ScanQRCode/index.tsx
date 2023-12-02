import React, { useState } from 'react';
import Header from '@/components/Header/Header';
import { color } from '@/constants/color';
import { FCC } from '@/types';
// import { RootStackRoute } from '@/types/navigation';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
// import { useNavigation, NavigationProp } from '@react-navigation/native';
// import { BarcodeType } from 'react-native-camera/types';
import Button from '@/components/Button';
// import { NavigationContainer } from '@react-navigation/native';
type Props = {};

const ScanQRCode: FCC<Props> = ({}) => {
  // const cameraRef = useRef<RNCamera | null>(null);
  const [scanned, setScanned] = useState(false);
  // const handleBarCodeRead = (barcodes: Barcode[]) => {
  //   if (barcodes.length > 0) {
  //     const { data } = barcodes[0];
  //     // Process the QR code data here
  //     console.log(`Barcode value is ${data}`);
  //     // Perform other actions as per your requirement
  //   }
  // };
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
        <RNCamera
          style={{ flex: 1 }}
          onBarCodeRead={scanned ? undefined : handleBarCodeScanned}
        >
          <Text style={{ textAlign: 'center', color: 'white' }}>
            {scanned ? 'QR Code Scanned!' : 'Scanning...'}
          </Text>
        </RNCamera>
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
