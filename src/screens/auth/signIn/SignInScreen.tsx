import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import { Screens } from 'src/navigation/constants';
import { AuthStackParams } from 'src/navigation/stacks/AuthStack';

const SignInScreen: React.FC<NativeStackScreenProps<AuthStackParams, typeof Screens.Auth.SIGN_IN>> = props => {
    const { navigation } = props;

    navigation.navigate(Screens.Auth.SIGN_IN);

    return (
        <>
            <Text>Hello World</Text>
        </>
    );
};

export default SignInScreen;
