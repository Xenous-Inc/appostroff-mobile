import React, { useEffect } from 'react';
import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';
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

export interface IAlert {
    showAlert: boolean;
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}
const Alert: React.FC<IAlert> = props => {
    const { showAlert, setShowAlert } = props;

    useEffect(() => {
        showAlert ? (collapse.value = 1) : (collapse.value = 0);
    }, [showAlert]);

    const collapse = useSharedValue(0);

    const wrapperAnimatedStyles = useAnimatedStyle(() => {
        const opacity = interpolate(collapse.value, [0, 1], [0, 1], Extrapolation.CLAMP);
        return {
            opacity: withTiming(opacity, {
                duration: 200,
            }),
        };
    });

    return (
        <Animated.View style={[styles.wrapper, wrapperAnimatedStyles]} pointerEvents={showAlert ? 'auto' : 'none'}>
            <Pressable
                onPress={() => {
                    setShowAlert(!showAlert);
                }}
                style={styles.wrapper__pressable}
            />
            <View style={styles.content__alertDialog}>
                <Text style={styles.alertDialog__exitText}>{constants.exitText}</Text>
                <View style={styles.alertDialog__contentText}>
                    <Pressable
                        onPress={() => {
                            setShowAlert(!showAlert);
                            BackHandler.exitApp();
                        }}
                    >
                        <Text style={styles.content_text__actionText}>{constants.yesText}</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            setShowAlert(!showAlert);
                        }}
                    >
                        <Text style={styles.content_text__actionText}>{constants.noText}</Text>
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
    },
    wrapper__pressable: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.STORY_BACKGROUND,
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
    alertDialog__exitText: {
        fontSize: sizes.TEXT_LITTLE,
        fontFamily: 'RFDewi_Regular',
        marginVertical: sizes.PADDING_MEDIUM,
    },
    alertDialog__contentText: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: sizes.PADDING_MEDIUM,
    },
    content_text__actionText: {
        fontFamily: 'RFDewi_Bold',
        fontSize: sizes.TEXT_SMALL,
    },
});

export default Alert;
