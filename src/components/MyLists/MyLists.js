import { useEffect, useState } from "react";
import { useAuthContext } from '../../contexts/AuthContext';
import * as listService from '../../services/listService.js';
import ListCard from "../Common/ListCard.js";
import './MyLists.css';



const MyLists = () => {
    const [lists, setLists] = useState([]);
    const { user } = useAuthContext();
        
    useEffect(() => {
        listService.getMine(user._id)
            .then(result => {
                setLists(result);
            })
            .catch(err => {
                console.log(err);
            })
            // eslint-disable-next-line
    }, []);

    return (
        <>  <h1 className="catalog-title">My lists</h1>
            {lists.length > 0
                ? ( 
                    <div className="my-lists">
                        {lists.map(x => <ListCard key={x._id} list={x} />)}
                    </div>
                )
                : <div className="no-items"><p>No lists in database!</p></div>
            }
        </>
    );
}

export default MyLists;