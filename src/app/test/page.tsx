"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client"; // Adjust path to your auth-client

export default function TestPage() {
    // 1. Fetch the user session directly on the client
    const { data: session, isPending: sessionLoading } = authClient.useSession();

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // Show loading state while checking auth
    if (sessionLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading session...</div>;
    }

    // Block rendering if not logged in
    if (!session) {
        return <div className="p-8 text-red-500 font-medium text-center">You must be logged in to test this page.</div>;
    }

    // 2. Handle form submission via Fetch API
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        const primaryEmail = formData.get("primaryEmail") as string;
        const secondaryEmail = formData.get("secondaryEmail") as string;

        try {
            const response = await fetch("/api/server/test", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    studentId: session.user.id, // Dynamically grab ID from the hook
                    primaryEmail,
                    secondaryEmail,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage({ type: "error", text: data.error || "Something went wrong." });
            } else {
                setMessage({ type: "success", text: data.message });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Network error. Please check your connection." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 p-8 flex flex-col items-center">
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                <h1 className="text-xl font-bold mb-1">API Test: Parent Emails</h1>
                <p className="text-sm text-zinc-500 mb-6">
                    Updating records for: <span className="font-mono bg-zinc-100 px-1 rounded">{session.user.id}</span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Primary Email</label>
                        <input
                            name="primaryEmail"
                            type="email"
                            required
                            placeholder="parent1@example.com"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium">Secondary Email (Optional)</label>
                        <input
                            name="secondaryEmail"
                            type="email"
                            placeholder="parent2@example.com"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Status Message */}
                    {message && (
                        <div className={`p-3 rounded-md text-sm ${message.type === "error" ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"}`}>
                            {message.text}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center items-center py-2 px-4 rounded-md text-white bg-black hover:bg-zinc-800 disabled:opacity-50 transition-colors"
                    >
                        isLoading ? 'loading'
                    </button>
                </form>
            </div>
        </div>
    );
}