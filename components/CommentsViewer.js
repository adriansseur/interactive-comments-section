import Comment from "../components/Comment"

export default function CommentsViewer({data}) {

    const commentElements = data.comments.map(comment => (
        <Comment
            key={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            score={comment.score}
            src={comment.user.image.png}
            username={comment.user.username}
            replies={comment.replies}
        />
    ))

    return (
        <div className="comments-view-container">
            {commentElements}
        </div>
    )
}

