import React, {useState, useEffect, useRef, useCallback} from 'react';

const InfiniteScrollFeed = () => {
    const [feed, setFeed] = useState([]);
    const [page, setPage] = useState<number>(0);
    const intersectRef = useRef(null);

    const pageRef = useRef(0);


    const fetchFeed = async () => {
        let limit=  pageRef.current + 10;
        let skip = pageRef.current; 
        const res = await fetch(`https://dummyjson.com/posts?limit=${10}&skip=${skip}`);
        let finalRes = await res.json();
        setFeed(prev => [...prev, ...finalRes.posts]);
        pageRef.current = limit;
    }
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) =>  {
                if (entry.isIntersecting){fetchFeed()}
            },
            )
            if(intersectRef.current){
                observer.observe(intersectRef.current)
            }
            return () => observer.disconnect()
    },[])


    return (
        <div>
            scroll feed
            <scrollview>
                {
                    feed?.map((feedItem, index) => <div key={feedItem.title + index} style={{margin: 10, padding:10, backgroundColor: 'cadetblue', color:'white'}}>{feedItem.title}</div> )
                }
                <div ref={intersectRef} style={{height: 20, backgroundColor: 'red'}}></div>
            </scrollview>
        </div>
    )
}

export default InfiniteScrollFeed