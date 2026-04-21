import React, {useRef, useState} from 'react';

const KanbanBoard = () => {
    const sourceRef = useRef();
    const boxRef = useRef();

    const [col1, setCol1] = useState([{title: 'ok1'}]);
    const [col2, setCol2] = useState([])

    const onDropHandler = () => {
        const updatedCol2 = [...col2];
        let val = col1.find((c1) => c1.title === sourceRef.current );
        let col1Updated = col1.filter((c1) => c1.title !== sourceRef.current );
        updatedCol2.push(val)
        setCol1(col1Updated);
        setCol2(updatedCol2);
    }

    const onDropHandler2 = () => {
        const updatedCol2 = [...col1];
        let val = col2.find((c1) => c1.title === sourceRef.current );
        let col1Updated = col2.filter((c1) => c1.title !== sourceRef.current );
        updatedCol2.push(val)
        setCol2(col1Updated);
        setCol1(updatedCol2);
    }

    return (
        <div>
            kanban board
            <div style={{height: 200, width: 250, backgroundColor: 'grey'}}  
                onDragEnter={e => console.log('onDragEnter')}
                onDragLeave={e => console.log('onDragLeave')}
                onDragOver={e => { e.preventDefault(); console.log('onDragOver'); }}
                onDrop={e => onDropHandler2() }>
                {
                    col1.map((one) => 
                    <div
                    ref={sourceRef}
                    draggable={true}
                    key={'1'}
                    onDragStart={e => {console.log('onDragStart', e.target); sourceRef.current = one.title}}
                    onDragEnd={e => console.log('onDragEnd',  e.target)}
                    style={{height: 50, width: 150, backgroundColor: 'cadetblue'}}
                    
                >
                   {one.title}
                </div>)
                }
                
            </div>
            <div style={{margin: 30}}/>

            <div
                onDragEnter={e => console.log('onDragEnter')}
                onDragLeave={e => console.log('onDragLeave')}
                onDragOver={e => { e.preventDefault(); console.log('onDragOver'); }}
                onDrop={e => onDropHandler() }
                style={{height: 150, width: 250, backgroundColor: 'tomato'}}
            >
               {
                    col2.map((one) => 
                    <div
                    ref={sourceRef}
                    draggable={true}
                    key={'1'}
                    onDragStart={e => {console.log('onDragStart', e.target); sourceRef.current = one.title}}
                    onDragEnd={e => console.log('onDragEnd',  e.target)}
                    style={{height: 50, width: 150, backgroundColor: 'cadetblue'}}
                    
                >
                   {one.title}
                </div>)
                }
            </div>
        </div>
    )
}

export default KanbanBoard;