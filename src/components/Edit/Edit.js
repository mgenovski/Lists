import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

import * as listService from '../../services/listService.js';
import { useAuthContext } from '../../contexts/AuthContext';

import './Edit.css';



const Edit = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { listId } = useParams();
    const [list, setList] = useState('');
    const [categorySelect, setCategorySelect] = useState('');
    const [sharedSelect, setSharedSelect] = useState('');
    const alert = useAlert();

    useEffect(() => {
        listService.getOne(listId)
            .then(result => {
                setList(result);
                setCategorySelect(result.category);
                setSharedSelect(result.shared);
            })
            .catch(err => {
                console.log(err);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onListEdit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        let formData = new FormData(form);

        let title = formData.get('title');
        let description = formData.get('description');
        let category = formData.get('category');
        let shared = formData.get('shared');
        if (!shared) {
            shared = '0';
        }


        if (title === '' || description === '') {
            alert.show('All fields are required!');
            return;
        }

        const listInfo = {
            title,
            description,
            category,
            shared,
            items: list.items,
            _userId: list._userId,
            _ownerName: list._ownerName,
            _ownerId: list._ownerId,
            _id: list._id,
            likes: list.likes
        }

        listService.update(listInfo, user.accessToken)
            .then(result => {
                navigate(`/details/${list._id}`);
            })

    };

    const changeCategorySelect = (e) => {
        const newValue = e.currentTarget.value;
        setCategorySelect(newValue);
    }
    const changeSharedSelect = (e) => {
        const newValue = e.currentTarget.value;
        setSharedSelect(newValue);
    }


    return (
        <div className="edit">
            <h1>Edit list information</h1>
            <form onSubmit={onListEdit} method="POST">
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" defaultValue={list.title} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" defaultValue={list.description} />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category" value={categorySelect} onChange={changeCategorySelect}>
                        <option value="Shopping List">Shopping List</option>
                        <option value="Packing List">Packing List</option>
                        <option value="Todo List">Todo List</option>
                        <option value="Other Checklist">Other Checklist</option>
                    </select>
                </div>
                {list._userId === list._ownerId ?
                    (<div>
                        <label htmlFor="shared">Sharing</label>
                        <select name="shared" id="shared" value={sharedSelect} onChange={changeSharedSelect}>
                            <option value="0">Private List</option>
                            <option value="1">Public List</option>
                        </select>
                    </div>) : ''}
                <button className='normal'>Edit list</button>
            </form>
        </div>
    );
}

export default Edit;