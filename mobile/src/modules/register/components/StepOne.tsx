import Button from '@/components/Button';
import Logo from '@/components/Logo';
import TextInput from '@/components/TextField/TextInput';
import { color } from '@/constants/color';
import { FCC } from '@/types';
import { RootStackRoute } from '@/types/navigation';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RegistrationFormProps {
  onNext: () => void;
  username: string;
  password: string;
  setUserName: (value: string) => void;
  setPassword: (value: string) => void;
}

const StepOne: FCC<RegistrationFormProps> = ({
  password,
  onNext,
  setPassword,
  setUserName,
  username,
}) => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigation =
    useNavigation<NavigationProp<RootStackRoute, 'register'>>();

  const onLogin = () => {
    navigation.navigate('login');
  };

  const handleNext = () => {
    if (passwordConfirm === password) {
      onNext();
    }
  };

  return (
    <>
      <Logo style={{ marginTop: 48 }} />
      <View style={styles.root}>
        <View style={styles.form}>
          <TextInput
            label="User Name"
            placeholder="User Name "
            keyboardType="default"
            value={username}
            onChangeText={setUserName}
            // {usernameError ? <Text style={{ color: 'red' }}>{usernameError}</Text> : null}
            rightIcon={<Entypo name="email" size={18} color={color.primary} />}
          />
        </View>

        <View style={styles.form}>
          <TextInput
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={isPasswordShown}
            value={password}
            onChangeText={setPassword}
            error={
              password.match(/^(?=.*[A-Za-z\d])[A-Za-z\d]{8,}$/)
                ? ''
                : password && 'Password minimum 8 characters'
            }
            rightIcon={
              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
              >
                <Ionicons
                  name={`eye${isPasswordShown ? '-off' : ''}`}
                  size={18}
                  color={color.primary}
                />
              </TouchableOpacity>
            }
          />
        </View>
        <View style={styles.form}>
          <TextInput
            label="Confirm Password"
            placeholder="Enter your password"
            secureTextEntry={isConfirmPasswordShown}
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            error={
              !passwordConfirm.match(/^(?=.*[A-Za-z\d])[A-Za-z\d]{8,}$/) &&
              passwordConfirm
                ? 'Password minimum 8 characters'
                : passwordConfirm && passwordConfirm !== password
                ? 'Password confirm does not match'
                : ''
            }
            rightIcon={
              <TouchableOpacity
                onPress={() =>
                  setIsConfirmPasswordShown(!isConfirmPasswordShown)
                }
              >
                <Ionicons
                  name={`eye${isConfirmPasswordShown ? '-off' : ''}`}
                  size={18}
                  color={color.primary}
                />
              </TouchableOpacity>
            }
          />
        </View>
        <Button style={styles.button} onPress={handleNext}>
          Next Step
        </Button>
        <View style={styles.flexRow}>
          <View style={styles.under} />
          <Text style={styles.orRegisterWith}>Or Register with</Text>
          <View style={styles.under} />
        </View>
        <View style={[styles.flexRow, { gap: 20 }]}>
          <TouchableOpacity style={styles.imageFGA}>
            <Image
              source={require('@/assets/facebookIcon.png')}
              style={styles.imageFGA}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageFGA}>
            <Image
              source={require('@/assets/googleIcon.png')}
              style={styles.imageFGA}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageFGA}>
            <Image
              source={require('@/assets/appleIcon.png')}
              style={styles.imageFGA}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.hasAccount}>
        Already have an account?{' '}
        <Text style={styles.register} onPress={onLogin}>
          Login
        </Text>
      </Text>
    </>
  );
};

export default StepOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    alignItems: 'center',
    gap: 58,
  },
  root: {
    flex: 1,
    marginTop: 58,
    backgroundColor: color.white,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '5%',
    gap: 28,
  },
  checkBox: {
    flexDirection: 'row',
    paddingHorizontal: '2%',
    width: '100%',
    justifyContent: 'space-between',
  },
  orRegisterWith: {
    fontSize: 14,
    fontWeight: '500',
    color: color.text.grey,
  },
  forGotPassword: {
    fontSize: 16,
    color: color.primary,
    marginLeft: 6,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 260,
  },
  form: {
    width: '100%',
  },
  hasAccount: {
    fontSize: 16,
    fontWeight: '400',
    color: color.text.light,
    alignSelf: 'center',
    bottom: 30,
  },
  register: {
    fontSize: 16,
    fontWeight: '700',
    color: color.text.dark,
  },
  under: {
    flex: 1,
    height: 1.5,
    backgroundColor: color.text.grey,
    marginHorizontal: '5%',
  },
  imageFGA: {
    borderRadius: 30,
    width: 36,
    height: 36,
  },
});
