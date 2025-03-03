// Auth Service Responses
export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
  };
  token: string;
}

// Event Service Responses
export interface EventResponse {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  location: string;
  price: number;
  capacity: number;
  bookedSeats: number;
  startTime: string;
  endTime: string;
  instructor: string;
  category: 'Face-2-Face' | 'Online-Live';
  requirements: {
    id: string;
    description: string;
    type: 'required' | 'recommended';
  }[];
  activities: {
    id: string;
    title: string;
    description: string;
    day: string;
    startTime: string;
    endTime: string;
  }[];
  cancelled?: boolean;
  cancellationReason?: string;
}

// Booking Service Responses
export interface BookingResponse {
  id: string;
  eventId: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string; // ISO date string
  attendees: number;
  attendeeInfo: {
    name: string;
    email: string;
    phone?: string;
    dietaryRequirements?: string;
    attended?: boolean;
  }[];
  paymentStatus: 'pending' | 'completed';
  paymentMethod?: 'fpx' | 'lo';
  totalAmount: number;
}

// User Service Responses
export interface UserProfileResponse {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phone?: string;
  createdAt: string; // ISO date string
  upcomingBookings: number;
  completedBookings: number;
}

// Analytics Service Responses
export interface AnalyticsResponse {
  revenue: {
    labels: string[]; // Months
    revenue: number[]; // Revenue values
  };
  bookings: {
    labels: string[]; // Months
    bookings: number[]; // Booking counts
  };
  attendees: {
    labels: string[]; // Event names
    attendees: number[]; // Attendee counts
  };
  categories: {
    labels: string[]; // Category names
    values: number[]; // Event counts per category
  };
  instructors: {
    instructors: string[]; // Instructor names
    eventCounts: number[]; // Events per instructor
  };
}

// Preset Service Responses
export interface LocationPresetResponse {
  id: string;
  name: string;
  mapUrl?: string;
  isActive: boolean;
}

export interface InstructorPresetResponse {
  id: string;
  name: string;
  profileUrl?: string;
  isActive: boolean;
}

// Template Service Responses
export interface EventTemplateResponse {
  id: string;
  name: string;
  eventDetails: Omit<EventResponse, 'id' | 'bookedSeats' | 'cancelled' | 'cancellationReason'>;
  createdAt: string; // ISO date string
}

// Payment Service Responses
export interface PaymentResponse {
  id: string;
  bookingId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  method: 'fpx' | 'lo';
  createdAt: string; // ISO date string
  completedAt?: string; // ISO date string
  reference?: string;
}

// Local Order Response
export interface LocalOrderResponse {
  id: string;
  bookingId: string;
  eventId: string;
  fileName: string;
  uploadedAt: string; // ISO date string
  status: 'pending' | 'approved' | 'rejected';
  fileUrl: string;
  eventTitle: string;
  attendees: number;
}