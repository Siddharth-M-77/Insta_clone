import React from 'react'
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Sliderleft = () => {


    const navigate = useNavigate()

    const slidbarItems = [
        { icon: <Home />, text: 'Home' },
        { icon: <Heart />, text: 'Heart' },
        { icon: <TrendingUp />, text: 'Explore' },
        { icon: <MessageCircle />, text: 'Message' },
        { icon: <Search />, text: 'Search' },
        { icon: <PlusSquare />, text: 'Create' },
        {icon:(<Avatar className="w-6 h-6" >
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Profile</AvatarFallback>
          </Avatar>
          ),text:'Profile'},

        { icon: <LogOut />, text: 'Logout' },

    
    ]

    const handleLogout = async()=>{
        try {

            const response = await axios.get("http://localhost:4000/api/v1/user/logout")

            if(response.data.success) {
                navigate('/login')
                toast.success(response.data.message)
            }
            
        } catch (error) {
        toast.success(error.response.data.message)
            
        }
    }
    const sidebarHandler = (IconType)=>{
        if(IconType==="Logout") handleLogout();

    }
return (
    <div className='w-[40%] md:w-[20%]  sm:w-[17%] sm:text-sm text-3xl fixed top-0 left-0 z-40 border-r-[1px] bg-black text-white h-full flex flex-col items-center justify-center gap-20 sm:gap-8  py-4 '>
        <h1 className='text-3xl text-white mt-4'>LOGO</h1>
        {
            slidbarItems.map((item, index) => {
                return (
                    <div onClick={()=>sidebarHandler(item.text)} className='flex items-center justify-center gap-2 cursor-pointer hover:shadow-sm hover:bg-white px-6 hover:text-black transition-all duration-500 py-1 rounded-full' key={index}>
                            {item.icon}
                            <span><h3>{item.text}</h3></span>
                    </div>
                )
            })
        }
    </div>
)
}

export default Sliderleft
