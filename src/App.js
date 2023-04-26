import { useState , useEffect } from "react"

const App = () => {
  const [value, setValue] =useState(null)
  const [message , setMessage] = useState(null)
  const [previousChat , setPreviousChats ] = useState([])
  const[currentTitle, setCurrentTitle] = useState([])

  const createNewChat = () => {
    setMessage(null)
    setValue("")

  }


  const getMessages =async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try{
      const response = await fetch('http://localhost:8000/completions', options)
      const data =await response.json()
      console.log(data)
      setMessage(data.choices[0].message)
    } catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(currentTitle, value , message)
    
    if(!currentTitle && value && message) {
      setCurrentTitle(value)
    }


    if(currentTitle && value && message){
      setPreviousChats(prevChats => (
        [...prevChats, 
          {
              title: currentTitle,
              role: "user",
              content: value
          },
          {
              title:currentTitle,
              role: message.role,
              content: message.content
          }
      ]
      ))
    }
  }, [message,currentTitle])

  console.log(previousChat)

  const currentChat = previousChat.filter(previousChat => previousChat.title === currentTitle)

  const uniqueTitles = Array.from(new Set(previousChat.map(previousChat => previousChat.title)))
  console.log(uniqueTitles)
  
  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          <li>BLUGH</li>
        </ul>
        <nav>
          <p>Made by Parth</p>
        </nav>
      </section>


      <section className="main">
        {!currentTitle && <h1>ParthGPT</h1> }  
        <ul className="feed">
          {currentChat?.map((chatMessage , index) => <li key={index}>
            <p className="role">{chatMessage.role}</p>
            <p>{chatMessage.message}</p>
          </li>)}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <div id="submit" onClick={getMessages}>➢</div>
          </div>
          <p className="info">
            Chat GPT Mar 14 Version. Free Research Preview.
            Our goal is to make AI systems more natural and safe to interact with.
            Your feedback will help us improve.
          </p>

        </div>
      </section>
    </div>
  )
}

export default App
 