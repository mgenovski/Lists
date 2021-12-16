
import { useAuthContext } from '../../contexts/AuthContext';

const Item = ({ item, index, userId, onItemRemove, onItemCheck }) => {
    const { user } = useAuthContext();
    return (
        <div>
            <span className={user._id === userId && item.isDone ? 'is-done' : ''} onClick={() => onItemCheck(index)}>
                <span className={user._id === userId ? 'pointer-cursor' : ''}>{item.text}</span>
            </span>
            {user._id === userId ? <button className="del" onClick={() => onItemRemove(index)}>✕</button> : ''}
        </div>
    )
}

export default Item;