export interface BlogPost {
  title: string
  date: string
  description: string
  image: string
  alt: string
  ogImage: string
  tags: string[]
  published: boolean
}

export interface Comment {
  id?: number
  text: string
  author: string
  published?: boolean
  created_at?: string
}
