import React from 'react'
import { GithubIcon, LinkedInIcon } from '../SVGIcons/SvgIcons'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='flex justify-center py-3 bg-slate-100 dark:bg-slate-900 text-gray-800 footer'>
      <div className="flex items-center gap-2">
        <p className='font-normal text-sm dark:text-gray-400'>&copy; Copyright 2024 | Made by Pankaj</p>
        <Link title='Github' target='_blank' href="https://github.com/indianboat/zepto-assignment" className='flex w-fit rounded-full p-1  bg-slate-300 dark:bg-slate-600 dark:text-gray-200'>
          <GithubIcon />
        </Link>
        <Link title='LinkedIn' target='_blank' href="https://www.linkedin.com/in/pankaj-014891194/" className='flex w-fit rounded-full p-1  bg-slate-300 dark:bg-slate-600 dark:text-gray-200'>
          <LinkedInIcon />
        </Link>
      </div>
    </div>
  )
}

export default Footer