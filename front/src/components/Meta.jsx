import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function Meta({title,description, keywords}) {
  return (
    <Helmet>
        <title>{title}</title>
        <meta  name="description" content={description} />
        <meta name="keywords" content={keywords} />
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
