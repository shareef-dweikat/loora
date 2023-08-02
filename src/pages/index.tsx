import BlogCard from '../components/BlogCard'
import { useCallback, useEffect, useState } from 'react'
import { getFeed } from '../network/controllers/feed'
import { Open_Sans } from 'next/font/google'
import { NO_BLOGS_TO_SHOW } from '../constants/strings'
import styles from '../styles/Home.module.css'

export interface props {
  initialBlogs: string
}

const openSansBold = Open_Sans({
  weight: '700',
  subsets: ['latin'],
})

export default function Home({ initialBlogs }: props) {
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const [favMap, setFavMap] = useState({})
  const [pinMap, setPinMap] = useState({})

  const sortedBlogs = blogs.length === 0 ? JSON.parse(initialBlogs) : blogs

  const setFav = useCallback((blog: BlogType) => {
    const key = blog.timestamp + blog.username + blog.location + blog.title
    if (favMap[key] === true) {
      setFavMap({ ...favMap, [key]: false })
      return
    }
    setFavMap({ ...favMap, [key]: true })
  }, [favMap])

  const setPin = useCallback((blog: BlogType) => {
    const key = blog.timestamp + blog.username + blog.location + blog.title
    if (pinMap[key] === true) {
      setPinMap({ ...pinMap, [key]: false })
      return
    }
    setPinMap({ ...pinMap, [key]: true })
  }, [pinMap])

  const intervalHaldner = async function () {
    const feed = await getFeed()
    if (feed.status) {
      const sorted: BlogType[] = feed.blogs.sort((a, b) => parseFloat(b.timestamp) - parseFloat(a.timestamp))
      setBlogs(sorted)
    }
  }

  useEffect(() => {
    const feedSync = setInterval(intervalHaldner, 5000);
    return function clear() {
      clearInterval(feedSync);
    };
  }, [])


  const pinned = []
  const seen = new Set();

  const filtered = sortedBlogs.filter((blog: BlogType) => {
    const key = blog.timestamp + blog.username + blog.location + blog.title
    const duplicate = seen.has(key);
    seen.add(key);
    if (duplicate) return false

    if (favMap[key] === true) {
      blog.isFav = true
    } else { blog.isFav = false }

    if (pinMap[key] === true) {
      blog.isPinned = true
      pinned.push(blog)
      return false
    } else { blog.isPinned = false }

    return true
  })

  const finalFilteredAndSortedBlogs = [...pinned, ...filtered]

  const sortedBlogsCards = finalFilteredAndSortedBlogs.map((blog: BlogType, index) => {
    const id = blog.timestamp + blog.username + blog.location + blog.title
    return <BlogCard
      key={id}
      setFav={setFav}
      setPin={setPin}
      isPinned={blog.isPinned}
      isFav={blog.isFav}
      timestamp={blog.timestamp}
      avatar_url={blog.avatar_url}
      username={blog.username}
      title={blog.title}
      location={blog.location}
      body={blog.body}
    />
  })

  const content = sortedBlogsCards.length > 0 ? sortedBlogsCards : <div
    id={styles.no_blogs}
    className={openSansBold.className}>
    {NO_BLOGS_TO_SHOW}
  </div>

  return (
    <div data-testid="container" id={styles.container}>
      {content}
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const feed = await getFeed()
  return { props: { initialBlogs: JSON.stringify(feed.blogs.sort((a, b) => parseFloat(b.timestamp) - parseFloat(a.timestamp))) } }
}
