import React from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar, Clock, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
  date_of_birth: string;
}

interface AdmitCardDisplayProps {
  data: AdmitCardData | null;
}

const AdmitCardDisplay: React.FC<AdmitCardDisplayProps> = ({ data }) => {
  if (!data) return null;

  const handleDownloadPdf = async () => {
    const element = document.getElementById("admitCardWrapper");
    const actionButtons = document.getElementById("admitCardActions");

    if (!element) return;

    if (actionButtons) actionButtons.style.display = "none";

    element.style.width = "800px";
    element.style.padding = "20px";
    element.style.background = "#fff";

    await new Promise((resolve) => setTimeout(resolve, 300));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;
    const x = (pageWidth - imgWidth) / 2;
    const y = 10;

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    pdf.save(`${data.applicant_name}_AdmitCard.pdf`);

    element.style.width = "";
    element.style.padding = "";
    element.style.background = "";

    if (actionButtons) actionButtons.style.display = "flex";
  };

  return (
    <>
      <style>
        {`
          @media print {
            body * {
              visibility: hidden !important;
            }
            #admitCardWrapper, #admitCardWrapper * {
              visibility: visible !important;
            }
            #admitCardWrapper {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 20px;
              background: white;
              box-shadow: none !important;
            }
            .print\\:hidden {
              display: none !important;
            }
          }
        `}
      </style>

      {/* Action Buttons */}
      <div id="admitCardActions" className="mb-4 print:hidden flex gap-2">
        <Button onClick={handleDownloadPdf} variant="default" size="lg">
          Download Admit Card as PDF
        </Button>
      </div>

      {/* Padded Wrapper to Keep Borders Inside Page */}
      <div id="admitCardWrapper" className="bg-white px-4 py-6 print:px-6 print:py-8">
        <Card className="border-2 border-black overflow-hidden max-w-4xl mx-auto">
          <CardHeader className="border-b-2 border-black bg-white px-6 py-5">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold">Maths Competition 2025</CardTitle>
                <CardDescription className="text-base font-medium text-black">
                  Mateng Education
                </CardDescription>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">Admit Card</p>
                <p className="text-xs text-gray-700">Form No: {data.form_no}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-8 px-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Photo */}
              <div className="border-2 border-black rounded-md h-44 w-36 shrink-0 overflow-hidden">
                {data.photo_url ? (
                  <img
                    src={data.photo_url}
                    alt="Candidate"
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                    No Photo
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="flex-1 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <p className="text-sm text-gray-500">Roll Number</p>
                    <p className="font-semibold text-lg">{data.roll_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Class</p>
                    <p className="font-semibold text-lg">{data.class}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Candidate Name</p>
                  <p className="font-semibold text-lg">{data.applicant_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-semibold text-lg">{data.date_of_birth}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Father's Name</p>
                  <p className="font-semibold text-lg">{data.father_name}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 mt-1 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Exam Date</p>
                      <p className="font-semibold text-lg">
                        {format(new Date(data.exam_date), "MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 mt-1 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Exam Time</p>
                      <p className="font-semibold text-lg">{data.exam_time}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 mt-1 text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Exam Centre</p>
                    <p className="font-semibold text-lg">{data.exam_centre}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col items-start border-t border-black pt-6 px-6">
            <h4 className="font-semibold text-lg mb-3">Important Instructions:</h4>
            <ul className="text-sm list-disc list-inside space-y-2 mb-6">
              <li>Please arrive 45 minutes before the scheduled exam time.</li>
              <li>Carry this admit card and a valid photo ID.</li>
              <li>Bring required stationery (pencils, erasers, etc.).</li>
              <li>Calculators are not permitted during the exam.</li>
              <li>Mobile phones and electronic devices are not allowed.</li>
              <li>Online form candidates must report 60 minutes before start time.</li>
            </ul>

            <div className="w-full flex justify-between mt-8">
              <div className="text-left">
                <p className="text-sm mb-1">Signature of Candidate</p>
                <div className="border-t border-black w-48 mt-2" />
              </div>
              <div className="text-right">
                <p className="text-sm mb-1">Signature of Exam Authority</p>
                <div className="border-t border-black w-48 mt-2 ml-auto" />
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AdmitCardDisplay;
