import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏️ Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get acess to all the publications <br />
            <span>for {product.amount} mounth</span>
          </p>
          <SubscribeButton />
        </section>
        <img src='/images/avatar.svg' alt='Girl coding' />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1IuKxABDaCAIbEcQFqyZh3h7', {
    expand: ['product']
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100) // O preço vem em centávos
  };

  return {
    props: {
      product
    },
    //Quanto tempo em segundos preciso manter essa página sem ela ser revalidada -> revalidada === reconstruida
    revalidate: 60 * 60 * 24 // 24 horas
  };
};
