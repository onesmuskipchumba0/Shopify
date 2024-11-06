import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ThemeProvider } from '../hooks/ThemeContext';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PoppinsBlack: require('../assets/fonts/Poppins/Poppins-Black.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    PoppinsRegular: require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    PoppinsThin: require('../assets/fonts/Poppins/Poppins-Thin.ttf'),
    PoppinsExtraLight: require('../assets/fonts/Poppins/Poppins-ExtraLight.ttf'),
    PoppinsLight: require('../assets/fonts/Poppins/Poppins-Light.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
    PoppinsExtraBold: require('../assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
    PoppinsItalic: require('../assets/fonts/Poppins/Poppins-Italic.ttf'),
    PopinsBoldItalic: require('../assets/fonts/Poppins/Poppins-BoldItalic.ttf'),
    PoppinsMediumItalic: require('../assets/fonts/Poppins/Poppins-MediumItalic.ttf'),
    PoppinsSemiBoldItalic: require('../assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf'),
    PoppinsExtraLightItalic: require('../assets/fonts/Poppins/Poppins-ExtraLightItalic.ttf'),
    PoppinsLightItalic: require('../assets/fonts/Poppins/Poppins-LightItalic.ttf'),
    PoppinsExtraBoldItalic: require('../assets/fonts/Poppins/Poppins-ExtraBoldItalic.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
      <Stack initialRouteName='auth'>
        <Stack.Screen name="auth" options={{headerShown:false}}/>
        <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
        <Stack.Screen name="screens" options={{headerShown:false}}/>
        <Stack.Screen name="products" options={{headerShown:false}}/>
        <Stack.Screen name="search" options={{headerShown:false}}/>
      </Stack>
    
    
  );
}
