import styles from '../styles/BlogCard.module.css'
import { NO_IMAGE } from '../constants/strings'
import { RED } from '../constants/colors'
import { Open_Sans } from 'next/font/google'
import Image from 'next/image'
import { format } from 'date-fns'
import CLOCK from '../assets/images/clock.svg'
import LOCATION from '../assets/images/location.svg'
import PERSON from '../assets/images/person.svg'
import { memo } from 'react'

const openSansBold = Open_Sans({
  weight: '700',
  subsets: ['latin'],
})

const openSansRegular = Open_Sans({
  weight: '500',
  subsets: ['latin'],
})

const HEART = ({ color }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="m12 20.975-1.025-.925c-1.763-1.619-3.22-3.015-4.372-4.189-1.152-1.174-2.07-2.224-2.753-3.149-.683-.925-1.163-1.762-1.438-2.512A6.564 6.564 0 0 1 2 7.925c0-1.503.504-2.757 1.513-3.764C4.52 3.154 5.767 2.65 7.25 2.65c.95 0 1.83.225 2.637.675.809.45 1.513 1.1 2.113 1.95.7-.9 1.442-1.563 2.225-1.988a5.213 5.213 0 0 1 2.525-.637c1.483 0 2.73.504 3.738 1.51C21.495 5.169 22 6.423 22 7.926c0 .767-.137 1.525-.413 2.275-.274.75-.754 1.588-1.437 2.513-.683.925-1.601 1.974-2.753 3.148-1.152 1.174-2.61 2.57-4.372 4.189L12 20.975zM12 19c1.687-1.55 3.076-2.88 4.165-3.988 1.09-1.108 1.956-2.079 2.598-2.912.641-.833 1.091-1.576 1.35-2.228.258-.653.387-1.3.387-1.943 0-1.103-.35-2.008-1.05-2.717-.7-.708-1.598-1.062-2.694-1.062-.86 0-1.654.262-2.385.787-.73.525-1.321 1.263-1.771 2.213h-1.225c-.433-.933-1.015-1.667-1.746-2.2-.731-.533-1.526-.8-2.385-.8-1.096 0-1.994.354-2.694 1.062-.7.709-1.05 1.616-1.05 2.72 0 .646.13 1.297.388 1.955.258.659.708 1.409 1.35 2.25.641.842 1.512 1.813 2.612 2.913 1.1 1.1 2.483 2.417 4.15 3.95z" />
    </svg>

  );
};


const PIN = ({ color }) => {
  return (
    <svg fill={color} width="22" height="22" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
      <path d="M 13.4219 35.9688 L 25.9375 35.9688 L 25.9375 48.0156 C 25.9375 51.5781 27.4375 54.5781 28.0234 54.5781 C 28.5859 54.5781 30.0859 51.5781 30.0859 48.0156 L 30.0859 35.9688 L 42.5781 35.9688 C 44.1953 35.9688 45.3672 34.9375 45.3672 33.3672 C 45.3672 32.3828 45.0625 31.6797 44.3828 30.9532 L 37.2109 23.1719 C 36.7188 22.6563 36.4141 22.2813 36.5312 21.3203 L 37.7266 12.7657 C 37.7969 12.2735 37.8437 11.9922 38.2890 11.6875 L 44.0312 7.5157 C 45.3203 6.5781 45.8828 5.4297 45.8828 4.3750 C 45.8828 2.8047 44.6172 1.4219 42.8125 1.4219 L 13.1875 1.4219 C 11.3828 1.4219 10.1172 2.8047 10.1172 4.3750 C 10.1172 5.4297 10.6797 6.5781 11.9453 7.5157 L 17.7109 11.6875 C 18.1562 11.9922 18.2031 12.2735 18.2734 12.7657 L 19.4688 21.3203 C 19.6094 22.2813 19.2812 22.6563 18.7890 23.1719 L 11.6172 30.9532 C 10.9375 31.6797 10.6328 32.3828 10.6328 33.3672 C 10.6328 34.9375 11.8047 35.9688 13.4219 35.9688 Z M 16.4688 32.1953 C 16.2578 32.1953 16.1172 32.0547 16.1172 31.8437 C 16.1172 31.7032 16.2109 31.5625 16.3281 31.4453 L 22.3281 25.1641 C 23.1015 24.3906 23.4062 23.5469 23.3125 22.6797 L 21.8594 11.3828 C 21.7422 10.4688 21.4375 9.7891 20.7578 9.3203 L 15.6719 5.9453 C 15.5078 5.8281 15.4610 5.7110 15.4610 5.5469 C 15.4610 5.3359 15.6250 5.1953 15.8359 5.1953 L 40.1641 5.1953 C 40.3750 5.1953 40.5390 5.3359 40.5390 5.5469 C 40.5390 5.7110 40.4922 5.8281 40.3281 5.9453 L 35.2422 9.3203 C 34.5625 9.7891 34.2578 10.4688 34.1406 11.3828 L 32.6875 22.6797 C 32.5937 23.5469 32.8984 24.3906 33.6484 25.1641 L 39.6719 31.4453 C 39.7890 31.5625 39.8594 31.7032 39.8594 31.8437 C 39.8594 32.0547 39.7422 32.1953 39.5312 32.1953 Z" />
    </svg>
  );
};


function BlogCard({ title, body, username, location, avatar_url, timestamp, setFav, setPin, isPinned, isFav }: BlogCardProps) {

  const ImageComponent = memo(() => {
    return <Image src={avatar_url} alt={NO_IMAGE} id={styles.img} width={56} height={56} />
  });

  return (
    <div id={styles.container}>
      <div id={styles.header}>
        <ImageComponent />
        <span>
          <span onClick={() => setFav({ timestamp, username, location, title })} className={styles.headerIcon}>
            <HEART color={isFav ? RED : ""} />
          </span>
          <span onClick={() => setPin({ timestamp, username, location, title })}>
            <PIN color={isPinned ? RED : ""} />
          </span>
        </span>
      </div>

      <div id={styles.title} className={openSansBold.className}>{title}</div>
      <div id={styles.description} className={openSansRegular.className}>
        {body}
      </div>

      <div id={styles.footer}>
        <span id={styles.footerRightSide}>
          <span className={styles.tag}>
            <span className={styles.footerIcon}>
              <Image src={PERSON} alt={NO_IMAGE} width={24} height={24} />
            </span>
            <span className={`${styles.footerText} ${openSansRegular.className}`}>{username}</span>
          </span>
          <span className={styles.tag}>
            <span className={styles.footerIcon}>
              <Image src={LOCATION} alt={NO_IMAGE} width={24} height={24} />
            </span>
            <span className={`${styles.footerText} ${openSansRegular.className}`}>{location}</span>
          </span>
        </span>

        <span className={styles.tag}>
          <span className={styles.footerIcon}>
            <Image src={CLOCK} alt={NO_IMAGE} width={24} height={24} />
          </span>
          <span className={`${styles.footerText} ${openSansRegular.className}`}>
            {format(new Date(timestamp), 'HH:mm:SS a')}
          </span>
        </span>
      </div>
    </div>
  )
}

export default memo(BlogCard)