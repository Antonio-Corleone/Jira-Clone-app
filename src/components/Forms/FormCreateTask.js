import { Editor } from '@tinymce/tinymce-react'
import React, { useState, useEffect } from 'react'
import { Select, Slider } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { actGetListProjectSaga } from '../../redux/actions/actProject';
import { actGetTaskPrioritySaga, actGetTaskTypeSaga } from '../../redux/actions/actTasks';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`Selected: ${value}`);
}

export default function FormCreateTask(props) {
  const dispatch = useDispatch();
  const { projectList } = useSelector(state => state.projectManagementReducer)
  const { listTaskTypes, listTaskPriority } = useSelector(state => state.createTasksReducer)

  useEffect(() => {
    dispatch(actGetListProjectSaga());
    dispatch(actGetTaskTypeSaga());
    dispatch(actGetTaskPrioritySaga());
  }, [dispatch])

  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0
  })
  const handleEditorChange = (content, editor) => {
    // console.log(content);
    // setFieldValue('description', content);
  }
  return (
    <div className="container">
      <div className="form-group">
        <label style={{ fontSize: "16px" }} htmlFor="project-id">Project</label>
        <select className="form-control" name="projectId" id="project-id">
          {projectList?.map((project, index) => {
            return (
              <option key={index} value={project.id}>{project.projectName}</option>
            )
          })}
        </select>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <label style={{ fontSize: "16px" }} htmlFor="priority-id">Priority</label>
            <select className="form-control" name="priorityId" id="priority-id">
              {listTaskPriority?.map((task,index)=>{
                return (
                  <option key={index} value={task.priorityId}>{task.priority}</option>
                )
              })}
            </select>
          </div>
          <div className="col-6">
            <label style={{ fontSize: "16px" }} htmlFor="task-type">Task type</label>
            <select className="form-control" name="typeId" id="task-type">
              {listTaskTypes?.map((taskType, index) => {
                return (
                  <option key={index} value={taskType.id}>{taskType.taskType}</option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="row mt-3">
            <div className="col-6">
              <label style={{ fontSize: "16px" }} htmlFor="assignees">Assignees</label>
              <Select
                mode="multiple"
                id="assignees"
                name="listUserAsign"
                placeholder="Please select"
                defaultValue={['a10', 'c12']}
                onChange={handleChange}
                style={{ width: '100%' }}
              >
                {children}
              </Select>
            </div>
            <div className="col-6">
              <label style={{ fontSize: "16px" }} htmlFor="assignees">Time tracking</label>
              <Slider defaultValue={30} value={timeTracking.timeTrackingSpent} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
              <div className="row">
                <small className="col-6 text-left font-weight-bold">{timeTracking.timeTrackingSpent}h logged</small>
                <small className="col-6 text-right font-weight-bold">{timeTracking.timeTrackingRemaining}h remaining</small>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-6">
              <label style={{ fontSize: "16px" }} htmlFor="originalEstimate">Original Estimate</label>
              <input type="number" min={0} name="originalEstimate" id="originalEstimate" defaultValue={0} className="form-control" />
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <label style={{ fontSize: "16px" }} htmlFor="timeTrackingSpent">Time spent</label>
                  <input
                    onChange={(e) => {
                      setTimeTracking({
                        ...timeTracking,
                        timeTrackingSpent: e.target.value
                      })
                    }}
                    type="number" min={0}
                    name="timeTrackingSpent"
                    id="timeTrackingSpent"
                    defaultValue={0}
                    className="form-control"
                  />
                </div>
                <div className="col-6">
                  <label style={{ fontSize: "16px" }} htmlFor="timeTrackingRemaining">Time remaining</label>
                  <input
                    onChange={(e) => {
                      setTimeTracking({
                        ...timeTracking,
                        timeTrackingRemaining: e.target.value
                      })
                    }}
                    type="number"
                    min={0}
                    name="timeTrackingRemaining"
                    id="timeTrackingRemaining"
                    defaultValue={0}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="row mt-3">
          <div className="form-group col-12">
            <label style={{ fontSize: "16px" }} htmlFor="description">Description</label>
            <Editor
              name="description"

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
          </div>
        </div>
      </div>
    </div>
  )
}
