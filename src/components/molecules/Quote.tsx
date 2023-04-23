import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, LayoutChangeEvent } from 'react-native';
import sizes from '@styles/sizes';
import colors from '@styles/colors';
import Animated, {
    Extrapolation,
    SharedValue,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

enum QuoteType {
    ProfileType = 'profile',
    QuoteType = 'quote',
}

export interface IQuote {
    textName: string;
    textWriter: string;
    textQuote: string;
    circleColour: string;
    type: QuoteType;
    isLast?: boolean;
    id?: number;
    staticContentHeight?: number;
    collapseProgress?: SharedValue<number>;
}

const Quote: React.FC<IQuote> & { QuoteType: typeof QuoteType } = props => {
    const {
        textName,
        textWriter,
        textQuote,
        circleColour,
        isLast,
        collapseProgress = useSharedValue(1),
        type,
        id,
        staticContentHeight,
    } = props;

    const [heightText, setHeightText] = useState(0);

    const insets = useSafeAreaInsets();

    const textQuoteAnimatedStyle = useAnimatedStyle(() => {
        const height =
            type === QuoteType.ProfileType
                ? interpolate(collapseProgress.value, [0, 0.5], [0, heightText], Extrapolation.CLAMP)
                : heightText;

        return {
            height,
        };
    });

    const quoteContainerAnimatedStyle = useAnimatedStyle(() => {
        const marginVertical = interpolate(
            collapseProgress.value,
            [0, 0.5],
            [0, sizes.PADDING_SMALL],
            Extrapolation.CLAMP,
        );

        return {
            marginVertical,
        };
    });

    const separatorAnimatedStyle = useAnimatedStyle(() => {
        const height =
            type === QuoteType.ProfileType
                ? interpolate(collapseProgress.value, [0, 0.5], [0, heightText + 10], Extrapolation.CLAMP)
                : heightText + 10;

        return {
            height,
        };
    });

    const handleTextLayout = useCallback(
        (event: LayoutChangeEvent) =>
            event.target.measure((_x, _y, width, height, _pageX, pageY) => {
                type === QuoteType.ProfileType
                    ? setHeightText(26.55 * Math.round(textQuote.length / 22.5))
                    : setHeightText(18.66 * Math.round(textQuote.length / 30));
            }),
        [],
    );

    return (
        <Animated.View
            style={[
                styles.wrapper,
                {
                    borderBottomColor: isLast ? colors.GREY_SEPARATOR : colors.WHITE,
                    borderBottomLeftRadius: type === QuoteType.QuoteType ? null : isLast ? 24 : 0,
                    borderBottomRightRadius: type === QuoteType.QuoteType ? null : isLast ? 24 : 0,
                    borderWidth: type === QuoteType.QuoteType ? null : 1,
                    borderRadius: type === QuoteType.QuoteType ? 16 : 24,
                    backgroundColor: type === QuoteType.QuoteType ? colors.SOFT_GREY : null,
                    marginTop: id === 0 ? staticContentHeight - insets.top * 3 : null,
                },
            ]}
        >
            <View style={styles.wrapper__circleText}>
                <View style={[styles.content__circle, { backgroundColor: circleColour }]} />
                <View>
                    <Text
                        style={[
                            styles.content__name,
                            { fontSize: type === QuoteType.ProfileType ? sizes.TEXT_SMALL : sizes.TEXT_LITTLE },
                        ]}
                    >
                        {textName}
                    </Text>
                    <Text style={styles.content__writer}>{textWriter}</Text>
                </View>
            </View>
            <Animated.View
                style={[
                    styles.wrapper__quote,
                    type === QuoteType.ProfileType
                        ? quoteContainerAnimatedStyle
                        : { marginVertical: sizes.PADDING_SMALL },
                ]}
            >
                {type === QuoteType.ProfileType ? (
                    <Animated.View style={[styles.content__separator, separatorAnimatedStyle]} />
                ) : null}
                <Animated.Text
                    style={[
                        styles.content__quote,
                        textQuoteAnimatedStyle,
                        { fontSize: type === QuoteType.ProfileType ? sizes.TEXT_MEDIUM : sizes.TEXT_LITTLE },
                    ]}
                    onLayout={handleTextLayout}
                >
                    {textQuote}
                </Animated.Text>
            </Animated.View>
        </Animated.View>
    );
};
Quote.QuoteType = QuoteType;

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'flex-start',
        borderTopColor: colors.GREY_SEPARATOR,
        borderLeftColor: colors.GREY_SEPARATOR,
        borderRightColor: colors.GREY_SEPARATOR,
        borderBottomColor: colors.BLUE,
        paddingHorizontal: sizes.PADDING_SMALL,
        paddingTop: sizes.PADDING_SMALL,
    },
    wrapper__circleText: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
    },
    content__circle: {
        alignItems: 'flex-start',
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: sizes.PADDING_LITTLE,
    },
    content__name: {
        fontFamily: 'RFDewiExpanded_Bold',
        color: colors.BLACK,
    },
    content__writer: {
        fontSize: sizes.TEXT_VERY_LITTLE,
        fontFamily: 'RFDewiExtended_Regular',
        color: colors.LIGHT_GREY,
    },
    wrapper__quote: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    content__separator: {
        height: '100%',
        width: 2,
        backgroundColor: colors.GREY_SEPARATOR,
        marginRight: sizes.PADDING_SMALL,
    },
    content__quote: {
        fontFamily: 'RFDewiExtended_Bold',
        color: colors.BLACK,
        marginBottom: 8,
    },
});

export default Quote;
