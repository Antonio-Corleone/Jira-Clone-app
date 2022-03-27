import React, { useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik'
import * as Yup from 'yup';
import { connect, useSelector, useDispatch } from 'react-redux'

import { actGetProjectCategorySaga } from '../redux/actions/actGetProjectCategory'
import { actCreateProject } from '../redux/actions/actCreateProject'
function CreateProject(props) {
  const arrProjectCategory = useSelector(state => state.createProjectReducer.arrProjectCategory);
  const dispatch = useDispatch();
  const {
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  const handleEditorChange = (content, editor) => {
    setFieldValue('description', content)
  }
  useEffect(() => {
    dispatch(actGetProjectCategorySaga())
    return ()=>{
      
    }
  }, [])
  return (
    <div className="container m-5">
      <h3>Create Project</h3>
      <form className="container" onSubmit={handleSubmit} onChange={handleChange}>

        <div className="form-group">
          <label htmlFor="projectName">Project name</label>
          <input type="text" className="form-control" id="projectName" name="projectName" />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <Editor
            name="description"
            init={{
              height: 500,
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

        <div className="form-group">
          <select className="form-control mt-3" name="categoryId" onChange={handleChange}>
            {arrProjectCategory?.map((pro, index) => {
              return (
                <option key={index} value={pro.id}>{pro.projectCategoryName}</option>
              )
            })}
          </select>
        </div>
        <div className="text-right">
          <button type="submit" className="btn btn-primary">Create project</button>
        </div>
      </form>
    </div>
  )
}
const CreateProjectFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      projectName: '',
      description: '',
      categoryId: props.arrProjectCategory[0]?.id,
    }
  },
  validationSchema: Yup.object().shape({

  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log('props', props);
    props.dispatch(actCreateProject(values))
  },

  displayName: 'CreateProjectFormik',
})(CreateProject);

const mapStateToProps = (state) => ({ arrProjectCategory: state.createProjectReducer.arrProjectCategory })
export default connect(mapStateToProps)(CreateProjectFormik);
