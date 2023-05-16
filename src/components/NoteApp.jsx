import React, { Component } from 'react';
import NoteHeader from './NoteHeader';
import { getInitialData } from '../utils';
import NoteList from './NoteList';
import NoteInput from './NoteInput';

export class NoteApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      search: '',
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            createdAt: +new Date(),
            body,
            archived: false,
          },
        ],
      };
    });
  }

  onSearchHandler = (event) => {
    this.setState(() => {
      return {
        search: event.target.value,
      };
    });
  };

  onArchiveHandler = (id) => {
    const notes = this.state.notes.map((note) =>
      note.id === id ? { ...note, archived: !note.archived } : note
    );
    this.setState({ notes });
  };

  render() {
    const notes = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(this.state.search.toLowerCase())
    );

    const activeNotes = notes.filter((note) => !note.archived);

    const archivedNotes = notes.filter((note) => note.archived === true);
    return (
      <>
        <NoteHeader
          search={this.state.search}
          onSearchChange={this.onSearchHandler}
        />
        <div className="note-app__body">
          <NoteInput addNote={this.onAddNoteHandler} />
          <h2>Catatan Aktif</h2>
          {activeNotes.length > 0 ? (
            <NoteList
              keyword={this.state.keyword}
              notes={activeNotes}
              onDelete={this.onDeleteHandler}
              onArchived={this.onArchiveHandler}
            />
          ) : (
            <p className="notes-list__empty-message">Tidak ada catatan</p>
          )}
          <h2>Arsip</h2>
          {archivedNotes.length > 0 ? (
            <NoteList
              keyword={this.state.keyword}
              notes={archivedNotes}
              onDelete={this.onDeleteHandler}
              onArchived={this.onArchiveHandler}
             />
          ) : (
            <p className="notes-list__empty-message">Tidak ada catatan</p>
          )}
        </div>
      </>
    );
  }
}

export default NoteApp;
