import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SignInScreen from '@screens/auth/signIn/SignInScreen';
import { Screens } from '../constants';
import VerificationScreen from '@screens/auth/verification/VerificationScreen';

export type AuthStackParams = {
    [Screens.Auth.SIGN_IN]: undefined;
    [Screens.Auth.VERIFICATION]: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParams>();

const AuthStack: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName={Screens.Auth.SIGN_IN}
            screenOptions={{ headerShown: false, animation: 'slide_from_right', animationDuration: 100 }}
        >
            <Stack.Screen key={Screens.Auth.SIGN_IN} name={Screens.Auth.SIGN_IN} component={SignInScreen} />
            <Stack.Screen
                key={Screens.Auth.VERIFICATION}
                name={Screens.Auth.VERIFICATION}
                component={VerificationScreen}
            />
        </Stack.Navigator>
    );
};

export default AuthStack;
