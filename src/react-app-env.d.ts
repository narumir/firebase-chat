/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        REACT_APP_FIREBASE_API_KEY: string;
        REACT_APP_FIREBASE_AUTH_DOMAIN: string;
        REACT_APP_FIREBASE_PROJECT_ID: string;
        REACT_APP_FIREBASE_STORAGE_BUCKET: string;
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID: string;
        REACT_APP_FIREBASE_APP_ID: string;
        REACT_APP_FIREBASE_MEANSUREMENT_ID: string;
    }
}
