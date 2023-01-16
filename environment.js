import Constants from 'expo-constants';
import { Platform } from 'react-native';

const localhost = Platform.OS === 'ios' ? 'localhost:8080' : '10.0.2.2:8080';

const ENV = {
    dev: {
        apiUrl: 'http://wafarnalak.skystar.company/api/cu/v.3/app',
        amplitudeApiKey: null,
    },
    staging: {
        apiUrl: 'http://wafarnalak.skystar.company/api/cu/v.3/app',
        amplitudeApiKey: null,
        // Add other keys you want here
    },
    prod: {
        apiUrl: 'http://wafarnalak.skystar.company/api/cu/v.3/app',
        amplitudeApiKey: null,
        // Add other keys you want here
    },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    // What is __DEV__ ?
    // This variable is set to true when react-native is running in Dev mode.
    // __DEV__ is true when run locally, but false when published.
    if (__DEV__) {
        return ENV.dev;
    } else if (env === 'staging-v3') {
        return ENV.staging;
    } else if (env === 'production-v4') {
        return ENV.prod;
    }
};

export default getEnvVars;