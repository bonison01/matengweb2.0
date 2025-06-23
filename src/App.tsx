import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { AuthProvider } from "@/components/AuthContext";
import ScrollToTop from "@/components/ScrollToTop"; // ✅ Add this line

import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import CompetitionPage from "./pages/CompetitionPage";
import ContactPage from "./pages/ContactPage";
import MatengDeliveryPage from "./pages/MatengDeliveryPage";
import MatengDiscoveryPage from "./pages/MatengDiscoveryPage";
import MatengEducationPage from "./pages/MatengEducationPage";
import MatengMarketplacePage from "./pages/MatengMarketplacePage";
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import CompetitionApplicationPage from "./pages/CompetitionApplicationPage";
import ApplicationSuccessPage from "./pages/ApplicationSuccessPage";
import AdmitCardPage from "./pages/AdmitCardPage";
import AdminApplicationsPage from "./pages/AdminApplicationsPage";
import RedirectToDeliveryRates from "./pages/RedirectToDeliveryRates";
import Marketplace from "./pages/Marketplace";
import AnswerKeyPage from "./pages/AnswerKeyPage";


const queryClient = new QueryClient();

const AppContent = () => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // const contactText = "Please contact 8787649928 for any delivery inquiries. All day service available, Delhi-Imphal in One day service available. The last date for online registration for the Maths Competition has been extended to 5th June. Admit cards will be available from 6th June.";
  const contactText = "Please contact 8787649928 for any delivery inquiries. The last date for online registration for the Maths Competition has been extended to 5th June. Admit cards will be available from 6th June.";

  return (
    <>
      {/* Contact header with continuous animation */}
      <div className="bg-black text-white py-2 px-4 text-center text-sm md:text-base overflow-hidden fixed w-full z-50">
        <div
          key={animationKey}
          className="flex items-center whitespace-nowrap w-max marquee"
        >
          <div className="flex items-center mr-16">
            <Phone size={16} className="mr-2 flex-shrink-0" />
            <span>{contactText}</span>
          </div>
          <div className="flex items-center mr-16">
            <Phone size={16} className="mr-2 flex-shrink-0" />
            <span>{contactText}</span>
          </div>
          <div className="flex items-center mr-16">
            <Phone size={16} className="mr-2 flex-shrink-0" />
            <span>{contactText}</span>
          </div>
        </div>
      </div>

      {/* Padding to push content below fixed header */}
      <div className="h-10"></div>

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/competition" element={<CompetitionPage />} />
        <Route path="/competition/apply" element={<CompetitionApplicationPage />} />
        <Route path="/competition/application-success" element={<ApplicationSuccessPage />} />
        <Route path="/competition/admit-card" element={<AdmitCardPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/delivery" element={<MatengDeliveryPage />} />
        {/* <Route path="/discovery" element={<MatengDiscoveryPage />} /> */}
        <Route path="/education" element={<MatengEducationPage />} />
        <Route path="/marketplace" element={<MatengMarketplacePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/applications" element={<AdminApplicationsPage />} />
        <Route path="/delivery-rates" element={<RedirectToDeliveryRates />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/answerKeyPage" element={<AnswerKeyPage />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop /> {/* ✅ This handles scroll reset */}
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
