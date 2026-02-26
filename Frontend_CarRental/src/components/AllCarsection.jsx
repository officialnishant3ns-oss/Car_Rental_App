import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import Loader from './Loader'

const AllCarsection = ({ search }) => {

  const { api } = useContext(AppContext)

  const [carSearch, setCarSearch] = useState([])
  const [loading, setLoading] = useState(false)

  const searchFilter = async () => {
    try {
      setLoading(true)
      const { data } = await api.get(`/car/getallcar?search=${search}`)
        console.log("search data",data.data)
      if (data.success) {
        setCarSearch(data.data)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Search failed")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    const delay = setTimeout(() => {
      searchFilter()
    }, 400) 

    return () => clearTimeout(delay)

  }, [search])


  return (
    <div className='p-25'>

      <div className='text-2xl text-gray-500 mb-3'>
        All Featured Car
      </div>

      {loading && (
        <div>
          <p className="text-center text-gray-600 text-xl">Searching...</p>
        <Loader/>
        </div>
      )}

      <div className='grid grid-cols-3 gap-8'>

        {carSearch.length ? (
          carSearch.map(item => (
            <div key={item._id}>
              <Card car={item}/>
            </div>
          ))
        ) : !loading && (
          <p>No cars found</p>
        )}

      </div>

    </div>
  )
}

export default AllCarsection