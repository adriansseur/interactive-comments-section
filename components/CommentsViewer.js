import Comment from "../components/Comment"

export default function CommentsViewer({data}) {

    // map through data to create Comment elements

    return (
        <div className="comments-view-container">
            {/* render comment elements */}
            <Comment data={data} />
        </div>
    )
}

