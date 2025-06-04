export const navbarData = {
  homeTitle: "Nik's Blog",
}

export const footerData = {
  author: 'Niklas Grieger',
  aboutAuthor:
    'Hi! I am Niklas, a freelance software engineer. I like to travel the world and I like to share my experiences and tipps and tricks.',
  authorInterest:
    "My passion beside my job as a software engineer is traveling, scuba diving and tabletennis.",
  aboutTheSite:
    "This is a personal blog to share my experiences, tipps and tricks with other travelers. My focus is on budget traveling.",
}

export const homePage = {
  title: 'Welcome To My Blog Site',
  description:
    'Read about my travel experiences. I will share tipps and tricks for budget traveling, things to do or to avoid and more. I am glad that you are here and willing to read my blog :)',
}

export const blogsPage = {
  title: 'All Blogs',
  description: 'Here you will find all the blog posts I have written & published on this site.',
}

export const categoryPage = {
  title: 'Categories',
  description:
    'Blow this category is generated from all the tags are mentioned in the different blog post',
}

export const aboutPage = {
  title: 'Niklas Grieger',
  description: 'Software Engineer, Problem Solver, Solo Traveler',
  aboutMe:
    "Hello, fellow human! I'm a software engineer that started solo traveling in 2023. I am still on the road and I want to share my experiences and many tipps that I collected. I like to do the non-touristic things as learning the culture of the country, spend time with locals and be myself. I am not the stereo type traveler and I like to unusual things - just because nobody else is doing it doesn't mean you cannot do it. One of my passion is tabletennis and I travel with my racket so in any location I am looking for tabletennis clubs - it is possible and I played already in Thailand, Vietnam, Philipines, Indonesia, Portugal, Brasil, Columbia and more.",
}

export const seoData = {
  title: `Nik's Blog | Niks Blog`,
  ogTitle: `Enjoy my travel blog, guides and helpful tipps around bugdet traveling - Niks Blog | Nik's Blog`,
  description: `Hi I am Niklas. I am a freelance software engineer and I travel solo since 2023 and I am happy to share my experiences - Niks Blog | Nik's Blog`,
  twitterDescription: `Nik's Blog, where I show you tipps and tricks around solo travel, remote working, digital nomad communities - Niks Blog | Nik's Blog`,
  image:
    'https://devnik.dev/MeTrainVietnam.webp',
  mySite: 'https://blog.devnik.dev',
  twitterHandle: '',
  mailAddress: 'niklas.grieger@devnik.dev',
}

export const socialLinks = {
  githubLink: 'https://github.com/devonik',
  linkedinLink: 'https://www.linkedin.com/in/niklas-grieger-b98086152/',
  twitterLink: '',
  stackoverflowLink: 'https://stackoverflow.com/users/6143720/devnik',
}

export const siteMetaData = [
  {
    name: 'description',
    content: seoData.description,
  },
  // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
  { property: 'og:site_name', content: seoData.mySite },
  { property: 'og:type', content: 'website' },
  {
    property: 'og:url',
    content: seoData.mySite,
  },
  {
    property: 'og:title',
    content: seoData.ogTitle,
  },
  {
    property: 'og:description',
    content: seoData.description,
  },
  {
    property: 'og:image',
    content: seoData.image,
  },
  // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
  { name: 'twitter:site', content: seoData.twitterHandle },
  { name: 'twitter:card', content: 'summary_large_image' },
  {
    name: 'twitter:url',
    content: seoData.mySite,
  },
  {
    name: 'twitter:title',
    content: seoData.ogTitle,
  },
  {
    name: 'twitter:description',
    content: seoData.twitterDescription,
  },
  {
    name: 'twitter:image',
    content: seoData.image,
  },
]
