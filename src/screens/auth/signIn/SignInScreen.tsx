import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screens } from '@navigation/constants';
import { AuthStackParams } from '@navigation/stacks/AuthStack';
import sizes from '@styles/sizes';
import colors from '@styles/colors';
import Dropdown from '@components/molecules/Dropdown';
import Button from '@components/atoms/Button';
import constants from '@utils/constants';

const SignInScreen: React.FC<NativeStackScreenProps<AuthStackParams, typeof Screens.Auth.SIGN_IN>> = () => {
    const [number, onChangeNumber] = React.useState('');

    return (
        <View style={styles.wrapper}>
            <View style={styles.wrapper__pooling_container}>
                <Text style={styles.wrapper__header}>{constants.header}</Text>
                <Text style={styles.wrapper__text_instruction}>{constants.instruction}</Text>
                <Dropdown />
                <View style={styles.wrapper__phone_input}>
                    <Text style={styles.phone_input__text}>{constants.phoneIndex}</Text>
                    <View style={styles.phone_input__separator} />
                    <TextInput
                        style={styles.phone_input__input}
                        placeholder={constants.placeHolder}
                        maxLength={10}
                        keyboardType='numeric'
                        onChangeText={prop => {
                            onChangeNumber(prop);
                            if (prop.length === 10) {
                                Keyboard.dismiss();
                            }
                        }}
                        value={number}
                    />
                </View>
            </View>
            <View style={styles.wrapper__pooling_container}>
                <Button title={constants.buttonTextNext} mode={Button.Mode.Contained} />
                <Button title={constants.buttonTextNextGuest} />
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
        paddingHorizontal: sizes.PADDING_BIG,
        backgroundColor: colors.WHITE,
    },
    wrapper__header: {
        fontSize: sizes.TEXT_BIG,
        fontFamily: 'RFDewi_Bold',
        marginBottom: sizes.PADDING_SMALL,
    },
    wrapper__text_instruction: {
        fontSize: sizes.TEXT_LITTLE,
        fontFamily: 'RFDewi_Regular',
        color: colors.TEXT_INSTRUCTION,
        width: 280,
    },
    wrapper__phone_input: {
        height: 48,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.SOFT_GREY,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    phone_input__text: {
        marginLeft: 20,
        fontFamily: 'RFDewi_Semibold',
        fontSize: 16,
    },
    phone_input__separator: {
        width: 2,
        height: 48,
        backgroundColor: colors.SEPARATOR,
        marginLeft: 15,
    },
    phone_input__input: {
        marginLeft: 10,
        width: '100%',
        height: 48,
        fontSize: sizes.TEXT_SMALL,
        fontFamily: 'RFDewi_Semibold',
    },
    wrapper__pooling_container: {
        width: '100%',
    },
});

export default SignInScreen;
