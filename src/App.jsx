import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import WebsiteLayout from "@/layouts/website";
import DashboardLayout from "@/layouts/dashboard";
import AuthLayout from "@/layouts/auth";
import { routes } from "@/routes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        console.log("Session ID:", session.user.id);

        const { data: userRoleData, error: userRoleError } = await supabase
          .from("user_roles")
          .select("role_id")
          .eq("user_id", session.user.id)
          .single();

        if (userRoleError) {
          console.error("Error fetching user roles:", userRoleError.message);
          return;
        }

        if (userRoleData?.role_id) {
          console.log("Fetched role ID:", userRoleData.role_id);

          const { data: roleNameData, error: roleNameError } = await supabase
            .from("roles")
            .select("id, name")
            .eq("id", userRoleData.role_id);

          console.log("Role Table Query Response:", roleNameData);

          if (roleNameError) {
            console.error("Error fetching role name:", roleNameError.message);
            return;
          }

          if (roleNameData.length > 0) {
            console.log("Role Name:", roleNameData[0].name);
            setUserRole(roleNameData[0].name);
            setIsAuthenticated(true);
          } else {
            console.warn("No matching role found in the roles table.");
          }
        }
      } else {
        console.warn("No session data.");
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <Routes>
      {/* Website routes */}
      <Route path="/" element={<WebsiteLayout />}>
        {routes
          .find((route) => route.layout === "website")
          ?.pages.map((route) => (
            <Route key={route.id} path={route.path} element={route.element} />
          ))}
      </Route>

      {/* Protected Dashboard routes */}
      <Route
  path="/dashboard/*"
  element={
    isAuthenticated && userRole ? (
      <>
        {console.log("Navigating to dashboard. UserRole:", userRole)}
        <DashboardLayout />
      </>
    ) : (
      <>
        {console.log(
          "Redirecting to sign-in. Authenticated:",
          isAuthenticated,
          "UserRole:",
          userRole
        )}
        <Navigate to="/auth/sign-in" replace />
      </>
    )
  }
>

      </Route>

      {/* Auth routes */}
      <Route path="/auth/*" element={<AuthLayout />}>
        {routes
          .find((route) => route.layout === "auth")
          ?.pages.map((route) => (
            <Route key={route.id} path={route.path} element={route.element} />
          ))}
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
