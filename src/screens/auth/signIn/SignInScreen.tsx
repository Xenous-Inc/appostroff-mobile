import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import { Screens } from '@navigation/constants';
import { AuthStackParams } from '@navigation/stacks/AuthStack';

const SignInScreen: React.FC<NativeStackScreenProps<AuthStackParams, typeof Screens.Auth.SIGN_IN>> = props => {
    const { navigation } = props;

    return (
        <>
            <Text>Hello World</Text>
        </>
    );
};

export default SignInScreen;
