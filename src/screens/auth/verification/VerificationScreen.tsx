import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import { Screens } from '@navigation/constants';
import { AuthStackParams } from '@navigation/stacks/AuthStack';

const VerificationScreen: React.FC<
    NativeStackScreenProps<AuthStackParams, typeof Screens.Auth.VERIFICATION>
> = props => {
    const { navigation } = props;

    return (
        <>
            <Text>Hello World</Text>
        </>
    );
};

export default VerificationScreen;
