import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Trophy, Star, Calendar, Users, Award, CheckCircle, Calculator } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CompetitionPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    message: ""
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Competition important dates
  const competitionDate = new Date("June 22, 2025");
  const registrationDeadline = new Date("June 20, 2025");
  const admitCardDate = new Date("June 21, 2025");
  const awardCeremonyDate = new Date("To be annouce soon");

  // Calculate countdown to competition date
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = competitionDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        {/* <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 md:py-24 relative"> */}
        <section className="bg-gradient-to-r from-green-600 to-green-400 text-white py-16 md:py-24 relative">

          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block mb-6">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                  <Calendar size={20} className="mr-2" />
                  {formatDate(competitionDate)}
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Mathematics Competition for Classes 4 & 5</h1>
              <p className="text-xl mb-8">
                Join our exciting mathematics competition, showcase your talent, and win amazing prizes while enhancing your analytical skills.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Link to="/competition/apply">Apply Now</Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent border border-white text-white hover:bg-white/10">
                  <Link to="/competition/admit-card">Download Admit Card</Link>
                </Button>


              </div>

              {/* Countdown Timer */}
              <div className="mt-12 bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-xl mx-auto">
                <h3 className="text-xl font-bold mb-3">Competition Starts In:</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-3xl font-bold">{countdown.days}</span>
                    </div>
                    <span className="text-sm">Days</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-3xl font-bold">{countdown.hours}</span>
                    </div>
                    <span className="text-sm">Hours</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-3xl font-bold">{countdown.minutes}</span>
                    </div>
                    <span className="text-sm">Minutes</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-3xl font-bold">{countdown.seconds}</span>
                    </div>
                    <span className="text-sm">Seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competition Details */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="section-title">Competition Details</h2>
              <p className="section-subtitle">
                Everything you need to know about the Mathematics Competition
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white p-8 rounded-lg shadow-md hover-card text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Calendar size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Important Dates</h3>
                  <p className="text-gray-600">
                    {/* <strong>Last Date for Registration:</strong> {formatDate(registrationDeadline)}<br /> */}
                    {/* <strong>Admit Card Issue:</strong> {formatDate(admitCardDate)}<br /> */}
                    <strong>Competition Date:</strong> {formatDate(competitionDate)}<br />
                    <strong>Award Ceremony:</strong> To be annouce soon!
                  </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md hover-card text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Trophy size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Prizes</h3>
                  <p className="text-gray-600">
                    <strong>1st Prize:</strong> ₹3,000 + Certificate + Momento + T-shirt<br />
                    <strong>2nd Prize:</strong> ₹2,000 + Certificate + Momento + T-shirt<br />
                    <strong>3rd Prize:</strong> ₹1,000 + Certificate + Momento + T-shirt<br />
                    <strong>Consolation (10):</strong> ₹500 + Certificate + T-shirt
                  </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md hover-card text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Users size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Eligibility</h3>
                  <p className="text-gray-600">
                    Open to students currently in Class 4, 5 and 6. Participants must register under the correct category based on their current class.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competition Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="section-title">Competition Categories</h2>
            <p className="section-subtitle">
              Select your category based on your current class
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
              <div className="border border-gray-200 bg-white rounded-lg p-8 hover-card">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Calculator size={28} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Class 4 Category</h3>
                <p className="text-gray-600 mb-6 text-center">
                  For students currently enrolled in Class 4
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold mb-2 text-gray-800">Topics Covered:</h4>
                  <ul className="text-gray-600 list-disc list-inside text-sm space-y-1">
                    <li>Understanding of addition,subtraction,multiplication and division</li>
                    <li>Fractions</li>
                    <li>Basic Geometry</li>
                    <li>Place value and Face value</li>
                    <li>Ascending and Descending order</li>
                    <li>Odd and Even numbers,Prime and Composite numbers</li>
                    <li>Factors and multiples</li>
                    <li>Simplification</li>
                    <li>Profit and Loss</li>


                  </ul>
                </div>
                <div className="text-center">
                  <Button size="sm" variant="outline" className="bg-white hover:bg-blue-50">
                    View Sample Questions
                  </Button>
                </div>
              </div>

              <div className="border border-gray-200 bg-white rounded-lg p-8 hover-card">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Calculator size={28} className="text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Class 5 Category</h3>
                <p className="text-gray-600 mb-6 text-center">
                  For students currently enrolled in Class 5
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold mb-2 text-gray-800">Topics Covered:</h4>
                  <ul className="text-gray-600 list-disc list-inside text-sm space-y-1">
                    <li>Operations on Whole Number</li>
                    <li>Integers ( Addition and Substraction)</li>
                    <li>Fractions and Decimals</li>
                    <li>Data Handling</li>
                    <li>Basic Geometrical ideas(lines , angles)</li>
                    <li>Ratio and Proportion</li>
                    <li>LCM and HCF</li>
                    <li>Unitary Method</li>
                    <li>Profit and loss</li>
                    <li>Natural Numbers</li>
                    <li>Simplification</li>

                  </ul>
                </div>
                <div className="text-center">
                  <Button size="sm" variant="outline" className="bg-white hover:bg-purple-50">
                    View Sample Questions
                  </Button>
                </div>
              </div>

              <div className="border border-gray-200 bg-white rounded-lg p-8 hover-card">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Calculator size={28} className="text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Class 5 Category</h3>
                <p className="text-gray-600 mb-6 text-center">
                  For students currently enrolled in Class 6
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold mb-2 text-gray-800">Topics Covered:</h4>
                  <ul className="text-gray-600 list-disc list-inside text-sm space-y-1">
                    <li>Place value and Face value</li>
                    <li>Factors and Multiples</li>
                    <li>Natural Numbers Decimals and Fractions</li>
                    <li>Perimeter and Area.(Square, Rectangles and Triangles)</li>
                    <li>Operation on Numbers: Addition,Substraction,Multiplication and Division</li>
                    <li>Data handling</li>
                    <li>Basic Geometry</li>
                    <li>LCM and HCF</li>
                    <li>Unitary Method</li>
                    <li>Profit and loss</li>
                    <li>Simplification</li>

                  </ul>
                </div>
                <div className="text-center">
                  <Button size="sm" variant="outline" className="bg-white hover:bg-purple-50">
                    View Sample Questions
                  </Button>
                </div>
              </div>


            </div>
          </div>
        </section>



        {/* Award Ceremony & Special Program */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="section-title">Award Ceremony & Special Program</h2>
            <p className="section-subtitle mb-12">
              Join us on {formatDate(awardCeremonyDate)} for the award ceremony and special sessions
            </p>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <Trophy size={24} className="text-yellow-500 mr-3" />
                    <h3 className="text-2xl font-bold">Award Distribution</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Winners will be awarded with cash prizes, certificates, mementos and t-shirts in a grand ceremony. All participants will receive certificates of participation.
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <Award className="text-primary mr-3 mt-1 shrink-0" size={18} />
                      <span>Recognition for outstanding mathematical talent</span>
                    </li>
                    <li className="flex items-start">
                      <Award className="text-primary mr-3 mt-1 shrink-0" size={18} />
                      <span>Prizes presented by distinguished guests</span>
                    </li>
                    <li className="flex items-start">
                      <Award className="text-primary mr-3 mt-1 shrink-0" size={18} />
                      <span>Media coverage of the event</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-8">
                  <div className="flex items-center mb-6">
                    <Star size={24} className="text-blue-500 mr-3" />
                    <h3 className="text-2xl font-bold">Special Program Session</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Attend our special program focusing on career paths and technology evolution in this generation. Learn from experts about future opportunities.
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="text-green-500 mr-3 mt-1 shrink-0" size={18} />
                      <span>Insights on modern career opportunities in STEM</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-green-500 mr-3 mt-1 shrink-0" size={18} />
                      <span>Understanding technology evolution and its impact</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-green-500 mr-3 mt-1 shrink-0" size={18} />
                      <span>Guidance from industry experts and educators</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-green-500 mr-3 mt-1 shrink-0" size={18} />
                      <span>Networking opportunities with mentors</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Application CTA Section */}
        {/* <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white"> */}
        <section className="bg-gradient-to-r from-green-600 to-green-400 text-white py-16 md:py-24 relative">

          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Participate?</h2>
              <p className="text-lg md:text-xl mb-8">
                Register for the Mental Maths Competition today and take your first step towards showcasing your mathematical talent on a competitive platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Link to="/competition/apply" className="flex items-center">
                    <span className="mr-2">Apply Now</span>
                    <Calculator size={16} />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent border border-white text-white hover:bg-white/10">
                  <Link to="/competition/admit-card">Download Admit Card</Link>
                </Button>

              </div>
              <p className="mt-4 text-sm text-white/80">
                Last date for application: May 30, 2025
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Find answers to the most common questions about the competition
            </p>

            <div className="max-w-3xl mx-auto mt-12">
              <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md overflow-hidden">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-6 hover:bg-gray-50">
                    Who is eligible to participate in the competition?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    The competition is open to students currently studying in Class 4, 5 and 6. Participants must register under the correct category based on their current class.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="px-6 hover:bg-gray-50">
                    Is there a registration fee?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    No, registration for the Mathematics Competition is completely free. We believe in making this opportunity accessible to all students.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="px-6 hover:bg-gray-50">
                    How will the competition be conducted?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    The competition will be held in a written format with mathematical problems tailored to each class level. The exam will test conceptual understanding and problem-solving abilities rather than rote memorization.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="px-6 hover:bg-gray-50">
                    How will the winners be selected?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    Winners will be selected based on their performance in the competition. The students with the highest scores in each category will be awarded the prizes. In case of a tie, additional criteria such as time taken to complete and problem-solving approach may be considered.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="px-6 hover:bg-gray-50">
                    When and how will I receive my admit card?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    Admit cards will be issued on {formatDate(admitCardDate)} and will be sent to the email address provided during registration. The admit card must be printed and brought to the competition venue.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="px-6 hover:bg-gray-50">
                    What should participants bring on the competition day?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    Participants should bring their admit card, school ID, stationery items (pencils, erasers, etc.). Calculators will not be allowed during the competition. All other necessary materials will be provided at the venue.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="px-6 hover:bg-gray-50">
                    Will sample questions be provided for practice?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    Yes, sample questions will be available for download after successful registration. These will help participants understand the format and difficulty level of the competition.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="px-6 hover:bg-gray-50">
                    How can I contact the organizers if I have additional questions?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    For any questions not covered in the FAQ, please email competition@mateng.com or call our support line at +1 (123) 456-7890. Our team is available Monday to Friday, 9 AM to 5 PM.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CompetitionPage;