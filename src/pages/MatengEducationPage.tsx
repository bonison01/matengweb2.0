"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GraduationCap,
  Calendar,
  Users,
  Award,
  BookOpen,
  Clock,
  ArrowRight,
} from "lucide-react";

const MatengEducationPage = () => {
  // Countdown logic
  const calculateCountdown = (targetDate: string) => {
    const now = new Date().getTime();
    const distance = new Date(targetDate).getTime() - now;

    if (distance <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  };

  const [countdown, setCountdown] = useState(
    calculateCountdown("2025-06-22T00:00:00")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown("2025-06-22T00:00:00"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Sample programs data
  const educationPrograms = [
    {
      id: 1,
      title: "Mathematics Excellence Program",
      description:
        "Build strong mathematical foundations for students in grades 4-6 through interactive learning and problem-solving.",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "Mathematics",
      duration: "8 weeks",
      level: "Elementary",
      startDate: "June 22, 2025",
    },
    // {
    //   id: 2,
    //   title: "Science Discovery Workshop",
    //   description:
    //     "Explore scientific concepts through hands-on experiments and engaging activities designed for young minds.",
    //   image:
    //     "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    //   category: "Science",
    //   duration: "6 weeks",
    //   level: "Elementary",
    //   startDate: "June 20, 2025",
    // },
    // {
    //   id: 3,
    //   title: "Advanced Calculus for High School",
    //   description:
    //     "Prepare for college-level mathematics with our advanced calculus program for students in grades 11-12.",
    //   image:
    //     "https://images.unsplash.com/photo-1509869175650-a1d97972541a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    //   category: "Mathematics",
    //   duration: "10 weeks",
    //   level: "High School",
    //   startDate: "July 1, 2025",
    // },
  ];

  const pastCompetitions = [
    {
      id: 1,
      title: "National Math Challenge 2024",
      date: "March 15-16, 2024",
      participants: "2,500+ students",
      image:
        "https://images.unsplash.com/photo-1520359319979-72463c893c4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      results: "View Results",
    },
    {
      id: 2,
      title: "Young Scientists Competition 2024",
      date: "January 20-22, 2024",
      participants: "1,800+ students",
      image:
        "https://images.unsplash.com/photo-1588072432904-843af37f03ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      results: "View Results",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-700 to-teal-700 text-white py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Mateng Education
              </h1>
              <p className="text-xl text-gray-100 mb-8">
                Empowering communities through accessible education and skill
                development. Our programs connect knowledge seekers with local
                experts, offering workshops, courses, and mentorship
                opportunities.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-green-700 hover:bg-gray-100"
              >
                <a href="#programs">Explore Programs</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Current Competition Banner */}
        <section className="py-10 bg-green-50">
          <div className="container mx-auto px-6">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Image section */}
                <div className="md:w-2/5 relative h-60 md:h-auto">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1000")',
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/70"></div>
                </div>

                {/* Content section */}
                <div className="md:w-3/5 p-6 md:p-8 bg-gradient-to-br from-green-700 to-teal-700">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
                      Maths Competition June 22 2025
                    </h2>
                    <p className="mb-3 text-white/90 text-lg font-medium">
                      For students of class 4, 5, 6
                    </p>
                    <p className="mb-5 text-white/90 text-lg">
                      Join our exclusive education challenge and win amazing
                      prizes while showcasing your talents.
                    </p>

                    <div className="grid grid-cols-4 gap-2 bg-black/30 p-5 rounded-lg mb-5 border border-white/20 shadow-inner">
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-white">
                          {countdown.days}
                        </span>
                        <span className="text-sm font-medium text-white/80">
                          Days
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-white">
                          {countdown.hours}
                        </span>
                        <span className="text-sm font-medium text-white/80">
                          Hours
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-white">
                          {countdown.minutes}
                        </span>
                        <span className="text-sm font-medium text-white/80">
                          Minutes
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-white">
                          {countdown.seconds}
                        </span>
                        <span className="text-sm font-medium text-white/80">
                          Seconds
                        </span>
                      </div>
                    </div>

                    <Button
                      asChild
                      className="w-full py-6 text-lg font-bold bg-white text-green-700 hover:bg-gray-100 shadow-lg transition-all duration-300 rounded-md"
                    >
                      <a href="/competition/apply">Register Now</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other sections like education programs, features, past competitions, newsletter, CTA... (unchanged) */}

        <Footer />
      </main>
    </div>
  );
};

export default MatengEducationPage;
