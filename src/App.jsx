import { useState, useEffect } from 'react'
import './App.css'

const Card = ({ name }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(`${ name } has been liked: ${hasLiked}`);
  }, [hasLiked]);
  

  return (
    <div className='card' onClick={() => setCount(count+1)}>
      <h2>{ name } <br/>{ count || null }</h2>
      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? 'Liked' : 'Like'}
      </button>
    </div>
  )
}

const App = () => {


  return (
    <div className='card-container'>
      <Card name='Star Wars'/>
      <Card name='Marvel'/>
      <Card name='Lion King'/>
    </div>

  )
}

export default App
