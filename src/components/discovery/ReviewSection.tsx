
import React, { useState } from 'react';
import { useReviews, useCreateReview, useUpdateReview, useDeleteReview } from '@/hooks/useDiscoveryItems';
import { useAuth } from '@/components/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Edit, Trash2, User } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface ReviewSectionProps {
  discoveryItemId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ discoveryItemId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: reviews, isLoading } = useReviews(discoveryItemId);
  const createReview = useCreateReview();
  const updateReview = useUpdateReview();
  const deleteReview = useDeleteReview();

  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
    is_anonymous: false
  });

  const userReview = reviews?.find(review => review.user_id === user?.id);
  const canCreateReview = user && !userReview;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to leave a review",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingReview) {
        await updateReview.mutateAsync({
          reviewId: editingReview,
          updates: formData
        });
        setEditingReview(null);
      } else {
        await createReview.mutateAsync({
          discovery_item_id: discoveryItemId,
          ...formData
        });
      }
      
      setFormData({ rating: 5, comment: '', is_anonymous: false });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleEdit = (review: any) => {
    setFormData({
      rating: review.rating,
      comment: review.comment || '',
      is_anonymous: review.is_anonymous || false
    });
    setEditingReview(review.id);
    setShowForm(true);
  };

  const handleDelete = async (reviewId: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      await deleteReview.mutateAsync(reviewId);
    }
  };

  const renderStars = (rating: number, interactive = false, onChange?: (rating: number) => void) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive && onChange ? () => onChange(star) : undefined}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          Reviews ({reviews?.length || 0})
        </h3>
        {canCreateReview && (
          <Button
            onClick={() => setShowForm(true)}
            size="sm"
            disabled={!user}
          >
            Write Review
          </Button>
        )}
      </div>

      {!user && (
        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
          Please log in to leave a review
        </div>
      )}

      {(showForm || editingReview) && user && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {editingReview ? 'Edit Review' : 'Write a Review'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                {renderStars(formData.rating, true, (rating) => 
                  setFormData(prev => ({ ...prev, rating }))
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Comment (optional)</label>
                <Textarea
                  value={formData.comment}
                  onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your experience..."
                  rows={3}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.is_anonymous}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_anonymous: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="anonymous" className="text-sm">Post anonymously</label>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  type="submit" 
                  disabled={createReview.isPending || updateReview.isPending}
                  size="sm"
                >
                  {editingReview ? 'Update Review' : 'Submit Review'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingReview(null);
                    setFormData({ rating: 5, comment: '', is_anonymous: false });
                  }}
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {reviews?.map((review) => (
          <Card key={review.id} className="border-l-4 border-l-blue-200">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium">
                    {review.is_anonymous ? 'Anonymous' : 'User'}
                  </span>
                  {review.user_id === user?.id && (
                    <Badge variant="secondary" className="text-xs">You</Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {renderStars(review.rating)}
                  <span className="text-sm text-gray-500">
                    {format(new Date(review.created_at), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
              
              {review.comment && (
                <p className="text-gray-700 mb-2">{review.comment}</p>
              )}
              
              {review.user_id === user?.id && (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(review)}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(review.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews && reviews.length === 0 && (
        <div className="text-center text-gray-500 py-6">
          No reviews yet. Be the first to leave a review!
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
