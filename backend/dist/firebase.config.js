"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseDataBase = exports.analytics = exports.app = void 0;
const app_1 = require("firebase/app");
const analytics_1 = require("firebase/analytics");
const database_1 = require("firebase/database");
const firebaseConfig = {
    apiKey: "AIzaSyDS8M1CuFI9RSVp67RiMR0HPpzZXaLvvH0",
    authDomain: "procritique-ce5f7.firebaseapp.com",
    projectId: "procritique-ce5f7",
    storageBucket: "procritique-ce5f7.appspot.com",
    messagingSenderId: "756895094951",
    appId: "1:756895094951:web:dfd4c4a6342d7222be6382",
    measurementId: "G-HCBRLDL575"
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.app = app;
let analytics;
if (typeof window !== 'undefined') {
    (0, analytics_1.isSupported)().then((supported) => {
        if (supported) {
            exports.analytics = analytics = (0, analytics_1.getAnalytics)(app);
            console.log('Firebase Analytics initialized');
        }
        else {
            console.warn('Firebase Analytics is not supported in this environment.');
        }
    });
}
const firebaseDataBase = (0, database_1.getDatabase)(app);
exports.firebaseDataBase = firebaseDataBase;
//# sourceMappingURL=firebase.config.js.map