import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, useColorScheme } from 'react-native';
import Detail from '../screen/Detail';
import { GREEN_COLOR, YELLOW_COLOR } from '../colors';
import { authService } from '../firebase';
import { signOut } from 'firebase/auth';
import Review from '../screen/Review';
import Reviewedit from '../screen/Reviewedit';
import Login from '../screen/Login';

const Stack = createNativeStackNavigator();

export default function Stacks({
  navigation: { goBack, navigate, setOptions },
}) {
  const isDark = useColorScheme() === 'dark';

  const handleAuth = () => {
    if (authService.currentUser?.uid) {
      signOut(authService)
        .then(() => {
          console.log('로그아웃 성공');
          setOptions({ headerRight: null });
        })
        .catch((err) => alert(err));
    } else {
      navigate('Login');
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: isDark ? YELLOW_COLOR : GREEN_COLOR,
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={{ color: isDark ? YELLOW_COLOR : GREEN_COLOR }}>
              뒤로
            </Text>
          </TouchableOpacity>
        ),
        headerRight: () => {
          return (
            <TouchableOpacity onPress={handleAuth}>
              <Text style={{ color: isDark ? YELLOW_COLOR : GREEN_COLOR }}>
                {authService.currentUser ? '로그아웃' : '로그인'}
              </Text>
            </TouchableOpacity>
          );
        },
        headerTintColor: isDark ? YELLOW_COLOR : GREEN_COLOR,
      }}
    >
      <Stack.Screen name='Detail' component={Detail} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Review' component={Review} />
      <Stack.Screen name='Reviewedit' component={Reviewedit} />
    </Stack.Navigator>
  );
}
