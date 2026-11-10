import { useEffect, useState } from "react"
import Feed from "../components/Feed"
import { useUserStore } from "../store/useUserStore"
import { useMessageStore } from "../store/useMessageStore"

const MyMessages = () => {
    const { user } = useUserStore()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const { messages, getMessages } = useMessageStore()

    useEffect(() => {
        const load = async () => {
            setError(null)
            setIsLoading(true)
            try {
                await getMessages(true)
            } catch (error) {
                console.error(error)
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        load()
    }, [])

    const currentUserId = user?.user?.id

    return (
        <>
            <h1>Мои сообщения</h1>
            {isLoading && <p>Загрузка...</p>}
            {error && <p>{error}</p>}
            {myMessages.length > 0 && (
                <Feed messages={myMessages} title="Мои сообщения" />
            )}
        </>
    )
}

export default MyMessages
