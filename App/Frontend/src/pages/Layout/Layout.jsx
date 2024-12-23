// Layout.js
import {Menu} from "./Menu"
import {NavegationBar} from "./NavegationBar"
import { Footer } from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <div className='sticky top-0 left-0 w-full h-12 bg-white shadow-md shadow-gray-400/50 z-50'>
                <NavegationBar className=""/>
            </div>
            <div className="flex h-[calc(100vh-6rem)]">
                <div className=''>  
                    <Menu/>
                </div>
                <div className='w-full overflow-y-auto bg-gray-200'>
                    <div className="flex-1 p-2 h-full" id='contenedor'>
                        <main className='m-5'>
                            {children}
                        </main>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Layout;

