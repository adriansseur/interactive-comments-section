import Head from 'next/head'
import data from '../data/data.json'
import App from '../components/App'

// mobile: 375px
// desktop: 1440px
export default function Home({data}) {
  
  return (
    <div>
      <Head>
        <title>Interactive Comments Section</title>
        <meta name="description" content="Create, Read, Update, and Delete Comments" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <App data={data} />
    </div>
  )
}

export async function getStaticProps() {

  return {
    props: {
      data
    }
  }
}