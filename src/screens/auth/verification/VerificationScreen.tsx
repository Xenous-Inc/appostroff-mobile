import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import sizes from '@styles/sizes';
import colors from '@styles/colors';
import Button from '@components/atoms/Button';
import { CodeField, Cursor, useClearByFocusCell } from 'react-native-confirmation-code-field';
import constants from '@utils/constants';
import { CompositeScreenProps } from '@react-navigation/native';
import { Screens, Stacks } from '@navigation/constants';
import { AuthStackParams } from '@navigation/stacks/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParams } from '@navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { createSignUpAction, createVerificationAction } from '@store/reducers/auth';
import { createUserIdAction } from '@store/reducers/user_info';
import { decode } from '@api/decode';

const VerificationScreen: React.FC<
    CompositeScreenProps<
        NativeStackScreenProps<AuthStackParams, typeof Screens.Auth.VERIFICATION>,
        NativeStackScreenProps<AppStackParams>
    >
> = props => {
    const [code, setCode] = useState('');

    const data = useAppSelector(state => state.auth);
    const userInfo = useAppSelector(state => state.user_info);

    const dispatch = useAppDispatch();

    const renderItem = ({ index, symbol, isFocused }) => {
        return (
            <Text key={index} style={[styles.content__renderItem]}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
        );
    };

    useEffect(() => {
        if (data.verification.data != undefined) {
            console.log(data.verification);
            const decodeToken = decode(data.verification.data.access_token);
            createUserIdAction(decodeToken.id);
            props.navigation.navigate(Stacks.MAIN, { screen: Screens.Main.STORY });
        }
    }, [data.verification.data]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.wrapper__content}>
                <Text style={styles.content__header}>{constants.headerVerification}</Text>
                <Text style={styles.content__textInstruction}>{constants.instructionVerification}</Text>
                <CodeField
                    value={code}
                    onChangeText={setCode}
                    cellCount={constants.cellCount}
                    rootStyle={styles.content__codeField}
                    keyboardType='number-pad'
                    textContentType='oneTimeCode'
                    renderCell={renderItem}
                />
            </View>
            <View style={styles.wrapper__buttonsContainer}>
                <Button
                    title={constants.buttonTextContinue}
                    mode={Button.Mode.Contained}
                    onPress={() => {
                        dispatch(createVerificationAction({ code: parseInt(code), callId: data.signUp.data.callId }));
                    }}
                />
                <Button
                    title={constants.buttonTextRetry}
                    mode={Button.Mode.Blank}
                    onPress={() => {
                        dispatch(createSignUpAction({ phone: userInfo.phone.phoneNumber }));
                    }}
                />
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
    wrapper__content: {
        width: '100%',
    },
    content__header: {
        fontSize: sizes.TEXT_BIG,
        fontFamily: 'RFDewiExtended_Bold',
        marginBottom: sizes.PADDING_SMALL,
    },
    content__textInstruction: {
        fontSize: sizes.TEXT_LITTLE,
        fontFamily: 'RFDewiExtended_Regular',
        color: colors.TEXT_INSTRUCTION,
        width: 280,
    },
    content__codeField: {
        height: 55.8,
        marginTop: 31,
        paddingHorizontal: 20,
        justifyContent: 'space-around',
    },
    wrapper__buttonsContainer: {
        width: '100%',
        marginBottom: sizes.PADDING_BIG,
    },
    content__renderItem: {
        height: 55.8,
        width: 55.8,
        fontSize: 24,
        lineHeight: 50.8,
        borderRadius: 8,
        textAlign: 'center',
        backgroundColor: colors.SOFT_GREY,
        fontFamily: 'RFDewiExtended_Semibold',
    },
});

export default VerificationScreen;
