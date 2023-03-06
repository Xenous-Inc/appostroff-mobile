import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, Image, LayoutChangeEvent, ScrollViewProps, StyleSheet, Text, View, ViewProps } from 'react-native';
import colors from '@styles/colors';
import { MainStackParams } from '@navigation/stacks/MainStack';
import { Screens } from '@navigation/constants';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedProps,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SkeletonLoader from 'expo-skeleton-loader';
import durations from '@styles/durations';
import { LoaderItemStyle } from 'expo-skeleton-loader/lib/Constants';
import sizes from '@styles/sizes';
import constants from '@utils/constants';
import Box from '@components/molecules/Box';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StoryScreen: React.FC<NativeStackScreenProps<MainStackParams, typeof Screens.Main.STORY>> = () => {
    // window safe area height
    const insets = useSafeAreaInsets();

    const windowHeight = useMemo(() => Dimensions.get('screen').height - insets.top - insets.bottom, [insets]);
    const windowWidth = useMemo(() => Dimensions.get('screen').width - insets.left - insets.right, [insets]);

    // defines height in pixels, is used to track scroll progress
    const [storyTextHeight, setStoryTextHeight] = useState(0);
    // defines shift in pixels, is used to translate story view to make animated transition
    const [shortStoryTextShiftBottom, setShortStoryTextShiftBottom] = useState(0);
    // defines number of symbols from story showed in short story block
    const [shortStoryLength, setShortStoryLength] = useState(0);
    // defines number of lines from story showed in short story block
    const [shortStoryLines, setShortStoryLines] = useState(0);

    const scrollViewRef = useRef<Animated.ScrollView>(null);

    // defines progress of collapsing: from 0 to 1
    const collapseProgress = useSharedValue(0);
    // defines progress of scrolling: from 0 to 1
    const scrollProgress = useSharedValue(0);
    // defines progress of measuring short story layout: 0 or 1
    const isShortStoryMeasured = useSharedValue(false);

    const barAnimatedStyle = useAnimatedStyle(() => {
        const opacity = collapseProgress.value;
        const marginTop = insets.top;
        const width = windowWidth - styles.wrapper__progress.marginHorizontal * 2;

        return {
            width,
            opacity,
            marginTop,
        };
    });

    const progressAnimatedStyle = useAnimatedStyle(() => {
        const width = interpolate(scrollProgress.value, [0, 1], [0, windowWidth / 1.6], Extrapolation.CLAMP);
        const opacity = collapseProgress.value;

        return { width, opacity };
    });

    // disable paging after cover collapse
    const scrollViewAnimatedProps = useAnimatedProps<ScrollViewProps>(
        () => ({
            pagingEnabled: collapseProgress.value <= 0.98,
        }),
        [],
    );

    // disable story text pointer events while cover is not collapsed
    const storyTextAnimatedProps = useAnimatedProps<ViewProps>(
        () => ({
            pointerEvents: collapseProgress.value <= 0.98 ? 'none' : 'auto',
        }),
        [],
    );

    const handleScrollAnimated = useAnimatedScrollHandler(
        event => {
            collapseProgress.value = Math.min(event.contentOffset.y / windowHeight, 1);
            scrollProgress.value = Math.max(
                (event.contentOffset.y - windowHeight) / (storyTextHeight - windowHeight),
                0,
            );
        },
        [windowHeight, storyTextHeight],
    );

    // handle layout update of short story view and update necessary values
    const handleShortStoryLayout = useCallback(
        (event: LayoutChangeEvent) =>
            event.target.measure((_x, _y, width, height, _pageX, pageY) => {
                setShortStoryTextShiftBottom(
                    windowHeight + insets.top + insets.bottom - pageY + styles.content__story.paddingTop,
                );
                setShortStoryLength(Math.ceil((width * height * 1.5) / styles.shortStory__text.fontSize ** 2));
                setShortStoryLines(Math.floor(height / (styles.shortStory__text.fontSize * 1.3)));
                isShortStoryMeasured.value = true;
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [windowHeight, insets.top, insets.bottom],
    );

    // handle layout update of full story view and update necessary values
    const handleStoryLayout = useCallback(
        (event: LayoutChangeEvent) =>
            event.target.measure((_x, _y, _width, height, _pageX, _pageY) => setStoryTextHeight(height)),
        [],
    );

    // opacity: hide short story loader after it was measured
    const shortStoryLoaderAnimatedStyle = useAnimatedStyle(
        () => ({ opacity: withTiming(isShortStoryMeasured.value ? 0 : 1, { duration: durations.SHORT }) }),
        [],
    );

    // opacity: hide short story text during the animated transition / show short story text after it was measured
    // transform: translate short story view during the animated transition
    const shortStoryTextAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            collapseProgress.value,
            [0, 1],
            [0, shortStoryTextShiftBottom],
            Extrapolation.CLAMP,
        );
        const opacity =
            collapseProgress.value > 0
                ? interpolate(collapseProgress.value, [0, 1], [1, 0], Extrapolation.CLAMP)
                : withTiming(isShortStoryMeasured.value ? 1 : 0, { duration: durations.SHORT });

        return { opacity, transform: [{ translateY }] };
    }, [shortStoryTextShiftBottom]);

    // opacity: show story during the animated transition
    // transform: translate story view during the animated transition
    const storyTextAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            collapseProgress.value,
            [1, 0],
            [0, -1 * shortStoryTextShiftBottom],
            Extrapolation.CLAMP,
        );

        return { opacity: collapseProgress.value, transform: [{ translateY }] };
    }, [shortStoryTextShiftBottom]);

    const containerAnimatedStyle = useAnimatedStyle(() => {
        const opacity = collapseProgress.value;
        return { opacity };
    }, [collapseProgress]);


    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView>
            <Animated.View style={[styles.wrapper__progress, barAnimatedStyle]}>
                <Animated.View style={[styles.progress__image_wrapper, containerAnimatedStyle]}>
                    <Image source={require('@assets/icons/cancel.png')} style={{ height: 30, width: 30 }} />
                </Animated.View>
                <Animated.View style={[styles.progress__progress_container, containerAnimatedStyle]}>
                    <Animated.View style={[styles.progress__bar, progressAnimatedStyle]} />
                </Animated.View>
                <Animated.View style={[styles.progress__image_wrapper, containerAnimatedStyle]}>
                    <Image source={require('@assets/icons/arrow_right.png')} style={{ height: 14, width: 34 }} />
                </Animated.View>
            </Animated.View>
            <View style={styles.wrapper__content}>
                <View style={styles.content__profile_wrapper}>
                    <Image source={require('@assets/icons/profile.png')} style={styles.content__profile} />
                </View>
                <View style={styles.content__header}>
                    <Text style={styles.content__header}>{constants.headerMain}</Text>
                </View>
                <View style={styles.content__cover_boxes}>
                    <Image source={require('@assets/icons/bookCover.png')} style={styles.content__cover} />
                    <View style={styles.wrapper__content_boxes}>
                        <Box
                            textHeader={constants.textRating}
                            textInfo={constants.scoreRating}
                            imageSource={require('@assets/icons/star.png')}
                        />
                        <Box
                            textHeader={constants.textDuration}
                            textInfo={constants.duration}
                            imageSource={require('@assets/icons/clock.png')}
                        />
                        <Box
                            textHeader={constants.textComplete}
                            textInfo={constants.completePercent}
                            imageSource={require('@assets/icons/book.png')}
                        />
                    </View>
                </View>
                <View style={styles.wrapper__content_genres}>
                    <View style={styles.content__boxg}>
                        <Text style={styles.content__textTag}>{constants.textMystic}</Text>
                    </View>
                    <View style={styles.content__boxg}>
                        <Text style={styles.content__textTag}>{constants.textThriller}</Text>
                    </View>
                    <View style={styles.content__boxg}>
                        <Text style={styles.content__textTag}>{constants.textRomance}</Text>
                    </View>
                </View>
            </View>
            <Animated.ScrollView
                style={styles.wrapper__content}
                animatedProps={scrollViewAnimatedProps}
                showsVerticalScrollIndicator={false}
                onScroll={handleScrollAnimated}
                ref={scrollViewRef}
            >
                <>
                    <View style={[styles.content__cover, { height: windowHeight }]}>
                        <View style={{ height: 670 }} />

                        <View style={styles.cover__shortStory}>
                            <Animated.View style={[styles.shortStory__loader, shortStoryLoaderAnimatedStyle]}>
                                <SkeletonLoader
                                    style={styles.shortStory__loader}
                                    boneColor={colors.SOFT_WHITE}
                                    highlightColor={colors.SKELETON}
                                >
                                    <SkeletonLoader.Item style={{} as LoaderItemStyle} />
                                </SkeletonLoader>
                            </Animated.View>
                            <Animated.Text
                                style={[styles.shortStory__text, shortStoryTextAnimatedStyle]}
                                onLayout={handleShortStoryLayout}
                                numberOfLines={shortStoryLines}
                                ellipsizeMode={'tail'}
                                textBreakStrategy={'balanced'}
                            >
                                {constants.storyText.slice(0, shortStoryLength)}
                            </Animated.Text>
                        </View>
                    </View>

                    <Animated.View
                        style={[styles.content__story, storyTextAnimatedStyle]}
                        // pointerEvents={isCoverCollapsed ? 'auto' : 'none'}
                        animatedProps={storyTextAnimatedProps}
                        onLayout={handleStoryLayout}
                    >
                        <Text style={styles.story_text} textBreakStrategy={'balanced'} selectable={true}>
                            {constants.storyText}
                        </Text>
                    </Animated.View>
                    <View style={{ height: 200, width: '100%' }} />
                </>
            </Animated.ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: colors.WHITE,
    },
    content__profile: {
        width: 24,
        height: 24,
    },
    content__cover: {
        height: '100%',
        borderRadius: 16,
    },
    content__profile_wrapper: {
        alignItems: 'flex-end',
    },
    content__book_cover: {
        alignItems: 'flex-start',
    },
    content__boxpic: {
        alignItems: 'flex-start',
        width: 24,
        height: 24,
    },
    content__header: {
        fontSize: sizes.TEXT_BIG,
        fontFamily: 'RFDewi_Bold',
        marginBottom: sizes.PADDING_LITTLE,
    },
    content__cover_boxes: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 250,
        justifyContent: 'space-between',
    },
    content__white_box: {
        width: 38,
        height: 38,
        backgroundColor: colors.WHITE,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content__boxg: {
        marginTop: sizes.PADDING_SMALL,
        backgroundColor: colors.GREY_BOX,
        borderRadius: 12,
        height: 34,
        width: Dimensions.get('window').width * 0.27,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content__textTag: {
        fontSize: sizes.TEXT_SMALL,
        fontFamily: 'RFDewi_Semibold',
        color: colors.LIGHT_GREY,
    },
    wrapper__content: {
        width: '100%',
        paddingHorizontal: sizes.PADDING_BIG,
    },
    wrapper__content_boxes: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        paddingLeft: 20,
    },
    wrapper__content_genres: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    wrapper__progress: {
        position: 'absolute',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 12,
        backgroundColor: colors.SOFT_WHITE,
        paddingHorizontal: 5,
        height: 50,
        zIndex: 1000,
    },
    progress__progress_container: {
        height: 10,
        width: Dimensions.get('window').width / 1.6,
    },
    progress__image_wrapper: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    progress__bar: {
        backgroundColor: colors.GRAY,
        borderRadius: 20,
        height: '100%',
    },
    wrapper__content: {
        backgroundColor: colors.SOFT_WHITE,
    },
    content__cover: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 20,
    },
    cover__shortStory: {
        flex: 1,
        alignSelf: 'stretch',
    },
    shortStory__loader: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    shortStory__text: {
        height: '100%',
        width: '100%',
        fontSize: sizes.TEXT_MEDIUM,
        fontFamily: 'RFDewi_Regular',
    },
    content__story: {
        paddingHorizontal: 20,
        paddingTop: 28,
    },
    story_text: {
        fontSize: sizes.TEXT_MEDIUM,
        fontFamily: 'RFDewi_Regular',
        width: '100%',
    },
});

export default StoryScreen;
