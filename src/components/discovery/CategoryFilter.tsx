
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCategories, DiscoveryItemType } from '@/hooks/useDiscoveryItems';

interface CategoryFilterProps {
  selectedType: DiscoveryItemType;
  selectedCategory: string | null;
  onTypeChange: (type: DiscoveryItemType) => void;
  onCategoryChange: (categoryId: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedType,
  selectedCategory,
  onTypeChange,
  onCategoryChange
}) => {
  const { data: categories } = useCategories(selectedType);

  const types: { value: DiscoveryItemType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'event', label: 'Events' },
    { value: 'place', label: 'Places' },
    { value: 'business', label: 'Businesses' }
  ];

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div>
        <h3 className="font-medium mb-2">Type</h3>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <Button
              key={type.value}
              variant={selectedType === type.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                onTypeChange(type.value);
                onCategoryChange(null); // Reset category when type changes
              }}
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      {categories && categories.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">Category</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(null)}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => onCategoryChange(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {selectedCategory && (
        <Badge variant="secondary" className="w-fit">
          Filtering by category
        </Badge>
      )}
    </div>
  );
};

export default CategoryFilter;
