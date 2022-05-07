import Image from "next/image"
import styles from '../styles/Comment.module.css'

export default function Comment({data}) {
    return (
        <div className={styles.commentContainer}>
            <p className={styles.username}>amyrobson</p>
            <Image
                className={styles.userImage}
                src="/assets/avatars/image-amyrobson.png" 
                height={150}
                width={150}
                alt="amyrobson"
            />
            <p className={styles.createdAt}>1 month ago</p>
            <p className={styles.content}>Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and  the responsiveness at various breakpoints works really well.</p>
            <div className={styles.scoreContainer}>
                <button>
                    <Image
                        src="/assets/icons/icon-plus.svg"
                        height={150}
                        width={150}
                        alt="plus"
                    />
                </button>
                <p>12</p>
                <button>
                    <Image
                        src="/assets/icons/icon-minus.svg"
                        height={150}
                        width={150}
                        alt="minus"
                    />
                </button>
            </div> {/* score-container */}
            <div className={styles.replyContainer}>
                <button>
                    <Image
                        src="/assets/icons/icon-reply.svg"
                        height={150}
                        width={150}
                        alt="reply"
                    />
                </button>
                <p>Reply</p>
            </div>
        </div>
    )
}