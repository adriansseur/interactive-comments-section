import Image from "next/image"
import styles from '../styles/Comment.module.css'

export default function Comment({
    content,
    createdAt,
    score,
    src,
    username,
    replies
}) {
    return (
        <div className={styles.commentContainer}>
            <p className={styles.username}>{username}</p>
            <Image
                className={styles.userImage}
                src={src}
                height={150}
                width={150}
                alt={username}
            />
            <p className={styles.createdAt}>{createdAt}</p>
            <p className={styles.content}>{content}</p>
            <div className={styles.scoreContainer}>
                <button>
                    <Image
                        src="/assets/icons/icon-plus.svg"
                        height={150}
                        width={150}
                        alt="plus"
                    />
                </button>
                <p>{score}</p>
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