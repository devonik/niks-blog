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
  blog_id: string
  text: string
  author: string
  created_at?: string
}
