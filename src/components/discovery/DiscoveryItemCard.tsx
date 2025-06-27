
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Calendar, Clock, Tag } from 'lucide-react';
import { DiscoveryItem } from '@/hooks/useDiscoveryItems';
import { format } from 'date-fns';
import ReviewSection from './ReviewSection';

interface DiscoveryItemCardProps {
  item: DiscoveryItem;
}

const DiscoveryItemCard: React.FC<DiscoveryItemCardProps> = ({ item }) => {
  const [showReviews, setShowReviews] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'event': return 'bg-blue-100 text-blue-800';
      case 'place': return 'bg-green-100 text-green-800';
      case 'business': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event': return <Calendar className="w-4 h-4" />;
      case 'place': return <MapPin className="w-4 h-4" />;
      case 'business': return <Tag className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {(item.image_url || item.logo_url) && (
        <div className="h-48 w-full relative">
          <img
            src={item.image_url || item.logo_url || ''}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge className={getTypeColor(item.type)}>
              <span className="flex items-center gap-1">
                {getTypeIcon(item.type)}
                {item.type}
              </span>
            </Badge>
          </div>
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{item.name}</CardTitle>
          {!item.image_url && !item.logo_url && (
            <Badge className={getTypeColor(item.type)}>
              <span className="flex items-center gap-1">
                {getTypeIcon(item.type)}
                {item.type}
              </span>
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
          <p className="text-gray-600 text-sm line-clamp-3">{item.description}</p>
        )}
        
        {item.address && (
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            {item.address}
          </div>
        )}
        
        {item.event_date && (
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {format(new Date(item.event_date), 'PPP')}
            {item.event_time && (
              <span className="ml-2 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {item.event_time}
              </span>
            )}
          </div>
        )}
        
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{item.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
          <span className="text-sm text-gray-600">
            {item.average_rating ? item.average_rating.toFixed(1) : 'No reviews'}
            {item.review_count && (
              <span className="ml-1">({item.review_count})</span>
            )}
          </span>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowReviews(!showReviews)}
        >
          {showReviews ? 'Hide Reviews' : 'View Reviews'}
        </Button>
      </CardFooter>
      
      {showReviews && (
        <div className="border-t p-4">
          <ReviewSection discoveryItemId={item.id} />
        </div>
      )}
    </Card>
  );
};

export default DiscoveryItemCard;
