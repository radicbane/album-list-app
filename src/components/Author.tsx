import React, { useEffect, useState } from 'react'
import useFetch from 'react-fetch-hook'
import { UsersProps } from '../APIResponsesTypes'

interface Props {
  userId: number
}

interface AuthorProps {
  name: string
  id: number
}

const Author = ({ userId }: Props) => {
  const [users, setUsers] = useState<UsersProps[]>([])
  const [author, setAuthor] = useState<AuthorProps>(null)

  const { isLoading, data } = useFetch<UsersProps[]>(
    `https://jsonplaceholder.typicode.com/users`
  )

  useEffect(() => {
    if (!isLoading) {
      setUsers(data)
    }
  }, [data, isLoading])

  useEffect(() => {
    if (users.length > 0) {
      const authorName = users.find((user) => userId === user.id)
      setAuthor(authorName)
    }
  }, [userId, users])

  if (!author) return <div>...Loading</div>
  return <div>{author?.name}</div>
}

export default Author
