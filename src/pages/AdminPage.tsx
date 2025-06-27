
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Event, Registration } from "@/types/database";
import { useDiscoveryItems, DiscoveryItem } from "@/hooks/useDiscoveryItems";
import DiscoveryItemForm from "@/components/admin/DiscoveryItemForm";
import BulkUploadForm from "@/components/admin/BulkUploadForm";
import BannerManagement from "@/components/admin/BannerManagement";
import { Home, Edit, Trash2, Plus, Upload, Settings } from "lucide-react";

const AdminPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<DiscoveryItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session, isAdmin, profile, isLoading } = useAuth();
  const { data: discoveryItems, refetch: refetchDiscoveryItems } = useDiscoveryItems();

  useEffect(() => {
    const loadData = async () => {
      if (!isLoading && !session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to access the admin area.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      if (!isLoading && session) {
        setLoading(true);

        try {
          const { data: eventsData, error: eventsError } = await supabase.rpc('get_all_events');

          if (eventsError) {
            console.error("Error fetching events:", eventsError);
            toast({
              title: "Error",
              description: "Failed to load events.",
              variant: "destructive",
            });
          } else if (eventsData) {
            setEvents(eventsData as Event[]);
          }

          const { data: registrationsData, error: registrationsError } = await supabase.rpc('get_all_registrations');

          if (registrationsError) {
            console.error("Error fetching registrations:", registrationsError);
            toast({
              title: "Error",
              description: "Failed to load registrations.",
              variant: "destructive",
            });
          } else if (registrationsData) {
            setRegistrations(registrationsData as Registration[]);
          }
        } catch (err) {
          console.error("Error loading admin data:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadData();
  }, [isLoading, session, navigate, toast]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate("/");
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const { error } = await supabase
        .from('discovery_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Discovery item deleted successfully!",
      });

      refetchDiscoveryItems();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete discovery item",
        variant: "destructive",
      });
    }
  };

  const handleFormSuccess = () => {
    refetchDiscoveryItems();
    setEditingItem(null);
    setShowAddForm(false);
    setShowBulkUpload(false);
    toast({
      title: "Success",
      description: "Discovery item saved successfully!",
    });
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (editingItem || showAddForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <DiscoveryItemForm
            item={editingItem || undefined}
            onSuccess={handleFormSuccess}
            onCancel={() => {
              setEditingItem(null);
              setShowAddForm(false);
            }}
          />
        </div>
      </div>
    );
  }

  if (showBulkUpload) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <BulkUploadForm
            onSuccess={handleFormSuccess}
          />
          <div className="mt-4">
            <Button
              variant="outline"
              onClick={() => setShowBulkUpload(false)}
              className="w-full"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isAdmin ? "Admin Dashboard" : "Dashboard"}
              </h1>
              <p className="text-gray-600 mt-1">Manage your discovery items and content</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="flex items-center gap-2 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
              >
                <Home className="w-4 h-4" />
                Back to Main Page
              </Button>
              <Button variant="outline" onClick={handleSignOut} className="hover:bg-red-50 hover:text-red-700 hover:border-red-300">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="discovery" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="discovery" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Discovery Items
            </TabsTrigger>
            <TabsTrigger value="bulk-upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Bulk Upload
            </TabsTrigger>
            <TabsTrigger value="banner" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Homepage Banner
            </TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
          </TabsList>

          <TabsContent value="discovery" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Discovery Items</h2>
                    <p className="text-gray-600 mt-1">Manage places, events, and businesses</p>
                  </div>
                  <Button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Item
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Image</TableHead>
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="font-semibold">Address</TableHead>
                      <TableHead className="font-semibold">Featured</TableHead>
                      <TableHead className="font-semibold">Created</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {discoveryItems && discoveryItems.length > 0 ? (
                      discoveryItems.map((item) => (
                        <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                          <TableCell>
                            {(item.image_url || item.logo_url) && (
                              <img
                                src={item.image_url || item.logo_url || ''}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-lg border shadow-sm"
                              />
                            )}
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">{item.name}</TableCell>
                          <TableCell>
                            <span className={`capitalize px-3 py-1 rounded-full text-xs font-medium ${item.type === 'event' ? 'bg-blue-100 text-blue-800' :
                                item.type === 'place' ? 'bg-green-100 text-green-800' :
                                  'bg-purple-100 text-purple-800'
                              }`}>
                              {item.type}
                            </span>
                          </TableCell>
                          <TableCell className="max-w-xs truncate text-gray-600">{item.address || "-"}</TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.is_featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                              }`}>
                              {item.is_featured ? "Featured" : "Regular"}
                            </span>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(item.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingItem(item)}
                                className="flex items-center gap-1 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                              >
                                <Edit className="w-3 h-3" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteItem(item.id)}
                                className="flex items-center gap-1 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                              >
                                <Trash2 className="w-3 h-3" />
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-12">
                          <div className="text-gray-500">
                            <Plus className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg font-medium">No discovery items found</p>
                            <p className="text-sm">Create your first item using the button above!</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bulk-upload">
            <BulkUploadForm onSuccess={handleFormSuccess} />
          </TabsContent>

          <TabsContent value="banner">
            <BannerManagement />
          </TabsContent>

          <TabsContent value="events">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Events</h2>
                    <p className="text-gray-600 mt-1">Manage community events</p>
                  </div>
                  {isAdmin && (
                    <Button
                      onClick={() => navigate("/admin/events/new")}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Create New Event
                    </Button>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Title</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold">Location</TableHead>
                      <TableHead className="font-semibold">Featured</TableHead>
                      {isAdmin && <TableHead className="font-semibold">Actions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.length > 0 ? (
                      events.map((event) => (
                        <TableRow key={event.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-900">{event.title}</TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(event.event_date).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-gray-600">{event.location}</TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.is_featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                              }`}>
                              {event.is_featured ? "Featured" : "Regular"}
                            </span>
                          </TableCell>
                          {isAdmin && (
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/admin/events/${event.id}`)}
                                className="hover:bg-blue-50 hover:text-blue-700"
                              >
                                Edit
                              </Button>
                            </TableCell>
                          )}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={isAdmin ? 5 : 4} className="text-center py-12 text-gray-500">
                          No events found. {isAdmin && "Create your first event!"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="registrations">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Registrations</h2>
                  <p className="text-gray-600 mt-1">View competition registrations</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Email</TableHead>
                      <TableHead className="font-semibold">Phone</TableHead>
                      <TableHead className="font-semibold">Organization</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.length > 0 ? (
                      registrations.map((registration) => (
                        <TableRow key={registration.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-900">{registration.full_name}</TableCell>
                          <TableCell className="text-gray-600">{registration.email}</TableCell>
                          <TableCell className="text-gray-600">{registration.phone || "-"}</TableCell>
                          <TableCell className="text-gray-600">{registration.organization || "-"}</TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(registration.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-12 text-gray-500">
                          No registrations yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
