import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native';
import sizes from '@styles/sizes';
import colors from '@styles/colors';
import constants from '@utils/constants';

export interface IBottomSheetContent {
    onPressCancel(): void;
}
const BottomSheetContent: React.FC<IBottomSheetContent> = props => {
    const { onPressCancel } = props;

    const [quantitySelectedStars, setQuantitySelectedStars] = useState(0);

    const RATING_DATA = [
        {
            id: 0,
        },
        {
            id: 1,
        },
        {
            id: 2,
        },
        {
            id: 3,
        },
        {
            id: 4,
        },
    ];

    return (
        <View style={styles.content}>
            <Pressable onPress={onPressCancel} style={styles.content__buttonCancel}>
                <Image source={require('@assets/icons/cancel.png')} style={styles.buttonCancel__imageCancel} />
            </Pressable>
            <Text style={styles.content__textQuestionEstimateStory}>{constants.textQuestionEstimateStory}</Text>
            <Text style={styles.content__textEstimateStory}>{constants.textEstimateStory}</Text>
            <FlatList
                style={styles.content__flatList}
                scrollEnabled={false}
                data={RATING_DATA}
                horizontal
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.flatList__buttonStar}
                        onPress={() => {
                            setQuantitySelectedStars(item.id);
                        }}
                    >
                        <Image
                            style={styles.buttonStar_imageStar}
                            source={
                                item.id <= quantitySelectedStars
                                    ? require('@assets/icons/yellow_star.png')
                                    : require('@assets/icons/white_star.png')
                            }
                        />
                    </Pressable>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        padding: 16,
        alignItems: 'center',
    },
    content__buttonCancel: {
        borderRadius: 50,
        height: 28,
        width: 28,
        backgroundColor: colors.GREY_BOX,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    buttonCancel__imageCancel: {
        width: 20,
        height: 20,
    },
    content__textQuestionEstimateStory: {
        fontSize: sizes.TEXT_MEDIUM_BIG,
        fontFamily: 'RFDewiExtended_Bold',
        color: colors.BLACK,
        marginTop: sizes.PADDING_SMALL,
    },
    content__textEstimateStory: {
        fontSize: sizes.TEXT_LITTLE,
        fontFamily: 'RFDewiExtended_Semibold',
        color: colors.TEXT_BOTTOMSHEET,
        marginTop: sizes.PADDING_VERY_LITTLE,
    },
    content__flatList: {
        marginTop: sizes.PADDING_LARGE,
    },
    flatList__buttonStar: {
        marginHorizontal: 8,
    },
    buttonStar_imageStar: {
        height: 52,
        width: 52,
    },
});

export default BottomSheetContent;
