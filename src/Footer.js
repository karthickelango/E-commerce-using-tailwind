import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear()
  return (
    <p className="footer-brand text-sm text-zinc-400 dark:text-zinc-500">© {year} Angaddi. All rights reserved. </p>
  )
}

export default Footer