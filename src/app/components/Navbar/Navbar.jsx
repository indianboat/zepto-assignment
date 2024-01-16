import React from 'react'
import { ZeptoLogo } from '../SVGIcons/SvgIcons'
import ThemeSwitch from '../ThemeProvider/ThemeSwitch';

const Navbar = () => {
  return (
    <>
      <div className="bg-[#3C006B] sticky top-0 px-4 py-2 flex justify-between items-center">
        <ZeptoLogo />
        <div className="">
          <ThemeSwitch />
        </div>
      </div>
    </>
  )
}

export default Navbar