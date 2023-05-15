import React, { Component } from 'react';
import NoteHeader from './NoteHeader';
import { getInitialData, showFormattedDate } from '../utils';
import NoteList from './NoteList';
import NoteInput from './NoteInput';

export class NoteApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onAddNoteHandler({ title, body, createdAt }) {
    const date = showFormattedDate(createdAt);
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            createdAt: date,
            body,
          },
        ],
      };
    });
  }

  render() {
    return (
      <>
        <NoteHeader />
        <div className="note-app__body">
          <NoteInput addNote={this.onAddNoteHandler}/>
          <h2>Catatan Aktif</h2>
          <NoteList notes={this.state.notes} onDelete={this.onDeleteHandler} />
        </div>
      </>
    );
  }
}

export default NoteApp;
