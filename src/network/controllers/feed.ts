import Blog from "../models/Blog"
import { FEED_ENDPOINT } from '../../constants/endpoints'

export const getFeed = async () => {
    let response = await fetch(FEED_ENDPOINT)
    let data: Feed = await response.json()

    const blogs = data?.feed?.map((item: BlogType) =>
        new Blog({
            username: item.username,
            title: item.title,
            avatar_url: item.avatar_url,
            location: item.location,
            body: item.body,
            timestamp: item.timestamp
        }
        ))
    return {
        status: data?.status,
        blogs: blogs
    }
}