import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ProfileScreen from '@screens/profile/profile/ProfileScreen';
import { Screens } from '../constants';
import QuotesScreen from './../../screens/profile/quotes/QuoteScreen';
import SettingsScreen from './../../screens/profile/settings/SettingsScreen';

export type ProfileStackParams = {
    [Screens.Profile.PROFILE]: undefined;
    [Screens.Profile.SETTINGS]: undefined;
    [Screens.Profile.QUOTES]: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParams>();

const ProfileStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName={Screens.Profile.PROFILE} screenOptions={{ headerShown: false }}>
            <Stack.Screen key={Screens.Profile.PROFILE} name={Screens.Profile.PROFILE} component={ProfileScreen} />
            <Stack.Screen key={Screens.Profile.SETTINGS} name={Screens.Profile.SETTINGS} component={SettingsScreen} />
            <Stack.Screen key={Screens.Profile.QUOTES} name={Screens.Profile.SETTINGS} component={QuotesScreen} />
        </Stack.Navigator>
    );
};

export default ProfileStack;
