import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { actGetProjectDetailSaga } from '../redux/actions/actProject';
import Main from '../templates/HomeTemplate/_components/Main'



export default function ProjectDetail(props) {

  const dispatch = useDispatch();
  const { projectDetail } = useSelector(state => state.projectReducer);
  // console.log(projectDetail);

  useEffect(() => {
    const { projectId } = props.match.params;
    dispatch(actGetProjectDetailSaga(projectId));
  }, [dispatch])

  return (
    <Main data={projectDetail} />
  )
}
