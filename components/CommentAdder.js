import styles from '../styles/CommentAdder.module.css'
import Image from 'next/image'
import { useState } from 'react'

export default function CommentAdder({ data, setData }) {
    
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
                    "id": prev["comments"].length + 1,
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
    
    return (
        <div className={styles.commentAdderContainer}>
              <Image
                    src={data.currentUser.image.png}
                    height={144}
                    width={144}
                    alt={data.currentUser.username}
            />
            <textarea onChange={handleOnChange} value={inputValue} className={styles.input} type="text" placeholder='Add a comment...'/>
            <button onClick={handleSend} className={styles.send}>SEND</button>
        </div>
    )
}