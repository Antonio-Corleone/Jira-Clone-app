import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ReactHtmlParser from 'html-react-parser';
import { Editor } from '@tinymce/tinymce-react'
import {
  actGetTaskDetailSaga,
  actGetTaskPrioritySaga,
  actGetTaskStatusSaga,
  actGetTaskTypeSaga,
  actUpdateTaskModalSaga
} from '../../../../redux/actions/actTasks';
import { EDIT_TASK_MODAL, REMOVE_USER_ASSIGNEE } from '../../../../redux/constants';
import { actInsertComment } from '../../../../redux/actions/actComment';


export default function Modal(props) {

  const dispatch = useDispatch();
  const { taskDetailModal } = useSelector(state => state.tasksModalReducer)
  const { listTaskStatus, listTaskPriority, listTaskTypes } = useSelector(state => state.createTasksReducer)
  const { projectDetail } = useSelector(state => state.projectReducer);

  const [openEditor, setOpenEditor] = useState(false);
  const [editorContent, setEditorContent] = useState(taskDetailModal.description)
  const [commentContent, setCommentContent] = useState('')
  useEffect(() => {
    dispatch(actGetTaskPrioritySaga());
    dispatch(actGetTaskStatusSaga());
    dispatch(actGetTaskTypeSaga());
  }, [dispatch])
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(actUpdateTaskModalSaga(EDIT_TASK_MODAL, { name, value }))

  }
  const handleEditorChange = (content, editor) => {
    setEditorContent(content)
    // setFieldValue('description', content);
  }
  const handleCommentChange = (content, editor) => {
    setCommentContent(content)
  }
  const renderDescription = () => {
    let description = taskDetailModal.description && ReactHtmlParser(taskDetailModal.description);
    return (
      <>
        {openEditor ?
          <>
            <Editor
              name="description"
              initialValue={taskDetailModal.description}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
              }}
              onEditorChange={handleEditorChange}
            />
            <div className="text-right mt-2">
              <button className="btn btn-primary mx-2" onClick={() => {
                setOpenEditor(false)
                dispatch(actUpdateTaskModalSaga(EDIT_TASK_MODAL, { name: 'description', value: editorContent }))
              }}>Save</button>
              <button className="btn btn-secondary mx-2" onClick={() => {
                setOpenEditor(false)
              }} >Cancel</button>
            </div>
          </>
          :
          <div onClick={() => { setOpenEditor(true) }}>
            {description}
          </div>

        }
      </>
    )
  }
  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;
    let max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    let percent = Math.round(Number(timeTrackingSpent) / max * 100)
    return (
      <div style={{ display: 'flex' }}>
        <i className="fa fa-clock" />
        <div style={{ width: '100%' }}>
          <div className="progress">
            <div className="progress-bar"
              role="progressbar"
              style={{ width: `${percent}%` }}
              aria-valuenow={Number(timeTrackingSpent)}
              aria-valuemin={0}
              aria-valuemax={max}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p className="logged">{Number(timeTrackingSpent)}h logged</p>
            <p className="estimate-time">{Number(timeTrackingRemaining)}h estimated</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark" />
              <span className="mr-2">{taskDetailModal.taskName}</span>
              <select value={taskDetailModal.typeId} name="typeId" onChange={handleChange}>
                {listTaskTypes?.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>{item.taskType}</option>
                  )
                })}
              </select>
            </div>
            <div style={{ display: 'flex' }} className="task-click">
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link" />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">This is an issue of type: Task.</p>
                  <div className="description" style={{ cursor: 'pointer' }}>
                    <p className="font-weight-bold" onClick={() => { setOpenEditor(!openEditor) }}>Description</p>
                    {renderDescription()}
                  </div>
                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="block-comment" style={{ display: 'flex' }}>
                      <div className="avatar">
                        <img src={require('../../../../assets/img/download (1).jfif')} alt="img1" />
                      </div>
                      <div className="input-comment" style={{ paddingRight: '25px' }}>
                        {/* <input type="text" placeholder="Add a comment ..." /> */}
                        <Editor
                          name="comment"
                          value={commentContent}
                          init={{
                            height: 150,
                            menubar: false,
                            plugins: [
                              'advlist autolink lists link image charmap print preview anchor',
                              'searchreplace visualblocks code fullscreen',
                              'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                              'bold italic backcolor | alignleft aligncenter ' +
                              'alignright alignjustify | bullist numlist outdent indent | ' +
                              'removeformat | help',
                          }}
                          onEditorChange={handleCommentChange}
                        />
                        <p className="m-0">
                          <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                          <span>press
                            <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                            to comment</span>
                        </p>
                        <div className="text-right">
                          <button className="btn btn-outline-primary mx-1 btn-sm" onClick={() => {
                            let newComment = commentContent
                            dispatch(actInsertComment({ taskId: taskDetailModal.taskId.toString(), contentComment: newComment }))
                            dispatch(actGetTaskDetailSaga(taskDetailModal.taskId))
                            setCommentContent('')
                          }}>Save</button>
                        </div>
                      </div>
                    </div>
                    <div className="lastest-comment">
                      {taskDetailModal?.lstComment.map((item, index) => {
                        return (
                          <div className="comment-item" key={index}>
                            <div className="display-comment" style={{ display: 'flex' }}>
                              <div className="avatar">
                                <img src={item.avatar} alt={item.name} />
                              </div>
                              <div>
                                <p style={{ marginBottom: 5 }}>
                                  <span className="font-weight-bold">{item.name}</span> <span>a month ago</span>
                                </p>
                                <p style={{ marginBottom: 5 }}>
                                  {item.commentContent}
                                </p>
                                <div>
                                  <span className="text-info mx-1" style={{ cursor: 'pointer' }}>Edit</span>
                                  •
                                  <span className="text-danger mx-1" style={{ cursor: 'pointer' }}>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select className="custom-select" value={taskDetailModal?.statusId} name="statusId" onChange={handleChange}>
                      {listTaskStatus?.map((item, index) => {
                        return (
                          <option key={index} value={item.statusId}>{item.statusName}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="assignees">
                    <h6>ASSIGNEES</h6>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 3px' }}>
                      {taskDetailModal.assigness?.map((member, index) => {
                        return (
                          <div key={index} style={{ display: 'flex', alignItems: 'center', flexBasis: 'auto' }} className="item m-0">
                            <div className="avatar">
                              <img src={member.avatar} alt={member.avatar} />
                            </div>
                            <div className="ml-1">
                              <p className="name">
                                {member.name}
                                <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => {
                                  // dispatch(actRemoveUserAssignee(member.id))
                                  dispatch(actUpdateTaskModalSaga(REMOVE_USER_ASSIGNEE, member.id))
                                }} />
                              </p>
                            </div>

                          </div>
                        )
                      })}
                    </div>
                    <div className="mt-3" style={{ display: 'flex', alignItems: 'center' }}>
                      <div>
                        <select value="" className="form-control ml-2" id="add-member" onChange={(e) => {
                          let { value } = e.target;
                          let index = projectDetail.members?.findIndex(item => item.userId === value);
                          let userAssign = { ...projectDetail.members[index], id: Number(value) };
                          let newAssign = [...taskDetailModal.assigness, userAssign];
                          dispatch(actUpdateTaskModalSaga(EDIT_TASK_MODAL, { name: 'assigness', value: newAssign }))
                        }}>
                          <option value="" disabled hidden>+ Add more</option>
                          {projectDetail.members?.filter((member) => {
                            let index = taskDetailModal.assigness?.findIndex(user => user.id === member.userId);
                            if (index !== -1) {
                              return false;
                            }
                            return true;
                          }).map((member, index) => {
                            return (
                              <option key={index} value={member.userId}>{member.name}</option>
                            )
                          })}
                        </select>
                      </div>


                    </div>
                  </div>
                  <div className="priority mt-3" style={{ marginBottom: 20 }}>
                    <h6>PRIORITY</h6>
                    <select className="form-control" value={taskDetailModal?.priorityId} name="priorityId" onChange={handleChange}>
                      {listTaskPriority?.map((item, index) => {
                        return (
                          <option key={index} value={item.priorityId}>{item.priority}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input type="number" min={0} className="estimate-hours" value={taskDetailModal?.originalEstimate} name="originalEstimate" onChange={handleChange} />
                  </div>
                  <div className="time-tracking">
                    <h6>TIME TRACKING</h6>
                    {renderTimeTracking()}
                    <div className="row">
                      <div className="col-6">
                        <input className="form-control" type="number" name="timeTrackingSpent" onChange={handleChange} />
                      </div>
                      <div className="col-6">
                        <input className="form-control" type="number" name="timeTrackingRemaining" onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                  <div style={{ color: '#929398' }}>Create at a month ago</div>
                  <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
