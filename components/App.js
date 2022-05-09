import styles from '../styles/App.module.css'
import CommentAdder from "../components/CommentAdder"
import CommentsViewer from "../components/CommentsViewer"
import DeleteModal from './DeleteModal'
import { useState } from 'react'


export default function App({ data, setData }) {

    const [viewDeleteModal, setViewDeleteModal] = useState(false)
    console.log(data)

    return (
        <div className={styles.appContainer}>
            <CommentsViewer data={data} setViewDeleteModal={setViewDeleteModal} />
            <CommentAdder data={data} setData={setData} />
            {viewDeleteModal && <DeleteModal setViewDeleteModal={setViewDeleteModal} />}
        </div>
    )
}