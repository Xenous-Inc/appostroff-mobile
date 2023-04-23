import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';
import { Screens } from '@navigation/constants';
import { ProfileStackParams } from '@navigation/stacks/ProfileStack';
import { CompositeScreenProps } from '@react-navigation/native';
import { AppStackParams } from '@navigation/AppNavigator';
import sizes from '@styles/sizes';
import colors from '@styles/colors';
import constants from '@utils/constants';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stacks } from '@navigation/constants';
import { TextInput } from 'react-native-gesture-handler';
import Quote from '@components/molecules/Quote';
import QuoteBox from '@components/atoms/QuoteBox';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

const QuotesScreen: React.FC<
    CompositeScreenProps<
        NativeStackScreenProps<ProfileStackParams, typeof Screens.Profile.QUOTES>,
        NativeStackScreenProps<AppStackParams>
    >
> = props => {
    const [activeQuotes, setActiveQuotes] = useState([true, false, false, false]);
    const [staticContent, setStaticContentHeight] = useState(0);

    const insets = useSafeAreaInsets();

    // defines progress of collapsing: from 0 to 1
    const scrollProgress = useSharedValue(0);
    const direction = useSharedValue(true);
    const scrollOffsetPosition = useSharedValue(0);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollProgress.value = event.nativeEvent.contentOffset.y;
        if (event.nativeEvent.contentOffset.y > scrollOffsetPosition.value) {
            //up
            direction.value = true;
        } else {
            //down
            direction.value = false;
        }
    };

    const handleStaticContentLayout = useCallback(
        (event: LayoutChangeEvent) =>
            event.target.measure((_x, _y, height, _pageX) => {
                setStaticContentHeight(height);
            }),

        [],
    );

    const headerAnimatedStyle = useAnimatedStyle(() => {
        const translateY =
            direction.value && scrollProgress.value > 240
                ? withTiming(-280, { duration: 400 })
                : withTiming(0, { duration: 400 });
        return { transform: [{ translateY }] };
    }, [direction]);

    return (
        <SafeAreaView style={{ backgroundColor: colors.WHITE }}>
            <Animated.FlatList
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                data={constants.QUOTES_DATA}
                onScroll={onScroll}
                onScrollBeginDrag={e => {
                    scrollOffsetPosition.value = e.nativeEvent.contentOffset.y;
                }}
                nestedScrollEnabled={false}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                renderItem={({ item }) => (
                    <Quote
                        textName={item.textName}
                        textWriter={item.textWriter}
                        textQuote={item.textQuote}
                        circleColour={'#5AFFAF'}
                        id={item.id}
                        staticContentHeight={staticContent}
                        type={Quote.QuoteType.QuoteType}
                    />
                )}
            />
            <Animated.View style={[styles.wrapper__content, headerAnimatedStyle]} onLayout={handleStaticContentLayout}>
                <View style={{ height: insets.top * 2 }} />
                <View>
                    <Pressable
                        onPress={() => {
                            props.navigation.navigate(Stacks.PROFILE, { screen: Screens.Profile.PROFILE });
                        }}
                    >
                        <Image source={require('@assets/icons/back.png')} style={styles.content__backIcon} />
                    </Pressable>
                </View>
                <Text style={styles.content__myQuotes}>{constants.quotesHeader}</Text>
                <View style={styles.wrapper__search}>
                    <View style={styles.content__searchBox}>
                        <Image source={require('@assets/icons/search.png')} style={styles.content__searchIcon} />
                        <TextInput placeholder={constants.quotesSearch} style={styles.search__textInput} />
                    </View>
                </View>
                <View style={styles.wrapper__quoteBoxes}>
                    <QuoteBox
                        active={activeQuotes[0]}
                        activeColor={colors.YELLOW_QUOTE}
                        onPress={() => {
                            setActiveQuotes([true, false, false, false]);
                        }}
                    />
                    <QuoteBox
                        active={activeQuotes[1]}
                        activeColor={colors.GREEN_QUOTE}
                        onPress={() => {
                            setActiveQuotes([false, true, false, false]);
                        }}
                    />
                    <QuoteBox
                        active={activeQuotes[2]}
                        activeColor={colors.PURPLE_QUOTE}
                        onPress={() => {
                            setActiveQuotes([false, false, true, false]);
                        }}
                    />
                    <QuoteBox
                        active={activeQuotes[3]}
                        activeColor={colors.BLUE_QUOTE}
                        onPress={() => {
                            setActiveQuotes([false, false, false, true]);
                        }}
                    />
                </View>
                <View style={{ height: insets.top }} />
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        paddingHorizontal: 24,
        backgroundColor: colors.WHITE,
    },
    wrapper__content: {
        position: 'absolute',
        width: '100%',
        overflow: 'hidden',
        paddingHorizontal: sizes.PADDING_BIG,
        marginBottom: 24,
        backgroundColor: colors.WHITE,
    },
    content__backIcon: {
        width: 24,
        height: 24,
    },
    content__myQuotes: {
        fontSize: sizes.TEXT_BIG,
        fontFamily: 'RFDewiExtended_Bold',
        marginBottom: sizes.PADDING_LITTLE,
        marginTop: sizes.PADDING_MEDIUM,
    },
    wrapper__search: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    content__searchBox: {
        width: '100%',
        height: 40,
        backgroundColor: colors.SOFT_GREY,
        borderRadius: 12,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    content__searchIcon: {
        width: 24,
        height: 24,
        marginHorizontal: sizes.PADDING_LITTLE,
    },
    search__textInput: {
        fontSize: sizes.TEXT_SMALL,
        fontFamily: 'RFDewiExtended_Semibold',
        width: '80%',
    },
    wrapper__quoteBoxes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: sizes.PADDING_SMALL,
    },
});

export default QuotesScreen;
