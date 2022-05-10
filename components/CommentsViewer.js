import Comment from "../components/Comment"
import styles from "../styles/CommentsViewer.module.css"
import CommentAdder from "./CommentAdder"

export default function CommentsViewer({ data, setViewDeleteModal, setSelectedForDeletion, setSelectedForReply, selectedForReply, setData, selectedForEdit, setSelectedForEdit }) {
    
    let commentAdderPushed = false

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
                setSelectedForReply={setSelectedForReply}
                data={data}
                setData={setData}
                selectedForReply={selectedForReply}
                selectedForEdit={selectedForEdit}
                setSelectedForEdit={setSelectedForEdit}
            />]
        if (comment.replies.length !== 0) {
            const replyPackage = comment.replies.map(reply => {
                const subReplyPackage = 
                    [<Comment
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
                    />]
                if (reply.id === selectedForReply.id) {
                    subReplyPackage.push(
                        <CommentAdder data={data} setData={setData} selectedForReply={selectedForReply} setSelectedForReply={setSelectedForReply} selectedForEdit={selectedForEdit} />
                    )
                }
                return <div className={styles.replyContainer}>
                    {subReplyPackage}
                </div>
            })
            if (comment.id === selectedForReply.id) {
                commentPackage.push(
                    <CommentAdder data={data} setData={setData} selectedForReply={selectedForReply} setSelectedForReply={setSelectedForReply} selectedForEdit={selectedForEdit} />
                    )  
                    commentAdderPushed = true
            }
            commentPackage.push(
                <div className={styles.replyContainerWrapper}>
                    <div className={styles.replyLine}></div>
                    {replyPackage}
                </div>
            )
        }
        if (comment.id === selectedForReply.id && !commentAdderPushed) {
            commentPackage.push(
                <CommentAdder data={data} setData={setData} selectedForReply={selectedForReply} setSelectedForReply={setSelectedForReply} selectedForEdit={selectedForEdit} />
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

