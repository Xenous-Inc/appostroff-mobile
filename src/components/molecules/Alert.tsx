import React, { useEffect, useState } from 'react';
import { BackHandler, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import sizes from '@styles/sizes';
import colors from '@styles/colors';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import constants from '@utils/constants';

export interface IDropdown {
    showAlert: boolean;
    onPress(): void;
}
const Dropdown: React.FC<IDropdown> = props => {
    const { showAlert, onPress } = props;

    useEffect(() => {
        console.log('change');
        showAlert ? (collapse.value = 1) : (collapse.value = 0);
    }, [showAlert]);

    const collapse = useSharedValue(0);

    const wrapperAnimatedStyles = useAnimatedStyle(() => {
        const opacity = interpolate(collapse.value, [0, 1], [0, 0.7], Extrapolation.CLAMP);
        return {
            opacity: withTiming(opacity, {
                duration: 500,
            }),
        };
    });

    return (
        <Animated.View style={[styles.wrapper, wrapperAnimatedStyles]} pointerEvents={showAlert ? 'auto' : 'none'}>
            <Pressable
                onPress={() => {
                    onPress();
                }}
                style={styles.wrapper__pressable}
            />
            <View style={styles.content__alertDialog}>
                <Text style={styles.alertDialog__exit_text}>{constants.exitText}</Text>
                <View style={styles.alertDialog__content_text}>
                    <Pressable
                        onPress={() => {
                            onPress();
                            BackHandler.exitApp();
                        }}
                    >
                        <Text style={styles.content_text__action_text}>{constants.yesText}</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            onPress();
                            console.log(collapse.value);
                        }}
                    >
                        <Text style={styles.content_text__action_text}>{constants.noText}</Text>
                    </Pressable>
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8d8d8d',
    },
    wrapper__pressable: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content__alertDialog: {
        height: 200,
        width: 300,
        borderRadius: 20,
        backgroundColor: colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    alertDialog__exit_text: {
        fontSize: sizes.TEXT_LITTLE,
        fontFamily: 'RFDewi_Regular',
        marginVertical: sizes.PADDING_MEDIUM,
    },
    alertDialog__content_text: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: sizes.PADDING_MEDIUM,
    },
    content_text__action_text: {
        fontFamily: 'RFDewi_Bold',
        fontSize: sizes.TEXT_SMALL,
    },
});

export default Dropdown;
