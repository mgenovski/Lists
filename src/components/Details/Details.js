import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import * as listService from '../../services/listService.js';
import { useAuthContext } from '../../contexts/AuthContext';

import './Details.css';
const Item = ({ item, index, userId, onItemRemove }) => {
    const { user } = useAuthContext();
    return (
        <div>
            <span>{item.text}</span>
            {user._id === userId ? <button className="del" onClick={() => onItemRemove(index)}>✕</button> : ''}
        </div>
    )
}


const Details = () => {
    // const navigate = useNavigate();
    const { user } = useAuthContext();
    const { listId } = useParams();
    const [list, setList] = useState('');

    useEffect(() => {
        listService.getOne(listId)
            .then(result => {
                setList(result);
            })
            .catch(err => {
                console.log(err);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onItemAdd = e => {
        e.preventDefault();
        const form = e.currentTarget;
        let formData = new FormData(form);
        const item = formData.get('item');
        if (item === '') return;
        const newItems = [...list.items, { text: item, isDone: false }];

        const listInfo = {
            title: list.title,
            description: list.description,
            category: list.category,
            type: list.type,
            shared: list.shared,
            items: newItems,
            _userId: list._userId,
            _ownerName: list._ownerName,
            _ownerId: list._ownerId,
            _id: list._id
        }

        listService.update(listInfo, user.accessToken)
            .then(result => {
                setList(listInfo);
                form.reset();
                // navigate(`/details/${list._id}`);
            })
    };

    const onItemRemove = (index) => {
        const newItems = [...list.items];
        newItems.splice(index, 1);
        const listInfo = {
            title: list.title,
            description: list.description,
            category: list.category,
            type: list.type,
            shared: list.shared,
            items: newItems,
            _userId: list._userId,
            _ownerName: list._ownerName,
            _ownerId: list._ownerId,
            _id: list._id
        }

        listService.update(listInfo, user.accessToken)
            .then(result => {
                setList(listInfo);
                // navigate(`/details/${list._id}`);
            })
    };

    const addForm = (
        <form onSubmit={onItemAdd}>
            <div><input type="text" id="item" name="item" placeholder="Item..." /></div>
            <div><button className='small'>Add item</button></div>
        </form>
    )

    return (
        <>
            <div className='details'>
                <div className='list'>
                    <h2>{list.title}</h2>
                    {list.items ? list.items.map((item, index) => (<Item key={index} userId={list._userId} item={item} index={index} onItemRemove={onItemRemove} />)) : null}
                    {user._id === list._userId ? addForm : ''}
                </div>
                <div className='info'>
                    <h2>Information</h2>
                    <p>Description: {list.description}</p>
                    <p>Category: {list.category}</p>
                    <p>Created by: {list._ownerName}</p>
                </div>
            </div>
        </>
    );
}

export default Details;