import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Keyboard, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screens } from '@navigation/constants';
import { AuthStackParams } from '@navigation/stacks/AuthStack';
import Alert from '@components/molecules/Alert';
import sizes from '@styles/sizes';
import colors from '@styles/colors';
import Dropdown from '@components/molecules/Dropdown';
import Button from '@components/atoms/Button';
import constants from '@utils/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SignInScreen: React.FC<NativeStackScreenProps<AuthStackParams, typeof Screens.Auth.SIGN_IN>> = props => {
    const [number, onChangeNumber] = React.useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [isTexting, setIsTexting] = useState(false);

    const insets = useSafeAreaInsets();

    useEffect(() => {
        const unsubscribeFocus = props.navigation.addListener('focus', () => {
            if (Platform.OS === 'android') {
                BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
            }
        });
        const unsubscribeBlur = props.navigation.addListener('blur', () => {
            if (Platform.OS === 'android') {
                BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
            }
        });

        return () => {
            unsubscribeFocus();
            unsubscribeBlur();
        };
    }, []);

    const onAndroidBackPress = () => {
        setShowAlert(!showAlert);
        return true;
    };

    return (
        <>
            <View style={[styles.wrapper, { paddingTop: insets.top * 2 }]}>
                <View style={[styles.wrapper__pooling_container]}>
                    <Text style={styles.wrapper__header}>{constants.header}</Text>
                    <Text style={styles.wrapper__text_instruction}>{constants.instruction}</Text>
                    <Dropdown isTexting={isTexting} />
                    <View style={styles.wrapper__phone_input}>
                        <Text style={styles.phone_input__text}>{constants.phoneIndex}</Text>
                        <View style={styles.phone_input__separator} />
                        <TextInput
                            style={styles.phone_input__input}
                            placeholder={constants.placeHolder}
                            maxLength={10}
                            keyboardType='numeric'
                            onPressIn={() => {
                                setIsTexting(!isTexting);
                            }}
                            onChangeText={prop => {
                                onChangeNumber(prop);
                                if (prop.length === 10) {
                                    Keyboard.dismiss();
                                    setIsTexting(false);
                                }
                            }}
                            value={number}
                        />
                    </View>
                </View>
                <View style={styles.wrapper__button_container}>
                    <Button
                        title={constants.buttonTextNext}
                        mode={Button.Mode.Contained}
                        onPress={() => {
                            props.navigation.navigate(Screens.Auth.VERIFICATION);
                        }}
                    />
                    <Button
                        title={constants.buttonTextNextGuest}
                        onPress={() => {
                            props.navigation.navigate(Screens.Auth.VERIFICATION);
                        }}
                    />
                </View>
            </View>
            <Alert showAlert={showAlert} setShowAlert={setShowAlert} />
        </>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: sizes.PADDING_BIG,
        backgroundColor: colors.WHITE,
    },
    wrapper__header: {
        fontSize: sizes.TEXT_BIG,
        fontFamily: 'RFDewiExtended_Bold',
        marginBottom: sizes.PADDING_SMALL,
    },
    wrapper__pooling_container: {
        width: '100%',
    },
    wrapper__text_instruction: {
        fontSize: sizes.TEXT_LITTLE,
        fontFamily: 'RFDewiExtended_Regular',
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
        fontFamily: 'RFDewiExtended_Semibold',
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
        fontFamily: 'RFDewiExtended_Semibold',
    },
    wrapper__button_container: {
        width: '100%',
        marginBottom: sizes.PADDING_BIG,
    },
});

export default SignInScreen;
