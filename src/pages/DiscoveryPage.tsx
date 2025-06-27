
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useDiscoveryItems, DiscoveryItemType } from '@/hooks/useDiscoveryItems';
import DiscoveryItemCard from '@/components/discovery/DiscoveryItemCard';
import CategoryFilter from '@/components/discovery/CategoryFilter';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const DiscoveryPage = () => {
  const [selectedType, setSelectedType] = useState<DiscoveryItemType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: items, isLoading, error } = useDiscoveryItems(
    selectedType === 'all' ? undefined : selectedType,
    selectedCategory || undefined
  );

  const filteredItems = items?.filter(item =>
    searchQuery === '' ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getTypeTitle = (type: DiscoveryItemType) => {
    switch (type) {
      case 'event': return 'Events';
      case 'place': return 'Places';
      case 'business': return 'Businesses';
      default: return 'All Discovery Items';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Discover Amazing Places & Events
              </h1>
              <p className="text-xl text-gray-100 mb-8">
                Explore local events, discover unique places, and find amazing businesses in your community.
                Share your experiences and help others discover hidden gems.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-white sticky top-16 z-30 border-b">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start">
              <div className="flex-grow">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search events, places, businesses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="w-full lg:w-auto">
                <CategoryFilter
                  selectedType={selectedType}
                  selectedCategory={selectedCategory}
                  onTypeChange={setSelectedType}
                  onCategoryChange={setSelectedCategory}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">
                {getTypeTitle(selectedType)}
              </h2>
              <p className="text-gray-600">
                {filteredItems?.length || 0} item(s) found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {isLoading && (
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
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-red-600">Error loading items. Please try again later.</p>
              </div>
            )}

            {filteredItems && filteredItems.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <DiscoveryItemCard key={item.id} item={item} />
                ))}
              </div>
            )}

            {filteredItems && filteredItems.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No items found. Try adjusting your filters or search query.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DiscoveryPage;
