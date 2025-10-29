import { navbardata } from "./nav.js";
import { NavLink } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";
import { FaContao } from "react-icons/fa6";
import { useState } from "react";

export default function Nav(){
    const [Open,setOpen] = useState(false);
    return(
        <nav className="font-display bg-gray-900 text-white">
            <div className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24 flex justify-between items-center py-5">
                {/* logo section */}
                <div className="text-2xl flex items-center gap-2 font-bold uppercase">
                    <FaContao className="w-9 h-9 hover:text-amber-500 duration-200"/>
                    <p className="font-sans">Course</p>
                    <p className="text-amber-500">ferrraa</p>
                </div>
                {/* Menu Section */}
                <div className="hidden md:block">
                    <ul className="flex items-center gap-6">
                        {
                            navbardata.map((item)=>{
                                return (
                                    <li key={item.id}>
                                        <NavLink to={item.link} className="inline-block py-1 px-3 hover:text-amber-500 font-bold">{item.title}</NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {/* Login */}
                <div className="flex items-center gap-2">
                    <button className="hover:bg-amber-500 text-amber-500 font-semibold hover:text-white rounded-md border-2 px-6 py-2 duration-200 hidden md:block">
                        Login
                    </button>
                    <button className="bg-amber-500 hover:bg-white hover:text-amber-500 font-semibold text-white rounded-md border-2 px-6 py-2 duration-200 hidden md:block">
                        Signup
                    </button>
                </div>
                {/* MOBILE Hamburger section */}
                <div className="md:hidden" onClick={()=>{setOpen(!Open)}}>
                    <IoMdMenu className="text-4xl"/>
                </div>
            </div>
        </nav>
    )
}