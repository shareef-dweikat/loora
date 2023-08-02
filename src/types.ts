interface BlogType {
    username: string
    title: string
    avatar_url: string
    location: string
    body: string
    timestamp: string
    isLiked?: boolean
    isPinned?: boolean
}

interface BlogCardProps {
    username: string
    title: string
    avatar_url: string
    location: string
    body: string
    timestamp: string
    isLiked: boolean
    isPinned: boolean
    setLike: Function
    setPin: Function
}

interface Feed {
    feed: BlogType[]
    status: boolean
}