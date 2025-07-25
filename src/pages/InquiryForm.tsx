// src/pages/InquiryForm.tsx

import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom"
import { TablesInsert } from "@/integrations/supabase/types"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function InquiryForm() {
  const { toast } = useToast()
  const navigate = useNavigate()

  // Replace with your actual event id logic
  const event_id = "event-id-placeholder"

  // Initialize state with all fields
  const [formData, setFormData] = useState<
    Omit<TablesInsert<"inquiries">, "id" | "created_at" | "updated_at">
  >({
    full_name: "",
    email: "",
    phone: null,
    address: null,
    business_name: null,
    business_product_or_service: null,
    how_did_you_hear: null,
    has_domain: null,
    message: "",
    event_id,
    organization: null,
    user_id: null,
    additional_info: null,
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.full_name ||
      !formData.email ||
      !formData.message ||
      !formData.event_id
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required fields.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    const { error } = await supabase.from("inquiries").insert([formData])

    setLoading(false)

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } else {
      setSubmitted(true)
      toast({
        title: "Success",
        description: "Your inquiry has been submitted.",
      })
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <h1 className="text-2xl font-bold mb-2">Thank you!</h1>
        <p className="text-gray-600 mb-4">Thank you for your submission! We're excited to build your free simple website. Our team will contact you soon with the next steps.</p>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </div>
    )
  }

  return (
    <div>
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
            <Navbar />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-50 p-8 rounded-lg shadow-md border"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">We'd love to learn more about you.</h1>

        <div className="space-y-4">
          <Input
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name || ""}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email || ""}
            onChange={handleChange}
            required
          />
          <Input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone || ""}
            onChange={handleChange}
          />
          <Input
            name="address"
            placeholder="Address"
            value={formData.address || ""}
            onChange={handleChange}
          />
          <Input
            name="business_name"
            placeholder="Business Name"
            value={formData.business_name || ""}
            onChange={handleChange}
          />
          <Input
            name="business_product_or_service"
            placeholder="Business Product or Service"
            value={formData.business_product_or_service || ""}
            onChange={handleChange}
          />

          <label className="block">
            <span className="text-gray-700">How did you hear about Mateng?</span>
            <select
              name="how_did_you_hear"
              value={formData.how_did_you_hear || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="">Select an option</option>
              <option value="social_media">Social Media</option>
              <option value="friend_or_family">Friend or Family</option>
              <option value="search_engine">Search Engine</option>
              <option value="advertisement">Advertisement</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">Do you have any website domain before?</span>
            <select
              name="has_domain"
              value={formData.has_domain || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>

          <Textarea
            name="message"
            placeholder="Your message"
            value={formData.message || ""}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>

        <div className="mt-6">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
    <Footer />
    </div>
  )
}
