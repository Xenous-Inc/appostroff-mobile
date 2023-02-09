import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { useFonts } from 'expo-font';

export default function App() {
    const [fontsLoaded] = useFonts({
        RFDewi_Bold: require('@assets/fonts/RFDewi-Bold.ttf'),
        RFDewi_Regular: require('@assets/fonts/RFDewi-Regular.ttf'),
        RFDewi_Semibold: require('@assets/fonts/RFDewi-Semibold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }
    return <AppNavigator />;
}
