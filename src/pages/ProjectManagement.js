import React, { useState, useEffect } from 'react'
import { Table, Button, Space, Tag } from 'antd';
import parse from 'html-react-parser';
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { actGetListProjectSaga } from '../redux/actions/actGetListProject'


export default function ProjectManagement(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actGetListProjectSaga())
  }, [])
  const projectList = useSelector(state => state.projectManagementReducer.projectList)
    .map(project => {
      return { ...project, key: project.id }
    })

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  })
  const handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
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
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter: ((item2, item1) => {
        return item2?.id - item1?.id;
      }),
      sortDirections: ['descend'],
    },
    {
      title: 'projectName',
      dataIndex: 'projectName',
      key: 'projectName',
      sorter: ((item2, item1) => {
        let projectName1 = item1?.projectName.trim().toLowerCase();
        let projectName2 = item2?.projectName.trim().toLowerCase();
        if (projectName2 < projectName1){
          return -1
        }
        return 1
      })
    },
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
      sorter: ((item2, item1) => {
        let categoryName1 = item1?.categoryName.trim().toLowerCase();
        let categoryName2 = item2?.categoryName.trim().toLowerCase();
        if (categoryName2 < categoryName1){
          return -1
        }
        return 1
      })
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      key: 'creator',
      render: (text, record, index) => {
        return (
          <><Tag color="green">{text.name}</Tag></>
        )
      },
      sorter: ((item2, item1) => {
        let creator1 = item1?.creator.name.trim().toLowerCase();
        let creator2 = item2?.creator.name.trim().toLowerCase();
        if (creator2 < creator1){
          return -1
        }
        return 1
      })
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
