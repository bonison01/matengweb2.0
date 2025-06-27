
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useCategories, DiscoveryItem } from '@/hooks/useDiscoveryItems';
import { FileUploader } from '@/components/FileUploader';
import { X, Edit, Image as ImageIcon } from 'lucide-react';

interface DiscoveryItemFormData {
  name: string;
  description: string;
  type: 'event' | 'place' | 'business';
  category_id: string;
  address: string;
  event_date: string;
  event_time: string;
  image_url: string;
  logo_url: string;
  tags: string;
  is_featured: boolean;
}

interface DiscoveryItemFormProps {
  item?: DiscoveryItem;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const DiscoveryItemForm: React.FC<DiscoveryItemFormProps> = ({ item, onSuccess, onCancel }) => {
  const [selectedType, setSelectedType] = useState<'event' | 'place' | 'business'>(item?.type || 'event');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(item?.image_url || null);
  const [logoPreview, setLogoPreview] = useState<string | null>(item?.logo_url || null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { data: categories } = useCategories(selectedType);
  
  const { register, handleSubmit, reset, setValue, watch } = useForm<DiscoveryItemFormData>({
    defaultValues: {
      name: item?.name || '',
      description: item?.description || '',
      type: item?.type || 'event',
      category_id: item?.category_id || '',
      address: item?.address || '',
      event_date: item?.event_date ? new Date(item.event_date).toISOString().split('T')[0] : '',
      event_time: item?.event_time || '',
      image_url: item?.image_url || '',
      logo_url: item?.logo_url || '',
      tags: item?.tags ? item.tags.join(', ') : '',
      is_featured: item?.is_featured || false
    }
  });

  useEffect(() => {
    if (item) {
      setValue('name', item.name);
      setValue('description', item.description || '');
      setValue('type', item.type);
      setValue('category_id', item.category_id || '');
      setValue('address', item.address || '');
      setValue('event_date', item.event_date ? new Date(item.event_date).toISOString().split('T')[0] : '');
      setValue('event_time', item.event_time || '');
      setValue('image_url', item.image_url || '');
      setValue('logo_url', item.logo_url || '');
      setValue('tags', item.tags ? item.tags.join(', ') : '');
      setValue('is_featured', item.is_featured || false);
      setSelectedType(item.type);
      setImagePreview(item.image_url || null);
      setLogoPreview(item.logo_url || null);
    }
  }, [item, setValue]);

  const handleImageFileSelect = (file: File | null) => {
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(watch('image_url') || null);
    }
  };

  const handleLogoFileSelect = (file: File | null) => {
    setLogoFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoPreview(watch('logo_url') || null);
    }
  };

  const uploadFile = async (file: File, bucket: string = 'discovery-images'): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const onSubmit = async (data: DiscoveryItemFormData) => {
    setIsSubmitting(true);
    setUploading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to create/edit discovery items');
      }

      let imageUrl = data.image_url;
      let logoUrl = data.logo_url;

      // Upload image file if selected
      if (imageFile) {
        const uploadedImageUrl = await uploadFile(imageFile);
        if (uploadedImageUrl) {
          imageUrl = uploadedImageUrl;
        }
      }

      // Upload logo file if selected
      if (logoFile) {
        const uploadedLogoUrl = await uploadFile(logoFile);
        if (uploadedLogoUrl) {
          logoUrl = uploadedLogoUrl;
        }
      }

      const tagsArray = data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : null;
      
      const itemData = {
        name: data.name,
        description: data.description || null,
        type: data.type,
        category_id: data.category_id || null,
        address: data.address || null,
        event_date: data.event_date ? new Date(data.event_date).toISOString() : null,
        event_time: data.event_time || null,
        image_url: imageUrl || null,
        logo_url: logoUrl || null,
        tags: tagsArray,
        is_featured: data.is_featured,
        created_by: user.id
      };

      let error;
      if (item) {
        // Update existing item
        const { error: updateError } = await supabase
          .from('discovery_items')
          .update(itemData)
          .eq('id', item.id);
        error = updateError;
      } else {
        // Create new item
        const { error: insertError } = await supabase
          .from('discovery_items')
          .insert(itemData);
        error = insertError;
      }

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: `Discovery item ${item ? 'updated' : 'created'} successfully!`
      });
      
      if (!item) {
        reset();
        setSelectedType('event');
        setImageFile(null);
        setLogoFile(null);
        setImagePreview(null);
        setLogoPreview(null);
      }
      
      onSuccess?.();
    } catch (error: any) {
      console.error('Error saving discovery item:', error);
      toast({
        title: "Error",
        description: error.message || `Failed to ${item ? 'update' : 'create'} discovery item`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
      setUploading(false);
    }
  };

  const handleTypeChange = (type: 'event' | 'place' | 'business') => {
    setSelectedType(type);
    setValue('type', type);
    setValue('category_id', '');
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
        <CardTitle className="text-xl font-semibold text-green-800">
          {item ? 'Edit Discovery Item' : 'Add New Discovery Item'}
        </CardTitle>
        {onCancel && (
          <Button variant="ghost" size="sm" onClick={onCancel} className="hover:bg-white/50">
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Name *</Label>
              <Input
                id="name"
                {...register('name', { required: true })}
                placeholder="Enter name"
                className="focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-medium">Type *</Label>
              <Select value={selectedType} onValueChange={handleTypeChange}>
                <SelectTrigger className="focus:ring-2 focus:ring-green-500">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="place">Place</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Enter description"
              rows={4}
              className="focus:ring-2 focus:ring-green-500"
            />
          </div>

          {categories && categories.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">Category</Label>
              <Select value={watch('category_id')} onValueChange={(value) => setValue('category_id', value)}>
                <SelectTrigger className="focus:ring-2 focus:ring-green-500">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium">Address</Label>
            <Input
              id="address"
              {...register('address')}
              placeholder="Enter address"
              className="focus:ring-2 focus:ring-green-500"
            />
          </div>

          {selectedType === 'event' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="event_date" className="text-sm font-medium">Event Date</Label>
                <Input
                  id="event_date"
                  type="date"
                  {...register('event_date')}
                  className="focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event_time" className="text-sm font-medium">Event Time</Label>
                <Input
                  id="event_time"
                  type="time"
                  {...register('event_time')}
                  className="focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Upload Image
                </Label>
                <FileUploader
                  onFileSelect={handleImageFileSelect}
                  acceptedFileTypes="image/*"
                  maxSizeMB={5}
                />
                {imagePreview && (
                  <div className="mt-3">
                    <div className="relative inline-block">
                      <img 
                        src={imagePreview} 
                        alt="Image preview" 
                        className="h-24 w-24 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                      />
                      <div className="absolute -top-2 -right-2">
                        <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                          Preview
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image_url" className="text-sm font-medium">Image URL (Alternative)</Label>
                <Input
                  id="image_url"
                  {...register('image_url')}
                  placeholder="Enter image URL"
                  className="focus:ring-2 focus:ring-green-500"
                  onChange={(e) => {
                    register('image_url').onChange(e);
                    if (!imageFile) {
                      setImagePreview(e.target.value || null);
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Upload Logo
                </Label>
                <FileUploader
                  onFileSelect={handleLogoFileSelect}
                  acceptedFileTypes="image/*"
                  maxSizeMB={5}
                />
                {logoPreview && (
                  <div className="mt-3">
                    <div className="relative inline-block">
                      <img 
                        src={logoPreview} 
                        alt="Logo preview" 
                        className="h-24 w-24 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                      />
                      <div className="absolute -top-2 -right-2">
                        <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                          Preview
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logo_url" className="text-sm font-medium">Logo URL (Alternative)</Label>
                <Input
                  id="logo_url"
                  {...register('logo_url')}
                  placeholder="Enter logo URL"
                  className="focus:ring-2 focus:ring-green-500"
                  onChange={(e) => {
                    register('logo_url').onChange(e);
                    if (!logoFile) {
                      setLogoPreview(e.target.value || null);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium">Tags (comma-separated)</Label>
            <Input
              id="tags"
              {...register('tags')}
              placeholder="tag1, tag2, tag3"
              className="focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="is_featured"
              {...register('is_featured')}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <Label htmlFor="is_featured" className="text-sm font-medium cursor-pointer">
              Featured item (will appear prominently on the homepage)
            </Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting || uploading} 
              className="flex-1 bg-green-600 hover:bg-green-700 focus:ring-green-500"
            >
              {uploading ? 'Uploading...' : isSubmitting ? (item ? 'Updating...' : 'Creating...') : (item ? 'Update Discovery Item' : 'Create Discovery Item')}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} className="hover:bg-gray-50">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DiscoveryItemForm;
