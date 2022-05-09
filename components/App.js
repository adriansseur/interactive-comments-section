import styles from '../styles/App.module.css'
import CommentAdder from "../components/CommentAdder"
import CommentsViewer from "../components/CommentsViewer"
import DeleteModal from './DeleteModal'
import { useState } from 'react'


export default function App({ data, setData }) {

    const [viewDeleteModal, setViewDeleteModal] = useState(false)
    console.log(data)

    const [selectedForDeletion, setSelectedForDeletion] = useState(null)

    return (
        <div className={styles.appContainer}>
            <CommentsViewer data={data} setViewDeleteModal={setViewDeleteModal} setSelectedForDeletion={setSelectedForDeletion} />
            <CommentAdder data={data} setData={setData} />
            {viewDeleteModal && <DeleteModal setViewDeleteModal={setViewDeleteModal} selectedForDeletion={selectedForDeletion} setData={setData} data={data} />}
        </div>
    )
}