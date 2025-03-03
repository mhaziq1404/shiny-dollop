export interface Event {
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
  category: string;
  requirements?: EventRequirement[];
  activities?: EventActivity[];
  cancelled?: boolean;
  cancellationReason?: string;
}