import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import { Screens } from '@navigation/constants';
import { ProfileStackParams } from '@navigation/stacks/ProfileStack';

const ProfileScreen: React.FC<NativeStackScreenProps<ProfileStackParams, typeof Screens.Profile.PROFILE>> = props => {
    const { navigation } = props;

    return (
        <>
            <Text>Hello World</Text>
        </>
    );
};

export default ProfileScreen;
