import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import React from 'react';
import { AppStackParams } from '@navigation/AppNavigator';
import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';
import { Screens } from '@navigation/constants';
import { ProfileStackParams } from '@navigation/stacks/ProfileStack';
import sizes from '@styles/sizes';
import colors from '@styles/colors';
import constants from '@utils/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stacks } from '@navigation/constants';
import ProfileBox from '@components/molecules/ProfileBox';

const ProfileScreen: React.FC<
    CompositeScreenProps<
        NativeStackScreenProps<ProfileStackParams, typeof Screens.Profile.PROFILE>,
        NativeStackScreenProps<AppStackParams>
    >
> = props => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.wrapper, { paddingTop: insets.top * 1.5 }]}>
            <View style={styles.wrapper__content}>
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
                    <Image source={require('@assets/icons/profilePic.png')} style={styles.content__profilepic} />
                </View>
                <View style={styles.wrapper__name}>
                    <Text style={styles.content__name}>{constants.name}</Text>
                </View>
                <View style={styles.wrapper__content_boxes}>
                    <ProfileBox
                        textHeader={constants.boxInterests}
                        imageSource={require('@assets/icons/searchStars.png')}
                    />
                    <ProfileBox textHeader={constants.boxSettin} imageSource={require('@assets/icons/settings.png')} />
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
                    <View style={styles.wrapper__quotes}>
                        <Text style={styles.content__quotesHeader}>{constants.quotesHeader}</Text>
                    </View>
                </View>
            </View>
        </View>
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
    content__icons: {
        width: 24,
        height: 24,
    },
    content__profilepic: {
        width: 120,
        height: 120,
        borderRadius: 24,
    },
    content__iconsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content__boxPic: {
        alignItems: 'flex-start',
        width: 24,
        height: 24,
    },
    content__name: {
        fontSize: sizes.TEXT_MEDIUM_BIG,
        fontFamily: 'RFDewi_Bold',
        marginBottom: sizes.PADDING_LITTLE,
    },
    wrapper__name: {
        alignItems: 'center',
        paddingTop: sizes.PADDING_MEDIUM,
    },
    wrapper__profilePic: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: sizes.PADDING_LITTLE,
    },
    wrapper__quotes: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    content__quotesHeader: {
        fontSize: sizes.TEXT_MEDIUM,
        fontFamily: 'RFDewi_Bold',
        color: colors.BLACK,
    },
    content__aaa: {
        fontSize: sizes.TEXT_SMALL,
        fontFamily: 'RFDewi_Semibold',
        color: colors.BLACK,
    },
    content__boxInfo: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    content__textTag: {
        fontSize: sizes.TEXT_MEDIUM_BIG,
        fontFamily: 'RFDewi_Semibold',
        color: colors.BLACK,
    },
    content__textInfo: {
        fontSize: sizes.TEXT_VERY_LITTLE,
        fontFamily: 'RFDewi_Semibold',
        color: colors.GREY_INFO,
    },
    content__separator: {
        height: 21,
        width: 1,
        backgroundColor: colors.GREY_SEPARATOR,
    },
    wrapper__content: {
        width: '100%',
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
});

export default ProfileScreen;
