import React, {useState, useRef} from 'react';

const VirtualisedList = () => {
    const [feed, setFeed] = useState(Array.from({length: 1000}, (a,i) => i+1));
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const ITEM_HEIGHT = 50 + 10;
    const CONTAINER_HEIGHT = 500;
    const SCROLLER_HEIGHT = ITEM_HEIGHT * feed.length;
    const ITEM_IN_VIEW =  CONTAINER_HEIGHT / ITEM_HEIGHT;

    const onScrollHandler = (e) => {
        const {scrollTop} = e.target;
        let newStartIndex = Math.floor(scrollTop/ ITEM_HEIGHT) ;
        setCurrentIndex(newStartIndex);
    }

    return (
        <div>
            Virtualised list
            <div style={{height: CONTAINER_HEIGHT, backgroundColor: 'grey', overflow: 'auto'}} onScroll={onScrollHandler}>
                <div style={{height: SCROLLER_HEIGHT, position: 'relative'}}>
                {feed.slice(currentIndex, currentIndex + ITEM_IN_VIEW).map((a, index) => 
                    <div key={index} style={{backgroundColor: 'coral', 
                    borderTop: "5px solid grey",
                    width: '100%',
                    height: 60, 
                    marginTop: ITEM_HEIGHT  * (currentIndex + index),
                    position: 'absolute',
                        padding: 5}}>
                        {a}
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}

export default VirtualisedList