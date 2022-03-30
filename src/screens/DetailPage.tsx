import Pagination from '../components/pagination/Pagination'
import React, { useEffect, useState } from 'react'
import useFetch from 'react-fetch-hook'
import { useParams } from 'react-router'
import { PhotosProp } from '../APIResponsesTypes'
import SearchBar from '../components/searchBar/SearchBar'
import DetailPagestyles from './DetailPage.module.css'
import { SRLWrapper } from 'simple-react-lightbox'

const DetailPage = () => {
  const [photos, setPhotos] = useState<PhotosProp[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [photoPerPage] = useState(10)
  const [column, setColumn] = useState(DetailPagestyles.card)

  let params = useParams() as any

  const { isLoading, data, error } = useFetch<PhotosProp[]>(
    `https://jsonplaceholder.typicode.com/albums/${params.id}/photos`
  )

  useEffect(() => {
    setPhotos(data)
  }, [data])

  const indexOfLastAlbum = currentPage + photoPerPage
  const indexOfFirstAlbum = indexOfLastAlbum - photoPerPage
  const currentPhotos = photos?.slice(indexOfFirstAlbum, indexOfLastAlbum)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const twoColumn = DetailPagestyles.card
  const threeColumn = DetailPagestyles.column3
  const fourColumn = DetailPagestyles.column4

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
      <div className={DetailPagestyles.buttons}>
        <button onClick={() => setColumn(twoColumn)}>2</button>
        <button onClick={() => setColumn(threeColumn)}>3</button>
        <button
          className={DetailPagestyles.btn4}
          onClick={() => setColumn(fourColumn)}
        >
          4
        </button>
      </div>
      <SRLWrapper>
        <div className={column}>
          {currentPhotos?.map((photo) => (
            <div className={DetailPagestyles.main} key={photo.id}>
              <a href={`${photo.url}`}>
                <img src={`${photo.thumbnailUrl}`} alt={`${photo.title}`} />
              </a>
              <p>{photo.title}</p>
            </div>
          ))}
        </div>
      </SRLWrapper>
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
