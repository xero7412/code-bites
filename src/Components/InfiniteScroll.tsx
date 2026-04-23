import { useEffect, useState, useRef } from "react";

function Post({ data, setPageNo }) {

    const reff = useRef()
    useEffect(() => {
    //   const lastImage = document.querySelector(".image-post:last-child");
    const lastImage = reff.current;
      const observer = new IntersectionObserver(
        (param) => {
          if (param[0].isIntersecting) {
            observer.unobserve(lastImage);
            setPageNo((pageNo) => pageNo + 1);
          }
        },
        { threshold: 0.5 }
      );
  
      if (!lastImage) {
        return;
      }
      observer.observe(lastImage);
  
      return () => {
        if (lastImage) {
          observer.unobserve(lastImage);
        }
        observer.disconnect();
      };
    }, [data]);
    return (
      <div style={{ overFlow: "auto", display: 'flex', flexDirection:'column'}}>
        {data.map((item, index) => {
          return (
            <img className="image-post" style={{height:200, width:160, objectFit:'fill', margin: 5}} key={item.id} src={item.download_url} />
          );
        })}
        <div style={{height: 20, backgroundColor:'red'}} ref={reff}></div>
      </div>
    );
  }

export default function InfiniteScroll() {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${pageNo}&limit=3`)
      .then((res) => {
        return res.json();
      })
      .then((arr) => setData((oldData) => [...oldData, ...arr]));
  }, [pageNo]);

  return <Post data={data} setPageNo={setPageNo} />;
}
