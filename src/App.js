import React, { useState } from "react";
import List from "./data";
import { ListContainer, ListItem } from "./styles";
import { DragHandle } from "./partials/DragHandle";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './App.css';

const App = () => {
  const [list, setList] = useState(List.getList());
  const [editingIndex, setEditingIndex] = useState(-1);
  const [newName, setNewName] = useState('');

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewName(list[index].name);
  };

  const handleSave = () => {
    const updatedList = list.map((item, index) => {
      if (index === editingIndex) {
        return {
          ...item,
          name: newName
        };
      }
      return item;
    });
    setList(updatedList);
    setEditingIndex(-1);
    setNewName('');
  };

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination?.index;
          if (desI) {
            const updatedList = [...list];
            updatedList.splice(desI, 0, updatedList.splice(srcI, 1)[0]);
            setList(updatedList);
          }
        }}
      >
        <ListContainer className="outer-div">
          <h1 className="h1">Select your sections</h1>
          <Droppable droppableId="droppable-1">
            {(provided, _) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {list.map((item, i) => (
                  <Draggable
                    key={item.id}
                    draggableId={"draggable-" + item.id}
                    index={i}
                  >
                    {(provided, snapshot) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          boxShadow: snapshot.isDragging
                            ? "0 0 .4rem #666"
                            : "none",
                        }}
                        className={`drag ${item.enabled ? "enabled" : "disabled"}`}
                      >
                        <div className="div1">
                          <DragHandle {...provided.dragHandleProps} />
                          <span className="info-btn">ⓘ</span>
                          <span className="hide"><br/>{item.description}</span>
                          <span className="txt">
                            {editingIndex === i ? (
                              <input
                                type="text"
                                value={newName}
                                onChange={handleChange}
                                className="input-box"
                              />
                            ) : (
                              item.name
                            )}
                          </span> 
                          {editingIndex === i ? (
                            <button className="btn" >🖋️</button>
                          ) : (
                            <button className="btn" onClick={() => handleEdit(i)}>🖋️</button>
                          )}
                          <label className="switch">
                            <input type="checkbox"  defaultChecked={item.enabled}/>
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <button className="save-btn" onClick={handleSave}>Save and next</button>
        </ListContainer>
      </DragDropContext>
    </div>
  );
};

export default App;
