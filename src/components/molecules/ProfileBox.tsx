import React from 'react';
import { StyleSheet, Text, View, Image, ImageSourcePropType } from 'react-native';
import sizes from '@styles/sizes';
import colors from '@styles/colors';

export interface IProfileBox {
    textHeader: string;
    imageSource: ImageSourcePropType;
}
const ProfileBox: React.FC<IProfileBox> = props => {
    const { textHeader, imageSource } = props;

    return (
        <View style={styles.content}>
            <Image source={imageSource} style={styles.box__image} />
            <View>
                <Text style={styles.content__text}>{textHeader}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        width: '46%',
        height: 90,
        backgroundColor: colors.GREY_BOX,
        borderRadius: 16,
        justifyContent: 'space-evenly',
        paddingLeft: 16,
    },
    box__image: {
        width: 24,
        height: 24,
    },
    content__text: {
        fontSize: sizes.TEXT_SMALL,
        fontFamily: 'RFDewiExpanded_Bold',
        color: colors.BLACK,
    },
});

export default ProfileBox;
