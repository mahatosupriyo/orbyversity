import Link from 'next/link'
import styles from './financecard.module.scss'
import Icon from '@/components/atoms/icon'
import Tooltip from '@/components/atoms/tooltip/tooltip'

export default function FinanceCard() {
    return (
        <Link href="/" className={styles.financecard}>
            <div className={styles.headerlayer}>
                <h3 className={styles.header}>
                    Fees collected
                </h3>

                <p className={styles.amount}>
                    ₹ 34,45,163
                    <Icon name="rightarrow" size={10} fill="hsl(0, 0%, 0%)" />
                </p>
            </div>

            <div className={styles.maindatalayer}>
                <h1 className={styles.month}>
                    January
                </h1>

                <h1 className={styles.percentage}>
                    94 <span className={styles.symbol}>%</span>
                </h1>
            </div>

            <div className={styles.bottomlayer}>
                <p className={styles.availdata}>445</p> out of <p className={styles.totaldata}>456</p>
            </div>
        </Link >
    )
}