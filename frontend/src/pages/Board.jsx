import { useEffect, useState } from "react"
import Feed from "../components/Feed"
import MessageField from "../components/MessageField"
import { api } from "../api/api"
import { useUserStore } from "../store/useUserStore"
import { useMessageStore } from "../store/useMessageStore"

const Board = () => {
    const { user } = useUserStore()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const { messages, getMessages } = useMessageStore()
    useEffect(() => {
        const load = async () => {
            setError(null)
            setIsLoading(true)
            try {
                await getMessages()
            } catch (error) {
                console.error(error)
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        load()
    }, [])

    return (
        <>
            <h1>Board</h1>
            {user && <MessageField />}
            {isLoading && <p>Загрузка...</p>}
            {error && <p>{error}</p>}
            {messages.length > 0 && (
                <Feed messages={messages} title="Последние сообщения" />
            )}
        </>
    )
}

export default Board