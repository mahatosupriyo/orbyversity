import PaymentAccordion from "../payments/paymentaccordion/paymentaccordion";
import styles from "./account.module.scss";
import Navbar from "@/components/layout/(dashboard)/navbar/navbar";

export default function Home() {
  return (
    <div className={styles.wraper}>
      <div className={styles.container}>
        <Navbar />

        <div className={styles.content}>
          <div className={styles.userhead}>
            <span className={styles.label}>
              Student
            </span>
            <img
              draggable="false"
              src="https://book-my-singer.s3.ap-south-1.amazonaws.com/website-assets/artist/Darshan+Raval/Book+Darshan+Raval+from+Book+My+Singer.webp"
              className={styles.avatar}
            />

            <div className={styles.moredata}>

              <h1 className={styles.username}>
                Supriyo Mahato
              </h1>

              <div className={styles.buttonwraper}>
                <button className={styles.primarybtn}>
                  Update fees breakup
                </button>

                <button className={styles.secondarybtn}>
                  More details
                </button>
              </div>
            </div>
          </div>

          <div className={styles.notification}>
            <div className={styles.notificationdata}>
              <h2 className={styles.message}>
                January fees due in 5 days
              </h2>
              <h1 className={styles.amount}>
                $462
              </h1>
            </div>

            <button className={styles.primarybtn}>
              Mark Paid via cash
            </button>
          </div>

          <div className={styles.payhistory}>
            <span className={styles.label}>
              Payment history
            </span>

            <div className={styles.payments}>
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

              <PaymentAccordion
                status="processing"
                title="February"
                description="Processing payment"
              />
            </div>
          </div>

          <button className={styles.loadmorebtn}>
            Load more transactions
          </button>
        </div>

      </div>
    </div>
  );
}
