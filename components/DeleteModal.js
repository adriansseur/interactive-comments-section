import styles from '../styles/DeleteModal.module.css'

export default function DeleteModal({setViewDeleteModal}) {

    function handleCancelClick() {
        setViewDeleteModal(false)
    }
    
    return (
        <div className={styles.modalWrapper}>
            <div className={styles.deleteModalContainer}>
                <h3 className={styles.title}>Delete comment</h3>
                <p className={styles.content}>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className={styles.btnContainer}>
                    <button onClick={handleCancelClick} className={styles.cancel}>NO, CANCEL</button>
                    <button className={styles.delete}>YES, DELETE</button>
                </div>
            </div>
        </div>
    )
}