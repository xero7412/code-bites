import {useState} from 'react';

const fileData = [
    {
      "id": "1",
      "name": "Documents",
      "type": "folder",
      "children": [
        {
          "id": "2",
          "name": "Resume.pdf",
          "type": "file",
          "size": "1.2MB",
          "lastModified": "2024-03-15"
        },
        {
          "id": "3",
          "name": "Photos",
          "type": "folder",
          "children": [
            {
              "id": "4",
              "name": "Vacation.jpg",
              "type": "file",
              "size": "4.5MB"
            }
          ]
        }
      ]
    },
    {
      "id": "5",
      "name": "config.json",
      "type": "file",
      "size": "2KB"
    }
]

const Explorer = ({data, parentKey}) => {
    const [folderState, setFolderState] = useState(true);

    const onClickHandler = (e) => {
        e.stopPropagation();
        setFolderState((prev) => !prev)
    }

    if(data.type === 'file'){
        return <div style={{marginLeft: 20}}>{data.name}</div>
    }else {
       return (
        <div style={{marginLeft: 20}} onClick={onClickHandler}>
            <div>{data.name}</div>
            { 
               folderState && data.children.map((dt) => <Explorer key={`${dt.id}${parentKey}`} parentKey={`${dt.id}${parentKey}`} data={dt}/> )
            }
        </div>
       )
    }
}
  
const FileExplorer = () => {
    return (<div>
        File Explorer
        {
            fileData.map((dt) => <Explorer key={dt.id} parentKey={dt.id} data={dt} />)

        }
    </div>)   
}

export default FileExplorer;