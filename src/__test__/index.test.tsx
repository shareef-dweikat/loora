import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import Home, { getServerSideProps } from '../pages/index'
import { NO_BLOGS_TO_SHOW } from '../constants/strings';
import { response } from './dummy'
import { RED } from '../constants/colors';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext } from 'next/types';

describe('Home', () => {
  it('renders the page with no blogs', () => {
    render(<Home initialBlogs='[]' />)

    const container = screen.getByTestId("container")
    const noBlogsMessage = screen.getByText(NO_BLOGS_TO_SHOW)

    expect(container).toBeInTheDocument()
    expect(noBlogsMessage).toBeInTheDocument()

  })

  it('renders the page with blogs', () => {
    render(<Home initialBlogs={JSON.stringify(response.feed)} />)

    const container = screen.getByTestId("container")
    const blogCards = screen.getAllByTestId("blog-card")

    expect(container).toBeInTheDocument()
    expect(blogCards.length).toBeGreaterThan(0)
  })

  it('renders the page with blogs and fire like button', async () => {
    render(<Home initialBlogs={JSON.stringify(response.feed)} />)
    const button = screen.getAllByTestId("fav-button")[0]
    fireEvent.click(button);

    const icons = screen.getAllByTestId("fav-icon")[0]
    expect(icons.getAttribute('fill')).toEqual(RED)
  })

  it('renders the page with blogs and double fire like button', async () => {
    render(<Home initialBlogs={JSON.stringify(response.feed)} />)
    const button = screen.getAllByTestId("fav-button")[0]
    fireEvent.click(button);
    fireEvent.click(button);

    const icons = screen.getAllByTestId("fav-icon")[0]
    expect(icons.getAttribute('fill')).not.toEqual(RED)
  })

  it('renders the page with blogs and fire pin button', async () => {
    render(<Home initialBlogs={JSON.stringify(response.feed)} />)
    const button = screen.getAllByTestId("pin-button")[0]
    fireEvent.click(button);

    const icons = screen.getAllByTestId("pin-icon")[0]
    expect(icons.getAttribute('fill')).toEqual(RED)
  })

  it('renders the page with blogs and double fire pin button', async () => {
    render(<Home initialBlogs={JSON.stringify(response.feed)} />)
    const button = screen.getAllByTestId("pin-button")[0]
    fireEvent.click(button);
    fireEvent.click(button);

    const icons = screen.getAllByTestId("pin-icon")[0]
    expect(icons.getAttribute('fill')).not.toEqual(RED)
  })

  it("Trigger getServerSideProps", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ success: true, feed: [] }),
      })
    )
    const context = {
      params: { id: "fjdks" } as ParsedUrlQuery
    };
    const value = getServerSideProps(context as GetServerSidePropsContext);
    const response = await value
    expect(response).toEqual({ props: { initialBlogs: JSON.stringify([]) } });
  });

  it("Trigger timeinterval", async () => {
    render(<Home initialBlogs={JSON.stringify([])} />)

    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ success: true, status: true, feed: [] }),
      })
    )

    await act(async () => {
      await new Promise((r) => setTimeout(r, 5000));
    });

    const blogCards = screen.queryAllByTestId("blog-card")

    expect(blogCards.length).toEqual(0)
  }, 7000);


})