import Note from "./components/Note/Note";
import Form from "./components/Form/Form";
import React, { Component } from "react";

type AppState = {
  notesData: [[
    title: string,
    content: string,
    tags: RegExpMatchArray
  ]] | any[]
  searchingTagValue: string
}

type AppProps = any

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      notesData: [],
      searchingTagValue: ""
    };
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.addSearchValue = this.addSearchValue.bind(this);
    this.tagClickFinder = this.tagClickFinder.bind(this);
    this.tagRemover = this.tagRemover.bind(this);
    this.noteEditor = this.noteEditor.bind(this);
  }

  addNote = (event: React.FormEvent<HTMLFormElement>, data: { title: string, content: string, tags: string[] }): void => {
    if (this.state.notesData.find(item => item.title === data.title)) {
      event.preventDefault();
      return;
    } else {
      event.preventDefault();
      this.setState(prevState => {
        localStorage.setItem("Notes", JSON.stringify([...prevState.notesData, data]));
        return {
          notesData: [...prevState.notesData, data]
        };
      });
    }
  };

  removeNote = (title: string): void => {
    localStorage.setItem("Notes", JSON.stringify(this.state.notesData.filter(item => item.title !== title)));
    this.setState({
      notesData: this.state.notesData.filter(item => item.title !== title)
    });
  };

  addSearchValue = (value: string): void => {
    this.setState({
      searchingTagValue: value
    });
  };

  tagClickFinder = (event: React.MouseEvent<HTMLSpanElement>): void => {
    this.setState({
      searchingTagValue: event.currentTarget.innerText
    });
  };

  tagRemover = (index: number, title: string, content: string): void =>  {
    const data = this.state.notesData;
    const currentNote = this.state.notesData.find(item => item.title === title);
    const currentNoteIndex = this.state.notesData.indexOf(currentNote);
    const currentTags = currentNote.tags;
    const removedTag = currentTags.splice(index, 1);
    const newTags = currentTags.filter((item: string)  => item !== removedTag);
    const newNote = {
      title: title,
      content: content,
      tags: newTags
    };
    data.splice(currentNoteIndex, 1, newNote);
    this.setState({
      notesData: data
    });
  };

  noteEditor = (title: string, content: string): void => {
    const data = this.state.notesData;
    const currentNote = this.state.notesData.find(item => item.title === title);
    const currentNoteIndex = this.state.notesData.indexOf(currentNote);
    const tags = content.match(/\B(#[a-zA-ZА-Яа-я0-9Ёёй]+)(\s|$)/ig);
    const trimmedTags = tags?.map(item => item.trim());
    const newNote = {
      title: title,
      content: content,
      tags: trimmedTags
    };
    data.splice(currentNoteIndex, 1, newNote);
    localStorage.setItem("Notes", JSON.stringify(data));
    this.setState({
      notesData: data
    });
  };

  componentDidMount() {
    localStorage.getItem("Notes") ?
      this.setState({
        notesData: JSON.parse(localStorage.getItem("Notes") || "{}")
      }) :
      this.setState({
        notesData: []
      });
  }

  render() {
    const { notesData, searchingTagValue } = this.state;

    return (
      <>
        <h1>Запиши свои мысли и реализуй их!</h1>
        <Form
          addNote={ this.addNote }
          addSearchValue={ this.addSearchValue }
        />
        { searchingTagValue &&
          <button
            type="button"
            className="show-all-tbn"
            onClick={ () => this.setState({ searchingTagValue: "" }) }
          >Показать все заметки</button>
        }
        <div className="notes-wrapper">
          { !searchingTagValue ?
            notesData.length !== 0 && notesData.map((item, index) =>
              <Note
                key={ item.title }
                title={ item.title }
                content={ item.content }
                removeNote={ this.removeNote }
                tags={ item.tags ? item.tags : null }
                tagClickFinder={ this.tagClickFinder }
                tagRemover={ this.tagRemover }
                index={ index }
                noteEditor={ this.noteEditor }
              />
            ) : notesData.filter(note => note.tags?.includes(searchingTagValue)).length !== 0 ?
              notesData.filter(note => note.tags?.includes(searchingTagValue)).map((item, index) =>
                <Note
                  key={ item.title }
                  title={ item.title }
                  content={ item.content }
                  removeNote={ this.removeNote }
                  tags={ item.tags }
                  tagClickFinder={ this.tagClickFinder }
                  tagRemover={ this.tagRemover }
                  index={ index }
                  noteEditor={ this.noteEditor }
                />
              ) :
              <h1>Результатов не найдено. Введите другой запрос</h1>
          }
        </div>
      </>
    );
  }
}

export default App;
