import { supabase } from "@/lib/supabaseClient";
export const AuthService = {
  signUp: async (email, password) => {
    const { error, data } = await supabase.auth.signUp({ email, password });
    return { error, data };
  },
  signInWithEmail: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Sign-in error:", error.message);
      return { error, data: null };
    }
    return { error: null, data };
  },
  
  getUser: () => supabase.auth.user(), // Retrieve current authenticated user

  getUserWithRole: async () => {
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user:", userError.message);
      return null;
    }

    // Fetch roles assigned to the user
    const { data: roleData, error: roleError } = await supabase
      .from("user_roles")
      .select("roles(name)")
      .eq("user_id", user.id)
      .single();

    if (roleError) {
      console.error("Error fetching user role:", roleError.message);
      return { user, role: null };
    }

    return { user, role: roleData?.roles?.name };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }
  },
};
