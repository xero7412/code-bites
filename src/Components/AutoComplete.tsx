import React, {useState, useEffect, useRef, useCallback} from 'react';
import {DebounceFun} from '../Utils/debounce';

type ApiRes = {
    limit: number;
    products: Array;
    skip: number;
    total: number
}
//https://dummyjson.com/products/search?q=phone 


const AutoComplete = () => {
    const [searchRes, setSearchRes] = useState(null);
    const [selectedRow, setSelectedRow] = useState<number>(null);
    const rowsRef = useRef<React.node[]>([]);

    const onKeyPressDown = useCallback((e) => {
        if (e.key === 'ArrowDown') {
            const next = selectedRow === null ? 0 : selectedRow + 1;
            const clamped = Math.min(next, searchRes.length - 1); // don't go past last item
            // selectedRowRef.current = clamped;
            setSelectedRow(clamped); // still trigger re-render for UI highlight
            rowsRef.current[clamped]?.scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
            const prev = Math.max((selectedRow ?? 0) - 1, 0);
            // selectedRowRef.current = prev;
            setSelectedRow(prev);
            rowsRef.current[prev]?.scrollIntoView({ block: 'nearest' });
        }
    },[selectedRow,searchRes ]);


    useEffect(() => {
        window.addEventListener('keydown', onKeyPressDown )
        return () => window.removeEventListener('keydown', onKeyPressDown)
    }, [onKeyPressDown])

    const onInputChange = async (e) => {
        if(e.target.value){
            const res = await fetch(`https://dummyjson.com/products/search?q=${e?.target?.value}`);
            let resJson = await res.json() as ApiRes;
            console.log(resJson)
            setSearchRes(resJson?.products)
        }else {
            setSearchRes(null)
        }
    }

    const debouncedInput = DebounceFun(onInputChange, 300);

    return (<div>
        auto complete
        <br/>
        <input  placeholder="type here" onChange={debouncedInput} />
        {
            searchRes?.map((val, index) =>  
            <div key={val?.title}
            ref={(el) => { rowsRef.current[index] = el! }}
            style={{height: 40, backgroundColor: selectedRow === index ? 'blue' : 'tomato', margin: 10}}
            >
                <span>{val?.title}</span>
            </div>)
        }
    </div>)
}

export default AutoComplete;