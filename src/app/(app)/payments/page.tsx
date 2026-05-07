import PaymentAccordion from "@/app/(app)/payments/paymentaccordion/paymentaccordion";

export default function PaymentsPage() {
    return <>
        <PaymentAccordion
            status="paid"
            title="January"
            description="Paid using cash 5 days ago"
            paymentId="TXN-987654321"
        />

        <PaymentAccordion
            status="failed"
            title="February"
            description="Payment failed"
        />
    </>;
}