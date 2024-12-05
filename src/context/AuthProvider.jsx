import React, { createContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"; // Ensure this is the correct path

// Create the AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Use getSession instead of session
    const fetchSession = async () => {
      const { data: session } = await supabase.auth.getSession(); // Corrected method
      setUser(session?.user ?? null);
    };

    fetchSession();

    // Listen for auth state changes
    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Clean up the listener on component unmount
    return () => {
      // Check for the presence of unsubscribe method correctly
      if (authListener && typeof authListener.unsubscribe === "function") {
        authListener.unsubscribe();
      } else {
        console.error("AuthListener has no unsubscribe method.");
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
