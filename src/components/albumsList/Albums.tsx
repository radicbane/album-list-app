import React, { useEffect } from 'react'
import { useState } from 'react'
import useFetch from 'react-fetch-hook'
import { AlbumsProps } from '../../APIResponsesTypes'
import Pagination from '../pagination/Pagination'
import SearchBar from '../SearchBar/SearchBar'
import Albumsstyles from './Albums.module.css'
import { Link } from 'react-router-dom'

const Albums = () => {
  const [albums, setAlbums] = useState<AlbumsProps[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [albumPerPage] = useState(10)
  // const [user, setUser] = useState<UsersProps>({})

  const { isLoading, data, error } = useFetch(
    `https://jsonplaceholder.typicode.com/albums`
  ) as any

  useEffect(() => {
    setAlbums(data)
  }, [data])

  let { usersData } = useFetch(
    `https://jsonplaceholder.typicode.com/users`
  ) as any

  // useEffect(() => {
  //   const author = usersData.find((user) => albums.userId === user.id)
  //   if (usersData.length > 0) {
  //     setUser(author)
  //   }
  // }, [albums.userId, usersData])

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
          const author = usersData?.find((user) => album.userId === user.id)
          return (
            <div>
              <Link to={`/album/${album.id}`}>
                <h1 className={Albumsstyles.title}>{album.title}</h1>
              </Link>
              <h2>{author?.name}</h2>
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
