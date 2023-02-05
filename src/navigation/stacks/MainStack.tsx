import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

export type MainStackParams = any;

const Stack = createNativeStackNavigator<MainStackParams>();

const MainStack: React.FC = () => {
    return <Stack.Navigator screenOptions={{ headerShown: false }}>{/*  */}</Stack.Navigator>;
};

export default MainStack;
