import axios from '../lib/axios';
import { API_ENDPOINTS, USE_MOCK_DATA } from '../config/api';
import { delay } from '../lib/utils';

interface PaymentData {
  eventId: string;
  attendees: number;
  attendeeInfo: Array<{
    name: string;
    email: string;
    phone?: string;
    dietaryRequirements?: string;
  }>;
}

interface PaymentStatus {
  status: 'pending' | 'completed' | 'failed';
  eventId: string;
  booking?: any;
  event?: any;
}

export const paymentService = {
  createFPXPayment: async (bookingData: PaymentData): Promise<string> => {
    if (USE_MOCK_DATA) {
      await delay(500);
      localStorage.setItem('isPaying', 'true');
      return `
        <form id="fpxForm" method="POST" action="/payment/fpx/response">
          <input type="hidden" name="bookingId" value="mock-booking-id" />
          <input type="hidden" name="amount" value="100" />
        </form>
        <script>document.getElementById('fpxForm').submit();</script>
      `;
    }
    
    const { data } = await axios.post(API_ENDPOINTS.PAYMENTS.FPX, {
      ...bookingData,
      paymentMethod: 'fpx',
      timestamp: new Date().toISOString()
    }, {
      responseType: 'text'
    });
    
    localStorage.setItem('isPaying', 'true');
    return data;
  },

  checkPaymentStatus: async (): Promise<PaymentStatus> => {
    if (USE_MOCK_DATA) {
      await delay(2000); // Simulate API delay
      return {
        status: 'completed',
        eventId: 'mock-event-id',
        booking: {
          id: 'mock-booking-id',
          eventId: 'mock-event-id',
          attendees: 1,
          status: 'confirmed'
        },
        event: {
          id: 'mock-event-id',
          title: 'Mock Event',
          price: 100
        }
      };
    }

    const { data } = await axios.get('/payments/status');
    return data;
  }
};