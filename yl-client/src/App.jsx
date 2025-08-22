import { useState,useEffect } from 'react'
import { socket } from './utils/socket';
import './App.css'
import AllRoutes from './routes/allRoutes'
import { useAuth } from './contexts/authContext';
import useWordOfTheDaySubscription from './hooks/useWordOfTheDaySubs.js';

function App() {
  const {channel,messages,setMessages} = useAuth();
  const [trendingWords, setTrendingWords] = useState([]);
  const publicVapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

  useWordOfTheDaySubscription(publicVapidKey);

  // useEffect(() => {
  //   socket.on('trendingWords', (data) => {
  //     console.log("Received message:", data);
  //     // setMessages((prevMessages) => ({
  //     //   ...prevMessages,
  //     //   [channel]: [...(prevMessages[channel] || []), data],
  //     // }));
  //     // You can update state or show notifications here
  //   });

  //   // Cleanup on unmount
  //   return () => {
  //     socket.off('trendingWords');
  //   };
  // }, []);
  // useEffect(() => {


  //   const fetchTrendingWords = async () => {
  //     const response = await fetch('http://localhost:3000/redis/trending-words');
  //     const data = await response.json();
  //     console.log("Fetched trending words:", data);
  //     setTrendingWords(data);
  //   };

  //   fetchTrendingWords();

  // }, []);

  return (
    <>
     
      <AllRoutes />
    </>
  )
}

export default App
