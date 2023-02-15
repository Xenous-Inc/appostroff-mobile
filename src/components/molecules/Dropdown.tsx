import React, { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
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

const Dropdown: React.FC = () => {
    const collapse = useSharedValue(0);
    const [chosen, setChosen] = useState(0);

    const animatedStyle = useAnimatedStyle(() => {
        const height = interpolate(collapse.value, [0, 1], [0, 56 * constants.DATA.length], Extrapolation.CLAMP);
        return {
            height: withTiming(height, {
                duration: 500,
            }),
        };
    });
    const switcherAnimatedStyle = useAnimatedStyle(() => {
        const rotateZ = interpolate(collapse.value, [0, 1], [0, 180], Extrapolation.CLAMP);
        return {
            rotation: withTiming(rotateZ, {
                duration: 500,
            }),
        };
    });

    const changeHeight = () => {
        collapse.value = 1 - collapse.value;
    };

    return (
        <View style={styles.content}>
            <RenderItem
                title={constants.DATA[chosen].title}
                onPress={changeHeight}
                child={
                    <Animated.View style={[styles.content__switcherWrapper, switcherAnimatedStyle]}>
                        <Image
                            source={require('@assets/icons/switcher.png')}
                            style={styles.switcherWrapper__imageSwitcher}
                        />
                    </Animated.View>
                }
            />
            <View style={styles.content__separator} />
            <Animated.View style={[styles.countries_list, animatedStyle]}>
                <FlatList
                    data={constants.DATA}
                    renderItem={({ item, index }) => (
                        <RenderItem
                            title={item.title}
                            onPress={() => {
                                setChosen(index);
                                changeHeight();
                                console.log(item.id);
                            }}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            </Animated.View>
        </View>
    );
};

export interface IRenderItem {
    title: string;

    onPress(): void;

    child?: JSX.Element;
}

const RenderItem: React.FC<IRenderItem> = props => {
    const { onPress, title, child } = props;
    return (
        <Pressable onPress={onPress} style={styles.renderItem}>
            <View style={styles.renderItem__content}>
                <Image source={require('@assets/icons/flag.png')} style={styles.content__imageFlag} />
                <Text style={styles.content__textCountry}>{title}</Text>
            </View>
            {child}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    content: {
        width: '100%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: colors.SOFT_GREY,
        overflow: 'hidden',
        marginTop: 30,
    },
    content__separator: {
        width: '100%',
        height: 2,
        backgroundColor: colors.SEPARATOR,
    },
    renderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    renderItem__content: {
        height: 56,
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        backgroundColor: colors.SOFT_GREY,
    },
    content__imageFlag: {
        height: 32,
        width: 27,
    },
    switcherWrapper__imageSwitcher: {
        height: 28,
        width: 28,
    },
    content__textCountry: {
        fontFamily: 'RFDewi_Semibold',
        fontSize: sizes.TEXT_SMALL,
        marginLeft: 20,
    },
    countries_list: {
        backgroundColor: colors.SOFT_GREY,
    },
    content__switcherWrapper: {
        marginRight: 20,
    },
});

export default Dropdown;
