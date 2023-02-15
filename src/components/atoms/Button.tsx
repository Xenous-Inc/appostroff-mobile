import React, { useMemo } from 'react';
import { GestureResponderEvent, Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import sizes from '@styles/sizes';
import { darkenColor, setAlpha } from '@utils/colors';
import colors from '@styles/colors';

enum Mode {
    Contained = 'contained',
    Blank = 'blank',
}

export interface IButton {
    mode?: Mode;
    title: string;
    textColor?: string;
    borderColor?: string;
    backgroundColor?: string;
    disabled?: boolean;
    textStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    onPress?(event: GestureResponderEvent): void;
    onLongPress?(event: GestureResponderEvent): void;
}

const Button: React.FC<IButton> & { Mode: typeof Mode } = props => {
    const {
        mode = Mode.Blank,
        title,
        textColor,
        backgroundColor = colors.BLACK,
        borderColor = colors.BLUE,
        disabled,
        textStyle,
        containerStyle,
        onPress,
        onLongPress,
    } = props;

    const isPressed = useSharedValue(false);

    const inactiveBackgroundColor = useMemo<string>(
        () => setAlpha(backgroundColor, mode === Mode.Blank ? 0 : 1),
        [mode, backgroundColor],
    );
    const activeBackgroundColor = useMemo<string>(
        () => setAlpha(darkenColor(backgroundColor), mode === Mode.Blank ? 0.16 : 1),
        [mode, backgroundColor],
    );
    const animatedStyle = useAnimatedStyle(() => ({
        backgroundColor: withSpring(isPressed.value ? activeBackgroundColor : inactiveBackgroundColor, {
            damping: 5,
            mass: 0.5,
        }),
    }));

    return (
        <Pressable
            style={[
                styles.wrapper,
                // todo: merge and apply incoming paddings
                !!StyleSheet.flatten(containerStyle)?.width && { width: '100%' },
                !!StyleSheet.flatten(containerStyle)?.height && { height: '100%' },
            ]}
            onPress={onPress ?? onPress}
            onLongPress={onLongPress ?? onLongPress}
            onPressIn={() => {
                isPressed.value = true;
            }}
            onPressOut={() => {
                isPressed.value = false;
            }}
            disabled={disabled}
        >
            <Animated.View
                style={[
                    styles.wrapper__content,
                    containerStyle,
                    styles.wrapper_property_padding,
                    disabled && styles.wrapper_state_disabled,
                    { borderColor },
                    animatedStyle,
                ]}
            >
                <Text
                    style={[
                        styles.content__text,
                        textStyle,
                        {
                            color:
                                textColor === undefined
                                    ? mode === Mode.Contained
                                        ? colors.WHITE
                                        : colors.TEXT_PRIMARY
                                    : textColor,
                        },
                    ]}
                    selectable={false}
                >
                    {title}
                </Text>
            </Animated.View>
        </Pressable>
    );
};
Button.Mode = Mode;

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper_property_padding: {
        padding: 0,
        paddingStart: 0,
        paddingLeft: 0,
        paddingTop: 0,
        paddingEnd: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    wrapper_state_disabled: {
        opacity: 0.56,
    },
    wrapper__content: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 16,
        height: 56,
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    content__text: {
        backgroundColor: colors.TRANSPARENT,
        fontSize: sizes.TEXT_SMALL,
        textAlign: 'center',
    },
});

export default Button;
