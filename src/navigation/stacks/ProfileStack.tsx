import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

export type ProfileStackParams = any;

const Stack = createNativeStackNavigator<ProfileStackParams>();

const ProfileStack: React.FC = () => {
    return <Stack.Navigator screenOptions={{ headerShown: false }}>{/*  */}</Stack.Navigator>;
};

export default ProfileStack;
