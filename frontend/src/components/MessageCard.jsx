import { useMessageStore } from "../store/useMessageStore"
import { api } from "../api/api"
import { useUserStore } from "../store/useUserStore"

const MessageCard = ({ likes, content, username, createdAt, id, userId, likedBy }) => {
    const { getMessages } = useMessageStore()
    const { user } = useUserStore()


    const handleDelete = async () => {
        await api.deleteMessage(id)
        getMessages()
    }

    const handleLike = async () => {
        await api.likeMessage(id)
        getMessages()
    }

    const handleReport = async () => {
        await api.reportMessage(id)
        getMessages()
    }

    const isLiked = likedBy.includes(user?.user.id)



    return (
        <div className="message-card">
            <div className="message-content">{content}</div>
            <div className="message-meta">
                <span className="message-author">@{username}</span>
                <span className="message-time">{createdAt}</span>
            </div>
            <div className="message-actions">
                {user?.user && 
                ( <>
                <button onClick={handleLike} className="action-button">
                    <span>{likes} {isLiked ? "💗" : "🤍"}</span>
                    <span>Нравится</span>
                </button>
                <button onClick={handleReport} className="action-button">
                    <span>🚩</span>
                    <span>Пожаловаться</span>
                </button>
                 </> )} 
                {user?.user.id === userId && (
                <button onClick={handleDelete} className="action-button delete">
                    <span>❌</span>
                    <span>Удалить</span>
                </button>
                )}
            </div>
        </div>
    )
}

export default MessageCard