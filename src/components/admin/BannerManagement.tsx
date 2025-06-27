import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FileUploader } from '@/components/FileUploader';
import { Settings, Save, Eye, Upload } from 'lucide-react';

interface BannerData {
  slide1_title: string;
  slide1_description: string;
  slide1_button1_text: string;
  slide1_button1_link: string;
  slide1_button2_text: string;
  slide1_button2_link: string;
  slide1_image_url: string;
  slide2_title: string;
  slide2_description: string;
  slide2_button1_text: string;
  slide2_button1_link: string;
  slide2_button2_text: string;
  slide2_button2_link: string;
  slide2_image_url: string;
  slide3_title: string;
  slide3_description: string;
  slide3_button1_text: string;
  slide3_button1_link: string;
  slide3_button2_text: string;
  slide3_button2_link: string;
  slide3_image_url: string;
}

interface SiteSetting {
  id: string;
  key: string;
  value: any;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

const BannerManagement: React.FC = () => {
  const [bannerData, setBannerData] = useState<BannerData>({
    slide1_title: 'Bringing Communities Together',
    slide1_description: 'Mateng Hub Connect is revolutionizing hyperlocal delivery with innovative solutions across four powerful verticals. Established in December 2022, we\'re building the future of community commerce.',
    slide1_button1_text: 'Our Services',
    slide1_button1_link: '/services',
    slide1_button2_text: 'Learn More',
    slide1_button2_link: '/about',
    slide1_image_url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000',
    slide2_title: 'Shop Local, Support Local',
    slide2_description: 'Our marketplace connects local producers, artisans and small businesses directly with customers in your community. Discover unique products while supporting the local economy.',
    slide2_button1_text: 'Shop Now',
    slide2_button1_link: '/marketplace',
    slide2_button2_text: 'How It Works',
    slide2_button2_link: '/marketplace#how-it-works',
    slide2_image_url: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=1000',
    slide3_title: 'June 2025 Education Competition',
    slide3_description: 'Join our exciting education-focused community competition with amazing prizes and opportunities to showcase your talents. Open for students of class 4, 5, 6 and 11, 12.',
    slide3_button1_text: 'Register Now',
    slide3_button1_link: '/competition',
    slide3_button2_text: 'Browse Programs',
    slide3_button2_link: '/education',
    slide3_image_url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1000'
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSlide, setActiveSlide] = useState<1 | 2 | 3>(1);
  const [imageFiles, setImageFiles] = useState<{[key: string]: File | null}>({});
  const [imagePreviews, setImagePreviews] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  useEffect(() => {
    loadBannerData();
  }, []);

  const loadBannerData = async () => {
    try {
      // Use a direct query since TypeScript doesn't recognize site_settings yet
      const { data, error } = await supabase
        .from('site_settings' as any)
        .select('*')
        .eq('key', 'homepage_banner')
        .maybeSingle();

      if (error) {
        console.log('Error loading banner data:', error);
      } else if (data) {
        // Type guard to check if data has the expected structure
        const settingData = data as unknown as SiteSetting;
        if (settingData && typeof settingData === 'object' && 'value' in settingData && settingData.value) {
          setBannerData({ ...bannerData, ...settingData.value });
          // Set image previews
          const previews: {[key: string]: string} = {};
          if (settingData.value.slide1_image_url) previews.slide1_image = settingData.value.slide1_image_url;
          if (settingData.value.slide2_image_url) previews.slide2_image = settingData.value.slide2_image_url;
          if (settingData.value.slide3_image_url) previews.slide3_image = settingData.value.slide3_image_url;
          setImagePreviews(previews);
        }
      }
    } catch (error) {
      console.error('Error loading banner data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `banner_${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('banner-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('banner-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleImageFileSelect = (slideKey: string, file: File | null) => {
    setImageFiles(prev => ({ ...prev, [slideKey]: file }));
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => ({ ...prev, [slideKey]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      const imageUrlKey = slideKey.replace('_image', '_image_url') as keyof BannerData;
      setImagePreviews(prev => ({ 
        ...prev, 
        [slideKey]: bannerData[imageUrlKey] || ''
      }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in');

      const updatedData = { ...bannerData };

      // Upload new images if selected
      for (const [key, file] of Object.entries(imageFiles)) {
        if (file) {
          const uploadedUrl = await uploadFile(file);
          if (uploadedUrl) {
            const imageUrlKey = key.replace('_image', '_image_url') as keyof BannerData;
            updatedData[imageUrlKey] = uploadedUrl;
          }
        }
      }

      // Use upsert to insert or update the banner data
      const { error } = await supabase
        .from('site_settings' as any)
        .upsert({
          key: 'homepage_banner',
          value: updatedData,
          updated_by: user.id
        });

      if (error) throw error;

      setBannerData(updatedData);
      setImageFiles({});
      
      toast({
        title: "Success",
        description: "Homepage banner updated successfully!"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update banner",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof BannerData, value: string) => {
    setBannerData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading banner settings...</div>;
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
        <CardTitle className="text-xl font-semibold text-purple-800 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Homepage Banner Management
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Slide Tabs */}
          <div className="flex space-x-2 border-b">
            {([1, 2, 3] as const).map((slideNum) => (
              <button
                key={slideNum}
                onClick={() => setActiveSlide(slideNum)}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeSlide === slideNum
                    ? 'border-b-2 border-purple-500 text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Slide {slideNum}
              </button>
            ))}
          </div>

          {/* Slide Content */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Title</Label>
                  <Input
                    value={bannerData[`slide${activeSlide}_title` as keyof BannerData]}
                    onChange={(e) => handleInputChange(`slide${activeSlide}_title` as keyof BannerData, e.target.value)}
                    placeholder="Enter slide title"
                    className="focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Description</Label>
                  <Textarea
                    value={bannerData[`slide${activeSlide}_description` as keyof BannerData]}
                    onChange={(e) => handleInputChange(`slide${activeSlide}_description` as keyof BannerData, e.target.value)}
                    placeholder="Enter slide description"
                    rows={4}
                    className="focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Button 1 Text</Label>
                    <Input
                      value={bannerData[`slide${activeSlide}_button1_text` as keyof BannerData]}
                      onChange={(e) => handleInputChange(`slide${activeSlide}_button1_text` as keyof BannerData, e.target.value)}
                      placeholder="Button text"
                      className="focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Button 1 Link</Label>
                    <Input
                      value={bannerData[`slide${activeSlide}_button1_link` as keyof BannerData]}
                      onChange={(e) => handleInputChange(`slide${activeSlide}_button1_link` as keyof BannerData, e.target.value)}
                      placeholder="/link"
                      className="focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Button 2 Text</Label>
                    <Input
                      value={bannerData[`slide${activeSlide}_button2_text` as keyof BannerData]}
                      onChange={(e) => handleInputChange(`slide${activeSlide}_button2_text` as keyof BannerData, e.target.value)}
                      placeholder="Button text"
                      className="focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Button 2 Link</Label>
                    <Input
                      value={bannerData[`slide${activeSlide}_button2_link` as keyof BannerData]}
                      onChange={(e) => handleInputChange(`slide${activeSlide}_button2_link` as keyof BannerData, e.target.value)}
                      placeholder="/link"
                      className="focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Background Image
                  </Label>
                  <FileUploader
                    onFileSelect={(file) => handleImageFileSelect(`slide${activeSlide}_image`, file)}
                    acceptedFileTypes="image/*"
                    maxSizeMB={5}
                  />
                  {imagePreviews[`slide${activeSlide}_image`] && (
                    <div className="mt-3">
                      <div className="relative">
                        <img 
                          src={imagePreviews[`slide${activeSlide}_image`]} 
                          alt="Banner preview" 
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                        />
                        <div className="absolute top-2 right-2">
                          <div className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                            Preview
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Image URL (Alternative)</Label>
                  <Input
                    value={bannerData[`slide${activeSlide}_image_url` as keyof BannerData]}
                    onChange={(e) => {
                      handleInputChange(`slide${activeSlide}_image_url` as keyof BannerData, e.target.value);
                      if (!imageFiles[`slide${activeSlide}_image`]) {
                        setImagePreviews(prev => ({ 
                          ...prev, 
                          [`slide${activeSlide}_image`]: e.target.value 
                        }));
                      }
                    }}
                    placeholder="Enter image URL"
                    className="focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open('/', '_blank')}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Preview Homepage
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BannerManagement;
