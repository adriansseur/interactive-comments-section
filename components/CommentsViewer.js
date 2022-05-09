import Comment from "../components/Comment"
import styles from "../styles/CommentsViewer.module.css"

export default function CommentsViewer({data, setViewDeleteModal, setSelectedForDeletion}) {

    const commentElements = data.comments.map(comment => {
        const commentPackage = 
            // having the following be wrapped by array allows me to push
            // but causes issues with missing key props
            [<Comment
                key={comment.id}
                id={comment.id}
                content={comment.content}
                createdAt={comment.createdAt}
                score={comment.score}
                src={comment.user.image.png}
                username={comment.user.username}
                replies={comment.replies}
                currentUser={data.currentUser.username}
                setViewDeleteModal={setViewDeleteModal}
                setSelectedForDeletion={setSelectedForDeletion}
            />]
        if (comment.replies.length !== 0) {
            const replyPackage = comment.replies.map(reply => (
                <div className={styles.replyContainer}>
                    <Comment
                        key={reply.id}
                        id={reply.id}
                        content={reply.content}
                        createdAt={reply.createdAt}
                        score={reply.score}
                        src={reply.user.image.png}
                        username={reply.user.username}
                        replies={reply.replies}
                        replyingTo={reply.replyingTo}
                        currentUser={data.currentUser.username}
                        setViewDeleteModal={setViewDeleteModal}
                        setSelectedForDeletion={setSelectedForDeletion}
                    />
                </div>
            ))
            commentPackage.push(
                <div className={styles.replyContainerWrapper}>
                    <div className={styles.replyLine}></div>
                    {replyPackage}
                </div>
            )
        }
        return commentPackage
    })

    return (
        <div className="comments-view-container">
            {commentElements}
        </div>
    )
}

