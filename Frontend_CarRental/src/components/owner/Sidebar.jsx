import React, { useContext } from 'react'
import { dummyUserData, ownerMenuLinks } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

const Sidebar = () => {
  const {user,isOwner} = useContext(AppContext)

  return (
    <div className="relative top-0 left-0 w-72 h-screen border-r bg-white shadow-sm">
      <div className="space-y-1">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end={link.path === "/owner"}
            className={({ isActive }) =>
              `flex items-center gap-4 w-full py-6 font-normal pl-5 transition-all duration-200
               hover:bg-sky-200
               ${isActive
                ? "bg-sky-200 text-blue-600 font-medium border-r-4 border-blue-500"
                : "text-gray-600"}`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? link.coloredIcon : link.icon}
                  alt={link.name}
                  className="w-5 h-5"
                />
                {link.name}
              </>
            )}
          </NavLink>
        ))}
      </div>

    </div>
  )
}

export default Sidebar
