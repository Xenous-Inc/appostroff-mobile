import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import sizes from '@styles/sizes';
import colors from '@styles/colors';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const Index = props => {
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Российская Федерация',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Российская Федерация',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Российская Федерация',
        },
    ];

    const height = useSharedValue(0);
    const heightSeparator = useSharedValue(0);
    const rotateZ = useSharedValue(0);
    const screenHeight = 56 * DATA.length;
    const [choosenOne, setChoosenOne] = useState(0);

    const RenderItem = prop => {
        return (
            <Pressable
                onPress={() => {
                    changeHeight();
                    setChoosenOne(prop.index);
                }}
            >
                <View style={styles.wrapper_render_item}>
                    <Image source={require('@assets/icons/flag.png')} style={styles.wrapper_render_item__image_flag} />
                    <Text style={styles.wrapper_render_item__text}>{DATA[prop.index].title}</Text>
                </View>
            </Pressable>
        );
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: withTiming(height.value, {
                duration: 500,
            }),
        };
    });
    const switcherAnimatedStyle = useAnimatedStyle(() => {
        return {
            rotation: withTiming(rotateZ.value, {
                duration: 500,
            }),
        };
    });

    const changeHeight = () => {
        height.value === screenHeight ? (height.value = 0) : (height.value = screenHeight);
        heightSeparator.value === 2 ? (heightSeparator.value = 0) : (heightSeparator.value = 2);
        rotateZ.value === 180 ? (rotateZ.value = 0) : (rotateZ.value = 180);
    };

    return (
        <View style={{ width: '100%' }}>
            <Pressable onPress={() => changeHeight()}>
                <View style={styles.wrapper}>
                    <View style={styles.wrapper_render_item}>
                        <Image
                            source={require('@assets/icons/flag.png')}
                            style={styles.wrapper_render_item__image_flag}
                        />
                        <Text style={styles.wrapper_render_item__text}>{DATA[choosenOne].title}</Text>
                    </View>
                    <Animated.View style={[styles.wrapper__switcher_container, switcherAnimatedStyle]}>
                        <Image
                            source={require('@assets/icons/switcher.png')}
                            style={styles.switcher_container__image_switcher}
                        />
                    </Animated.View>
                </View>
            </Pressable>
            <View style={styles.separator} />
            <Animated.View style={[styles.countries_list, animatedStyle]}>
                <FlatList data={DATA} renderItem={RenderItem} keyExtractor={item => item.id} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 56,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: colors.SOFT_GREY,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    separator: {
        width: '100%',
        height: 2,
        backgroundColor: colors.SEPARATOR,
    },
    wrapper_render_item: {
        height: 56,
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
    },
    wrapper_render_item__image_flag: {
        height: 32,
        width: 27,
    },
    switcher_container__image_switcher: {
        height: 28,
        width: 28,
    },
    wrapper_render_item__text: {
        fontFamily: 'RFDewi_Semibold',
        fontSize: sizes.TEXT_SMALL,
        marginLeft: 20,
    },
    countries_list: {
        backgroundColor: colors.SOFT_GREY,
    },
    wrapper__switcher_container: {
        marginRight: 20,
    },
});

export default Index;
