import { Scroll, Timer } from 'phosphor-react'

import { HeaderContainer, NavMenu } from './styles'
import logoImg from '../../assets/logo.svg'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoImg} alt="" />

      <NavMenu>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </NavMenu>
    </HeaderContainer>
  )
}
