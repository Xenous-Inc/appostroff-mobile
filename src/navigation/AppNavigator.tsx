import React from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Stacks } from './constants';
import AuthStack, { AuthStackParams } from './stacks/AuthStack';
import MainStack, { MainStackParams } from './stacks/MainStack';
import ProfileStack, { ProfileStackParams } from './stacks/ProfileStack';
import durations from '@styles/durations';
import { MenuProvider } from 'react-native-popup-menu';

export type AppStackParams = {
    [Stacks.AUTH]: NavigatorScreenParams<AuthStackParams>;
    [Stacks.MAIN]: NavigatorScreenParams<MainStackParams>;
    [Stacks.PROFILE]: NavigatorScreenParams<ProfileStackParams>;
};

const Stack = createNativeStackNavigator<AppStackParams>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={Stacks.MAIN}
                screenOptions={{ headerShown: false, animation: 'fade', animationDuration: durations.MEDIUM }}
            >
                <Stack.Screen key={Stacks.AUTH} name={Stacks.AUTH} component={AuthStack} />
                <Stack.Screen key={Stacks.MAIN} name={Stacks.MAIN}>
                    {props => (
                        <MenuProvider {...props}>
                            <MainStack />
                        </MenuProvider>
                    )}
                </Stack.Screen>
                <Stack.Screen key={Stacks.PROFILE} name={Stacks.PROFILE} component={ProfileStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
