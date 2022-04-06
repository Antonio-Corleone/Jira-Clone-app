import React from 'react'
import { useDispatch } from 'react-redux'
import { actGetTaskDetailSaga } from '../../../../redux/actions/actTasks';
export default function MainContent(props) {
  const dispatch = useDispatch();
  const { projectDetail } = props;
  const renderListTask = () => {
    return projectDetail.lstTask?.map((taskList, index) => {
      return (
        <div key={index} className="card pb-2" style={{ width: '17rem', height: 'auto' }}>
          <div className="card-header">
            {taskList.statusName}
          </div>
          <ul className="list-group list-group-flush">
            {taskList.lstTaskDeTail?.map((task, index) => {
              return (
                <li
                  key={index}
                  className="list-group-item"
                  data-toggle="modal"
                  data-target="#infoModal"
                  style={{ cursor: 'pointer',backgroundColor:'rgba(125,185,130,0.5)' }}
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
                      {/* <i className="fa fa-bookmark" />
                      <i className="fa fa-arrow-up" /> */}
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
            })}

          </ul>
        </div>
      )
    })
  }
  return (
    <div className="content" style={{ display: 'flex' }}>
      {renderListTask()}
      {/* <div className="card" style={{ width: '17rem', height: '25rem' }}>
        <div className="card-header">
          SELECTED FOR DEVELOPMENT 2
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
        </ul>
      </div>
      <div className="card" style={{ width: '17rem', height: '25rem' }}>
        <div className="card-header">
          IN PROGRESS 2
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
        </ul>
      </div>
      <div className="card" style={{ width: '17rem', height: '25rem' }}>
        <div className="card-header">
          DONE 3
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
      </div> */}
    </div>
  )
}
