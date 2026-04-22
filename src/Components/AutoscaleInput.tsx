import React,{useState, useRef, useEffect} from 'react';

const AutoscaleInput = () => {
    const [inputText, setInputText] = useState<string>("");
    const [isInputFocused, setInputFocused] = useState<boolean>(false);
    const [blinkerIndex, setBlinkerIndex] = useState(inputText.length)
    const inputRef = useRef();
    const containerRef = useRef();

    const handleInputChange = (e) => {
        let value = e.target.value;
        setInputText(value);
        setBlinkerIndex(e.target.selectionStart);
    }

    const handleOnClickContainer = () => {
        inputRef.current.focus();
        setInputFocused(true)        
    }

    const handleDocumentClick = (e) => {
        console.log(containerRef.current, e.target)
        if(containerRef.current.contains(e.target)){
            inputRef.current.focus();
            setInputFocused(true)
        } else {
            inputRef.current.blur();
            setInputFocused(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => document.removeEventListener('click', handleDocumentClick)
    },[])

    const handleKeyDown = (e) => {
        if (e.key === "ArrowLeft") {
            setBlinkerIndex((prev) => prev - 1)
        }else if(e.key === "ArrowRight"){
            setBlinkerIndex((prev) => prev + 1)
        }
      };


    return (
        <div>
            Auto scale input
            <br/>
            <input 
                name="inputBox" 
                onChange={handleInputChange} 
                ref={inputRef} 
                onKeyDown={handleKeyDown}
                style={{
                outline: 'none', border: 'none', color: 'white',
                height: '0px',
                width: '0px'
            }}
            
            />
            <div  
            className="container" 
            onClick={handleOnClickContainer} 
            ref={containerRef}
            style={{backgroundColor: isInputFocused && 'coral'}}
             >
                <span style={{
                    fontSize: inputText.length > 10 ? '20px': '30px',
                     transition: 'font-size 0.3s ease-in-out'
                }}>{inputText.slice(0, blinkerIndex)}</span>
                {isInputFocused ? <span className="blinker">|</span>:null}
                <span style={{
                    fontSize: inputText.length > 10 ? '20px': '30px',
                     transition: 'font-size 0.3s ease-in-out'
                }}>{inputText.slice(blinkerIndex, inputText.length)}</span>
            </div>
        </div>
    )
}

export default AutoscaleInput;