import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MainScreen from '@screens/main/main/StoryScreen';
import { Screens } from '../constants';
import StoryScreen from '@screens/main/story/MainScreen';

export type MainStackParams = {
    [Screens.Main.MAIN]: undefined;
    [Screens.Main.STORY]: undefined;
};

const Stack = createNativeStackNavigator<MainStackParams>();

const MainStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName={Screens.Main.MAIN} screenOptions={{ headerShown: false }}>
            <Stack.Screen key={Screens.Main.MAIN} name={Screens.Main.MAIN} component={MainScreen} />
            <Stack.Screen key={Screens.Main.STORY} name={Screens.Main.STORY} component={StoryScreen} />
        </Stack.Navigator>
    );
};

export default MainStack;
