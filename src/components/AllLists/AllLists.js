import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import * as listService from '../../services/listService.js';
import './AllLists.css';

const ListCard = ({ list }) => {
    return (
        <article className="card">
            <h2>{list.title}</h2>
            <p>{list.description}</p>
            <span className="created-by">Created by {list._ownerName}</span>
            <div>
                <Link className="details-button" to={`/details/${list._id}`}>Details</Link>
            </div>
        </article>
    );
}

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
            {lists.length > 0
                ? ( 
                    <div className="all-lists">
                        {lists.map(x => <ListCard key={x._id} list={x} />)}
                    </div>
                )
                : <p>No lists in database!</p>
            }
        </>
    );
}

export default AllLists;