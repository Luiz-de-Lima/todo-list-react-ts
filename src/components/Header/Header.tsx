import React from 'react'
import logo from '../../assets/logo.svg'
import './header.scss'
export const Header = () => {
  return (
    <header className='header'>
      <img src={logo} alt="logo todo" />
    </header>
  )
}
