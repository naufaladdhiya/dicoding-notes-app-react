import React, { Component } from 'react';

class NoteInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      limit: 50,
    };

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onTitleChangeHandler = (event) => {
    this.setState(() => {
      return {
        title: event.target.value,
      };
    });
  };

  onBodyChangeHandler = (event) => {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.addNote(this.state);
  };

  render() {
    return (
      <div className="note-input">
        <h2>Buat Catatan</h2>
        <form onSubmit={this.onSubmitHandler}>
          <p className="note-input__title__char-limit">
            Sisa karakter: {this.state.limit - this.state.title.length}
          </p>
          <input
            type="text"
            placeholder="ini adalah judul ..."
            className="note-input__title"
            onChange={this.onTitleChangeHandler}
            value={this.state.title}
          />
          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu disini ..."
            onChange={this.onBodyChangeHandler}
            value={this.state.body}
          ></textarea>
          <button type="submit">Buat</button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
