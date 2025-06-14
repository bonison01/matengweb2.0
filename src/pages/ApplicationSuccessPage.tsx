
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ApplicationSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formNo, setFormNo] = useState<string | null>(null);

  useEffect(() => {
    // Get form number from URL query parameter
    const params = new URLSearchParams(location.search);
    const formNoParam = params.get("form_no");
    setFormNo(formNoParam);

    // If there's no form number, redirect to the competition page
    if (!formNoParam) {
      navigate("/competition");
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-10 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="border-green-100">
            <CardHeader className="bg-green-50 text-center pb-6">
              <div className="mx-auto bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 border-4 border-green-100">
                <CheckCircle size={36} className="text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-700">Application Submitted Successfully!</CardTitle>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="text-center mb-8">
                <p className="text-gray-600 mb-4">
                  Thank you for applying to the Mental Maths Competition. Your application has been received and is being processed.
                </p>

                {formNo && (
                  <div className="bg-gray-50 inline-block px-6 py-3 rounded-lg border">
                    <p className="text-sm text-gray-500">Your Form Number</p>
                    <p className="text-xl font-bold text-primary">{formNo}</p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 flex items-center mb-2">
                    <Calendar size={18} className="mr-2" />
                    Important Dates
                  </h3>
                  <ul className="space-y-2 pl-6 text-gray-700">
                    {/* <li>
                      <span className="font-medium">Admit Card Issue:</span> June , 2025
                    </li> */}
                    <li>
                      <span className="font-medium">Competition Date:</span> June 22, 2025
                    </li>
                    <li>
                      <span className="font-medium">Result Out:</span> June 25, 2025
                    </li>
                    <li>
                      <span className="font-medium">Award Ceremony:</span> To be announce soon
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-800 flex items-center mb-2">
                    <Clock size={18} className="mr-2" />
                    Next Steps
                  </h3>
                  <ul className="space-y-2 pl-6 text-gray-700">
                    <li>Your payment will be verified within 24-48 hours</li>
                    <li>Admit card with exam center details will be issued on June 10</li>
                    <li>You can download your admit card by entering your form number</li>
                    <li>Please keep your form number safe for future reference</li>
                  </ul>
                </div>

                <div className="text-center mt-8">
                  <Button
                    onClick={() => navigate("/competition")}
                    variant="outline"
                  >
                    Return to Competition Page
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ApplicationSuccessPage;
