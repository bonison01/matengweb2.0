import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ExamResult = () => {
    const { toast } = useToast();
    const [rollNumber, setRollNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState<{ name: string; mark: number; class: string; } | null>(null);

    const fetchResult = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!rollNumber.trim()) {
            toast({
                title: "Required",
                description: "Please enter your roll number.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        setResultData(null);

        try {
            const { data, error } = await (supabase as any)
                .from("result")
                .select("name, mark, class")
                .eq("roll_number", rollNumber.trim());

            if (error) throw error;

            if (!data || data.length === 0) {
                toast({
                    title: "Not Found",
                    description: "No result found for this roll number.",
                    variant: "destructive",
                });
                return;
            }

            setResultData(data[0] as { name: string; mark: number; class: string });
        } catch (err) {
            console.error("Error fetching result:", err);
            toast({
                title: "Error",
                description: "Something went wrong. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow pt-16 bg-gray-50 py-12">
                <div className="container mx-auto px-6 text-center">
                    {/* --- Announcement Box --- */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-12">
                        <h2 className="text-2xl font-semibold mb-4 text-primary">Exam Result</h2>
                        <a
                            href="https://drive.google.com/file/d/1yOMBAhNW7sDRjXPzK26o884xV_McQH-P/view?usp=drive_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-primary text-white font-medium px-5 py-3 rounded hover:bg-primary-dark transition"
                        >
                            Download PDF
                        </a>
                        <br /><br />
                        <p className="text-lg leading-relaxed text-gray-700">
                            The Prize Distribution Ceremony will be held on <strong>29th June 2025 at 2:00 PM</strong> at <strong>Manipur University, Canchipur</strong>.<br /><br />
                            All winners are requested to attend the ceremony to receive their prizes.<br /><br />
                            The winners will be awarded prizes in the form of cash and certificates.<br /><br />
                            The winners will also be given a chance to meet the Chief Guest and other dignitaries.<br /><br />
                            We kindly request all students to attend the ceremony along with their parents.
                        </p>
                    </div>

                    {/* --- Result Lookup Form --- */}
                    <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Check Your Result by Roll Number</h3>
                        <form
                            onSubmit={fetchResult}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <input
                                type="text"
                                value={rollNumber}
                                onChange={(e) => setRollNumber(e.target.value)}
                                placeholder="Enter Roll Number"
                                className="border border-gray-300 rounded px-4 py-2 w-full sm:w-64"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                                disabled={loading}
                            >
                                {loading ? "Checking..." : "Check Result"}
                            </button>
                        </form>

                        {resultData && (
                            <div className="mt-6 text-left">
                                <p className="text-lg font-medium text-gray-700">Name: {resultData.name}</p>
                                <p className="text-lg font-medium text-gray-700">Mark: {resultData.mark}</p>
                                <p className="text-lg font-medium text-gray-700">Class: {resultData.class}</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ExamResult;
