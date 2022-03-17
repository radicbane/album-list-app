import React, { useEffect } from 'react'
import { useState } from 'react'
import useFetch from 'react-fetch-hook'
import Pagination from '../pagination/Pagination'
import SearchBar from '../SearchBar'
import Albumsstyles from './Albums.module.css'

const Albums = () => {
  const [albums, setAlbums] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [albumPerPage] = useState(10)

  const { isLoading, data, error } = useFetch(
    `https://jsonplaceholder.typicode.com/albums`
  ) as any

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
        {currentAlbums?.map((album) => (
          <div>
            <h1 className={Albumsstyles.title}>{album.title}</h1>
          </div>
        ))}
      </div>
      <div>
        <Pagination
          albumPerPage={albumPerPage}
          totalAlbums={albums?.length}
          paginate={paginate}
        />
      </div>
    </div>
  )
}

export default Albums
