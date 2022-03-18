import Pagination from '../components/pagination/Pagination'
import React, { useEffect, useState } from 'react'
import useFetch from 'react-fetch-hook'
import { useParams } from 'react-router'
import { PhotosProp } from '../APIResponsesTypes'
import SearchBar from '../components/SearchBar/SearchBar'
import DetailPagestyles from './DetailPage.module.css'

const DetailPage = () => {
  const [photos, setPhotos] = useState<PhotosProp[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [photoPerPage] = useState(10)
  let params = useParams() as any

  const { isLoading, data, error } = useFetch(
    `https://jsonplaceholder.typicode.com/albums/${params.id}/photos`
  ) as any

  useEffect(() => {
    setPhotos(data)
  }, [data])

  const indexOfLastAlbum = currentPage + photoPerPage
  const indexOfFirstAlbum = indexOfLastAlbum - photoPerPage
  const currentPhotos = photos?.slice(indexOfFirstAlbum, indexOfLastAlbum)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

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
    <div className={DetailPagestyles.container}>
      <SearchBar placeholder="Search photos" data={data} />
      <div className={DetailPagestyles.card}>
        {currentPhotos?.map((photo) => (
          <div className={DetailPagestyles.title}>
            <p>{photo.title}</p>
            <img src={`${photo.thumbnailUrl}`} alt={`${photo.title}`} />
          </div>
        ))}
      </div>
      <div>
        <Pagination
          itemsPerPage={photoPerPage}
          totalAlbums={photos?.length}
          paginate={paginate}
        />
      </div>
    </div>
  )
}

export default DetailPage
