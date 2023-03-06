import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Screens } from '@navigation/constants';
import { MainStackParams } from '@navigation/stacks/MainStack';
import sizes from '@styles/sizes';
import colors from '@styles/colors';
import constants from '@utils/constants';
import Box from '@components/molecules/Box';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StoryScreen: React.FC<NativeStackScreenProps<MainStackParams, typeof Screens.Main.MAIN>> = props => {
    const { navigation } = props;

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.wrapper, { paddingTop: insets.top * 1.5 }]}>
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
    },
});

export default StoryScreen;
