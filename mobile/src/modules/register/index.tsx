import { register } from '@/apis/auth/request';
import { color } from '@/constants/color';
import { FCC } from '@/types';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useMutation } from 'react-query';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import { toast } from '@backpackapp-io/react-native-toast';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackRoute } from '@/types/navigation';

enum STEP {
  ONE = 1,
  TWO = 2,
  THREE = 3,
}

const defaultValue = {
  user_name: '',
  password: '',
  email: '',
  phone_number: '',
  first_name: '',
  last_name: '',
  vehicle_brand: '',
  vehicle_model: '',
  plate_number: '',
  is_vehicle_owner: true,
};

const Register: FCC<{}> = () => {
  const [step, setStep] = useState<STEP>(STEP.ONE);
  const [form, setForm] = useState(defaultValue);
  const navigation =
    useNavigation<NavigationProp<RootStackRoute, 'register'>>();

  const { mutate } = useMutation(register, {
    onSuccess: () => {
      toast.success('Register successfully!', {
        duration: 3000,
        styles: {
          view: { backgroundColor: color.background.default },
          text: {
            color: color.success.main,
          },
        },
      });
      navigation.navigate('login');
    },
    onError: () => {
      toast.error('Register failed!', {
        duration: 3000,
        styles: {
          view: { backgroundColor: color.background.default },
          text: {
            color: color.error.main,
          },
        },
      });
    },
  });

  const handleRegister = () => {
    mutate({
      ...form,
      register_date: `${
        new Date().getDay() < 10
          ? `0${new Date().getDay()}`
          : new Date().getDay()
      }/${new Date().getMonth()}/${new Date().getFullYear()}`,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <KeyboardAwareScrollView
        extraScrollHeight={48}
        contentContainerStyle={[styles.container, { paddingBottom: 0 }]}
      >
        {step === STEP.ONE && (
          <StepOne
            onNext={() => setStep(STEP.TWO)}
            password={form.password}
            username={form.user_name}
            setPassword={_ => setForm(prev => ({ ...prev, password: _ }))}
            setUserName={_ => setForm(prev => ({ ...prev, user_name: _ }))}
          />
        )}
        {step === STEP.TWO && (
          <StepTwo
            onRegister={handleRegister}
            onBack={() => setStep(STEP.ONE)}
            brand={form.vehicle_brand}
            email={form.email}
            firstName={form.first_name}
            lastName={form.last_name}
            model={form.vehicle_model}
            phone={form.phone_number}
            plate={form.plate_number}
            setBrand={_ => setForm(prev => ({ ...prev, vehicle_brand: _ }))}
            setEmail={_ => setForm(prev => ({ ...prev, email: _ }))}
            setFirstName={_ => setForm(prev => ({ ...prev, first_name: _ }))}
            setLastName={_ => setForm(prev => ({ ...prev, last_name: _ }))}
            setModel={_ => setForm(prev => ({ ...prev, vehicle_model: _ }))}
            setPhone={_ => setForm(prev => ({ ...prev, phone_number: _ }))}
            setPlate={_ => setForm(prev => ({ ...prev, plate_number: _ }))}
          />
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});
