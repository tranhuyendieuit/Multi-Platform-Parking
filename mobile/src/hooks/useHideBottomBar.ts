import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export function useHideBottomBar() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation?.setOptions({
      tabBarStyle: { display: 'none' },
      tabBarVisible: false,
    });
    return () =>
      navigation?.setOptions({
        tabBarStyle: undefined,
        tabBarVisible: undefined,
      });
  }, [navigation]);
}
