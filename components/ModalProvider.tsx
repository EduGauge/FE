import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { Modal } from "react-native";

import ProfileScreen from "../app/profile";
import NotificationScreen from "../app/notification";

type ModalContextValue = {
  openProfile: () => void;
  closeProfile: () => void;
  openNotification: () => void;
  closeNotification: () => void;
};

const ModalContext =
  createContext<ModalContextValue | null>(null);

export function ModalProvider({
  children,
}: PropsWithChildren) {
  const [visible, setVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] =
    useState(false);

  const value = useMemo(
    () => ({
      openProfile: () => setVisible(true),
      closeProfile: () => setVisible(false),
      openNotification: () =>
        setNotificationVisible(true),
      closeNotification: () =>
        setNotificationVisible(false),
    }),
    [],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={value.closeProfile}
      >
        <ProfileScreen onClose={value.closeProfile} />
      </Modal>

      <Modal
        visible={notificationVisible}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={value.closeNotification}
      >
        <NotificationScreen
          onClose={value.closeNotification}
        />
      </Modal>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(
      "useModal must be used within ModalProvider",
    );
  }

  return context;
}
