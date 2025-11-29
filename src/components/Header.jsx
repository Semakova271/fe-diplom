
import { NavLink } from "react-router-dom"

export const Header = () => {
    return (
        <>
          <header className="container-fluid">
            <div className='row'>
              <div className='col'>
                <div className='container-logo'>
                  <NavLink to='/fe-diplom' id='logo'>Лого</NavLink>
                </div>
                <nav className='navbar navbar-expand-sm navbar-light bg-dark'>
                  <div className="collapase navbar-collapse" id="navbarMain">
                    <ul className="navbar-nav mr-auto nav-items">
                      <a href='/fe-diplom#about'><li className="nav-item">О нас</li></a>
                      <a href='/fe-diplom#howworks' ><li className="nav-item">Как это работает</li></a>
                      <a href='/fe-diplom#reviews'><li className="nav-item">Отзывы</li></a>
                      <a href="#footer"><li className="nav-item">Контакты</li></a>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </header>
      
        </>
      )
}