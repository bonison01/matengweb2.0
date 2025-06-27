
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FileUploader } from '@/components/FileUploader';
import { Upload, Download, AlertCircle } from 'lucide-react';

interface BulkUploadFormProps {
  onSuccess?: () => void;
}

const BulkUploadForm: React.FC<BulkUploadFormProps> = ({ onSuccess }) => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState<{ success: number; errors: string[] } | null>(null);
  const { toast } = useToast();

  const downloadTemplate = () => {
    const headers = [
      'name',
      'description',
      'type',
      'address',
      'event_date',
      'event_time',
      'image_url',
      'logo_url',
      'tags',
      'is_featured'
    ];
    
    const sampleData = [
      'Sample Event,A great community event,event,123 Main St,2024-12-31,18:00,https://example.com/image.jpg,https://example.com/logo.jpg,"music,community",true',
      'Local Business,Amazing local business,business,456 Oak Ave,,,https://example.com/business.jpg,https://example.com/logo.jpg,"shopping,local",false'
    ];
    
    const csvContent = [headers.join(','), ...sampleData].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'discovery_items_template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const parseCsvFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const lines = text.split('\n').filter(line => line.trim());
          const headers = lines[0].split(',').map(h => h.trim());
          
          const data = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
            const item: any = {};
            
            headers.forEach((header, index) => {
              const value = values[index] || '';
              
              switch (header) {
                case 'is_featured':
                  item[header] = value.toLowerCase() === 'true';
                  break;
                case 'tags':
                  item[header] = value ? value.split('|').map(tag => tag.trim()) : null;
                  break;
                case 'event_date':
                  item[header] = value ? new Date(value).toISOString() : null;
                  break;
                default:
                  item[header] = value || null;
              }
            });
            
            return item;
          });
          
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const handleBulkUpload = async () => {
    if (!csvFile) {
      toast({
        title: "Error",
        description: "Please select a CSV file to upload",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    const errors: string[] = [];
    let successCount = 0;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to upload items');
      }

      const items = await parseCsvFile(csvFile);
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        try {
          const itemData = {
            ...item,
            created_by: user.id
          };
          
          const { error } = await supabase
            .from('discovery_items')
            .insert(itemData);
          
          if (error) {
            errors.push(`Row ${i + 2}: ${error.message}`);
          } else {
            successCount++;
          }
        } catch (error: any) {
          errors.push(`Row ${i + 2}: ${error.message}`);
        }
      }

      setUploadResults({ success: successCount, errors });

      if (successCount > 0) {
        toast({
          title: "Upload Complete",
          description: `${successCount} items uploaded successfully${errors.length > 0 ? ` with ${errors.length} errors` : ''}`,
        });
        onSuccess?.();
      } else {
        toast({
          title: "Upload Failed",
          description: "No items were uploaded successfully",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to process CSV file",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
        <CardTitle className="text-xl font-semibold text-blue-800 flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Bulk Upload Discovery Items
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Download Template</h3>
              <p className="text-sm text-gray-600">Get the CSV template with correct format</p>
            </div>
            <Button 
              variant="outline" 
              onClick={downloadTemplate}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Template
            </Button>
          </div>
          
          <div className="border-t pt-4">
            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-gray-900">Upload CSV File</h3>
                <p className="text-sm text-gray-600">Select your CSV file with discovery items data</p>
              </div>
              
              <FileUploader
                onFileSelect={setCsvFile}
                acceptedFileTypes=".csv,text/csv"
                maxSizeMB={10}
              />
              
              {csvFile && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-700">
                    Selected: {csvFile.name} ({Math.round(csvFile.size / 1024)} KB)
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <Button 
            onClick={handleBulkUpload}
            disabled={!csvFile || isUploading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isUploading ? 'Uploading...' : 'Upload CSV Data'}
          </Button>
        </div>

        {uploadResults && (
          <div className="border-t pt-4">
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Upload Results</h3>
              
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-700">
                  ✓ {uploadResults.success} items uploaded successfully
                </p>
              </div>
              
              {uploadResults.errors.length > 0 && (
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-700">
                        {uploadResults.errors.length} errors occurred:
                      </p>
                      <ul className="text-xs text-red-600 mt-2 space-y-1">
                        {uploadResults.errors.slice(0, 5).map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                        {uploadResults.errors.length > 5 && (
                          <li>• ... and {uploadResults.errors.length - 5} more errors</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BulkUploadForm;
