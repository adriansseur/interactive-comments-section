import styles from '../styles/CommentAdder.module.css'
import Image from 'next/image'

export default function CommentAdder({data, setData}) {
    return (
        <div className={styles.commentAdderContainer}>
              <Image
                    src={data.currentUser.image.png}
                    height={144}
                    width={144}
                    alt={data.currentUser.username}
            />
            <textarea className={styles.input} type="text" placeholder='Add a comment...'/>
            <button className={styles.send}>SEND</button>
        </div>
    )
}