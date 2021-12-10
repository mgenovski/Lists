import { Link } from 'react-router-dom';

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

export default ListCard;