import React, { useState } from 'react'
import SearchBarstyles from './SearchBar.module.css'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom'

const SearchBar = ({ data, placeholder }) => {
  const [filterData, setFilterData] = useState([])
  const [enterAlbum, setEnterAlbum] = useState('')

  const handleFilter = (e) => {
    const searchAlbums = e.target.value
    setEnterAlbum(searchAlbums)
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchAlbums.toLowerCase())
    })
    setFilterData(newFilter)

    if (searchAlbums === '') {
      setFilterData([])
    } else {
      setFilterData(newFilter)
    }
  }

  const clearInput = () => {
    setFilterData([])
    setEnterAlbum('')
  }

  return (
    <div className={SearchBarstyles.container}>
      <div className={SearchBarstyles.searchInput}>
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleFilter}
          value={enterAlbum}
        />
        <div className={SearchBarstyles.icons}>
          {filterData.length === 0 ? (
            <SearchIcon className="" />
          ) : (
            <CloseIcon onClick={clearInput} />
          )}
        </div>
      </div>

      {filterData.length != 0 && (
        <div className={SearchBarstyles.resultsData}>
          {filterData.slice(0, 3).map((value, key) => {
            return (
              <Link to={`/album/${value.id}`}>
                <div className={SearchBarstyles.dataItem}>
                  <li>{value.title}</li>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchBar
