import React from 'react';
import { StyleSheet, Text, View, Image, ImageSourcePropType } from 'react-native';
import sizes from '@styles/sizes';
import colors from '@styles/colors';

export interface IBox {
    textHeader: string;
    textInfo: string;
    imageSource: ImageSourcePropType;
}
const Box: React.FC<IBox> = props => {
    const { textHeader, textInfo, imageSource } = props;

    return (
        <View style={styles.content}>
            <View style={styles.content__white_box}>
                <Image source={imageSource} style={styles.white_box__image} />
            </View>
            <View>
                <Text style={styles.content__text_header}>{textHeader}</Text>
                <Text style={styles.content__text_info}>{textInfo}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        width: 165,
        height: 66,
        backgroundColor: colors.GREY_BOX,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    content__text_header: {
        fontSize: sizes.TEXT_VERY_LITTLE,
        fontFamily: 'RFDewi_Semibold',
        color: colors.LIGHT_GREY,
    },
    content__text_info: {
        fontSize: sizes.TEXT_SMALL,
        fontFamily: 'RFDewi_Semibold',
        color: colors.BLACK,
    },
    white_box__image: {
        alignItems: 'flex-start',
        width: 24,
        height: 24,
    },
});

export default Box;
