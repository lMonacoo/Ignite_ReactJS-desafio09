import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import { getPrismicClient } from '../../services/prismic';
import Posts, { getStaticProps } from '../../pages/posts';

const posts = [
  { slug: 'my-new-post', title: 'my new post', excerpt: 'post excerpt', updatedAt: '10 de abril' }
];

jest.mock('../../services/prismic');

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText('my new post')).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    //   usamos a função como mockResolvedValueOnce, porque a função no arquivo é async então precisa ser resolve, e só desejamos a primeira vez
    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [{ type: 'heading', text: 'my new post' }],
              content: [{ type: 'paragraph', text: 'post excerpt' }]
            },
            last_publication_date: '04-01-2021'
          }
        ]
      })
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'my new post',
              excerpt: 'post excerpt',
              updatedAt: '01 de abril de 2021'
            }
          ]
        }
      })
    );
  });
});
