"use client";
import { authClient } from "@/lib/auth-client"; // Adjust this path if needed
import styles from "./auth.module.scss";

export const AuthButton = () => {
    const handleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            // Where they go if login is successful
            callbackURL: "/dashboard", 
            // 🚨 CRITICAL: Where they go if the DB hook rejects them
            errorCallbackURL: "/unauthorized", 
        });
    };

    return (
        <button onClick={handleLogin} className={styles.authbutton}>
            <img 
                src="/google.svg" 
                draggable="false" 
                className={styles.googlelogo} 
                alt="Sign in with Google" 
            />
        </button>
    );
};