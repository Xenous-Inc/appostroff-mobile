import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import { Screens } from '@navigation/constants';
import { MainStackParams } from '@navigation/stacks/MainStack';

const MainScreen: React.FC<NativeStackScreenProps<MainStackParams, typeof Screens.Main.MAIN>> = props => {
    const { navigation } = props;

    return (
        <>
            <Text>Hello World</Text>
        </>
    );
};

export default MainScreen;
