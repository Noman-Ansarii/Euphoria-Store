// ToastContext.jsx
import React, { createContext, useContext } from "react";
import { useToast } from "@chakra-ui/react";

const ToastContext = createContext();

export const useToastContext = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const toast = useToast();

  const showToast = ({ title, position, colorScheme }) => {
    toast({
      title,
      position,
      duration: 2000, // Adjust duration as needed
      isClosable: true,
      colorScheme,
    });
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
    </ToastContext.Provider>
  );
};
