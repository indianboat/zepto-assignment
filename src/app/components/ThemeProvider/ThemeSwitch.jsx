"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '../SVGIcons/SvgIcons';

const ThemeSwitch = () => {

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} type="button" className="flex items-center text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-gray-500">
        {
          theme === "dark" ? <SunIcon className='w-4 h-4 text-gray-300' /> : <MoonIcon className='w-4 h-4 text-gray-300' />
        }
      </button>

    </>
  )
}

export default ThemeSwitch