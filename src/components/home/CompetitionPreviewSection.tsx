import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Calculator, IndianRupee } from "lucide-react";

const CompetitionPreviewSection = () => {
  return (
    <section className="mateng-section bg-gradient-to-r from-green-800 to-emerald-700 text-white relative">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
              <Calculator size={20} className="mr-2" />
              Mateng Education
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Maths Competition June 22 2025</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Join our exciting mathematics competition for Classes 4, 5 & 6 with amazing prizes and opportunities to showcase your talent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover-card">
            <h3 className="text-xl font-bold mb-3">Prizes Worth ₹50,000+</h3>
            <p className="text-gray-200">
              Win cash prizes up to ₹3,000 along with certificates, mementos, and t-shirts for top performers.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover-card">
            <h3 className="text-xl font-bold mb-3">Three Categories</h3>
            <p className="text-gray-200">
              Separate competitions for Class 4, 5 and 6 students with age-appropriate challenges.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover-card">
            <h3 className="text-xl font-bold mb-3">Special Award Ceremony</h3>
            <p className="text-gray-200">
              Join our special award ceremony featuring career guidance and insights on technology evolution.
            </p>
          </div>
        </div>

        {/* <div className="text-center">
          <Button asChild size="lg" variant="outline" className="bg-white/10 border-white hover:bg-white/20">
            <NavLink to="/competition/apply">Apply Now</NavLink>
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default CompetitionPreviewSection;
