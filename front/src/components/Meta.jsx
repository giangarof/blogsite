import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function Meta({title,description, keywords}) {
  return (
    <Helmet>
        <title>{title}</title>
        <meta  name="description" content={description} />
        <meta name="keywords" content={keywords} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
    </Helmet>
  )
}

Meta.defaultProps={
    title:'Giga Development',
    description:'Software Development',
    keywords:'Frontend, backend, fullstack'
}
