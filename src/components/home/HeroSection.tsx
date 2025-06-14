import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { GraduationCap, ShoppingBag } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselApi, setCarouselApi] = useState<any>(null);

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    if (!carouselApi) return;

    const interval = setInterval(() => {
      const nextSlide = (carouselApi.selectedScrollSnap() + 1) % 3;
      carouselApi.scrollTo(nextSlide);
      setActiveSlide(nextSlide);
    }, 8000); // 5 seconds

    carouselApi.on("select", () => {
      setActiveSlide(carouselApi.selectedScrollSnap());
    });

    return () => clearInterval(interval);
  }, [carouselApi]);

  // Countdown logic for the competition
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("June 8, 2025 00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      <div className="w-full relative z-10">
        <Carousel
          className="w-full"
          setApi={(api) => {
            if (api && !carouselApi) {
              setCarouselApi(api);
            }
          }}
        >
          <CarouselContent>
            {/* Slide 1: Education Competition */}
            {/* <CarouselItem>
              <div className="relative">
                <div className="absolute inset-0 h-[600px] md:h-[700px] w-full">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://lhzwholxmjolpinyxxsz.supabase.co/storage/v1/object/public/competition_documents/aadhaar/1.jpg")',
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                </div>

                <div className="relative py-16 px-4 min-h-[600px] md:min-h-[700px] flex items-center justify-center">
                  <div className="max-w-2xl text-center">
                    <div className="inline-block mb-4">
                      <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center justify-center">
                        <GraduationCap size={20} className="mr-2" />
                        Mateng Education
                      </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in text-white">
                      Maths Competition June 8 2025
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-xl mx-auto">
                      Join our exciting education-focused community competition with amazing prizes and opportunities to showcase your talents. Open for students of class 4, 5 and 6.
                    </p>

                    <div className="grid grid-cols-4 gap-2 bg-black/30 p-5 rounded-lg mb-5 border border-white/20 shadow-inner w-full max-w-md mx-auto">
                      {["days", "hours", "minutes", "seconds"].map((unit, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <span className="text-3xl font-bold text-white">
                            {String(countdown[unit as keyof typeof countdown]).padStart(2, "0")}
                          </span>
                          <span className="text-sm font-medium text-white">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>

                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
                      <Button
                        asChild
                        size="lg"
                        className="text-base hover-scale text-white bg-gradient-to-r from-green-800 to-emerald-700 hover:from-green-700 hover:to-emerald-600"
                      >
                        <NavLink to="/competition/apply">Register Now</NavLink>
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="bg-white/10 text-white text-base border-white hover:bg-white/20"
                      >
                        <NavLink to="/education">Browse Programs</NavLink>
                      </Button>


                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem> */}

            {/* Slide 2: Community Focus */}
            <CarouselItem>
              <div className="relative">
                <div className="absolute inset-0 h-[100px] md:h-[700px] w-full">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://lhzwholxmjolpinyxxsz.supabase.co/storage/v1/object/public/competition_documents/aadhaar/2nd.jpg")',
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                </div>

                <div className="relative py-16 px-4 min-h-[600px] md:min-h-[700px] flex items-center justify-center">
                  <div className="max-w-2xl text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in text-white">
                      Bringing Communities Together
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-xl mx-auto">
                      Mateng Hub Connect is revolutionizing hyperlocal delivery with innovative solutions across four powerful verticals. Established in December 2022, we're building the future of community commerce.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
                      <Button
                        asChild
                        size="lg"
                        className="text-base hover-scale text-white bg-gradient-to-r from-green-800 to-emerald-700 hover:from-green-700 hover:to-emerald-600"
                      >
                        <NavLink to="/services">Our Services</NavLink>
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        // className="bg-white/10 text-base border-white hover:bg-white/20"
                        className="bg-white/10 text-white text-base border-white hover:bg-white/20"
                      >
                        <NavLink to="https://matengmarket.com/delivery-rates">Get Delivery Service</NavLink>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 3: Marketplace */}
            <CarouselItem>
              <div className="relative">
                <div className="absolute inset-0 h-[600px] md:h-[700px] w-full">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://lhzwholxmjolpinyxxsz.supabase.co/storage/v1/object/public/competition_documents/aadhaar/3.jpg")',
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                </div>

                <div className="relative py-16 px-4 min-h-[600px] md:min-h-[700px] flex items-center justify-center">
                  <div className="max-w-2xl text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in text-white">
                      Shop Local, Support Local
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-xl mx-auto">
                      Our marketplace connects local producers, artisans and small businesses directly with customers in your community. Discover unique products while supporting the local economy.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
                      <Button asChild size="lg" className="text-base hover-scale">
                        <Button
                          asChild
                          size="lg"
                          className="text-base hover-scale text-white bg-gradient-to-r from-green-800 to-emerald-700 hover:from-green-700 hover:to-emerald-600"
                        >
                          <NavLink to="https://matengmarket.com/products">
                            <ShoppingBag className="mr-2" size={20} /> Shop Now</NavLink>
                        </Button>

                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        // className="bg-white/10 text-base border-white hover:bg-white/20"
                        className="bg-white/10 text-white text-base border-white hover:bg-white/20"
                      >
                        {/* <NavLink to="/marketplace#how-it-works">How It Works</NavLink> */}
                        <NavLink to="https://matengmarket.com/delivery-rates">Get Delivery Service</NavLink>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious className="left-2 md:left-4 bg-black/50 hover:bg-black/70 text-white border-none z-20" />
          <CarouselNext className="right-2 md:right-4 bg-black/50 hover:bg-black/70 text-white border-none z-20" />

          {/* Slide indicators */}
          <div className="flex justify-center gap-2 mt-6 pb-6">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveSlide(index);
                  carouselApi?.scrollTo(index);
                }}
                className={`h-2 rounded-full transition-all ${activeSlide === index ? "w-8 bg-white" : "w-2 bg-white/50"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default HeroSection;
