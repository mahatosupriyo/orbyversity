import Tooltip from '@/components/atoms/tooltip/tooltip'
import styles from './auth.module.scss'
import { AuthButton } from './authbutton'

export default function AuthComponent() {
    return (
        <div className={styles.mainwraper}>

            <img draggable="false" style={{ pointerEvents: 'none', userSelect: 'none' }} src="/Logo.svg" />

            <div className={styles.middlewraper}>

                <div className={styles.textwraper}>
                    <h1 className={styles.bigtitle}>
                        Log in
                    </h1>
                    <h4 className={styles.subheadingmedium}>
                        Log in with registered email
                    </h4>
                </div>
                <Tooltip content="Log in with registered email" direction="bottom">
                    <AuthButton />
                </Tooltip>

                <h3 className={styles.regulartxt}>
                    New / forgot, contact us
                </h3>
            </div>

            <div className={styles.bottomlayer}>


                <p className={styles.footerlink}>
                    *By continuing, you agree to our Terms and Privacy policy.
                </p>
            </div>


        </div>
    )
}