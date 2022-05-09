import Image from "next/image"
import styles from '../styles/Comment.module.css'

export default function Comment({
    id,
    content,
    createdAt,
    score,
    src,
    username,
    replies,
    replyingTo,
    currentUser,
    setViewDeleteModal,
    setSelectedForDeletion,
    setSelectedForReply
}) {

    function handleDeleteClick(id) {
        setViewDeleteModal(true)
        setSelectedForDeletion(id)
    }

    function handleReplyClick(id) {
        setSelectedForReply(prev => ({...prev, id: id}))
    }

    return (
        <div className={styles.commentContainer}>
            <p className={styles.username}>
                {username}
                {username === currentUser ? <span className={styles.you}>you</span> : <span></span>}
            </p>
            <Image
                className={styles.userImage}
                src={src}
                height={150}
                width={150}
                alt={username}
            />
            <p className={styles.createdAt}>{createdAt}</p>
            <p className={styles.content}>
                {replyingTo !== undefined ?
                    <span className={styles.replyingTo}>@{replyingTo}</span> :
                    <span></span>}
                {" " + content}</p>
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
            {
                username === currentUser ?
                    <div className={styles.manageContainer}>
                        <button onClick={() => handleDeleteClick(id)}>
                            <div className={styles.deleteContainer}>
                                <Image
                                    src="/assets/icons/icon-delete.svg"
                                    height={150}
                                    width={150}
                                    alt="minus"
                                />
                                <p>Delete</p>
                            </div>
                        </button>
                        <button>
                            <div className={styles.editContainer}>
                                <Image
                                    src="/assets/icons/icon-edit.svg"
                                    height={150}
                                    width={150}
                                    alt="minus"
                                />
                                <p>Edit</p>
                            </div>
                        </button>
                    </div> :
                        <button onClick={() => handleReplyClick(id)}>
                            <div className={styles.replyContainer}>
                                <Image
                                    src="/assets/icons/icon-reply.svg"
                                    height={150}
                                    width={150}
                                    alt="reply"
                                />
                                <p>Reply</p>
                            </div>
                        </button>
            }
        </div>
    )
}