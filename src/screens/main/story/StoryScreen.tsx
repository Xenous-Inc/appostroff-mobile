import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    LayoutChangeEvent,
    Pressable,
    ScrollViewProps,
    StyleSheet,
    Text,
    View,
    ViewProps,
} from 'react-native';
import colors from '@styles/colors';
import { MainStackParams } from '@navigation/stacks/MainStack';
import { Screens, Stacks } from '@navigation/constants';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    Easing,
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
import { CompositeScreenProps } from '@react-navigation/native';
import { AppStackParams } from '@navigation/AppNavigator';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetContent from '@components/molecules/BottomSheetContent';

const getDuration = (text: string) => {
    if (text.length / 2000 > 60) {
        return Math.round(text.length / 120000) + 'ч ' + Math.round((text.length % 120000) / 2000) + 'мин';
    }
    return Math.round(text.length / 2000) + 'мин';
};

const StoryScreen: React.FC<
    CompositeScreenProps<
        NativeStackScreenProps<MainStackParams, typeof Screens.Main.STORY>,
        NativeStackScreenProps<AppStackParams>
    >
> = props => {
    // window safe area height
    const insets = useSafeAreaInsets();

    const windowHeight = useMemo(() => Dimensions.get('screen').height - insets.top - insets.bottom, [insets]);
    const windowWidth = useMemo(() => Dimensions.get('screen').width - insets.left - insets.right, [insets]);

    // defines height in pixels, it used to track height of static info
    const [staticContentHeight, setStaticContentHeight] = useState(0);

    // defines height in pixels, is used to track scroll progress
    const [storyTextHeight, setStoryTextHeight] = useState(0);
    // defines shift in pixels, is used to translate story view to make animated transition
    const [shortStoryTextShiftBottom, setShortStoryTextShiftBottom] = useState(0);
    // defines number of symbols from story showed in short story block
    const [shortStoryLength, setShortStoryLength] = useState(0);
    // defines readingProgress: from 0 to 1
    const [readingProgress, setReadingProgress] = useState(0);
    // defines index point bottomSheet
    const [index, setIndex] = useState(-1);

    const scrollViewRef = useRef<Animated.ScrollView>(null);

    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => [270], []);

    // defines progress of collapsing: from 0 to 1
    const collapseProgress = useSharedValue(0);
    // defines progress of scrolling: from 0 to 1
    const scrollProgress = useSharedValue(0);
    // defines progress of measuring short story layout: 0 or 1
    const isShortStoryMeasured = useSharedValue(false);
    // defines is opened bottomSheet
    const isBottomSheetOpened = useSharedValue(false);

    const barAnimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(collapseProgress.value, [0.8, 1], [0, 1], Extrapolation.CLAMP);
        const width = windowWidth - styles.wrapper__header.marginHorizontal * 2;
        const height = interpolate(collapseProgress.value, [0.5, 0.6], [0, 50], Extrapolation.CLAMP);

        return {
            width,
            opacity,
            height,
            marginTop: insets.top,
        };
    });

    const blackoutBackGroundStyle = useAnimatedStyle(() => {
        const opacity = withTiming(isBottomSheetOpened.value ? 0.4 : 0, {
            duration: 1000,
            easing: Easing.inOut(Easing.quad),
        });

        return {
            opacity,
        };
    }, [isBottomSheetOpened]);

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

    const handleScrollAnimatedEnd = () => {
        if (scrollProgress.value > readingProgress) {
            //dispatch(createUserReadingProgressAction(scrollProgress.value));
            setReadingProgress(scrollProgress.value);
            if (scrollProgress.value === 1) {
                isBottomSheetOpened.value = true;
                setIndex(0);
            }
        }
    };

    const handleStaticCoverContentLayout = useCallback(
        (event: LayoutChangeEvent) =>
            event.target.measure((_x, _y, width, height, _pageX) => {
                setStaticContentHeight(height);
            }),
        [],
    );

    // handle layout update of short story view and update necessary values
    const handleShortStoryLayout = useCallback(
        (event: LayoutChangeEvent) =>
            event.target.measure((_x, _y, width, height, _pageX, pageY) => {
                setShortStoryTextShiftBottom(
                    windowHeight + insets.top + insets.bottom - pageY + styles.scroll__story.paddingTop,
                );
                setShortStoryLength(Math.ceil((width * height * 1.5) / styles.shortStory__text.fontSize ** 2));
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

        return { opacity: opacity, transform: [{ translateY }] };
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

    const staticAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            collapseProgress.value,
            [0, 1],
            [0, windowHeight - staticContentHeight - insets.top - insets.bottom - styles.scroll__cover.padding * 2],
            Extrapolation.CLAMP,
        );
        return {
            transform: [{ translateY }],
        };
    });

    return (
        <SafeAreaView style={styles.wrapper}>
            <Animated.View style={[styles.wrapper__header, barAnimatedStyle]}>
                <Animated.View
                    pointerEvents={index === 0 ? 'box-only' : 'none'}
                    style={[styles.wrapper__blackoutBackGround, blackoutBackGroundStyle]}
                />
                <Image source={require('@assets/icons/cancel.png')} style={styles.header__imageExit} />

                <View style={styles.header__progressBar}>
                    <Animated.View style={[styles.progressBar__progress, progressAnimatedStyle]} />
                </View>
                <Image source={require('@assets/icons/arrow_right.png')} style={styles.header__imageNext} />
            </Animated.View>
            <Animated.ScrollView
                style={styles.wrapper__scroll}
                animatedProps={scrollViewAnimatedProps}
                showsVerticalScrollIndicator={false}
                onScroll={handleScrollAnimated}
                onScrollEndDrag={handleScrollAnimatedEnd}
                ref={scrollViewRef}
            >
                <>
                    <View style={[styles.scroll__cover, { height: windowHeight }]}>
                        <Animated.View style={staticAnimatedStyle} onLayout={handleStaticCoverContentLayout}>
                            <Pressable
                                onPress={() => {
                                    props.navigation.navigate(Stacks.PROFILE, { screen: Screens.Profile.PROFILE });
                                }}
                            >
                                <Image
                                    source={require('@assets/icons/profile.png')}
                                    style={styles.cover__profileImage}
                                />
                            </Pressable>
                            <Text style={styles.cover__headerText}>{constants.headerMain}</Text>
                            <View style={styles.cover__coverContent}>
                                <Image
                                    source={require('@assets/icons/bookCover.png')}
                                    style={styles.coverContent__imageCover}
                                />
                                <View style={styles.coverContent__boxes}>
                                    <Box
                                        textHeader={constants.textRating}
                                        textInfo={constants.scoreRating}
                                        imageSource={require('@assets/icons/star.png')}
                                    />
                                    <Box
                                        textHeader={constants.textDuration}
                                        textInfo={getDuration(constants.storyText)}
                                        imageSource={require('@assets/icons/clock.png')}
                                    />
                                    <Box
                                        textHeader={constants.textComplete}
                                        textInfo={`${Math.round(readingProgress * 100)}%`}
                                        imageSource={require('@assets/icons/book.png')}
                                        onPress={() => {
                                            scrollViewRef.current.scrollTo({
                                                x: 0,
                                                y:
                                                    Dimensions.get('window').height +
                                                    (storyTextHeight - Dimensions.get('window').height) *
                                                        readingProgress,
                                                animated: true,
                                            });
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={styles.cover__genres}>
                                <View style={styles.genres__genreWrapper}>
                                    <Text style={styles.genreWrapper__genre}>{constants.textMystic}</Text>
                                </View>
                                <View style={styles.genres__genreWrapper}>
                                    <Text style={styles.genreWrapper__genre}>{constants.textThriller}</Text>
                                </View>
                                <View style={styles.genres__genreWrapper}>
                                    <Text style={styles.genreWrapper__genre}>{constants.textRomance}</Text>
                                </View>
                            </View>
                            <Text style={styles.cover__textName}>{constants.textName}</Text>
                            <Text style={styles.cover__textAuthor}>{constants.textAuthor}</Text>
                        </Animated.View>

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
                                numberOfLines={Math.floor(
                                    (windowHeight -
                                        staticContentHeight -
                                        insets.top -
                                        insets.bottom -
                                        styles.scroll__cover.padding * 2) /
                                        (styles.shortStory__text.fontSize * 1.3),
                                )}
                                ellipsizeMode={'tail'}
                                textBreakStrategy={'balanced'}
                            >
                                {constants.storyText.slice(0, shortStoryLength)}
                            </Animated.Text>
                        </View>
                    </View>

                    <Animated.View
                        style={[styles.scroll__story, storyTextAnimatedStyle]}
                        // pointerEvents={isCoverCollapsed ? 'auto' : 'none'}
                        animatedProps={storyTextAnimatedProps}
                        onLayout={handleStoryLayout}
                    >
                        <Text style={styles.story_text} textBreakStrategy={'balanced'} selectable={true}>
                            {constants.storyText}
                        </Text>
                    </Animated.View>
                </>
            </Animated.ScrollView>
            <Animated.View
                pointerEvents={index === 0 ? 'box-only' : 'none'}
                style={[styles.wrapper__blackoutBackGround, blackoutBackGroundStyle]}
            />
            <BottomSheet
                ref={bottomSheetRef}
                index={index}
                snapPoints={snapPoints}
                enableHandlePanningGesture={false}
                enablePanDownToClose
                handleComponent={null}
                backgroundStyle={styles.wrapper__bottomSheet}
            >
                <BottomSheetContent
                    onPressCancel={() => {
                        isBottomSheetOpened.value = false;
                        bottomSheetRef.current.close();
                        setIndex(-1);
                    }}
                />
            </BottomSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.SOFT_WHITE,
    },
    wrapper__blackoutBackGround: {
        backgroundColor: colors.BLACK,
        position: 'absolute',
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
    },
    wrapper__header: {
        position: 'absolute',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.SOFT_WHITE,
        marginHorizontal: 12,
        paddingHorizontal: 5,
        zIndex: 1000,
    },
    wrapper__bottomSheet: {
        borderRadius: 24,
        backgroundColor: colors.WHITE,
        borderCurve: 'continuous',
    },
    header__imageExit: {
        height: 30,
        width: 30,
    },
    header__progressBar: {
        height: 10,
        width: Dimensions.get('window').width / 1.6,
    },
    progressBar__progress: {
        backgroundColor: colors.GRAY,
        borderRadius: 20,
        height: '100%',
    },
    header__imageNext: {
        height: 14,
        width: 34,
    },
    wrapper__scroll: {
        backgroundColor: colors.SOFT_WHITE,
    },
    scroll__cover: {
        flexDirection: 'column',
        padding: 20,
    },
    cover__profileImage: {
        width: 24,
        height: 24,
        alignSelf: 'flex-end',
    },
    cover__headerText: {
        fontSize: 32,
        fontFamily: 'RFDewiExpanded_Bold',
        marginBottom: sizes.PADDING_BIG,
    },
    cover__coverContent: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 250,
        justifyContent: 'space-between',
    },
    coverContent__imageCover: {
        height: '100%',
        width: '45%',
    },
    coverContent__boxes: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        width: '50%',
    },
    cover__genres: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    genres__genreWrapper: {
        marginTop: sizes.PADDING_SMALL,
        backgroundColor: colors.GREY_BOX,
        borderRadius: 12,
        height: 34,
        width: Dimensions.get('window').width * 0.27,
        justifyContent: 'center',
        alignItems: 'center',
    },
    genreWrapper__genre: {
        fontSize: 14,
        fontFamily: 'RFDewiExtended_Semibold',
        color: colors.LIGHT_GREY,
    },
    cover__textName: {
        marginTop: 20,
        fontSize: sizes.TEXT_BIG,
        fontFamily: 'RFDewiExpanded_Bold',
    },
    cover__textAuthor: {
        marginTop: 20,
        fontSize: sizes.TEXT_VERY_LITTLE,
        fontFamily: 'RFDewiExtended_Regular',
    },
    cover__shortStory: {
        marginTop: 10,
        marginHorizontal: 0,
    },
    shortStory__loader: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    shortStory__text: {
        width: '100%',
        height: '100%',
        lineHeight: 23,
        fontSize: sizes.TEXT_SMALL,
        fontFamily: 'RFDewiExtended_Regular',
    },
    scroll__story: {
        paddingHorizontal: 20,
        paddingTop: Dimensions.get('window').width * 0.12,
    },
    story_text: {
        fontSize: sizes.TEXT_SMALL,
        fontFamily: 'RFDewiExtended_Regular',
        lineHeight: 23,
        width: '100%',
    },
});

export default StoryScreen;
