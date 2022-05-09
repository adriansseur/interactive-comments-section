import styles from '../styles/CommentAdder.module.css'
import Image from 'next/image'
import { useState } from 'react'

export default function CommentAdder({ data, setData, selectedForReply }) {
    
    const [inputValue, setInputValue] = useState('')

    function handleOnChange(e) {
        setInputValue(e.target.value)
    }

    function handleSend() {
        setData(prev => ({
            ...prev,
            "comments": [
                ...prev.comments,
                {
                    "id": generateNextId(prev),
                    "content": inputValue,
                    "createdAt": "now",
                    "score": 0,
                    "user": prev["currentUser"],
                    "replies": []
                }
            ]
        }))
        setInputValue("")
    }

    function generateNextId(prev) {
        const prevReplies = prev.comments.reduce((total, i) => {
            return total + i.replies.length
        }, 0)
        const prevComments = prev.comments.length

        return prevReplies + prevComments + 1
    }

    return (
        <div className={styles.commentAdderContainer}>
              <Image
                    src={data.currentUser.image.png}
                    height={144}
                    width={144}
                    alt={data.currentUser.username}
            />
            <textarea onChange={handleOnChange} value={inputValue} className={styles.input} type="text" placeholder={`Add a ${selectedForReply.id !== null ? selectedForReply.cta.toLowerCase() : "comment"}...`}/>
            <button onClick={handleSend} className={styles.send}>
                {selectedForReply.id !== null ? selectedForReply.cta : "SEND"}
            </button>
        </div>
    )
}