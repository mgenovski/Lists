import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import * as listService from '../../services/listService';
import { useAuthContext } from '../../contexts/AuthContext';
import Login from '../Login/Login.js';

import './Create.css';

const Item = ({ item, index, removeItem }) => {
    return (
        <div>
            <span>{item.text}</span>
            <button className="del" onClick={() => removeItem(index)}>✕</button>
        </div>
    );
}

const Create = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [value, setValue] = useState("");
    const alert = useAlert();

    const addItem = text => {
        const newItem = [...items, { text, isDone: false }];
        setItems(newItem);
    };

    const removeItem = index => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const onItemAdd = e => {
        e.preventDefault();
        if (value.length < 2) {
            alert.show('A list item should be at least two symbols long.');
            return;
        }
        addItem(value);
        setValue("");
    };
    const onListCreate = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let title = formData.get('title');
        let description = formData.get('description');
        let category = formData.get('category');
        let shared = formData.get('shared');

        //TODO Validation and notification
        if (title === '' || description === '') {
            alert.show('All fields are required.');
            return;
        }

        if(items.length < 2) {
            alert.show('Add at least 2 items in the list.');
            return;
        }

        listService.create({
            title,
            description,
            category,
            shared,
            items,
            _userId: user._id,
            _ownerName: user.name
        }, user.accessToken)
            .then(result => {
                navigate('/my-lists');
            })

    }


    return (
        <div className="create">
            {user.accessToken
                ?
                <>

                    <div className='create-form'>
                        <h1>Create List</h1>
                        <form onSubmit={onListCreate} method="POST">
                            <div>
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" name="title" placeholder="Ex. Birthday Shopping List..." />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <input type="text" id="description" name="description" placeholder="Short description..." />
                            </div>
                            <div>
                                <label htmlFor="category">Category</label>
                                <select name="category" id="category">
                                    <option value="Shopping List">Shopping List</option>
                                    <option value="Packing List">Packing List</option>
                                    <option value="Todo List">Todo List</option>
                                    <option value="Other">Other Checklist</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="shared">Sharing</label>
                                <select name="shared" id="shared">
                                    <option value="0">Private List</option>
                                    <option value="1">Public List</option>
                                </select>
                            </div>
                            <button className='normal'>Create</button>
                        </form>
                    </div>
                    <div className='create-list'>
                        <h2>Add items to the list</h2>
                        {items.map((item, index) => (<Item key={index} index={index} item={item} removeItem={removeItem} />))}
                        <form onSubmit={onItemAdd}>
                            <div><input type="text" id="item" name="item" placeholder="Item..." value={value} onChange={e => setValue(e.target.value)} /></div>
                            <div><button className='small'>Add</button></div>
                        </form>
                    </div>
                </>
                : <Login />
            }
        </div>
    );
}

export default Create;