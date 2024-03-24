import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar';
import axios from 'axios';
import Accordion from './Accordion';
import './../styles/ListRenderer.scss';

const ListRenderer = () => {

    const [data,setData] = useState();
    const [editState,setEditState] = useState(false);

    const fetchData = async() => {
        const {data:response} = await axios.get("./data/celebrities.json");
        setData(response);
    }

    useEffect(()=>{
        fetchData(); // fetch the data
    },[]);

    const handleSearchBar = (searchQuery) => {

        const name = searchQuery.toLowerCase();
        const complex_name = searchQuery.toLowerCase().charAt(0);
        const catchUser = data.filter(user=>user.first.toLowerCase().includes(name) 
            ||  user.last.toLowerCase().includes(name) 
            || (user.first.toLowerCase() + " " + user.last.toLowerCase()).includes(name) 
            || user.first.toLowerCase().char)

        const catchComplexUser = data.filter(user=> user.first.toLowerCase().charAt(0).includes(complex_name)
        || user.last.toLowerCase().charAt(0).includes(name))
        
        if(catchUser){
            setData(catchUser);
        }else if(catchComplexUser){
            setData(catchComplexUser);
        }
    }

    const handleDelete =(userId)=>{
        const updateUsers = data.filter(user=>user.id!==userId);
        setData(updateUsers);
    }

    const handleOpenState =(state)=>{
        setEditState(state); // props drilled
    }

  return (
    <div className="list-container">
        <SearchBar onSearch={handleSearchBar}/>
        <section className='list-items'>
            {
                data && data.map((values,index)=>(
                    <Accordion data={values} key={values.id} keyId={index} onDelete={handleDelete} onOpen={handleOpenState} onEditState={editState}/>
                ))
            }
        </section>
    </div>
  )
}

export default ListRenderer;
