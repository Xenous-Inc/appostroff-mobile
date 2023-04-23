import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { AppStackParams } from '@navigation/AppNavigator';
import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';
import { Screens } from '@navigation/constants';
import { ProfileStackParams } from '@navigation/stacks/ProfileStack';
import sizes from '@styles/sizes';
import colors from '@styles/colors';
import constants from '@utils/constants';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stacks } from '@navigation/constants';
import ProfileBox from '@components/molecules/ProfileBox';
import Quote from '@components/molecules/Quote';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

const ProfileScreen: React.FC<
    CompositeScreenProps<
        NativeStackScreenProps<ProfileStackParams, typeof Screens.Profile.PROFILE>,
        NativeStackScreenProps<AppStackParams>
    >
> = props => {
    const insets = useSafeAreaInsets();

    const windowHeight = useMemo(() => Dimensions.get('screen').height - insets.top - insets.bottom, [insets]);

    // defines progress of collapsing: from 0 to 1
    const collapseProgress = useSharedValue(0);

    const handleScrollAnimated = useAnimatedScrollHandler(
        event => {
            collapseProgress.value = Math.min(event.contentOffset.y / windowHeight, 1);
        },
        [windowHeight],
    );

    return (
        <SafeAreaView style={{ backgroundColor: colors.WHITE }}>
            <Animated.FlatList
                ListHeaderComponent={
                    <Animated.View style={[styles.wrapper__content, { paddingTop: insets.top }]}>
                        <View style={styles.content__iconsWrapper}>
                            <Pressable
                                onPress={() => {
                                    props.navigation.navigate(Stacks.MAIN, { screen: Screens.Main.STORY });
                                }}
                            >
                                <Image source={require('@assets/icons/back.png')} style={styles.content__icons} />
                            </Pressable>
                            <Image source={require('@assets/icons/search.png')} style={styles.content__icons} />
                        </View>
                        <View style={styles.wrapper__profilePic}>
                            <Image source={require('@assets/icons/avatar.png')} style={styles.content__profilepic} />
                        </View>
                        <View style={styles.wrapper__name}>
                            <Text style={styles.content__name}>{constants.name}</Text>
                        </View>
                        <View style={styles.wrapper__content_boxes}>
                            <ProfileBox
                                textHeader={constants.boxInterests}
                                imageSource={require('@assets/icons/searchStars.png')}
                            />
                            <ProfileBox
                                textHeader={constants.boxSettin}
                                imageSource={require('@assets/icons/settings.png')}
                            />
                        </View>
                        <View style={styles.wrapper__boxInfo}>
                            <View>
                                <Text style={styles.content__textInfo}>{constants.infoRead}</Text>
                                <Text style={styles.content__textTag}>{constants.infoCount}</Text>
                            </View>
                            <View style={styles.content__separator} />
                            <View>
                                <Text style={styles.content__textInfo}>{constants.infoAllQuotes}</Text>
                                <Text style={styles.content__textTag}>{constants.infoQuotesCount}</Text>
                            </View>
                            <View style={styles.content__separator} />
                            <View>
                                <Text style={styles.content__textInfo}>{constants.infoStreaks}</Text>
                                <Text style={styles.content__textTag}>{constants.infoStreakLevel}</Text>
                            </View>
                        </View>
                        <View style={styles.wrapper__quotes}>
                            <Text style={styles.content__quotesHeader}>{constants.quotesHeader}</Text>
                            <Pressable
                                onPress={() => {
                                    props.navigation.navigate(Stacks.PROFILE, { screen: Screens.Profile.QUOTES });
                                }}
                            >
                                <Text style={styles.content__quotesAllText}>{constants.quotesAllText}</Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                }
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                onScroll={handleScrollAnimated}
                data={constants.QUOTES_DATA}
                nestedScrollEnabled={false}
                renderItem={({ item }) => (
                    <Quote
                        textName={item.textName}
                        textWriter={item.textWriter}
                        textQuote={item.textQuote}
                        circleColour={'#5AFFAF'}
                        collapseProgress={collapseProgress}
                        isLast={item.isLast}
                        type={Quote.QuoteType.ProfileType}
                    />
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper__content: {
        width: '100%',
        paddingHorizontal: 24,
    },
    content__iconsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content__icons: {
        width: 24,
        height: 24,
    },
    wrapper__profilePic: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: sizes.PADDING_LITTLE,
    },
    content__profilepic: {
        width: 120,
        height: 120,
        borderRadius: 24,
    },
    wrapper__name: {
        alignItems: 'center',
        paddingTop: sizes.PADDING_MEDIUM,
    },
    content__name: {
        fontSize: sizes.TEXT_MEDIUM_BIG,
        fontFamily: 'RFDewiExtended_Bold',
        marginBottom: sizes.PADDING_LITTLE,
    },
    wrapper__content_boxes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: sizes.PADDING_SMALL,
    },
    wrapper__boxInfo: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: sizes.PADDING_SMALL,
    },
    content__textInfo: {
        fontSize: sizes.TEXT_VERY_LITTLE,
        fontFamily: 'RFDewiExtended_Semibold',
        color: colors.GREY_INFO,
    },
    content__textTag: {
        fontSize: sizes.TEXT_MEDIUM_BIG,
        fontFamily: 'RFDewiExpanded_Semibold',
        color: colors.BLACK,
    },
    content__separator: {
        height: 21,
        width: 1,
        backgroundColor: colors.GREY_SEPARATOR,
    },
    wrapper__quotes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 44,
        marginBottom: sizes.PADDING_BIG,
    },
    content__quotesHeader: {
        fontSize: sizes.TEXT_MEDIUM,
        fontFamily: 'RFDewiExtended_Bold',
        color: colors.BLACK,
    },
    content__quotesAllText: {
        fontSize: sizes.TEXT_SMALL,
        fontFamily: 'RFDewiExtended_Semibold',
    },
    scroll: {
        backgroundColor: colors.WHITE,
    },
});

export default ProfileScreen;
