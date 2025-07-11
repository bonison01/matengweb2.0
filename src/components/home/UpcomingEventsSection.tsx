import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const UpcomingEventsSection = () => {
  const defaultEvent = {
    id: "default",
    title: "1st Youth Bridge Initiative Program",
    description:
      "Join us for the 1st Youth Bridge Initiative Program, a comprehensive career counselling event designed to guide students through various educational and professional pathways. This program is ideal for young minds looking to make informed decisions about their futures. With expert mentors, interactive sessions, and inspirational talks, this initiative is your bridge to success. The event will be held on 12 July 2025 — don't miss it!",
    event_date: "2025-07-12T00:00:00",
    location: "To be Announced",
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image_url:
      "https://lhzwholxmjolpinyxxsz.supabase.co/storage/v1/object/public/competition_documents/aadhaar/imaKeithel.jpg",
  };

  const featuredEvent = defaultEvent;

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Upcoming Events</h2>
            <p className="text-gray-600 mt-2">Mark your calendar for these exciting opportunities</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Event */}
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-xl h-full bg-gradient-to-r from-emerald-600 to-green-500 text-white">
              <div className="absolute top-0 right-0 w-64 h-64 -mt-12 -mr-12">
                <div className="w-full h-full rounded-full bg-white/10"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-32 -mb-10 -ml-10">
                <div className="w-full h-full rounded-full bg-white/5"></div>
              </div>

              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="mb-4 flex items-center space-x-2">
                  <Badge className="bg-white/20 hover:bg-white/30 text-white">Featured</Badge>
                  <Badge className="bg-white/20 hover:bg-white/30 text-white">Education</Badge>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4">{featuredEvent.title}</h3>
                <p className="mb-6">{featuredEvent.description}</p>

                <div className="mt-auto">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-emerald-600 hover:bg-white/90"
                  >
                    <a
                      href="https://drive.google.com/file/d/1OrJkiqfPT5LcnAacjJtgfc_PemChFVh3/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Know More
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mateng Marketplace Card - Shown Directly as Requested */}
          <div className="bg-gray-50 rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="relative h-48 overflow-hidden">
              <img
                src={featuredEvent.image_url}
                alt={featuredEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                {/* Date display can be added here */}
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-2 rounded-full mr-3">
                    <ShoppingCart className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Mateng Marketplace</h4>
                    <p className="text-sm text-gray-600">
                      Shop your needs at best rates.
                    </p>
                  </div>
                </div>
              </div>

              <Button asChild variant="outline" className="w-full mt-6">
                <NavLink to="https://www.matengmarket.com/products">Shop Now</NavLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
