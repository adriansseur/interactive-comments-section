import Head from 'next/head'
import data from '../data/data.json'
import App from '../components/App'
import { useState } from 'react'

export default function Home({ data }) {
  
  const [myData, setMyData] = useState(data)
  
  return (
    <div>
      <Head>
        <title>Interactive Comments Section</title>
        <meta name="description" content="Create, Read, Update, and Delete Comments" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="L8vVyvBwYScCo7cR-ZNfeiOCeek097r6yyvWBp5pRb0" />
      </Head>

      <App data={myData} setData={setMyData} />
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