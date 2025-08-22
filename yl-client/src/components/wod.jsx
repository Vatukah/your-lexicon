export default WordOfTheDay=()=>{
    const [word, setWord] = useState('');

    useEffect(() => {
        const fetchWordOfTheDay = async () => {
            const response = await fetch('http://localhost:3000/word-of-the-day');
            const data = await response.json();
            setWord(data.word);
        };

        fetchWordOfTheDay();
    }, []);

    return (
        <div>
            <h2>Word of the Day</h2>
            <p>{word}</p>
        </div>
    );  
}