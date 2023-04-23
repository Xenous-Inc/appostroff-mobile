import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Screens } from '../constants';
import StoryScreen from '@screens/main/story/StoryScreen';

export type MainStackParams = {
    [Screens.Main.MAIN]: undefined;
    [Screens.Main.STORY]: undefined;
};

const Stack = createNativeStackNavigator<MainStackParams>();

const MainStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName={Screens.Main.STORY} screenOptions={{ headerShown: false }}>
            <Stack.Screen key={Screens.Main.STORY} name={Screens.Main.STORY} component={StoryScreen} />
        </Stack.Navigator>
    );
};

export default MainStack;
