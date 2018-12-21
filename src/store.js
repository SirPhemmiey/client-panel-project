import {
    createStore,
    combineReducers,
    compose
} from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import {
    reactReduxFirebase,
    firebaseReducer
} from 'react-redux-firebase';
import {
    reduxFirestore,
    firestoreReducer
} from 'redux-firestore';

//Reducers
import notifyReducer from './reducers/notifyReducer';


const firebaseConfig = {
    apiKey: "AIzaSyCiwQS7i6wr-yi9UR4vFOUjaVIxsvwro2k",
    authDomain: "reactclientpanel-f8133.firebaseapp.com",
    databaseURL: "https://reactclientpanel-f8133.firebaseio.com",
    projectId: "reactclientpanel-f8133",
    storageBucket: "reactclientpanel-f8133.appspot.com",
    messagingSenderId: "48285921770"
}

//react-redux firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

//ini firebase instance
firebase.initializeApp(firebaseConfig);
//init firestore
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer
});

//Create initial state
const initialState = {

};

//create store
const store = createStoreWithFirebase(rootReducer, initialState, compose(reactReduxFirebase(firebase), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;