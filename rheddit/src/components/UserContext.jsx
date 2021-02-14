import { createContext, useState } from "react";

import React from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("rhedditUser") || null);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}
