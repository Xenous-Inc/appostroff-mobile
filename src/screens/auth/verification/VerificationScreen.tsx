import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Screens } from '@navigation/constants';
import { AuthStackParams } from '@navigation/stacks/AuthStack';
import sizes from '@styles/sizes';
import colors from '@styles/colors';
import Button from '@components/atoms/Button';
import { CodeField, Cursor, useClearByFocusCell } from 'react-native-confirmation-code-field';

const VerificationScreen: React.FC<
    NativeStackScreenProps<AuthStackParams, typeof Screens.Auth.VERIFICATION>
> = props => {
    const { navigation } = props;

    const headerVerification = 'Введите Код';
    const instructionVerification = 'Мы отправили одноразовый код \nна ваш телефон';
    const buttonTextContinue = 'Продолжить';
    const buttonTextRetry = 'Выслать повторно';

    const [value, setValue] = useState('');

    const cellCount = 5;

    const [prop, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

    const renderItem = ({ index, symbol, isFocused }) => {
        return (
            <Text key={index} style={[styles.pooling_continer__render_item]} onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
        );
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.wrapper__pooling_container}>
                <Text style={styles.pooling_container__header}>{headerVerification}</Text>
                <Text style={styles.pooling_container__text_instruction}>{instructionVerification}</Text>
                <CodeField
                    {...prop}
                    value={value}
                    onChangeText={setValue}
                    cellCount={cellCount}
                    rootStyle={styles.pooling_container__code_field}
                    keyboardType='number-pad'
                    textContentType='oneTimeCode'
                    renderCell={renderItem}
                />
            </View>
            <View style={styles.wrapper__pooling_container}>
                <Button title={buttonTextContinue} mode={Button.Mode.Contained} />
                <Button title={buttonTextRetry} mode={Button.Mode.Blank} />
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
    pooling_container__header: {
        fontSize: sizes.TEXT_BIG,
        fontFamily: 'RFDewi_Bold',
        marginBottom: sizes.PADDING_SMALL,
    },
    pooling_container__text_instruction: {
        fontSize: sizes.TEXT_LITTLE,
        fontFamily: 'RFDewi_Regular',
        color: colors.TEXT_INSTRUCTION,
        width: 280,
    },
    wrapper__pooling_container: {
        width: '100%',
        paddingHorizontal: sizes.PADDING_BIG,
    },
    pooling_container__code_field: {
        height: 55.8,
        marginTop: 31,
        justifyContent: 'space-between',
    },
    pooling_continer__render_item: {
        height: 55.8,
        width: 55.8,
        fontSize: 24,
        lineHeight: 50.8,
        borderRadius: 8,
        textAlign: 'center',
        backgroundColor: colors.SOFT_GREY,
        fontFamily: 'RFDewi_Semibold',
    },
});

export default VerificationScreen;
