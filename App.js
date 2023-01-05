import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import Root from './navigation/Root';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from '@emotion/react';
import { darkTheme, lightTheme } from './theme';

const queryClient = new QueryClient();

export default function App() {
  const isDark = useColorScheme() === 'dark';
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {/* // <ThemeProvider theme={isDark ? lightTheme : darkTheme}> */}
        <StatusBar />
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          {/* <NavigationContainer theme={isDark ? DefaultTheme : DarkTheme}> */}
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
