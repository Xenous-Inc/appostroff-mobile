import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screens } from '@navigation/constants';
import { AuthStackParams } from '@navigation/stacks/AuthStack';
import Alert from '@components/molecules/Alert';
import sizes from '@styles/sizes';
import colors from '@styles/colors';
import Dropdown from '@components/molecules/Dropdown';
import Button from '@components/atoms/Button';
import constants from '@utils/constants';

const SignInScreen: React.FC<NativeStackScreenProps<AuthStackParams, typeof Screens.Auth.SIGN_IN>> = props => {
    const [number, onChangeNumber] = React.useState('');
    const [showAlert, setShowAlert] = useState(false);

    let backHandler;

    useEffect(() => {
        backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            setShowAlert(!showAlert);
            return true;
        });

        return () => backHandler.remove();
    }, [showAlert]);

    return (
        <>
            <View style={styles.wrapper}>
                <View style={styles.wrapper__pooling_container}>
                    <Text style={styles.wrapper__header}>{constants.header}</Text>
                    <Text style={styles.wrapper__text_instruction}>{constants.instruction}</Text>
                    <Dropdown changeDropDown={number} />
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
                    <Button
                        title={constants.buttonTextNext}
                        mode={Button.Mode.Contained}
                        onPress={() => {
                            backHandler.remove();
                            props.navigation.navigate('SCREEN_VERIFICATION');
                        }}
                    />
                    <Button
                        title={constants.buttonTextNextGuest}
                        onPress={() => {
                            backHandler.remove();
                            props.navigation.navigate('SCREEN_VERIFICATION');
                        }}
                    />
                </View>
            </View>
            <Alert
                showAlert={showAlert}
                onPress={() => {
                    setShowAlert(!showAlert);
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    content: {
        height: 300,
        width: 300,
        marginTop: 400,
        backgroundColor: '#000',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
