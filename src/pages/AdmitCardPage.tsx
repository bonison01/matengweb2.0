import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AdmitCardForm from "@/components/admitCard/AdmitCardForm";
import AdmitCardStatus from "@/components/admitCard/AdmitCardStatus";
import AdmitCardDisplay from "@/components/admitCard/AdmitCardDisplay";

interface AdmitCardData {
  form_no: string;
  applicant_name: string;
  father_name: string;
  photo_url: string;
  roll_number: string;
  class: string;
  exam_date: string;
  exam_time: string;
  exam_centre: string;
  date_of_birth: string; // ✅ Add this line
}


const AdmitCardPage: React.FC = () => {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [admitCardData, setAdmitCardData] = useState<AdmitCardData | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fetchAdmitCard = async (formNo: string) => {
    if (!formNo.trim()) {
      toast({
        title: "Required",
        description: "Please enter your form number.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setStatusMessage(null);
    setAdmitCardData(null);

    try {
      const { data, error } = await supabase
        .from("mental_maths_applications")
        .select(`
          form_no,
          applicant_name,
          father_name,
          date_of_birth,
          photo_url,
          roll_number,
          class,
          exam_date,
          exam_time,
          exam_centre,
          payment_verified
        `)
        .eq("form_no", formNo.trim());

      if (error) throw error;

      if (!data || data.length === 0) {
        toast({
          title: "Not Found",
          description: "No application found for this form number.",
          variant: "destructive",
        });
        return;
      }

      const application = data[0];

      if (!application.payment_verified) {
        setStatusMessage("Your payment is pending verification. Please check back later.");
        return;
      }

      if (!application.roll_number) {
        setStatusMessage("Application received. Roll number not assigned yet. Please check back later.");
        return;
      }

      const missingFields = [];
      if (!application.exam_date) missingFields.push("exam date");
      if (!application.exam_time) missingFields.push("exam time");
      if (!application.exam_centre) missingFields.push("exam centre");

      if (missingFields.length > 0) {
        setStatusMessage(
          `Your admit card is being prepared. Missing: ${missingFields.join(", ")}. Please check back later.`
        );
        return;
      }

      setAdmitCardData(application as AdmitCardData);
      setStatusMessage("Your admit card is ready for download.");
    } catch (err) {
      console.error("Error fetching admit card:", err);
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
        <div className="container mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Mental Maths Competition Admit Card
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Enter your form number to download your admit card.
            </p>
          </div>

          <AdmitCardForm onSubmit={fetchAdmitCard} loading={loading} />

          <AdmitCardStatus
            status={statusMessage}
            isReady={statusMessage?.toLowerCase().includes("ready") ?? false}
          />

          <AdmitCardDisplay data={admitCardData} />
        </div>
      </main>

      <Footer />

      {/* Print Styles */}
      <style>
        {`
          @media print {
            body {
              background: white !important;
              margin: 0;
              padding: 0;
            }

            body * {
              visibility: hidden !important;
              box-shadow: none !important;
              background: none !important;
            }

            #admitCard, #admitCard * {
              visibility: visible !important;
              position: static !important;
              overflow: visible !important;
              color: black !important;
            }

            #admitCard {
              position: absolute !important;
              top: 0;
              left: 0;
              width: 100%;
              margin: 0;
              padding: 0;
              page-break-inside: avoid;
              font-size: 12pt;
            }

            nav, footer, header {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AdmitCardPage;
