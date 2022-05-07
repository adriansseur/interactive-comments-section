import Comment from "../components/Comment"
import styles from "../styles/CommentsViewer.module.css"

export default function CommentsViewer({data}) {

    const commentElements = data.comments.map(comment => {
        const commentPackage = 
            // having the following be wrapped by array allows me to push
            // but causes issues with missing key props
            [<Comment
                key={comment.id}
                content={comment.content}
                createdAt={comment.createdAt}
                score={comment.score}
                src={comment.user.image.png}
                username={comment.user.username}
                replies={comment.replies}
            />]
        if (comment.replies.length !== 0) {
            const replyPackage = comment.replies.map(reply => (
                <div className={styles.replyContainer}>
                    <Comment
                        key={reply.id}
                        content={reply.content}
                        createdAt={reply.createdAt}
                        score={reply.score}
                        src={reply.user.image.png}
                        username={reply.user.username}
                        replies={reply.replies}
                    />
                </div>
            ))
            commentPackage.push(
                <div>
                    <div className={styles.replyLine}></div>
                    {replyPackage}
                </div>
            )
        }
        return commentPackage
    })
    console.log(commentElements)

    return (
        <div className="comments-view-container">
            {commentElements}
        </div>
    )
}

