
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Truck, Map, GraduationCap, ShoppingBag } from "lucide-react";

interface VerticalCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  link: string;
}

const VerticalCard = ({ title, description, icon, color, link }: VerticalCardProps) => {
  return (
    <Card className="hover-card overflow-hidden border-t-4" style={{ borderTopColor: color }}>
      <CardHeader className="pb-3">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: `${color}20` }}>
          <div style={{ color }}>{icon}</div>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 min-h-[80px]">{description}</CardDescription>
        <Button asChild variant="outline" className="mt-4" style={{ color, borderColor: color }}>
          <NavLink to={link}>Learn More</NavLink>
        </Button>
      </CardContent>
    </Card>
  );
};

const VerticalsSection = () => {
  const verticals = [
    {
      title: "Mateng Delivery",
      description: "Fast, reliable delivery services for your everyday needs, connecting local businesses to customers.",
      icon: <Truck size={24} />,
      color: "#4F46E5",
      link: "/delivery",
    },
    {
      title: "Mateng Discovery",
      description: "Explore and discover hidden gems in your local community, from restaurants to services.",
      icon: <Map size={24} />,
      color: "#0EA5E9",
      link: "/discovery",
    },
    {
      title: "Mateng Education",
      description: "Empowering communities through knowledge sharing and skill development programs.",
      icon: <GraduationCap size={24} />,
      color: "#10B981",
      link: "/education",
    },
    {
      title: "Mateng Marketplace",
      description: "A platform connecting local vendors, service providers, and customers in a vibrant ecosystem.",
      icon: <ShoppingBag size={24} />,
      color: "#8B5CF6",
      link: "https://matengmarket.com/products",
    },
  ];

  return (
    <section className="mateng-section bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Our Four Verticals</h2>
        <p className="section-subtitle">
          Exploring innovative ways to connect communities through our specialized services.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {verticals.map((vertical) => (
            <VerticalCard key={vertical.title} {...vertical} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerticalsSection;
