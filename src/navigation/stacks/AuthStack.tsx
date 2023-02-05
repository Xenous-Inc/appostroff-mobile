import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SignInScreen from 'src/screens/auth/signIn/SignInScreen';
import { Screens } from '../constants';

export type AuthStackParams = {
    [Screens.Auth.SIGN_IN]: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParams>();

const AuthStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName={Screens.Auth.SIGN_IN} screenOptions={{ headerShown: false }}>
            <Stack.Screen key={Screens.Auth.SIGN_IN} name={Screens.Auth.SIGN_IN} component={SignInScreen} />
        </Stack.Navigator>
    );
};

export default AuthStack;
