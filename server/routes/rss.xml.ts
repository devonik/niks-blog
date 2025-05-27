import { Feed } from 'feed'

const basePath = 'https://devnik.dev'

export default defineEventHandler(async (event) => {
  setHeader(event, 'content-type', 'text/xml')
  const docs = await queryCollection(event, 'content').all()
  const feed = new Feed({
    title: "Nik's personal blog site",
    description: "Nik's personal blog site",
    id: basePath,
    link: basePath,
    language: 'en',
    favicon: `${basePath}/favicon.ico`,
    copyright: 'MIT',
    author: {
      name: 'Niklas Grieger',
      email: 'niklas.grieger@devnik.dev',
      link: basePath,
    },
  })

  // Add the feed items
  docs.forEach((doc) => {
    // console.log(doc)
    feed.addItem({
      title: doc.title || '',
      id: basePath + doc.path,
      link: basePath + doc.path,
      description: doc.description,
      content: doc.description,
      date: new Date(doc.meta?.date as string),
    })
  })

  return feed.rss2()
})
