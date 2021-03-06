import Head from 'next/head'
import { useState, useEffect } from 'react'

const Home = () => {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')

  const shortenUrl = async () => {
    try {
      const response = await fetch(`/api/short`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalUrl: url,
          baseUrl: window.location.origin
        })
      }).then(res => res.json())
      setShortUrl(response.shortUrl)
      console.log('Url shortened successfully', response)
    } catch (err) {
      alert(`Some error occured.`)
      console.error('Could not shorten url', err)
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Ana Coimbra - URL Shortner</title>
        <link rel="icon" href="/img/favicon.ico" />
      </Head>

      <main className="grid">
        <h1 className="title">
          URL Shortener
        </h1>

        <input type="text" name="url" required onChange={e => setUrl(e.target.value)} />
        <button name="short" onClick={shortenUrl}>Shorten url</button>

        {shortUrl && <p>Short url: <a href={shortUrl} target="_blank">{shortUrl}</a></p>}
      </main>

      <footer>
        Created by Ana Coimbra using&nbsp;
        <a
          href="https://nextjs.org/"
          target="_blank"
          rel="noopener noreferrer">{' '}Next by <img src="./img/zeit.svg" alt="ZEIT Logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          color: black;
        }

        a {
          color: #3da9f8;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 3.8rem;
          margin-bottom: 12px;
          font-weight: bold;
          font-family: 'Roboto', sans-serif;
          text-transform: uppercase;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        input {
          min-height: 36px;
          border: 1.4px solid gray;
          border-radius: 4px;
          width: 95%;
          font-size: 16px;
          padding: 0 12px;
        }

        button {
          width: 50%;
          height: 40px;
          background: #120136;
          color: white;
          font-size: 14px;
          text-transform: uppercase;
          border-radius: 4px;
          margin-top: 8px;
          cursor: pointer;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
          .title {
            font-size: 2.6rem;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default Home