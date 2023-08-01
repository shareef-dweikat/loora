export default class Blog {
    username = ''
    title = ''
    avatar_url = ''
    location = ''
    body = ''
    timestamp = 0
    constructor(
        {
            username,
            title,
            avatar_url,
            location,
            body,
            timestamp
        }: BlogType
    ) {
        this.username = username
        this.title = title
        this.body = body
        this.avatar_url = avatar_url
        this.location = location
        this.body = body
        this.timestamp = Number(timestamp)
    }

}