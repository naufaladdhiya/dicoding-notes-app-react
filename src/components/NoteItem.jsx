import React from 'react'
import NoteItemBody from './NoteItemBody'
import NoteButton from './NoteButton'
// import { showFormattedDate } from '../utils'

function NoteItem({title, body, createdAt, onDelete, onArchived, id}) {
  return (
    <div className='note-item'>
      <NoteItemBody title={title} body={body} createdAt={createdAt}/>
      <NoteButton id={id} onDelete={onDelete} onArchived={onArchived}/>
    </div>
  )
}

export default NoteItem
