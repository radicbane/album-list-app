export interface AlbumsProps {
  userId?: number
  id?: number
  title?: string
  albums?: AlbumsProps[]
}

export interface UsersProps {
  userId?: number
  id?: number
  name?: string
  users?: UsersProps[]
}
