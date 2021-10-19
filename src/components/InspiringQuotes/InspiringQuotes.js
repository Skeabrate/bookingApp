import { useLayoutEffect, useState} from "react"

function InspiringQuotes(){
    const InspiringQuotesStyling = {
        color: 'white',
        zIndex: '2',
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontStyle: 'italic',
        letterSpacing: '1px',
        fontSize: '14px'
    }

    const quotes = [
        "„Mówić w danym języku to stawić czoło światu i kulturze.” – Frantz Fanon",
        "„Nic tak nie rozwija inteligencji jak podróżowanie” – Emile Zola",
        "„Należy podróżować, by się czegoś nauczyć” – Mark Twain",
        "„Zwiedzaj świat. To lepsze niż najpiękniejszy sen” – Ray Bradbury",
        "„Inwestycja w podróże to inwestycja w siebie” – Matthew Karsten",
    ]

    const [quote, setQuote] = useState()

    useLayoutEffect(() => {  // eslint-disable-line react-hooks/exhaustive-deps
        setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    })

    return (
        <p style={InspiringQuotesStyling}>{quote}</p>
    )
}

export default InspiringQuotes