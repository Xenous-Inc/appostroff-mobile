import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import { Screens } from '@navigation/constants';
import { ProfileStackParams } from '@navigation/stacks/ProfileStack';

const SettingsScreen: React.FC<NativeStackScreenProps<ProfileStackParams, typeof Screens.Profile.SETTINGS>> = props => {
    const { navigation } = props;

    return (
        <>
            <Text>Hello World</Text>
        </>
    );
};

export default SettingsScreen;
