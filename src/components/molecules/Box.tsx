import React from 'react';
import { StyleSheet, Text, View, Image, ImageSourcePropType, Pressable } from 'react-native';
import sizes from '@styles/sizes';
import colors from '@styles/colors';

export interface IBox {
    textHeader: string;
    textInfo: string;
    imageSource: ImageSourcePropType;
    onPress?(): void;
}
const Box: React.FC<IBox> = props => {
    const { textHeader, textInfo, imageSource, onPress } = props;

    return (
        <Pressable style={styles.content} onPress={onPress}>
            <View style={styles.content__whiteBox}>
                <Image source={imageSource} style={styles.whiteBox__image} />
            </View>
            <View>
                <Text style={styles.content__textHeader}>{textHeader}</Text>
                <Text style={styles.content__textInfo}>{textInfo}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    content: {
        width: '100%',
        height: 66,
        backgroundColor: colors.GREY_BOX,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    content__whiteBox: {
        width: 38,
        height: 38,
        backgroundColor: colors.WHITE,
        borderRadius: 8,
        marginHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    whiteBox__image: {
        alignItems: 'flex-start',
        width: 24,
        height: 24,
    },
    content__textHeader: {
        fontSize: sizes.TEXT_VERY_LITTLE,
        fontFamily: 'RFDewiExtended_Semibold',
        color: colors.LIGHT_GREY,
    },
    content__textInfo: {
        fontSize: sizes.TEXT_SMALL,
        fontFamily: 'RFDewiExtended_Semibold',
        color: colors.BLACK,
    },
});

export default Box;
