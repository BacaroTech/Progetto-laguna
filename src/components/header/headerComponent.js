import { Link } from 'react-router-dom'
import './header.css'
export default function Header(){


    return(
        <header className='header py-3'>
            <h1 className="title text-4xl font-bold">Progetto Laguna</h1>
            <div className='flex items-center mx-auto max-w-24 gap-5 text-xl capitalize cursor-pointer'>
                <Link to="/">Mappa</Link>
                <Link to="/grafici">Grafici</Link>
            </div>
        </header>
    ) 
}