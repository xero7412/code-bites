import {useState, useEffect, useRef} from 'react';

const MultiSelect = () => {

    const [searchInput, setSearchInput] = useState('');
    const [searchOut, setSearchOut] = useState(null);
    const [selectedVal, setSelectedVal] = useState({});
    const [selectedRow, setSelectedRow] = useState(0);

    useEffect(() => {
        let timer = null;
        if(searchInput){
            timer = setTimeout(() => {
                fetchInputData(searchInput)
            }, 500);
        }
        return () => clearTimeout(timer)
    },[searchInput])

    const handleKeyDown = (e) => {
        if(e.key === 'ArrowDown'){
            setSelectedRow((prev) => prev + 1)

        }else if(e.key === 'ArrowUp'){
            setSelectedRow((prev) => prev - 1)
            
        }else if(e.key === 'Enter'){
            onPressSelection(searchOut[selectedRow])
        }
    }


    const handleInputChange = (e) => {
        let inputValue = e.target.value;
        setSearchInput(inputValue)
    }

    const fetchInputData = async (searchInput) => {
        let res = await new Promise((res) => setTimeout(()=>res([{id:1, title:'this is one'}, {id:2, title:'this is two'},{id:3, title:'this is three'}]), 1000))
        setSearchOut([...res])
    }

    const onPressSelection = (obj) => {
        let {id} = obj;
        let values = {...selectedVal}

        if(values[id]){
            delete values[id]
        }else {
            values[id] = Date.now()
        }
        setSelectedVal(values)
    }


    return <div>
        Multi select
        <br/>
        <input name="search" 
        value={searchInput} 
        onKeyDown={handleKeyDown} 
        placeholder="search here" 
        onChange={handleInputChange
        }/>
        {
            searchOut?.map((obj, index) => 
            <div  onClick={() => onPressSelection(obj) }
                style={{height: 20, 
                margin: 5,
                background: selectedVal[obj.id] ? 'red': selectedRow === index ? 'yellow' : 'blue' 
            }}>
                {obj.title}
            </div>)
        }
    </div>
}

export default MultiSelect;