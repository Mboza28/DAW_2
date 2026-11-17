import { Link } from 'react-router-dom'

function Nav() {
  return (
    <div>
        <nav>
          <ul>
            <li>
              <Link to='/Home'>Home</Link>
            </li>
            <li>
              <Link to='/users'>Users</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/products'>Products</Link>
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default Nav