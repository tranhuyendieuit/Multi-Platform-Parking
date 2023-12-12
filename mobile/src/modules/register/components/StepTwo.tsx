import Button from '@/components/Button';
import Header from '@/components/Header/Header';
import Logo from '@/components/Logo';
import TextInput from '@/components/TextField/TextInput';
import { color } from '@/constants/color';
import { FCC } from '@/types';
import { Entypo, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface RegistrationFormProps {
  onRegister: () => void;
  onBack: () => void;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  brand: string;
  model: string;
  plate: string;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setBrand: (value: string) => void;
  setModel: (value: string) => void;
  setPlate: (value: string) => void;
}

const StepTwo: FCC<RegistrationFormProps> = ({
  firstName,
  lastName,
  email,
  phone,
  brand,
  model,
  plate,
  setEmail,
  setPhone,
  setBrand,
  setFirstName,
  setLastName,
  setModel,
  setPlate,
  onRegister,
  onBack,
}) => {
  return (
    <>
      <Header leftBtnVariant="back" onPressLeftButton={onBack} title="" />
      <View style={styles.root}>
        <Logo />
        <View style={styles.flexRow}>
          <View style={{ width: '48%' }}>
            <TextInput
              label="First Name"
              placeholder="You first name "
              keyboardType="default"
              value={firstName}
              onChangeText={setFirstName}
              rightIcon={
                <Entypo name="emoji-neutral" size={18} color={color.primary} />
              }
            />
          </View>
          <View style={{ width: '48%' }}>
            <TextInput
              label="Last Name"
              placeholder="You last name"
              value={lastName}
              onChangeText={setLastName}
              rightIcon={
                <Entypo name="emoji-neutral" size={18} color={color.primary} />
              }
            />
          </View>
        </View>
        <View style={styles.form}>
          <TextInput
            label="Email"
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            rightIcon={<Entypo name="email" size={18} color={color.primary} />}
          />
        </View>
        <View style={styles.form}>
          <TextInput
            label="Mobile Number"
            placeholder="Enter your mobile number"
            value={phone}
            onChangeText={setPhone}
            rightIcon={<Entypo name="phone" size={18} color={color.primary} />}
          />
        </View>
        <View style={styles.form}>
          <TextInput
            label="Vehicle brand"
            placeholder="Your vehicle brand"
            value={brand}
            onChangeText={setBrand}
            rightIcon={
              <Entypo name="flow-branch" size={18} color={color.primary} />
            }
          />
        </View>
        <View style={styles.form}>
          <TextInput
            label="Vehicle model"
            placeholder="Your vehicle model"
            value={model}
            onChangeText={setModel}
            rightIcon={
              <Ionicons name="git-branch" size={18} color={color.primary} />
            }
          />
        </View>
        <View style={styles.form}>
          <TextInput
            label="Vehicle plate"
            placeholder="Your vehicle plate"
            value={plate}
            onChangeText={setPlate}
            rightIcon={
              <Ionicons name="bicycle" size={18} color={color.primary} />
            }
          />
        </View>

        <Button style={styles.button} onPress={onRegister}>
          Register
        </Button>
      </View>
    </>
  );
};

export default StepTwo;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.white,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '5%',
    gap: 28,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  button: {
    width: 260,
  },
  form: {
    width: '100%',
  },
  register: {
    fontSize: 16,
    fontWeight: '700',
    color: color.text.dark,
  },
});
