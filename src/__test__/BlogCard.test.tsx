import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import BlogCard from '../components/BlogCard';

describe('BlodCard', () => {
  it('renders the page and like a blog', async () => {
    const setLike = jest.fn()
    const setPin = jest.fn()

    render(
      <BlogCard
        key={"0011"}
        setLike={setLike}
        setPin={setPin}
        isPinned={true}
        isLiked={false}
        timestamp={"1690955638.837374"}
        avatar_url={"https://gravatar.com/avatar/6d4033eccab972b994c9f4b86848a619?s=400&d=robohash&r=x"}
        username={"Shareef"}
        title={"Hihihi"}
        location={"USA"}
        body={"Hihihih"}
      />)

    await fireEvent.click(screen.getAllByTestId("like-button")[0]);

    await waitFor(() =>
      expect(setLike).toHaveBeenCalledWith({
        location: "USA",
        timestamp: "1690955638.837374",
        title: "Hihihi",
        username: "Shareef",
      })
    )

    await fireEvent.click(screen.getAllByTestId("pin-button")[0]);

    await waitFor(() =>
      expect(setPin).toHaveBeenCalledWith({
        location: "USA",
        timestamp: "1690955638.837374",
        title: "Hihihi",
        username: "Shareef",
      })
    )
  })
})

