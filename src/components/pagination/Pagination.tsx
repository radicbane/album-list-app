import React from 'react'
import Paginationstyles from './Pagination.module.css'

const Pagination = ({ albumPerPage, totalAlbums, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalAlbums / albumPerPage); i++) {
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
            <a onClick={() => paginate(number)} href="!#">
              {number}
            </a>
          </div>
        ))}
      </div>
    </nav>
  )
}

export default Pagination
