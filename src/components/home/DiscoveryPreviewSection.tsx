
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Star } from 'lucide-react';
import { useDiscoveryItems } from '@/hooks/useDiscoveryItems';
import { useNavigate } from 'react-router-dom';

const DiscoveryPreviewSection = () => {
  const { data: items, isLoading } = useDiscoveryItems();
  const navigate = useNavigate();

  // Show featured items first, then latest items, limit to 6
  const displayItems = items
    ?.sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    })
    .slice(0, 6);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'event': return 'bg-blue-100 text-blue-800';
      case 'place': return 'bg-green-100 text-green-800';
      case 'business': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Discover Amazing Places & Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore local events, discover unique places, and find amazing businesses in your community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!displayItems || displayItems.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Discover Amazing Places & Events</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore local events, discover unique places, and find amazing businesses in your community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {(item.image_url || item.logo_url) && (
                <div className="h-48 w-full relative">
                  <img
                    src={item.image_url || item.logo_url || ''}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                  </div>
                  {item.is_featured && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary">Featured</Badge>
                    </div>
                  )}
                </div>
              )}
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  {!item.image_url && !item.logo_url && (
                    <Badge className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                  )}
                </div>
                {item.category && (
                  <Badge variant="outline" className="w-fit">
                    {item.category.name}
                  </Badge>
                )}
              </CardHeader>
              
              <CardContent className="space-y-2">
                {item.description && (
                  <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                )}
                
                {item.address && (
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="truncate">{item.address}</span>
                  </div>
                )}
                
                {item.event_date && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(item.event_date).toLocaleDateString()}
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="pt-0">
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                  {item.average_rating ? item.average_rating.toFixed(1) : 'No reviews'}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            onClick={() => navigate('/discovery')}
            size="lg"
          >
            View All Discovery Items
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DiscoveryPreviewSection;
