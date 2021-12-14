import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import * as listService from '../../services/listService.js';
import { useAuthContext } from '../../contexts/AuthContext';
import { useAlert } from 'react-alert';

import './Details.css';
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


const Details = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { listId } = useParams();
    const [list, setList] = useState('');
    const [likes, setLikes] = useState([]);
    const alert = useAlert();

    useEffect(() => {
        listService.getOne(listId)
            .then(result => {
                setList(result);
            })
            .catch(err => {
                console.log(err);
            })

        listService.getLikes(listId)
            .then(result => {
                setLikes(result.map(l => l._ownerId));
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

    const deleteListHandler = () => {
        listService.del(list._id, user.accessToken)
            .then(result => {
                navigate('/my-lists');
            })
    }

    const deleteConfirmAlert = () => {
        alert.show("This action can not be reversed!", {
            title: "Are you sure you want to delete this?",
            closeCopy: "Cancel",
            actions: [
                {
                    copy: "Delete",
                    onClick: deleteListHandler
                }
            ]
        });
    }

    const onItemRemove = (index) => {

        alert.show("This action can not be reversed!", {
            title: "Are you sure you want to delete this?",
            closeCopy: "Cancel",
            actions: [
                {
                    copy: "Delete",
                    onClick: () => {
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
                            .then(result => setList(listInfo))
                            .catch(err => alert.show(err));
                    }
                }
            ]
        });


    };

    const onItemCheck = (index) => {
        if (user._id !== list._userId) {
            return;
        }
        const newItems = [...list.items];
        newItems[index].isDone = newItems[index].isDone === true ? false : true;
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
            })
    };

    const addToMyListsHandler = () => {

        const uncheckedItems = list.items.map(x => x = { text: x.text, isDone: false });

        const listInfo = {
            title: list.title,
            description: list.description,
            category: list.category,
            type: list.type,
            shared: '0',
            items: uncheckedItems,
            _userId: user._id,
            _ownerName: list._ownerName,
            _ownerId: list._ownerId,
            _id: list._id
        }

        listService.create(listInfo, user.accessToken)
            .then(result => {
                navigate('/my-lists');
            })
    }

    const likeHandler = e => {

        if (likes.includes(user._id)) {
            alert.show('You can only like once!');
            return;
        }
        if (list._userId === user._userId) {
            console.log('You can not like your own list!');
            return;
        }
        const newLikes = [...likes, user._id];

        listService.like(list._id, user.accessToken)
            .then(result => {
                setLikes(newLikes);
            })
    };

    const dislikeHandler = e => {
        const newLikes = [...likes];
        newLikes.splice(newLikes.indexOf(user._id), 1);
        listService.dislike(list._id, user.accessToken, user._id)
            .then(result => {
                setLikes(newLikes);
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
                    {list.items ? list.items.map((item, index) => (<Item key={index} userId={list._userId} item={item} index={index} onItemRemove={onItemRemove} onItemCheck={onItemCheck} />)) : null}
                    {user._id === list._userId ? addForm : ''}
                </div>
                <div className='info'>
                    <h2>Information</h2>
                    <p>Description: {list.description}</p>
                    <p>Category: {list.category}</p>
                    {list._ownerName ? (<p>Created by: {list._ownerName}</p>) : ''}
                    <p>Likes: {likes?.length}</p>
                    <div>
                        {user._id === list._userId
                            ? (
                                <>
                                    <button className='delete-list' onClick={deleteConfirmAlert}>Delete list</button>
                                    <Link className="edit-list" to={`/edit/${list._id}`}>Edit information</Link>
                                </>
                            )
                            : ''
                        }
                        {user._id && user._id !== list._ownerId
                            ? (
                                <>
                                    {likes.includes(user._id) 
                                        ? (<button className='delete-list' onClick={dislikeHandler}>Dislike</button>)
                                        : (<button className='delete-list' onClick={likeHandler}>Like</button>)}
                                    <button className='add-list' onClick={addToMyListsHandler}>Add to my lists</button>
                                </>
                            )
                            : ''
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Details;