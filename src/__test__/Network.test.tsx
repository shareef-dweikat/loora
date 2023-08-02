import { getFeed } from '../network/controllers/feed'
import Blog from '../network/models/Blog'
import { response } from './dummy'

describe('Check Blog modal', () => {
  it('renders the page and like a blog', async () => {
    const blog: BlogType = new Blog({
      username: "Shareef", title: "Hihi", avatar_url: "https://",
      location: "USA", body: "oddddy", timestamp: "009877"
    })

    expect(blog.title).toEqual("Hihi")
  })

  it("Trigger getFeed request", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ success: true, status: true, feed: response.feed }),
      })
    )

    const value = await getFeed()
    expect(value).toEqual({
      status: true,
      blogs: response.feed
    });
  });

})

