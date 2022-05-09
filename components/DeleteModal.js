import styles from '../styles/DeleteModal.module.css'

export default function DeleteModal({setViewDeleteModal, selectedForDeletion, setData, data}) {

    function handleCancelClick() {
        setViewDeleteModal(false)
    }

    function handleDeleteClick() {
        setData(prev => ({
            ...prev,
            "comments": prev.comments.filter(i => i.id !== selectedForDeletion)
        }))
        setData(prev => ({
            ...prev,
            "comments": filterReplies(prev)
        }))
        setViewDeleteModal(false)
    }

    function filterReplies(prev) {
        const commentsClone = prev.comments
        for (let i of commentsClone) {
            if (i.replies.length !== 0) {
                for (let j of i.replies) {
                    if (j.id === selectedForDeletion) {
                        i.replies.splice(i.replies.indexOf(j), 1)
                    }
                }
            }
        }
        return commentsClone
    }
    
    return (
        <div className={styles.modalWrapper}>
            <div className={styles.deleteModalContainer}>
                <h3 className={styles.title}>Delete comment</h3>
                <p className={styles.content}>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className={styles.btnContainer}>
                    <button onClick={handleCancelClick} className={styles.cancel}>NO, CANCEL</button>
                    <button onClick={handleDeleteClick} className={styles.delete}>YES, DELETE</button>
                </div>
            </div>
        </div>
    )
}