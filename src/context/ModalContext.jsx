import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const notifyModalClose = () => {
    setRefreshTrigger(prev => !prev); // toggles the value
  };

  return (
    <ModalContext.Provider value={{ refreshTrigger, notifyModalClose }}>
      {children}
    </ModalContext.Provider>
  );
};
