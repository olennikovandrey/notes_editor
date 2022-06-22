/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import "./form.sass";
import React, { useState, useRef } from "react";

type FormTypes = {
  addNote: (event: React.FormEvent<HTMLFormElement>, noteData: { title: string, content: string, tags: string[] }) => void,
  addSearchValue: (value: string) => void
}

const Form: React.FC<FormTypes> = (props) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [tagSearchValue, setTagSearchValue] = useState("");
  const tags = noteContent.match(/\B(#[a-zA-ZА-Яа-я0-9Ёёй]+)(\s|$)/ig);
  const trimmedTags = tags?.map(item => item.trim());
  const noteData = {
    title: noteTitle,
    content: noteContent,
    tags: trimmedTags
  };

  const input1 = useRef<HTMLInputElement>(null);
  const input2 = useRef<HTMLTextAreaElement>(null);
  const input3 = useRef<HTMLInputElement>(null);

  const setTitle = (event: React.FormEvent<HTMLInputElement>): void => {
    setNoteTitle((event.target as HTMLInputElement).value);
  };

  const setContent = (event: React.FormEvent<HTMLTextAreaElement>): void => {
    setNoteContent((event.target as HTMLTextAreaElement).value);
  };

  const saveNote = (event: React.FormEvent<HTMLFormElement>, data: any): void => {
    props.addNote(event, data);
    input1.current!.value = "";
    input2.current!.value = "";
  };

  const findTag = (): void => {
    props.addSearchValue(tagSearchValue.trim());
    input3.current!.value = "";
  };

  const findTagByEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      props.addSearchValue(tagSearchValue.trim());
      input3.current!.value = "";
    }
    return;
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={ (event) => saveNote(event, noteData) }>
        <input
          placeholder="Название"
          ref={ input1 }
          onChange={ (event) => setTitle(event) }
        />
        <textarea
          placeholder="Текст Вашей заметки"
          ref={ input2 }
          onChange={ (event) => setContent(event) }
        />
        <button
          type="submit"
        >Сохранить
        </button>
      </form>
      <div>
        <input
          placeholder="Найти заметку по тегу"
          ref={ input3 }
          onChange={ (event) => setTagSearchValue(event.target.value) }
          onKeyDown={ (event) => findTagByEnter(event) }
        />
        <button
          type="submit"
          onClick={ () => findTag() }
        >Найти</button>
      </div>
    </div>
  );
};

export default Form;
