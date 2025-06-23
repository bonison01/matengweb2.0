import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const AnswerKeySection = () => {
  return (
    <section className="mateng-section bg-gradient-to-r from-green-800 to-emerald-700 text-white relative">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
              <FileText size={20} className="mr-2" />
              Answer Key
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Maths Competition Answer Key</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Access the official answer key for the June 22, 2025 Mathematics Competition. Check your answers and calculate your score.
          </p>
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="bg-white/10 border-white hover:bg-white/20">
            <NavLink to="/answerKeyPage">View Answer Key</NavLink>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AnswerKeySection;
