import { useEffect, useState } from "react";
import * as listService from '../../services/listService.js';
import ListCard from "../Common/ListCard.js";
import './AllLists.css';



const AllLists = () => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        listService.getAll()
            .then(result => {
                setLists(result);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <>
            <h1 className="catalog-title">All public lists</h1>
            {lists.length > 0
                ? ( 
                    <div className="all-lists">
                        {lists.map(x => <ListCard key={x._id} list={x} />)}
                    </div>
                )
                : <div className="no-items"><p>No lists in database!</p></div>
            }
        </>
    );
}

export default AllLists;