import React from 'react'
import Paginationstyles from './Pagination.module.css'

interface PaginProps {
  itemsPerPage: number
  totalAlbums: number
  paginate: (arg: number) => void
}

const Pagination = ({ itemsPerPage, totalAlbums, paginate }: PaginProps) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalAlbums / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <div className={Paginationstyles.container}>
        {pageNumbers.map((number) => (
          <div
            key={number}
            className={Paginationstyles.number}
            onClick={() => paginate(number)}
          >
            {number}
          </div>
        ))}
      </div>
    </nav>
  )
}

export default Pagination
