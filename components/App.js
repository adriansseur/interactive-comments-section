import styles from '../styles/App.module.css'
import CommentAdder from "../components/CommentAdder"
import CommentsViewer from "../components/CommentsViewer"


export default function App({ data }) {
    return (
        <div className={styles.appContainer}>
            <CommentsViewer data={data} />
            <CommentAdder />
        </div>
    )
}