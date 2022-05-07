import styles from '../styles/App.module.css'
import CommentAdder from "../components/CommentAdder"
import CommentsViewer from "../components/CommentsViewer"


export default function App({ data, setData }) {
    return (
        <div className={styles.appContainer}>
            <CommentsViewer data={data} />
            <CommentAdder data={data} setData={setData} />
        </div>
    )
}