import styles from '../styles/CommentAdder.module.css'
import Image from 'next/image'
import { useState } from 'react'

export default function CommentAdder({ data, setData, selectedForReply, setSelectedForReply }) {
    
    const [inputValue, setInputValue] = useState('')

    function handleOnChange(e) {
        setInputValue(e.target.value)
    }

    function handleSend() {
        if (selectedForReply.id !== null) {
            setData(prev => {
                const commentsClone = prev.comments
                for (let i of commentsClone) {
                    // inside comments
                    if (i.id === selectedForReply.id) {
                        i.replies.push(
                            {
                                "id": generateNextId(prev),
                                "content": inputValue,
                                "createdAt": "now",
                                "score": 0,
                                "replyingTo": i.user.username,
                                "user": prev["currentUser"]
                            }
                        )
                    }
                    if (i.replies.length !== 0) {
                        for (let j of i.replies) {
                            // inside replies
                            if (j.id === selectedForReply.id) {
                                i.replies.push(
                                    {
                                        "id": generateNextId(prev),
                                        "content": inputValue,
                                        "createdAt": "now",
                                        "score": 0,
                                        "replyingTo": j.user.username,
                                        "user": prev["currentUser"]
                                    }
                                )
                            }
                        }
                    }
                }
                return {
                    ...prev,
                    "comments": commentsClone
                }
            })
        } else {
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
        }
        setInputValue("")
        setSelectedForReply({
            id: null,
            cta: "REPLY"
        })
    }

    function generateNextId(prev) {
        const prevReplies = prev.comments.reduce((total, i) => {
            return total + i.replies.length
        }, 0)
        const prevComments = prev.comments.length

        return prevReplies + prevComments + 1
    }

    console.log(data)

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