import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export const NoMatch = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/")
  }, [navigate])

  return null
  // const handleHome = () => navigate("/")

  // return (
  //     <section className="horizon center middle">
  //       404 Not Found
  //       <button onClick={handleHome}>HOME</button>
  //     </section>
  // )
}
