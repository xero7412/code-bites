import React , {useState, useRef} from 'react';

const ClickBlink = () => {
    const [blocks, setBlocks] = useState(Array.from({length: 3}, () => Array(3).fill(false)));
    const queueRef = useRef([]);

    const handleOnclickBox = (i,j) => {

        if (blocks[i][j]) return;

        let queueCopy = [...queueRef.current, {i,j}];
        queueRef.current = [...queueCopy];

        let blocksCopy = blocks.map((block) => [...block]);

        blocksCopy[i][j] = true;
        setBlocks(blocksCopy);

        if(queueCopy.length === 9){
            queueCopy.forEach((val, index) => {
                setTimeout(() => {
                    setBlocks((prev) => {
                        const newGrid = prev.map((row) => [...row]);
                        newGrid[val.i][val.j] = false;
                        if(index === 8){
                            queueRef.current = []
                        }

                        return newGrid;
                    });
                }, 1000 * index);
            });
            
        }
    }

    return (
        <div>
            click blink
            <br/>
            <div style={{display: 'inline-flex', flexWrap: 'wrap', width: 260}}>
                {
                    blocks.map((block, i) => block.map((b, j) =>
                    <div key={`${i}${j}`} style={{height: 70,
                        width: 70, 
                        border: '1px solid black', 
                        backgroundColor: b?  'coral': 'white',
                        margin: 5}}
                        onClick={b ? undefined : () => handleOnclickBox(i,j)}>
                       
                    </div>))
                }
            </div>
        </div>
    )
}

export default ClickBlink;