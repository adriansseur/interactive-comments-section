import Image from "next/image"
import styles from '../styles/Comment.module.css'
import { useState } from "react"
import CommentAdder from "./CommentAdder"

export default function Comment({
    id,
    content,
    createdAt,
    score,
    src,
    username,
    replies,
    replyingTo,
    currentUser,
    setViewDeleteModal,
    setSelectedForDeletion,
    setSelectedForReply,
    data,
    setData,
    selectedForReply,
    selectedForEdit,
    setSelectedForEdit
}) {

    function handleDeleteClick(id) {
        setViewDeleteModal(true)
        setSelectedForDeletion(id)
    }

    function handleReplyClick(id) {
        setSelectedForReply(prev => ({ ...prev, id: id }))
        setSelectedForEdit(null)
    }

    function handleEditClick(id) {
        setSelectedForReply({
            id: null,
            cta: "REPLY"
        })
        setSelectedForEdit(id)
    }

    function handleScoreClick(id, operator) {
        console.log(`data before:`)
        console.log(data)
        setData(prev => {
            const commentsClone = prev.comments
            for (let i of commentsClone) {
                if (i.id === id) {
                    if (operator === "plus") {
                        console.log(`score before: ${i.score}`)
                        i.score++
                        console.log(`score after: ${i.score}`)
                    }
                    else if (operator === "minus") {
                        i.score--
                    }
                }
                if (i.replies.length !== 0) {
                    for (let j of i.replies) {
                        if (j.id === id) {
                            if (operator === "plus") {
                                j.score++
                            }
                            else if (operator === "minus") {
                                j.score--
                            }
                        }
                    }
                }
            }
            return ({
                ...prev,
                "comments": commentsClone
            })
        })
        console.log(`data after:`)
        console.log(data)
    }

    return (
        <div className={styles.commentContainer}>
            <p className={styles.username}>
                {username}
                {username === currentUser ? <span className={styles.you}>you</span> : <span></span>}
            </p>
            <Image
                className={styles.userImage}
                src={src}
                height={150}
                width={150}
                alt={username}
            />
            <p className={styles.createdAt}>{createdAt}</p>
            {(selectedForEdit === null || selectedForEdit !== id)
                ?
                <p className={styles.content}>
                    {
                        replyingTo !== undefined ?
                        <span className={styles.replyingTo}>@{replyingTo}</span> : <span></span>
                    }
                        {" " + content}
                </p>
                :
                <div className={styles.editContentContainer}>
                    <CommentAdder data={data} setData={setData} selectedForReply={selectedForReply} setSelectedForReply={setSelectedForReply} selectedForEdit={selectedForEdit} setSelectedForEdit={setSelectedForEdit} />
                </div>
            }
            <div className={styles.scoreContainer}>
                <button onClick={() => handleScoreClick(id, "plus")}>
                    <Image
                        src="/assets/icons/icon-plus.svg"
                        height={150}
                        width={150}
                        alt="plus"
                    />
                </button>
                <p>{score}</p>
                <button onClick={() => handleScoreClick(id, "minus")}>
                    <Image
                        src="/assets/icons/icon-minus.svg"
                        height={150}
                        width={150}
                        alt="minus"
                    />
                </button>
            </div> {/* score-container */}
            {
                username === currentUser ?
                    <div className={styles.manageContainer}>
                        <button onClick={() => handleDeleteClick(id)}>
                            <div className={styles.deleteContainer}>
                                <Image
                                    src="/assets/icons/icon-delete.svg"
                                    height={150}
                                    width={150}
                                    alt="minus"
                                />
                                <p>Delete</p>
                            </div>
                        </button>
                        <button onClick={() => handleEditClick(id)}>
                            <div className={styles.editContainer}>
                                <Image
                                    src="/assets/icons/icon-edit.svg"
                                    height={150}
                                    width={150}
                                    alt="minus"
                                />
                                <p>Edit</p>
                            </div>
                        </button>
                    </div> :
                        <button onClick={() => handleReplyClick(id)}>
                            <div className={styles.replyContainer}>
                                <Image
                                    src="/assets/icons/icon-reply.svg"
                                    height={150}
                                    width={150}
                                    alt="reply"
                                />
                                <p>Reply</p>
                            </div>
                        </button>
            }
        </div>
    )
}