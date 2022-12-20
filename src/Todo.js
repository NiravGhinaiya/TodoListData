import React, { useState } from 'react'
// import './sass/main.css'
import './Todostyle.css'
import { useEffect, useRef } from 'react'


const getLocalStorageItem = () => {
    const data = JSON.parse(localStorage.getItem('Items'))
    if (data) {
        return JSON.parse(localStorage.getItem('Items'));
    } else {
        return [];
    }
}

const Todo = () => {

    const [input, setInput] = useState('');
    const [items, setItems] = useState(getLocalStorageItem());
    const [toggleSubmit, setToggleSubmit] = useState(true)
    const [editItem, setEditItem] = useState(null);

    const inputRef = useRef();


    //localStorage set Data 
    useEffect(() => {
        localStorage.setItem('Items', JSON.stringify(items))
    }, [items])


    //Add Data
    const addData = () => {

        if (!input) {
            alert('Please Fill Data')
        } else if (input && !toggleSubmit) {
            setItems(
                items.map((val) => {
                    if (val.id === editItem) {
                        return { ...val, name: input }
                    }
                    return val;
                })
            )
            setEditItem(null);
            setToggleSubmit(true);
            setInput('');
        } else {
            const id = new Date().getTime().toString();
            setItems([...items, { id, name: input }])
            console.log(input, 'input')
            setInput('')
        }
    }


    //Edit Item
    const clickEditItem = (id) => {
        let newEditItem = items.find((ele) => {
            return ele.id === id;
        })
        // console.log(newEditItem, 'newEditItem')
        setInput(newEditItem.name)
        setToggleSubmit(false)
        setEditItem(id)
        inputRef.current.focus();
    }



    //Delete Item
    const clickDelete = (id) => {
        setItems((arr) => {
            return arr.filter((val) => {
                return val.id !== id;
            })
        })
    }

    return (
        <>

            <ul className="circles">
                <li></li> <li></li> <li></li> <li></li><li></li> <li></li> <li></li> <li></li>
                <li></li> <li></li> <li></li> <li></li><li></li> <li></li> <li></li> <li></li>
            </ul>
            <div className="gradient-border" >
                <h1>Todo List</h1>
                <div className='secOne'>
                    <input type='text' placeholder='Enter Your item...' ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} />
                    <button onClick={addData} className='glow-on-hover' >
                        {toggleSubmit ? 'Add' : 'Update'}
                    </button>
                </div>
                <div className='showData'>
                    <ul>
                        {
                            items.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <p>{item.name}</p>
                                        <button onClick={() => clickEditItem(item.id)}>Edit</button>
                                        <button onClick={() => clickDelete(item.id)}>Delete</button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className='secTwo'>
                    <button onClick={() => setItems([])}>Remove All</button>
                </div>
            </div>
        </>
    )
}

export default Todo
