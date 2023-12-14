import Button from '@/components/Button';
import TextInput from '@/components/TextField/TextInput';
import { color } from '@/constants/color';
import { FCC } from '@/types';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';

import { useUser } from '@/apis/auth';
import { login } from '@/apis/auth/request';
import Logo from '@/components/Logo';
import { useToggle } from '@/hooks/useToggle';
import { useAuthStore } from '@/store';
import { RootStackRoute } from '@/types/navigation';
import { toast } from '@backpackapp-io/react-native-toast';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useMutation } from 'react-query';

const Login: FCC<{}> = () => {
  const [isPasswordShown, setIsPasswordShown] = useToggle(true);
  const [isChecked, setIsChecked] = useToggle(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackRoute, 'login'>>();

  const { updateIsLogin, updateUser } = useAuthStore(state => state);
  const { refetch } = useUser({
    onSuccess: data => {
      updateUser(data?.data);
      updateIsLogin(!!data);
    },
    onError: async () => {
      updateUser(undefined);
      updateIsLogin(false);
    },
    enabled: false,
  });
  const { mutate } = useMutation(login, {
    onSuccess: async data => {
      await SecureStore.setItemAsync('access_token', data.data);
      refetch();
    },
    onError: () => {
      toast.error('Username or password incorect', {
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

  const handleLogin = () => {
    mutate({ user_name: username, password });
  };

  const onRegister = () => {
    navigation.navigate('register');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.container, { paddingBottom: 0 }]}
      >
        <Logo style={{ marginTop: 48 }} />
        <View style={styles.root}>
          <View style={styles.form}>
            <TextInput
              label="User Name"
              keyboardType="default"
              placeholder="Enter your user name"
              value={username}
              onChangeText={setUsername}
              // error={
              //   username.match(/^(?=.*[A-Za-z\d])[A-Za-z\d]$/)
              //     ? ''
              //     : username && 'User Name invalid'
              // }
              rightIcon={
                <Entypo name="email" size={18} color={color.primary} />
              }
            />
          </View>

          <View style={styles.form}>
            <TextInput
              label="Password"
              placeholder="Enter your password"
              secureTextEntry={isPasswordShown}
              value={password}
              onChangeText={setPassword}
              // error={
              //   password.match(/^(?=.*[A-Za-z\d])[A-Za-z\d]{8,}$/)
              //     ? ''
              //     : password && 'Password minimum 8 characters'
              // }
              rightIcon={
                <TouchableOpacity onPress={setIsPasswordShown}>
                  <Ionicons
                    name={`eye${isPasswordShown ? '-off' : ''}`}
                    size={18}
                    color={color.primary}
                  />
                </TouchableOpacity>
              }
            />
          </View>

          <View style={styles.checkBox}>
            <View style={styles.flexRow}>
              <Checkbox
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? color.primary : undefined}
              />
              <Text style={{ marginLeft: 5 }}>Remember password</Text>
            </View>
            <Pressable>
              <Text style={styles.forGotPassword}>Forgot password?</Text>
            </Pressable>
          </View>
          <Button style={styles.button} onPress={handleLogin}>
            Login
          </Button>
          <View style={styles.flexRow}>
            <View style={styles.under} />
            <Text style={styles.orLoginWith}>Or Login with</Text>
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
          <Text style={styles.register} onPress={onRegister}>
            Register
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    alignItems: 'center',
    gap: 58,
  },
  root: {
    flex: 1,
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
  orLoginWith: {
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
