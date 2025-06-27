import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ExamResultPage: React.FC = () => {
  const { toast } = useToast();

  const [rollNumber, setRollNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<{ name: string; mark: number } | null>(null);

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
        .select("name, mark")
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

      setResultData(data[0] as { name: string; mark: number });
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow py-12 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Exam Result Lookup
            </h1>
            <p className="text-gray-600 text-lg">
              Enter your roll number to check your marks.
            </p>
          </div>

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
            <div className="mt-8 bg-white p-6 rounded shadow text-center">
              <p className="text-xl font-semibold text-gray-800">
                Name: {resultData.name}
              </p>
              <p className="text-xl font-semibold text-gray-800">
                Marks: {resultData.mark}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExamResultPage;
