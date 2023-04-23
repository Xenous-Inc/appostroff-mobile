import React from 'react';
import { ColorValue, StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '@styles/colors';

export interface IQuoteBox {
    active: boolean;
    activeColor: ColorValue;
    onPress(): void;
}

const QuoteBox: React.FC<IQuoteBox> = props => {
    const { active, activeColor, onPress } = props;

    return (
        <TouchableOpacity
            style={[styles.content__box, { backgroundColor: active ? activeColor : colors.SOFT_GREY }]}
            onPress={onPress}
        >
            <View style={[styles.content__circle, { backgroundColor: active ? '#ffffff' : activeColor }]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    content__box: {
        height: 48,
        width: 72,
        borderRadius: 12,
        justifyContent: 'center',
    },
    content__circle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        alignSelf: 'center',
    },
});

export default QuoteBox;
