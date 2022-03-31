import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux'
import { Form, Col, Row, Input } from 'antd';
import { withFormik } from 'formik'
import * as Yup from 'yup';

import { Editor } from '@tinymce/tinymce-react';

import { actSubmitEditModal } from '../../redux/actions/actModalPopUp'
import { actGetProjectCategorySaga } from '../../redux/actions/actGetProjectCategory';
import { actEditProjectSaga } from '../../redux/actions/actEditProject';

function FormEditProject(props) {

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  const { callBackSubmit } = useSelector(state => state.modalPopUpRenderer);
  const arrProjectCategory = useSelector(state => state.createProjectReducer.arrProjectCategory);
  const dispatch = useDispatch();
  const handleEditorChange = (content, editor) => {
    // console.log(content);
    setFieldValue('description', content);
  }
  const submitForm = (e) => {
    e.preventDefault();
    alert('FormEditProject submit')
  }
  useEffect(() => {
    // Get project categoryId
    dispatch(actGetProjectCategorySaga())
    // Load Modal Pop Up Form
    dispatch(actSubmitEditModal(handleSubmit))
  }, [dispatch])
  return (
    <div className="form-group">
      <div className="row">
        <div className="col-4">
          <label style={{ fontWeight: 'bold' }} htmlFor="project-id">Project id</label>
          <input
            type="text"
            name="id"
            id="project-id"
            className="form-control"
            disabled={true}
            value={values.id}
          />
        </div>
        <div className="col-4">

          <label style={{ fontWeight: 'bold' }} htmlFor="project-name">Project name</label>
          <input
            type="text"
            name="projectName"
            id="project-name"
            className="form-control"
            value={values.projectName}
            onChange={handleChange}
          />
        </div>
        <div className="col-4">
          <label style={{ fontWeight: 'bold' }} htmlFor="project-category">Project Category</label>
          <select className="form-control" name="categoryId" id="project-category" onChange={handleChange} value={values.categoryId}>
            {arrProjectCategory?.map((pro, index) => {
              return (
                <option key={index} value={pro.id}>{pro.projectCategoryName}</option>
              )
            })}
          </select>
        </div>
      </div>
      <div className="row mt-3">
        <div className="form-group col-12">
          <label style={{ fontWeight: 'bold' }} htmlFor="description">Description</label>
          <Editor
            name="description"
            value={values.description}
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
      </div>
    </div>

  )
}

const EditProjectFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    // console.log(projectEdit);
    return {
      id: projectEdit?.id,
      projectName: projectEdit?.projectName,
      description: projectEdit?.description,
      categoryId: projectEdit?.categoryId,
    }
  },
  validationSchema: Yup.object().shape({

  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log('values', values);
    props.dispatch(actEditProjectSaga(values))
  },

  displayName: 'EditProjectFormik',
})(FormEditProject);

const mapStateToProps = (state) => ({ projectEdit: state.projectReducer.projectEdit })
export default connect(mapStateToProps)(EditProjectFormik);
