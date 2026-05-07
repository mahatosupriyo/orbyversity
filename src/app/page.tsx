import styles from "./home.module.scss";

import Navbar from "@/components/layout/(dashboard)/navbar/navbar";
import FinanceCard from "@/components/layout/(dashboard)/(payments)/financecard";
import Icon from "@/components/atoms/icon";
import Tooltip from "@/components/atoms/tooltip/tooltip";

export default function Home() {
  return (
    <div className={styles.wraper}>
      <div className={styles.container}>
        <Navbar />

        <div className={styles.toplayercontent}>

          <div className={styles.fyselector}>
            <p className={styles.fylabel}>
              FY 2026
            </p>
          </div>

        </div>

        <div className={styles.content}>
          <FinanceCard />
          <FinanceCard />
        </div>

        <button className={styles.addbutton}>
          <Icon name="billing" size={22} fill="hsl(0, 0%, 100%)" />
        </button>
      </div>
    </div>
  );
}
