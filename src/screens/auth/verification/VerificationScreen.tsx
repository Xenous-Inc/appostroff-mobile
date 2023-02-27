import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, StyleSheet, Text, View } from 'react-native';
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

const VerificationScreen: React.FC<
    CompositeScreenProps<
        NativeStackScreenProps<AuthStackParams, typeof Screens.Auth.VERIFICATION>,
        NativeStackScreenProps<AppStackParams>
    >
> = props => {
    const [value, setValue] = useState('');

    const [prop, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

    const renderItem = ({ index, symbol, isFocused }) => {
        return (
            <Text key={index} style={[styles.content__render_item]} onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
        );
    };

    let backHandler;

    useEffect(() => {
        backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });

        return () => backHandler.remove();
    }, []);

    return (
        <View style={styles.wrapper}>
            <View style={styles.wrapper__content}>
                <Text style={styles.content__header}>{constants.headerVerification}</Text>
                <Text style={styles.content__text_instruction}>{constants.instructionVerification}</Text>
                <CodeField
                    {...prop}
                    value={value}
                    onChangeText={setValue}
                    cellCount={constants.cellCount}
                    rootStyle={styles.content__code_field}
                    keyboardType='number-pad'
                    textContentType='oneTimeCode'
                    renderCell={renderItem}
                />
            </View>
            <View style={styles.wrapper__content}>
                <Button
                    title={constants.buttonTextContinue}
                    mode={Button.Mode.Contained}
                    onPress={() => {
                        backHandler.remove();
                        props.navigation.navigate(Stacks.MAIN, { screen: Screens.Main.STORY });
                    }}
                />
                <Button
                    title={constants.buttonTextRetry}
                    mode={Button.Mode.Blank}
                    onPress={() => {
                        backHandler.remove();
                        props.navigation.navigate(Stacks.MAIN, { screen: Screens.Main.STORY });
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
        backgroundColor: colors.WHITE,
    },
    content__header: {
        fontSize: sizes.TEXT_BIG,
        fontFamily: 'RFDewi_Bold',
        marginBottom: sizes.PADDING_SMALL,
    },
    content__text_instruction: {
        fontSize: sizes.TEXT_LITTLE,
        fontFamily: 'RFDewi_Regular',
        color: colors.TEXT_INSTRUCTION,
        width: 280,
    },
    wrapper__content: {
        width: '100%',
        paddingHorizontal: sizes.PADDING_BIG,
    },
    content__code_field: {
        height: 55.8,
        marginTop: 31,
        justifyContent: 'space-between',
    },
    content__render_item: {
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
