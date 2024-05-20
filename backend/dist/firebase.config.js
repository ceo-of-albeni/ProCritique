"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserWithEmailAndPassword = exports.signInWithEmailAndPassword = exports.getDoc = exports.setDoc = exports.doc = exports.collection = exports.storage = exports.database = exports.auth = exports.firestore = exports.app = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
Object.defineProperty(exports, "collection", { enumerable: true, get: function () { return firestore_1.collection; } });
Object.defineProperty(exports, "doc", { enumerable: true, get: function () { return firestore_1.doc; } });
Object.defineProperty(exports, "setDoc", { enumerable: true, get: function () { return firestore_1.setDoc; } });
Object.defineProperty(exports, "getDoc", { enumerable: true, get: function () { return firestore_1.getDoc; } });
const auth_1 = require("firebase/auth");
Object.defineProperty(exports, "signInWithEmailAndPassword", { enumerable: true, get: function () { return auth_1.signInWithEmailAndPassword; } });
Object.defineProperty(exports, "createUserWithEmailAndPassword", { enumerable: true, get: function () { return auth_1.createUserWithEmailAndPassword; } });
const database_1 = require("firebase/database");
const storage_1 = require("firebase/storage");
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
const firestore = (0, firestore_1.getFirestore)(app);
exports.firestore = firestore;
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
const database = (0, database_1.getDatabase)(app);
exports.database = database;
const storage = (0, storage_1.getStorage)(app);
exports.storage = storage;
//# sourceMappingURL=firebase.config.js.map