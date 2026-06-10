import React, { useState } from "react";

function Note({ note, deleteNote, toggleImportance, updateNote,markComplete }) {
  const [edit, setEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleSave = () => {
    updateNote(note.id, { title: editedTitle, content: editedContent });
    setEdit(false);
  };

  return (
    <div
      className={`card mb-3 ${note.important ? "bg-warning" : "bg-light"}`}
      style={{ border: "1px solid #ccc" }}
    >
      <div className="card-body">
        {edit ? (
          <>
            <input
              type="text"
              className="form-control mb-2"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              className="form-control mb-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <button className="btn btn-success me-2" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={() => setEdit(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.content}</p>
            <div className="d-flex justify-content-between">
              <button
                onClick={() => toggleImportance(note)}
                className={`btn ${note.important ? "btn-warning" : "btn-outline-primary"}`}
              >
                {note.important ? "Make Not Important" : "Make Important"}
              </button>
              <button onClick={()=> markComplete(note)}
                className={`btn ${note.complete? "btn-secondary": "btn-outline-secondary"}`}
                >
                {note.complete? "Mark Not Complete" : "Mark Complete"}
              </button>
              <button
                onClick={() => setEdit(true)}
                className="btn btn-outline-secondary"
              >
                Edit
              </button>
              <button
                onClick={() => deleteNote(note.id)}
                className="btn btn-outline-danger"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Note;