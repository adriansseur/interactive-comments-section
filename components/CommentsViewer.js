import Comment from "../components/Comment"
import styles from "../styles/CommentsViewer.module.css"
import CommentAdder from "./CommentAdder"

export default function CommentsViewer({ data, setViewDeleteModal, setSelectedForDeletion, setSelectedForReply, selectedForReply, setData, selectedForEdit, setSelectedForEdit }) {

    let uniqueKey = -1
    let commentAdderPushed = false
    let commentElements = []
    let replyPackage = []
    for (let comment of data.comments) {
        commentElements.push(
            <Comment
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
                setSelectedForReply={setSelectedForReply}
                data={data}
                setData={setData}
                selectedForReply={selectedForReply}
                selectedForEdit={selectedForEdit}
                setSelectedForEdit={setSelectedForEdit}
            />
        )
        // if replying to a comment with previous replies
        if (comment.id === selectedForReply.id) {
            commentElements.push(
                <CommentAdder key={uniqueKey} data={data} setData={setData} selectedForReply={selectedForReply} setSelectedForReply={setSelectedForReply} selectedForEdit={selectedForEdit} setSelectedForEdit={setSelectedForEdit} />
                )  
            uniqueKey--
            commentAdderPushed = true
        }
        if (comment.replies.length !== 0) {
            for (let reply of comment.replies) {
                replyPackage.push(
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
                        setSelectedForReply={setSelectedForReply}
                        data={data}
                        setData={setData}
                        selectedForReply={selectedForReply}
                        selectedForEdit={selectedForEdit}
                        setSelectedForEdit={setSelectedForEdit}
                    />
                )
                // if replying to a reply
                if (reply.id === selectedForReply.id) {
                    replyPackage.push(
                        <CommentAdder key={uniqueKey} data={data} setData={setData} selectedForReply={selectedForReply} setSelectedForReply={setSelectedForReply} selectedForEdit={selectedForEdit} setSelectedForEdit={setSelectedForEdit} />
                    )
                    uniqueKey--
                }
            }

            commentElements.push(
                <div key={uniqueKey} className={styles.replyContainerWrapper}>
                    <div className={styles.replyLine}></div>
                    <div className={styles.replyContainer}>
                        {replyPackage}
                    </div>
                </div>
            )
            uniqueKey--
            replyPackage = []
        }
        // if replying to a comment with no replies
        if (comment.id === selectedForReply.id && !commentAdderPushed) {
            commentElements.push(
                <CommentAdder key={uniqueKey} data={data} setData={setData} selectedForReply={selectedForReply} setSelectedForReply={setSelectedForReply} selectedForEdit={selectedForEdit} setSelectedForEdit={setSelectedForEdit} />
            )  
            uniqueKey--
        }
    }

    return (
        <div className="comments-view-container">
            {commentElements}
        </div>
    )
}