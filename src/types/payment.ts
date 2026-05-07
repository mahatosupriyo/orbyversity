/**
 * Represents a single payment record
 */
export interface PaymentItem {
    id: string;
    title: string;
    date: string;
    tag?: string;
    paymentId?: string;
    orderId?: string;
    status: 'paid' | 'processing' | 'failed';
}