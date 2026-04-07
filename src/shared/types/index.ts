export interface Favorite {
  id: number
  image_id: string
  sub_id: string
  created_at: string
  image?: {
    id: string
    url: string
  }
}

export interface Cat {
  id: string
  url: string
  width: number
  height: number
  pages: number
}
