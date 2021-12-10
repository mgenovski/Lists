import { useState, useEffect } from 'react';

import * as listService from '../services/listService.js';

const useListState = (listId) => {
    const [list, setList] = useState({});

    useEffect(() => {
        listService.getOne(listId)
            .then(listResult => {
                setList(listResult);
            })
    }, [listId]);

    return [
        list,
        setList
    ]
};

export default useListState;