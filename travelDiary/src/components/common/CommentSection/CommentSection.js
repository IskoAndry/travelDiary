import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewComment, fetchComments } from '../../../store/slices/commentsSlice'
import styles from './CommentSection.module.css'

const CommentSection = ({ tripId }) => {
  const [commentText, setCommentText] = useState('')
  const dispatch = useDispatch()
  const { comments, loading, error } = useSelector((state) => state.comments)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchComments(tripId))
  }, [tripId, dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!commentText.trim()) return

    await dispatch(addNewComment({ tripId, text: commentText }))
    setCommentText('')
  }

  return (
    <div className={styles.container}>
      <h3>Комментарии ({comments.length})</h3>
      
      {user ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Оставьте ваш комментарий..."
            rows={3}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Отправка...' : 'Отправить'}
          </button>
        </form>
      ) : (
        <p>Войдите, чтобы оставить комментарий</p>
      )}

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.commentsList}>
        {comments.map((comment) => (
          <div key={comment._id} className={styles.comment}>
            <div className={styles.commentHeader}>
              <img 
                src={comment.author.avatar || '/default-avatar.png'} 
                alt={comment.author.username} 
                className={styles.avatar}
              />
              <div>
                <h4>{comment.author.username}</h4>
                <span className={styles.date}>
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
            <p className={styles.commentText}>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentSection