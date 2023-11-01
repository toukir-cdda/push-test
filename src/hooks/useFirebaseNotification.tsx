import { useEffect, useState } from "react";
import {
  getToken,
  isSupported,
  getMessaging,
  onMessage,
  Messaging,
} from "firebase/messaging";
import { initializeApp } from "firebase/app";

let messaging: Messaging | undefined;

const getFirebaseConfig = (firebaseConfig) => {
  isSupported()
    .then((supported) => {
      if (supported) {
        initializeApp(firebaseConfig);

        messaging = getMessaging();
      } else {
        console.error("Browser does not support notifications");
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

const hasNotificationPermission = () => {
  try {
    return Notification.permission === "granted";
  } catch (error) {
    return false;
  }
};

const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  } catch (error) {
    console.error("An error occurred while requesting permission", error);
    return false;
  }
};

export const useFirebaseNotification = ({ firebaseConfig, vapidKey }) => {
  getFirebaseConfig(firebaseConfig);
  const [hasPermission, setHasPermission] = useState(
    hasNotificationPermission()
  );
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");

  const registerToken = async (messaging: Messaging) => {
    try {
      const token = await getToken(messaging, {
        vapidKey: vapidKey,
      });
      return { token };
    } catch (error) {
      return { error };
    }
  };

  useEffect(() => {
    if (!hasPermission) {
      requestNotificationPermission().then((permission) => {
        setHasPermission(permission);
      });
    }
  }, [hasPermission]);

  useEffect(() => {
    if (!messaging || !hasPermission || token || isLoading) {
      return;
    }
    setIsLoading(true);
    onMessage(messaging, (payload) => {
      console.log("Message", payload);
    });

    registerToken(messaging).then(({ token, error }) => {
      if (error || !token) {
        console.error(`Notifications: ${error ?? "No token received"}`);
      } else {
        setToken(token);
      }
      setIsLoading(false);
    });

    // return () => {
    //   if (unsubscribe) {
    //     unsubscribe();
    //   }
    // };
  }, [hasPermission, date, token, isLoading]);

  // to simulate re-render
  useEffect(() => {
    if (token === "") {
      const timer = window.setTimeout(() => {
        setDate(new Date());
      }, 1000);
      return () => {
        window.clearTimeout(timer);
      };
    }
  }, []);

  return { token, isLoading, hasPermission };
};
