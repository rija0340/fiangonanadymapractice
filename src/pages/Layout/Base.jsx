import { Outlet, NavLink } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
 function Base() {
    return (
        <div>
           <Navigation></Navigation>
           <div className=' flex-fill container'>
                <Outlet/>
           </div>
            <Footer></Footer>
        </div>
    );
}

export default Base;