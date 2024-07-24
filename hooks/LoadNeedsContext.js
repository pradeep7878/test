import React, { createContext, useState } from "react";

export const LoadNeedsContext = createContext();

export const LoadNeedsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState()

  const toggleLoading = () => {
    setIsLoading((prevLoading) => !prevLoading);
  };

  return (
    <LoadNeedsContext.Provider
      value={{
        isLoading,
        setIsLoading,
        toggleLoading,
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </LoadNeedsContext.Provider>
  );
};
