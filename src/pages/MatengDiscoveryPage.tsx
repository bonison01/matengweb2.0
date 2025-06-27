
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, Star, Phone, Clock, Coffee, Utensils, ShoppingBag, MapPin } from "lucide-react";

const MatengDiscoveryPage = () => {
  // Sample data for nearby places
  const nearbyPlaces = [
    {
      id: 1,
      name: "Green Cafe",
      category: "Cafe",
      rating: 4.8,
      address: "123 Main Street, Downtown",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      hours: "7:00 AM - 9:00 PM",
      distance: "0.3 km",
      phone: "+1 (123) 456-7890",
      icon: Coffee
    },
    {
      id: 2,
      name: "Fresh Market",
      category: "Grocery",
      rating: 4.5,
      address: "456 Park Avenue, Midtown",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      hours: "8:00 AM - 10:00 PM",
      distance: "0.7 km",
      phone: "+1 (123) 456-7891",
      icon: ShoppingBag
    },
    {
      id: 3,
      name: "The Gourmet Kitchen",
      category: "Restaurant",
      rating: 4.9,
      address: "789 Oak Street, Westside",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      hours: "11:00 AM - 11:00 PM",
      distance: "1.2 km",
      phone: "+1 (123) 456-7892",
      icon: Utensils
    },
    {
      id: 4,
      name: "Urban Bistro",
      category: "Restaurant",
      rating: 4.7,
      address: "321 Elm Street, Eastside",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      hours: "11:30 AM - 10:30 PM",
      distance: "1.5 km",
      phone: "+1 (123) 456-7893",
      icon: Utensils
    },
    {
      id: 5,
      name: "Brew Haven",
      category: "Cafe",
      rating: 4.6,
      address: "987 Pine Street, Northside",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      hours: "6:30 AM - 8:30 PM",
      distance: "0.9 km",
      phone: "+1 (123) 456-7894",
      icon: Coffee
    },
    {
      id: 6,
      name: "Sunset Mall",
      category: "Shopping",
      rating: 4.4,
      address: "654 Cedar Avenue, Southside",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      hours: "10:00 AM - 9:00 PM",
      distance: "2.1 km",
      phone: "+1 (123) 456-7895",
      icon: ShoppingBag
    }
  ];

  // Categories for filter buttons
  const categories = ["All", "Restaurant", "Cafe", "Grocery", "Shopping"];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Mateng Discovery</h1>
              <p className="text-xl text-gray-100 mb-8">
                Explore and discover hidden gems in your local community. From restaurants to services,
                find the best places near you with Mateng Discovery.
              </p>
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                <a href="#places">Discover Places</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Discovery Map */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Explore Your Neighborhood</h2>

            <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg bg-gray-200 relative">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex items-end p-8">
                <div>
                  <h3 className="text-white text-2xl font-bold">Interactive Map Coming Soon</h3>
                  <p className="text-white/80 mt-2">Discover places near you with our interactive map feature</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search for places, restaurants, cafes..."
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mateng-discovery"
                />
                <Map className="absolute left-4 top-3.5 text-gray-400" size={20} />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    className={index === 0 ? "bg-mateng-discovery hover:bg-mateng-discovery/90" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Places */}
        <section id="places" className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Popular Places Nearby</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {nearbyPlaces.map((place) => (
                <Card key={place.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 w-full relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${place.image})` }}
                    ></div>
                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="text-yellow-400 mr-1" size={16} fill="currentColor" />
                      <span>{place.rating}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-white">
                        <place.icon className="mr-1" size={12} />
                        {place.category}
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{place.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex items-start mb-2">
                      <MapPin className="text-gray-500 mr-2 shrink-0" size={18} />
                      <p className="text-gray-600 text-sm">{place.address}</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <Clock className="text-gray-500 mr-2 shrink-0" size={18} />
                      <p className="text-gray-600 text-sm">{place.hours}</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="text-gray-500 mr-2 shrink-0" size={18} />
                      <p className="text-gray-600 text-sm">{place.phone}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between items-center">
                    <span className="inline-flex items-center text-sm font-medium text-mateng-discovery">
                      <Map className="mr-1" size={16} />
                      {place.distance} away
                    </span>
                    <Button variant="outline" className="text-mateng-discovery border-mateng-discovery hover:bg-mateng-discovery/10">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button className="bg-mateng-discovery hover:bg-mateng-discovery/90">
                Load More Places
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Discover More with Mateng</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                  <Map className="text-mateng-discovery w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Personalized Recommendations</h3>
                <p className="text-gray-600">
                  Get customized suggestions based on your preferences, past visits, and community ratings to discover places you'll love.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <Star className="text-mateng-discovery w-8 h-8" fill="none" />
                </div>
                <h3 className="text-xl font-bold mb-4">Verified Reviews</h3>
                <p className="text-gray-600">
                  Read authentic feedback from community members to make informed decisions about where to go and what to try.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-6">
                  <MapPin className="text-mateng-discovery w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Local Event Calendar</h3>
                <p className="text-gray-600">
                  Stay updated on community happenings, from farmers markets to concerts, and never miss out on local experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-mateng-discovery text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Discovering?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Download the Mateng Discovery app today and start exploring the best your community has to offer.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
              <Button variant="secondary" size="lg" className="text-mateng-discovery">
                Download App
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MatengDiscoveryPage;
