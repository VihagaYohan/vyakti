import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {WEB_CLIENT_ID} from '@env';

GoogleSignin.configure({
  //scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '646613573404-33btffus0l2u8fd8btajapsme58gql8a.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  //androidClientId:'82960103836-j4293legv3sdj2pveorjkkssikkh6cp0.apps.googleusercontent.com',
  //offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  //hostedDomain: '', // specifies a hosted domain restriction
  //forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  //accountName: '', // [Android] specifies an account name on the device that should be used
  //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  //googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  //openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  //profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

export default {
  GoogleSignin,
};
