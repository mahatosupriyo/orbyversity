import AvatarButton from '@/components/atoms/(dashboard)/avatar/avatar'
import styles from './navbar.module.scss'
import Link from 'next/link'
import Tooltip from '@/components/atoms/tooltip/tooltip'

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navwraper}>
                <div className={styles.toplayer}>
                    <h4 className={styles.schoolname}>
                        Harvard University
                    </h4>
                    <Tooltip content="Account" direction="bottom">
                        <AvatarButton />
                    </Tooltip>
                </div>

                <div className={styles.middlelayer}>
                    <h3 className={styles.pagetitle}>
                        Principal Dashboard
                    </h3>
                </div>

                <ul className={styles.bottomlayer}>
                    <li className={styles.options}>
                        <Link className={styles.pagelink} href="/">
                            Dashboard
                        </Link>
                    </li>

                    <li className={styles.options}>
                        <Link className={styles.pagelink} href="/">
                            Announcements
                        </Link>
                    </li>

                    <li className={styles.options}>
                        <Link className={styles.pagelink} href="/">
                            Finance
                        </Link>
                    </li>

                    <li className={styles.options}>
                        <Link className={styles.pagelink} href="/">
                            Settings
                        </Link>
                    </li>

                </ul>
            </div>
        </nav >
    )
}