import {useState, useMemo} from 'react';

const Headers = [
    {
        id: 1,
        key: "TITLE1",
        label: "Title 1"
    },
    {
        id: 2,
        key: "TITLE2",
        label: "Title 2"
    },
    {
        id: 3,
        key: "TITLE3",
        label: "Title 3"
    }
];

const Data = [
    {
        id: 1,
        TITLE1: 'dlabel 1.1',
        TITLE2: 'frlabel 1.2',
        TITLE3: 'gtlabel 1.3',
    },
    {
        id: 2,
        TITLE1: 'aslabel 2.1',
        TITLE2: 'grlabel 2.2',
        TITLE3: 'asrlabel 2.3',
    },
    {
        id: 3,
        TITLE1: 'tglabel 3.1',
        TITLE2: 'gtlabel 3.2',
        TITLE3: 'bblabel 3.3',
    },
    {
        id: 4,
        TITLE1: 'frlabel 4.1',
        TITLE2: 'yglabel 4.2',
        TITLE3: 'xslabel 4.3',
    }
]


const TableSorting = () => {
    const [filterApplied, setFilterApplied] = useState(null)

    const onClickSort = (key) => {
        let filter = {
            filterKey: key,
            sortType: filterApplied?.filterKey === key ?  filterApplied.sortType === 'asc' ? 'dsc': 'asc': 'asc'
        }

        setFilterApplied(filter)
    }

    const sortedData = useMemo(() => {
        if(!filterApplied) {
            return Data;
        }
        let result = [...Data];

        if(filterApplied.sortType === 'dsc'){
            result =  result.sort((a,b) => a[filterApplied.filterKey] > b[filterApplied.filterKey] ? -1 : 1)
        }else {
            result =  result.sort((a,b) => a[filterApplied.filterKey] > b[filterApplied.filterKey] ? 1 : -1)

        }
        return result;
    },[filterApplied])


    return (
        <div>
            Table sorting
            <br/>
            <table>
                <thead>
                <tr>
                    {
                    Headers.map((head) => 
                        <th key={head.id} 
                        onClick={() => onClickSort(head.key)}>{head.label}</th>
                            )}
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedData.map((dt) => (
                            <tr key={dt.id}>
                                {
                                    Headers.map((head) =>  
                                    <td key={`${dt.id}-${head.id}`} style={{width: 100, borderTop: '1px solid grey', padding: 5}}>
                                        {dt[head.key]}
                                        </td> )
                                }
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableSorting