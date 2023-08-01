interface BlogType {
    username: string
    title: string
    avatar_url: string
    location: string
    body: string
    timestamp: number
    isFav?: boolean
    isPinned?: boolean
}

interface BlogCardProps {
    username: string
    title: string
    avatar_url: string
    location: string
    body: string
    timestamp: number
    isFav: boolean
    isPinned: boolean
    setFav: Function
    setPin: Function
}

interface Feed {
    feed: BlogType[]
    status: boolean
}