import Realm from 'realm';

let app;

// Returns the shared instance of the Realm app.
export function getRealmApp() {
  if (app === undefined) {
    const appId = 'eshopify-zviub'; // Set Realm app ID here.
    const appConfig = {
      id: appId,
      timeout: 10000,
      app: {
        name: 'default',
        version: '0',
      },
    };
    app = new Realm.App(appConfig);
  }
  return app;
}


// async function loginAnonymous() {
//   // Create an anonymous credential
//   const credentials = Realm.Credentials.anonymous();
//   try {
//     // Authenticate the user
//     const user = await app.logIn(credentials);
//     // `App.currentUser` updates to match the logged in user
//     assert(user.id === app.currentUser.id)
//     return user
//   } catch(err) {
//     console.error("Failed to log in", err);
//   }
// }

// loginAnonymous().then(user => {
//   console.log("Successfully logged in!", user)
// })