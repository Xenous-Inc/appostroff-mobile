import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { useFonts } from 'expo-font';

export default function App() {
    const [fontsLoaded] = useFonts({
        RFDewiExpanded_Bold: require('@assets/fonts/RFDewiExpanded-Bold.ttf'),
        RFDewiExpanded_Regular: require('@assets/fonts/RFDewiExpanded-Regular.ttf'),
        RFDewiExpanded_Semibold: require('@assets/fonts/RFDewiExpanded-Semibold.ttf'),
        RFDewiExtended_Bold: require('@assets/fonts/RFDewiExtended-Bold.ttf'),
        RFDewiExtended_Regular: require('@assets/fonts/RFDewiExtended-Regular.ttf'),
        RFDewiExtended_Semibold: require('@assets/fonts/RFDewiExtended-Semibold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }
    return <AppNavigator />;
}
