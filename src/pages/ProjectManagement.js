import React, { useState, useEffect } from 'react'
import { Table, Button, Space, Tag } from 'antd';
import parse from 'html-react-parser';
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import {actGetListProjectSaga} from '../redux/actions/actGetListProject'


export default function ProjectManagement(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actGetListProjectSaga())
  }, [])
  const projectList = useSelector(state => state.projectManagementReducer.projectList)
    .map(project => {
      return {...project, key: project.id}
    })

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  })
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };
  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: 'projectName',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    // {
    //   title: 'Description',
    //   dataIndex: 'description',
    //   key: 'description',
    //   render: (text, record, index) => {
    //     let reactNode = parse(text)
    //     let htmlContent = reactNode.props?.children
    //     return (
    //       <>
    //         {htmlContent ? htmlContent : ''}
    //       </>
    //     )
    //   }
    // },
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      key: 'creator',
      render: (text, record, index) => {
        console.log(text);
        return (
          <><Tag color="green">{text.name}</Tag></>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <div className="text-center text-light" style={{ display: 'inline-block', backgroundColor: '#40a9ff', width: '30px', height: '35px', borderRadius: '3px' }}>
            <a><EditOutlined style={{ marginTop: '10px' }} /></a>
          </div>
          <div className="text-center text-light" style={{ display: 'inline-block', backgroundColor: '#f5222d', width: '30px', height: '35px', borderRadius: '3px' }}>
            <a><DeleteOutlined style={{ marginTop: '10px' }} /></a>
          </div>

        </Space>
      ),
    },
  ];
  return (
    <div className="container-fluid p-5">
      <h3>Project Management</h3>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={projectList} onChange={handleChange} />
    </div>
  )
}
