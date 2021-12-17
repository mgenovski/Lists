
import { useAuthContext } from '../../contexts/AuthContext';

const Item = ({ item, index, userId, onItemRemove, onItemCheck }) => {
    const { user } = useAuthContext();
    return (
        <div className='item-wrapper'>
            <span className={user._id === userId ? (item.isDone ? 'is-done item cursor-pointer' : 'item cursor-pointer') : 'item'} onClick={() => onItemCheck(index)}>
                <span>{item.text}</span>
            </span>
            {user._id === userId ? <button className="del" onClick={() => onItemRemove(index)}>✕</button> : ''}
        </div>
    )
}

export default Item;