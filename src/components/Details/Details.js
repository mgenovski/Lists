import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import * as listService from '../../services/listService.js';
import { useAuthContext } from '../../contexts/AuthContext';
import { useAlert } from 'react-alert';
import Item from './Item.js';
import './Details.css';

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

    const listInfo = {
        title: list.title,
        description: list.description,
        category: list.category,
        shared: list.shared,
        items: list.items,
        _userId: list._userId,
        _ownerName: list._ownerName,
        _ownerId: list._ownerId,
        _id: list._id
    };

    const deleteListHandler = () => {
        alert.show("This action can not be reversed!", {
            title: "Are you sure you want to delete this?",
            closeCopy: "Cancel",
            actions: [
                {
                    copy: "Delete",
                    onClick: () => {
                        listService.del(list._id, user.accessToken)
                            .then(result => {
                                navigate('/my-lists');
                            })
                    }
                }
            ]
        });
    }

    const onItemAdd = e => {
        e.preventDefault();
        const form = e.currentTarget;
        let formData = new FormData(form);
        const item = formData.get('item');
        if (item.length < 2) {
            alert.show('List item should be at least two symbols long.');
            return;
        }

        listInfo.items = [...list.items, { text: item, isDone: false }];
        listService.update(listInfo, user.accessToken)
            .then(result => {
                setList(listInfo);
                form.reset();
            })
    };

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
                        listInfo.items = newItems;

                        listService.update(listInfo, user.accessToken)
                            .then(result => setList(listInfo))
                            .catch(err => alert.show(err));
                    }
                }
            ]
        });
    };

    const onItemCheck = (index) => {
        if (user._id !== list._ownerId) {
            return;
        }
        const newItems = [...list.items];
        newItems[index].isDone = newItems[index].isDone === true ? false : true;
        listInfo.items = newItems;

        listService.update(listInfo, user.accessToken)
            .then(result => {
                setList(listInfo);
            })
    };

    const addToMyListsHandler = () => {
        alert.show(`${list.title} will be added to your list!`, {
            title: "Are you sure you want to add this to your lists?",
            closeCopy: "Cancel",
            actions: [
                {
                    copy: "Add",
                    onClick: () => {
                        const uncheckedItems = list.items.map(x => x = { text: x.text, isDone: false });
                        listInfo.items = uncheckedItems;
                        listInfo.shared = '0';
                        listInfo._userId = list._ownerId;

                        listService.create(listInfo, user.accessToken)
                            .then(result => {
                                navigate('/my-lists');
                            })
                    }
                }
            ]
        });
    }

    const likeHandler = e => {
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
            <div className='form-wrapper'>
                <input type="text" id="item" name="item" placeholder="Item..." />
                <button className='small'>Add item</button>
            </div>
        </form>
    )

    return (
        <>
            <div className='details'>
                <div className='list'>
                    <h2>{list.title}</h2>
                    {list.items ? list.items.map((item, index) => (<Item key={index} userId={list._ownerId} item={item} index={index} onItemRemove={onItemRemove} onItemCheck={onItemCheck} />)) : null}
                    {user._id === list._ownerId ? addForm : ''}
                </div>
                <div className='info'>
                    <h2>Information</h2>
                    <p><b>Description:</b> {list.description}</p>
                    <p><b>Category:</b> {list.category}</p>
                    {list._ownerName ? (<p><b>Created by:</b> {list._ownerName}</p>) : ''}
                    {list.shared === '1' ? (<p>Likes: {likes?.length}</p>) : ''}
                    <div>
                        {user._id === list._ownerId
                            ? (
                                <>
                                    <button className='delete-list' onClick={deleteListHandler}>Delete list</button>
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