import './navbar.module.css'
import logo from '../../../img/fruits.png'

function Menu(){
    return(
        <nav>
            <ul>
                <li><img src={logo} alt='logo'/></li>
            </ul>
            <h1>Hortfruit Online</h1>
        </nav>
    );
}
export default Menu