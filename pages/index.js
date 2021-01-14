import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="w-full">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-full bg-gray-700 flex-col justify-center text-white overflow-hidden">
        <div>
            <Link href={`/RandomTerrain`}>
              <div className="text-lg block flex justify-center pt-3">Get Random Terrain</div>
            </Link>
        </div>
          
        <div>
            <Link href={`/AllSavedTerrains`}>
              <div className="text-lg block flex justify-center pt-3">Get Saved Terrains</div>
            </Link>
        </div>
      </div>
    </div>
  )
}
