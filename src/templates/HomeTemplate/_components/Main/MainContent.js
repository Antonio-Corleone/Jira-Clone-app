import React from 'react';
import { useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { actGetTaskDetailSaga, actUpdateTaskStatusSaga } from '../../../../redux/actions/actTasks';

export default function MainContent(props) {
  const dispatch = useDispatch();
  const { projectDetail } = props;

  const handleDragEnd = result => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }
    dispatch(actUpdateTaskStatusSaga({ 'taskId': draggableId, 'statusId': destination.droppableId },projectDetail.id))
    // dispatch(actGetTaskStatusSaga())
  }
  const renderListTask = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {projectDetail.lstTask?.map((taskList, index) => {
          return (
            <Droppable droppableId={taskList.statusId} key={index}>
              {provided => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    key={index}
                    className="card pb-2"
                    style={{ width: '20rem', height: 'auto' }}
                  >
                    <div className="card-header">
                      {taskList.statusName}
                    </div>
                    <ul
                      className="list-group list-group-flush"
                    >
                      {taskList.lstTaskDeTail?.map((task, index) => {
                        return (
                          <Draggable
                            key={index}
                            index={index}
                            draggableId={task.taskId.toString()}
                          >
                            {provided => {
                              return (
                                <li
                                  key={index}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="list-group-item"
                                  data-toggle="modal"
                                  data-target="#infoModal"
                                  // style={{ cursor: 'pointer', backgroundColor: 'rgba(125,185,130,0.5)' }}
                                  onClick={() => {
                                    dispatch(actGetTaskDetailSaga(task.taskId))
                                  }}
                                >
                                  <p className="font-weight-bold">
                                    {task.taskName}
                                  </p>
                                  <div className="block" style={{ display: 'flex' }}>
                                    <div className="block-left">
                                      <p className="font-weight-bold text-danger">{task.priorityTask.priority}</p>
                                    </div>
                                    <div className="block-right">
                                      <div className="avatar-group" style={{ display: 'flex' }}>
                                        {task.assigness?.map((member, index) => {
                                          return (
                                            <div className="avatar" key={index}>
                                              <img src={member.avatar} alt={member.avatar} />
                                            </div>
                                          )
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              )
                            }}
                          </Draggable>
                        )
                      })}

                    </ul>
                    {provided.placeholder}
                  </div>
                )
              }}
            </Droppable>
          )
        })}
      </DragDropContext>
    )
  }
  return (
    <div className="content" style={{ display: 'flex' }}>
      {renderListTask()}
    </div>
  )
}
