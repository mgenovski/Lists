import { useNavigate } from 'react-router-dom';
import * as listService from '../../services/listService';
import { useAuthContext } from '../../contexts/AuthContext';
import Login from '../Login/Login.js';

import './Create.css';

const Create = () => {
    const { user } = useAuthContext();

    const navigate = useNavigate();

    const onListCreate = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let title = formData.get('title');
        let description = formData.get('description');
        let category = formData.get('category');
        let type = formData.get('type');
        let shared = formData.get('shared');

        listService.create({
            title,
            description,
            category,
            type,
            shared
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
                                <input type="text" id="title" name="title" placeholder="Ex. Birthday Shopping List..."></input>
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <input type="text" id="description" name="description" placeholder="Short description..."></input>
                            </div>
                            <div>
                                <label htmlFor="category">Category</label>

                                <select name="category" id="category">
                                    <option value="volvo">Shopping List</option>
                                    <option value="saab">Packing List</option>
                                    <option value="mercedes">Todo List</option>
                                    <option value="audi">Other Checklist</option>
                                </select>
                            </div>
                            <button className='normal'>Create</button>
                        </form>
                    </div>
                    <div className='create-list'>
                        <h2>Add items to the list</h2>
                        </div>
                </>
                : <Login />
            }
        </div>
    );
}

export default Create;