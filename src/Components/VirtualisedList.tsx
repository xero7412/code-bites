import React, {useState, useRef} from 'react';

const VirtualisedList = () => {
    const [feed, setFeed] = useState([]);
    const pageNum = useRef();

    const getFeed = async () => {
        let res = await fetch('');
        let resData = await res.json();

        setFeed((prev) => [...prev, resData.posts]);
    }

    const RenderItem = (data) => {
        return <div style={{height: 50, margin: 10, backgroundColor: 'tomato'}}>
            {data.title}
        </div>

    }

    return (
        <div>
            Virtualised list
            <Flatlist 
            data={feed} 
            keyExtractor={(data) => data.id}
            renderItem={({data} )=> <RenderItem data={data}/>} />
        </div>
    )
}

export default VirtualisedList