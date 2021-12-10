import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import * as listService from '../../services/listService.js';
import { useAuthContext } from '../../contexts/AuthContext';

import './Edit.css';



const Edit = () => {
    const navigate = useNavigate();
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

    const onListEdit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        let formData = new FormData(form);

        let title = formData.get('title');
        let description = formData.get('description');
        let category = formData.get('category');
        let type = formData.get('type');
        let shared = formData.get('shared');

        //TODO Validation and notification
        if (title === '' || description === '') {
            console.log('All fields are required.')
        } else {

            const listInfo = {
                title,
                description,
                category,
                type,
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
        }
    };


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
                    <select name="category" id="category" defaultValue={list.category}>
                        <option value="Shopping List">Shopping List</option>
                        <option value="Packing List">Packing List</option>
                        <option value="Todo List">Todo List</option>
                        <option value="Other">Other Checklist</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="type">Type</label>
                    <select name="type" id="type" defaultValue={list.type}>
                        <option value="ul">Unordered List</option>
                        <option value="ol">Ordered List</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="shared">Sharing</label>
                    <select name="shared" id="shared" defaultValue={list.shared}>
                        <option value="0">Private List</option>
                        <option value="1">Public List</option>
                    </select>
                </div>
                <button className='normal'>Edit list</button>
            </form>
        </div>
    );
}

export default Edit;