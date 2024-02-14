import auth from '@react-native-firebase/auth';
import {statusCodes} from '@react-native-google-signin/google-signin';
import Firebase from '../../config/firebase';

// utils
import {HELPERS} from '../utils';

// keys
import {KEYS} from '../constants';

const {GoogleSignin} = Firebase;
const {setStorage, getStorage} = HELPERS;
const {AsyncKeys} = KEYS;

// sign in user
const signInUser = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    let userObj = {
      key: AsyncKeys.user,
      data: {...userInfo, isLoggedIn: true},
    };
    setStorage(userObj);
    // create a google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );

    // sign-in the user with the credential
    let result = auth().signInWithCredential(googleCredential);
    return result;
  } catch (error: any) {}
};

// sign-out user
const signOutUser = async () => {
  try {
    let response = await GoogleSignin.signOut();
    return response;
  } catch (error: any) {
    console.log('error at sign-out : ', error.message);
  }
};

// get user details
const fetchUser = async () => {
  try {
    let response = await getStorage(AsyncKeys.user);
    return response;
  } catch (e: any) {
    console.log('error at getting user ' + e.message);
  }
};

export default {
  signInUser,
  signOutUser,
  fetchUser,
};
