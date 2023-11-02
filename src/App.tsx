// import { GenerateFCMToken } from "./components/GenerateFCMToken";
// import { GenerateFCMToken } from "npm-component-package";
// import { useFirebaseNotification } from "./hooks/useFirebaseNotification";

import { GenerateFCMToken } from "push-reactor";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBcBoJt64kLa-s0qty9CbnfKlyr16lmg1E",
    authDomain: "push-notification-c53a1.firebaseapp.com",
    projectId: "push-notification-c53a1",
    storageBucket: "push-notification-c53a1.appspot.com",
    messagingSenderId: "542544547876",
    appId: "1:542544547876:web:5d7266f6216bbb3c14c8b1",
    measurementId: "G-WSBW67005R",
  };
  const vapidKey =
    "BC2p1ft9yE8FIUJvUSOwTz4MMFZROoHEhPY0_83Dzfw9W7QvmOr4ueIYvB3fnXduzGkCfqLB6L0vX_p1DxV_Bw4";

  return (
    <>
      <GenerateFCMToken
        firebaseConfig={firebaseConfig}
        vapidKey={vapidKey}
        inAppNotification={true}
        getDeviceToken={(data) => console.log(data)}
      />
    </>
  );
}

export default App;
