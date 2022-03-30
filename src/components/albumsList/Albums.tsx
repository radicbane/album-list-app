import React, { useEffect } from 'react'
import { useState } from 'react'
import useFetch from 'react-fetch-hook'
import { AlbumsProps } from '../../APIResponsesTypes'
import Pagination from '../pagination/Pagination'
import SearchBar from '../searchBar/SearchBar'
import Albumsstyles from './Albums.module.css'
import { Link } from 'react-router-dom'
import Author from '../Author'

const Albums = () => {
  const [albums, setAlbums] = useState<AlbumsProps[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [albumPerPage] = useState(10)

  const { isLoading, data, error } = useFetch<AlbumsProps[]>(
    `https://jsonplaceholder.typicode.com/albums`
  )

  useEffect(() => {
    setAlbums(data)
  }, [data])

  const indexOfLastAlbum = currentPage + albumPerPage
  const indexOfFirstAlbum = indexOfLastAlbum - albumPerPage
  const currentAlbums = albums?.slice(indexOfFirstAlbum, indexOfLastAlbum)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (error) {
    return (
      <div>
        <p>Code: ${error.status}</p>
        <p>Message: ${error.statusText}</p>
      </div>
    )
  }
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <SearchBar placeholder="Search albums" data={data} />
      <div className={Albumsstyles.container}>
        {currentAlbums?.map((album) => {
          return (
            <div key={album.id}>
              <Link to={`/album/${album.id}`}>
                <h1 className={Albumsstyles.title}>{album.title}</h1>
              </Link>
              <Author userId={album.userId} />
            </div>
          )
        })}
      </div>
      <div>
        <Pagination
          itemsPerPage={albumPerPage}
          totalAlbums={albums?.length}
          paginate={paginate}
        />
      </div>
    </div>
  )
}

export default Albums
