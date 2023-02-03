import { logger, consoleTransport } from 'react-native-logs';

const { enabledExtensions, ...config } = {
    transport: consoleTransport,
    severity: __DEV__ ? 'debug' : 'info',
    levels: {
        debug: 0,
        warn: 1,
        info: 2,
        success: 3,
        error: 4,
    },
    transportOptions: {
        colors: {
            debug: 'default',
            warn: 'yellowBright',
            info: 'blueBright',
            success: 'greenBright',
            error: 'red',
        },
    },
    enabledExtensions: ['ui', 'hooks', 'redux', 'api', 'middlewares', 'utils'] as const,
    async: true,
    dateFormat: __DEV__ ? 'time' : 'utc',
    printLevel: true,
    printDate: true,
    enabled: true,
};

type TLevels = keyof typeof config.levels;
type TExtendedLogger = { [lvl in TLevels]: (...args: unknown[]) => void };
type TEnabledExtensions = (typeof enabledExtensions)[number];
type TExtendedLoggers = { [ext in TEnabledExtensions]: TExtendedLogger };

const baseLogs = logger.createLogger<keyof typeof config.levels>(config);
const extendedLogs = enabledExtensions.reduce<TExtendedLoggers>((logs, ext) => {
    logs[ext] = baseLogs.extend(ext.toUpperCase());
    return logs;
}, {} as TExtendedLoggers);

export default Object.assign(baseLogs, extendedLogs);
