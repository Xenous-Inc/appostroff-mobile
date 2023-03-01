import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Screens } from '@navigation/constants';
import { MainStackParams } from '@navigation/stacks/MainStack';
import sizes from '@styles/sizes';
import colors from '@styles/colors';
import constants from '@utils/constants';
import Box from '@components/atoms/Box';

const StoryScreen: React.FC<NativeStackScreenProps<MainStackParams, typeof Screens.Main.MAIN>> = props => {
    const { navigation } = props;
    return (
        <View style={styles.wrapper}>
            <View style={styles.wrapper__content}>
                <View style={styles.content__profile_wrapper}>
                    <Image source={require('@assets/icons/profile.png')} style={styles.content__profile} />
                </View>
                <View style={styles.content__header}>
                    <Text style={styles.content__header}>{constants.headerMain}</Text>
                </View>
                <View style={styles.content__cover_boxes}>
                    <Image source={require('@assets/icons/bookCover.png')} />
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
                        <Text style={styles.content__boxg1}>{constants.textMystic}</Text>
                    </View>
                    <View style={styles.content__boxg}>
                        <Text style={styles.content__boxg2}>{constants.textThriller}</Text>
                    </View>
                    <View style={styles.content__boxg}>
                        <Text style={styles.content__boxg3}>{constants.textRomance}</Text>
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
        paddingTop: 76,
        backgroundColor: colors.WHITE,
    },
    content__profile: {
        width: 24,
        height: 24,
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
    content__box: {
        width: 165,
        height: 66,
        backgroundColor: colors.GREY_BOX,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        marginHorizontal: 12.02,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content__box1_text1: {
        fontSize: sizes.TEXT_LITTLE,
        fontFamily: 'RFDewi_Semibold',
        color: colors.LIGHT_GREY,
    },
    content__box1_text2: {
        fontSize: sizes.TEXT_SMALL,
        fontFamily: 'RFDewi_Semibold',
        color: colors.BLACK,
    },
    content__box2_text1: {
        fontSize: sizes.TEXT_LITTLE,
        fontFamily: 'RFDewi_Semibold',
        color: colors.LIGHT_GREY,
    },
    content__box2_text2: {
        fontSize: sizes.TEXT_SMALL,
        fontFamily: 'RFDewi_Semibold',
        color: colors.BLACK,
    },
    content__box3_text1: {
        fontSize: sizes.TEXT_LITTLE,
        fontFamily: 'RFDewi_Semibold',
        color: colors.LIGHT_GREY,
    },
    content__box3_text2: {
        fontSize: sizes.TEXT_SMALL,
        fontFamily: 'RFDewi_Semibold',
        color: colors.BLACK,
    },
    content__boxg: {
        marginTop: sizes.PADDING_SMALL,
        width: 107,
        height: 35,
        backgroundColor: colors.GREY_BOX,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content__boxg1: {
        fontSize: sizes.TEXT_SMALL,
        fontFamily: 'RFDewi_Semibold',
        color: colors.LIGHT_GREY,
    },
    content__boxg2: {
        fontSize: sizes.TEXT_SMALL,
        fontFamily: 'RFDewi_Semibold',
        color: colors.LIGHT_GREY,
    },
    content__boxg3: {
        fontSize: sizes.TEXT_SMALL,
        fontFamily: 'RFDewi_Semibold',
        color: colors.LIGHT_GREY,
    },
    wrapper__content: {
        width: '100%',
        paddingHorizontal: sizes.PADDING_BIG,
    },
    wrapper__content_boxes: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
    },
    wrapper__content_genres: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
});

export default StoryScreen;
