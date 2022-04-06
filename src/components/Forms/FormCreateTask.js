import { Editor } from '@tinymce/tinymce-react'
import React, { useState, useEffect, useRef } from 'react'
import { Select, Slider } from 'antd';
import { useSelector, useDispatch, connect } from 'react-redux'
import { withFormik } from 'formik'
import * as Yup from 'yup';

import { actGetListProjectSaga } from '../../redux/actions/actProject';
import { actCreateNewTaskSaga, actGetTaskPrioritySaga, actGetTaskStatusSaga, actGetTaskTypeSaga } from '../../redux/actions/actTasks';
import { actGetUserApiSaga, actGetUserByProjectIdSaga } from '../../redux/actions/actUser';
import { actSubmitTaskModal } from '../../redux/actions/actModalPopUp';

const children = [];

function FormCreateTask(props) {

  const {
    handleChange,
    handleSubmit,
    setFieldValue
  } = props;

  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const { projectList } = useSelector(state => state.projectManagementReducer)
  const { listTaskTypes, listTaskPriority, listTaskStatus } = useSelector(state => state.createTasksReducer)
  const { listUserProject } = useSelector(state => state.userReducer)
  const userOptions = listUserProject?.map((user, index) => {
    return { value: user.userId, label: user.name }
  })
  useEffect(() => {
    dispatch(actGetListProjectSaga());
    dispatch(actGetTaskTypeSaga());
    dispatch(actGetTaskPrioritySaga());
    dispatch(actGetTaskStatusSaga())
    dispatch(actSubmitTaskModal(handleSubmit))
  }, [dispatch])

  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0
  })
  const handleEditorChange = (content, editor) => {
    // console.log(content);
    setFieldValue('description', content);
  }
  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label style={{ fontSize: "16px" }} htmlFor="project-id">Project</label>
        <select className="form-control" name="projectId" id="project-id" onChange={(e) => {
          setFieldValue('projectId', Number(e.target.value))
          dispatch(actGetUserByProjectIdSaga(e.target.value))
        }}>
          {projectList?.map((project, index) => {
            return (
              <option key={index} value={project.id}>{project.projectName}</option>
            )
          })}
        </select>
      </div>
      <div className="form-group">
        <label style={{ fontSize: "16px" }} htmlFor="task-name">Task Name</label>
        <input className="form-control" type="text" name="taskName" id="task-name" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label style={{ fontSize: "16px" }} htmlFor="statusId">Status</label>
        <select className="form-control" type="text" name="statusId" id="statusId" onChange={handleChange}>
          {listTaskStatus?.map((task, index) => {
            return (
              <option key={index} value={task.statusId}>{task.statusName}</option>
            )
          })}
        </select>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <label style={{ fontSize: "16px" }} htmlFor="priority-id">Priority</label>
            <select className="form-control" name="priorityId" id="priority-id" onChange={handleChange}>
              {listTaskPriority?.map((task, index) => {
                return (
                  <option key={index} value={task.priorityId}>{task.priority}</option>
                )
              })}
            </select>
          </div>
          <div className="col-6">
            <label style={{ fontSize: "16px" }} htmlFor="task-type">Task type</label>
            <select className="form-control" name="typeId" id="task-type" onChange={handleChange}>
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
                options={userOptions}
                onSearch={(value) => {
                  if (searchRef.current) {
                    clearTimeout(searchRef.current);
                  }
                  searchRef.current = setTimeout(() => {
                    dispatch(actGetUserApiSaga(value))
                  }, 300)
                }}
                name="listUserAsign"
                optionFilterProp='label'
                placeholder="Please select"
                onChange={(values) => {
                  setFieldValue('listUserAsign', values)
                }}
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
              <input type="number" min={0} name="originalEstimate" id="originalEstimate" defaultValue={0} className="form-control" onChange={handleChange} />
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <label style={{ fontSize: "16px" }} htmlFor="timeTrackingSpent">Time spent</label>
                  <input
                    onChange={(e) => {
                      setFieldValue('timeTrackingSpent', Number(e.target.value))
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
                      setFieldValue('timeTrackingRemaining', Number(e.target.value))
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
    </form>
  )
}

const CreateTaskFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectList, listTaskTypes, listTaskStatus, listTaskPriority } = props;
    return {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: listTaskStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: projectList[0]?.id,
      typeId: listTaskTypes[0]?.id,
      priorityId: listTaskPriority[0]?.priorityId,
    }
  },
  validationSchema: Yup.object().shape({

  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    // props.dispatch(actCreateProject(values))
    props.dispatch(actCreateNewTaskSaga(values))
  },

  displayName: 'CreateTaskFormik',
})(FormCreateTask);
const mapStateToProps = (state) => {

  return {
    projectList: state.projectManagementReducer.projectList,
    listTaskTypes: state.createTasksReducer.listTaskTypes,
    listTaskPriority: state.createTasksReducer.listTaskPriority,
    listTaskStatus: state.createTasksReducer.listTaskStatus,
  }
}
export default connect(mapStateToProps)(CreateTaskFormik);
