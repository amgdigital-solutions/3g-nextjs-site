export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number | null;
  price_display: string | null;
  location: string | null;
  property_type: string | null;
  status: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  area_sqft: number | null;
  parking: number | null;
  featured: boolean;
  images: string[] | null;
  amenities: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  focus_keywords: string | null;
  faqs: { q: string; a: string }[] | null;
  barcode: string | null;
  // Investment & project info
  expected_roi: string | null;
  rental_yield: string | null;
  payment_plan: string | null;
  project_status: string | null;
  handover_date: string | null;
  developer_name: string | null;
  golden_visa: boolean | null;
  theme: string | null;
  uniqueness: string | null;
  price_category: string | null;
  unit_types: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  author_name: string | null;
  status: string;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  focus_keyword: string | null;
  tags: string[] | null;
  faqs: { q: string; a: string }[] | null;
  created_at: string;
  updated_at: string;
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  image: string | null;
  gallery: string[] | null;
  location: string | null;
  avg_price: string | null;
  property_types: string[] | null;
  amenities: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}
