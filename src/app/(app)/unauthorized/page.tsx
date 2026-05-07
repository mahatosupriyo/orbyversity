import Tooltip from '@/components/atoms/tooltip/tooltip'
import styles from './unauthorized.module.scss'
import Link from 'next/link'

export default function UnauthorizedPage() {
    return (
        <div className={styles.wraper}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <img draggable="false" className={styles.navlogo} style={{ pointerEvents: 'none', userSelect: 'none' }} src="/Logo.svg" />
                    <img src="https://res.cloudinary.com/djlyhpift/image/upload/v1778168952/Harvard_m40hjx.png" className={styles.backgroundimage} />
                    <div className={styles.maincontent}>
                        <img draggable="false" className={styles.logo} style={{ pointerEvents: 'none', userSelect: 'none' }} src="/Logo.svg" />
                        <div className={styles.subwraper}>
                            <Tooltip content='Access denied, either apply for admission or contact support' direction='top'>
                                <p className={styles.subhead}>
                                    *This portal is available only for registered members
                                </p>
                            </Tooltip>
                            <Link href="/" className={styles.cta}>
                                Apply for Admission
                            </Link>
                        </div>
                        <span className={styles.moredata}>~ Access is limited to enrolled students and authorized staff.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}