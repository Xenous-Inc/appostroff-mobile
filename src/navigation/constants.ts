export const Stacks = {
    AUTH: 'STACK_AUTH' as const,
    MAIN: 'STACK_MAIN' as const,
    PROFILE: 'STACK_PROFILE' as const,
};

export const Screens = {
    Auth: {
        SIGN_IN: 'SCREEN_SIGN_IN' as const,
        VERIFICATION: 'SCREEN_VERIFICATION' as const,
    },
    Main: {
        MAIN: 'SCREEN_MAIN' as const,
        STORY: 'SCREEN_STORY' as const,
    },
    Profile: {
        PROFILE: 'SCREEN_PROFILE' as const,
        SETTINGS: 'SCREEN_SETTINGS' as const,
        QUOTES: 'SCREEN_QUOTES' as const,
    },
};
