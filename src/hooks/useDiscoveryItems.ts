import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface DiscoveryItem {
  id: string;
  name: string;
  description: string | null;
  type: 'event' | 'place' | 'business';
  category_id: string | null;
  address: string | null;
  event_date: string | null;
  event_time: string | null;
  image_url: string | null;
  logo_url: string | null;
  tags: string[] | null;
  contact_info: any;
  is_featured: boolean | null;
  created_at: string;
  updated_at: string;
  category?: {
    name: string;
    description: string | null;
  };
  reviews?: Review[];
  average_rating?: number;
  review_count?: number;
}

export interface Category {
  id: string;
  name: string;
  type: 'event' | 'place' | 'business';
  description: string | null;
}

export interface Review {
  id: string;
  rating: number;
  comment: string | null;
  is_anonymous: boolean | null;
  created_at: string;
  user_id: string;
  discovery_item_id: string;
}

export type DiscoveryItemType = 'event' | 'place' | 'business' | 'all';

export const useDiscoveryItems = (type?: DiscoveryItemType, categoryId?: string) => {
  return useQuery({
    queryKey: ['discovery-items', type, categoryId],
    queryFn: async () => {
      let query = supabase
        .from('discovery_items')
        .select(`
          *,
          category:categories(name, description)
        `)
        .order('created_at', { ascending: false });

      if (type && type !== 'all') {
        query = query.eq('type', type as 'event' | 'place' | 'business');
      }

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching discovery items:', error);
        throw error;
      }

      return data as DiscoveryItem[];
    }
  });
};

export const useCategories = (type?: DiscoveryItemType) => {
  return useQuery({
    queryKey: ['categories', type],
    queryFn: async () => {
      let query = supabase
        .from('categories')
        .select('*')
        .order('name');

      if (type && type !== 'all') {
        query = query.eq('type', type as 'event' | 'place' | 'business');
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }

      return data as Category[];
    }
  });
};

export const useReviews = (discoveryItemId: string) => {
  return useQuery({
    queryKey: ['reviews', discoveryItemId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('discovery_item_id', discoveryItemId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        throw error;
      }

      return data as Review[];
    }
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (reviewData: {
      discovery_item_id: string;
      rating: number;
      comment?: string;
      is_anonymous?: boolean;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to leave a review');
      }

      const { data, error } = await supabase
        .from('reviews')
        .insert({
          ...reviewData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating review:', error);
        throw error;
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', data.discovery_item_id] });
      toast({
        title: "Success",
        description: "Your review has been submitted successfully!"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit review",
        variant: "destructive"
      });
    }
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ reviewId, updates }: {
      reviewId: string;
      updates: { rating: number; comment?: string; is_anonymous?: boolean };
    }) => {
      const { data, error } = await supabase
        .from('reviews')
        .update(updates)
        .eq('id', reviewId)
        .select()
        .single();

      if (error) {
        console.error('Error updating review:', error);
        throw error;
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', data.discovery_item_id] });
      toast({
        title: "Success",
        description: "Your review has been updated successfully!"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update review",
        variant: "destructive"
      });
    }
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (reviewId: string) => {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) {
        console.error('Error deleting review:', error);
        throw error;
      }

      return reviewId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast({
        title: "Success",
        description: "Your review has been deleted successfully!"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete review",
        variant: "destructive"
      });
    }
  });
};
