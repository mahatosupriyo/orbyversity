import styles from './avatar.module.scss'

export default async function AvatarButton() {

    return (
        <button className={styles.avatarbtn}>
            <img
                draggable={false}
                src="https://images.mid-day.com/images/images/2024/dec/darshanraval_d.jpg"
                className={styles.avatarbanner}
            />
        </button>
    )
}