"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.storage = exports.database = exports.app = void 0;
const app_1 = require("firebase/app");
const database_1 = require("firebase/database");
const storage_1 = require("firebase/storage");
const auth_1 = require("firebase/auth");
const firebaseConfig = {
    apiKey: 'AIzaSyDS8M1CuFI9RSVp67RiMR0HPpzZXaLvvH0',
    authDomain: 'procritique-ce5f7.firebaseapp.com',
    projectId: 'procritique-ce5f7',
    storageBucket: 'procritique-ce5f7.appspot.com',
    messagingSenderId: '756895094951',
    appId: '1:756895094951:web:dfd4c4a6342d7222be6382',
    measurementId: 'G-HCBRLDL575',
    databaseURL: 'https://procritique-ce5f7-default-rtdb.firebaseio.com',
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.app = app;
const database = (0, database_1.getDatabase)(app);
exports.database = database;
const storage = (0, storage_1.getStorage)(app);
exports.storage = storage;
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
//# sourceMappingURL=firebase.config.js.map