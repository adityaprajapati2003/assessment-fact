import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import * as Yup from 'yup';
import './../styles/SearchBar.scss';

const SearchBar = ({onSearch}) => {

    const formik = useFormik({
        initialValues:{
            searchQuery:''
        },
        validationSchema:Yup.object({
            searchQuery:Yup.string().min(3,'Atleast 3 characters required for search')
            .max(20,'No more than 20 characters allowed')
            .required('Search query is required')
        }),
        onSubmit:(values)=>{
            onSearch(values.searchQuery); // props drilled
        }
    })

    const [errorMessage,setErrorMessage] = useState(null);

    useEffect(()=>{
        
        if(formik.touched.searchQuery && formik.errors.searchQuery ){
            setErrorMessage(formik.errors.searchQuery);
        }
        setTimeout(() => {
            setErrorMessage(null)
        }, 3000);
    },[formik.touched.searchQuery, formik.errors.searchQuery])

  return (
    <form onSubmit={formik.handleSubmit} className="search-form">
        <div className="search-div">
            <input
                className='user-input'
                type='text'
                name='searchQuery'
                onChange={formik.handleChange}
                value={formik.values.searchQuery}
                onBlur={formik.handleBlur}
                placeholder='Search User'
            />
            <div className="search-btn">
                <button className="btn" type='submit'>
                    <img className="icon" src={'./images/search.png'}/>
                </button>
            </div>
        </div>
            {
                errorMessage && 
                    <div className="error-div">
                        <p className="error-message">{errorMessage}</p>
                    </div>
            }
    </form>
  )
}

export default SearchBar;
