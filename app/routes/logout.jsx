import { useEffect } from "react";
import supabase from "~/utils/supabase";

export default () => {
  useEffect(() => {
    supabase.auth.signOut();
  }, []);
  return <p>Logging out...</p>;
};
