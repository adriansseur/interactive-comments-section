import styles from '../styles/App.module.css'
import CommentAdder from "../components/CommentAdder"
import CommentsViewer from "../components/CommentsViewer"
import DeleteModal from './DeleteModal'
import { useState } from 'react'


export default function App({ data, setData }) {

    const [viewDeleteModal, setViewDeleteModal] = useState(false)
    console.log(data)

    const [selectedForDeletion, setSelectedForDeletion] = useState(null)

    const [selectedForReply, setSelectedForReply] = useState({
        id: null,
        cta: "REPLY",
    })

    return (
        <div className={styles.appContainer}>
            <CommentsViewer data={data} setViewDeleteModal={setViewDeleteModal} setSelectedForDeletion={setSelectedForDeletion} setSelectedForReply={setSelectedForReply} selectedForReply={selectedForReply} setData={setData} />
            {selectedForReply.id === null && <CommentAdder data={data} setData={setData} selectedForReply={selectedForReply} />}
            {viewDeleteModal && <DeleteModal setViewDeleteModal={setViewDeleteModal} selectedForDeletion={selectedForDeletion} setData={setData} data={data} />}
        </div>
    )
}