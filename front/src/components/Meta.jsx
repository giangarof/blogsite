import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function Meta({title,description, keywords, image}) {
  console.log(title, description, image)
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:keywords" content={keywords} />
      <meta property="og:image" content={image} />
      {/* <meta property="og:url" content={url} /> */}
      <meta property="og:type" content="website" />
      
      {/* Optional: Twitter Card Tags */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="image" />

    </Helmet>
  )
}

Meta.defaultProps={
    title:'Giga Development',
    description:'Professional sofware developer with expertise in UI/UX, data analysis, and web application security. Delivering scalable code with multiple programming languages.',
    keywords:'Frontend, Backend, Fullstack, React.js, Web Development, Data',
    url:'https://www.giga-dev.com/',
    image:'/op.jpg'
}
