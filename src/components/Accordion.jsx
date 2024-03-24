import React, { useState } from 'react';
import './../styles/Accordion.scss';
import getAge from '../utils/getAge';
import ConfirmDialogbox from './ConfirmDialogbox';
import { useForm } from 'react-hook-form';

const Accordion = ({ data, keyId, onDelete , onOpen, onEditState}) => {

  const [open, setOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(data);

  // user form
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { id, first, last, dob, gender, email, picture, country, description } = editedData;
  const username = first + " " + last;

  const [userAge,setUserAge] = useState(getAge(dob));

  const handleOpen =(e)=>{ // props drilled
    if(userAge < 18){
      e.preventDefault();
      alert('Edit mode not avaiable for childrens');
      return;
    } 
    
    if(userAge > 18){
      onOpen(true);
      setIsEditing(prev => !prev);
    }
  }

  const handleInputChange = (e) => {
    console.log(e);
  };

  const handleCancel = () => {
    setIsOpenDialog(false);
  };

  const handleDelete = () => {
    onDelete(id);
    setIsOpenDialog(false);
  };

  const handleClose= () => { // props drilled
    onOpen(false);
    setIsEditing(false)
    reset();
  }

  const onSubmit = (formData,e) => {
    setEditedData({
      country:formData.country,
      description:formData.description,
      gender:formData.gender,
      id, first, last, email, picture, dob
    })
    setUserAge(formData.dob);
  };

  return (
    <section className='main-container-accordin' key={keyId}>
      <div className='container-closed'>
        <div>
          <img src={picture} alt="user image" className='user-image'/>
          <h1 className='username'>{username}</h1>
        </div>
        <button className={`move ${isEditing? 'blurred':''}`} onClick={() => setOpen(prev => !prev)} disabled={onEditState} >
          {!open ? <img src={'./images/down.png'} alt="close" className="icon" /> : <img src={'./images/upload.png'} alt="open" className="icon" />}
        </button>
      </div>
    
      {open && (
        <div className="box-opened">
          {isOpenDialog && (
            <ConfirmDialogbox message={'Are you sure you want to delete ?'} onCancel={handleCancel} onDelete={handleDelete} />
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <menu className="box1">
              <div className="small-box">
                <li className="header">Age</li>
                {isEditing ? (
                  <div>
                    <input className='input-value' type="text" name='dob' defaultValue={userAge} onChange={handleInputChange} {...register('dob', { required: true, pattern: /^[0-9]*$/ })}/>
                    {errors.dob && <span className="error-message">Age is required and must be a number</span>}
                  </div>
                  
                ) : (
                  <li className="value">{userAge + " " + "Years"}</li>
                )}
                
              </div>

              <div className='small-box'>
                <li className="header">Gender</li>
                {isEditing ? (
                  <div>
                  <select name="gender" className='input-value' id="gender" defaultValue={gender} {...register('gender', { required: true })}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="ratherNotToSay">Rather not to say</option>
                    <option value="custom">Custom</option>
                  </select>
                  {errors.gender && <span className="error-message">Gender is required</span>}
                  </div>
                ) : (
                  <li className="value">{gender}</li>
                )}
                
              </div>

              <div className="small-box">
                <li className="header">Country</li>
                {isEditing ? (
                  <div>
                    <input className='input-value' type="text" name='country' defaultValue={country} onChange={handleInputChange} {...register('country', { required: true })} />
                    {errors.country && <span className="error-message">Country is required</span>}
                  </div>
                ) : (
                  <li className="value">{country}</li>
                )}
                
              </div>
            </menu>

            <section className="box2">
              <h1 className="header">Description</h1>
              {isEditing ? (
                <div>
                  <textarea className="textarea-value" maxLength='50' defaultValue={description} onChange={handleInputChange}  {...register('description', { required: true })}/>
                  {errors.description && <span className="error-message">Description is required</span>}
                </div>
              ) : (
                <article className='paragraph'>{description}</article>
              )}
              
            </section>

            <section className="box3">
              {isEditing ? (
                <div className="edit-btn">
                  <div className='btns' onClick={() => handleClose()}>
                    <img src={'./images/close.png'} alt='close' className='icon' />
                  </div>
                  <button className='btns' type='submit'>
                    <img src={'./images/check.png'} alt='check' className='icon' />
                  </button>
                </div>
              ) : (
                <div className="normal-state-btn">
                  <button onClick={()=>setIsOpenDialog((prev)=>!prev)} disabled={isOpenDialog}>
                    <img src={'./images/bin.png'} alt='bin' className='icon' />
                  </button>
                  <button onClick={handleOpen}>
                    <img src={'./images/edit.png'} alt='edit' className='icon' />
                  </button>
                </div>
              )}
            </section>
          </form>
        </div>
      )}
    </section>
  );
};

export default Accordion;
