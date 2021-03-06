import styles from '../styles/CommentAdder.module.css'
import Image from 'next/image'
import { useState, useRef } from 'react'

export default function CommentAdder({ data, setData, selectedForReply, setSelectedForReply, selectedForEdit, setSelectedForEdit }) {
    
    const input = useRef(null)
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
        }
        
        if (selectedForEdit !== null) {
            setData(prev => {
                // instead of using the substring method
                // should filter through to remove 
                // what starts with "@" and ends with " "
                const commentsClone = prev.comments
                for (let i of commentsClone) {
                    if (i.id === selectedForEdit) {
                        i.content = i.replyingTo !== undefined ?
                            inputValue.substring(i.replyingTo.length + 2) :
                            inputValue
                    }
                    if (i.replies.length !== 0) {
                        for (let j of i.replies) {
                            if (j.id === selectedForEdit) {
                                j.content = inputValue.substring((j.replyingTo.length + 2))
                            }
                        }
                    }
                }
                return {
                    ...prev,
                    "comments": commentsClone
                }
            })
            setSelectedForEdit(null)
        }
        
        if (selectedForReply.id === null && selectedForEdit === null) {
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
        setSelectedForReply({
            id: null,
            cta: "REPLY"
        })
        input.current.value = ""
    }

    function generateNextId(prev) {
        const prevReplies = prev.comments.reduce((total, i) => {
            return total + i.replies.length
        }, 0)
        const prevComments = prev.comments.length

        return prevReplies + prevComments + 1
    }

    let cta = "SEND"
    if (selectedForReply.id !== null) { cta = selectedForReply.cta }
    if (selectedForEdit !== null) { cta = "UPDATE" }
    
    function findValue(selectedForEditId) {
        for (let i of data.comments) {
            if (i.id === selectedForEditId) {
                return i.replyingTo !== undefined ?
                    "@ " + i.replyingTo + " " + i.content :
                    i.content
            }
            if (i.replies.length !== 0) {
                for (let j of i.replies) {
                    if (j.id === selectedForEditId) {
                        return j.replyingTo !== undefined ?
                        "@" + j.replyingTo + " " + j.content :
                        j.content
                    }
                }
            }
        }
    }

    return (
        <div className={styles.commentAdderContainer}>
              <Image
                    src={data.currentUser.image.png}
                    height={144}
                    width={144}
                    alt={data.currentUser.username}
            />
            <textarea
                ref={input}
                onChange={handleOnChange}
                defaultValue={
                    selectedForEdit !== null ?
                        findValue(selectedForEdit) :
                        inputValue
                }
                className={styles.input}
                type="text"
                placeholder={`Add a ${selectedForReply.id !== null ? selectedForReply.cta.toLowerCase() : "comment"}...`}
            />
            <button onClick={handleSend} className={styles.send}>
                {cta}
            </button>
        </div>
    )
}