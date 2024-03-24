import React from 'react'
import './../styles/ConfirmDialogBox.scss';

const ConfirmDialogbox = ({message,onDelete,onCancel}) => {

    const handleClick =()=>{
        onCancel(false);
    }

    const handleDelete =()=>{
        onDelete()
    }

  return (
    <div className='message-box'>
        <div>
            <section className='message-container'>
                <h1 className='message'>{message}</h1>
                <button onClick={handleClick}>
                    <img src={'/images/cross.png'} alt='cross' className='icon-cross' />
                </button>
            </section>

            <section className='btn-container'>
                <button className="btn-cancel" onClick={handleClick}>
                    cancel
                </button>

                <button className="btn-delete" onClick={handleDelete}>
                    delete
                </button>
            </section>
        </div>
    </div>
  )
}

export default ConfirmDialogbox
