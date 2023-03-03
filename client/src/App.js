import React, { useEffect, useState } from "react"

function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    // Define a function to fetch the data from the backend API
    const fetchData = () => {
      fetch("/api")
        .then(response => response.json())
        .then(data => setBackendData(data))
        .catch(error => console.error(error))
    }

    // Fetch the data initially and then start a timer to fetch the data every 5 seconds
    fetchData()
    const timer = setInterval(() => {
      fetchData()
    }, 5000)

    // Cleanup function to clear the timer when the component unmounts
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div>
      {typeof backendData.users === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )}
    </div>
  )
}

export default App
