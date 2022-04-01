import React, { useState, useEffect } from 'react'
import { Table, Button, Space, Tag, Popconfirm, Avatar, Popover, AutoComplete } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  actGetListProjectSaga,
  actEditProject,
  actDeleteProject,
} from '../redux/actions/actProject'
import {
  actGetUserApiSaga,
  actAddUserProjectSaga,
  actDeleteUserProjectSaga
} from '../redux/actions/actUser';
import { actOpenEditModal } from '../redux/actions/actModalPopUp';
import FormEditProject from '../components/Forms/FormEditProject';

export default function ProjectManagement(props) {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actGetListProjectSaga())
  }, [dispatch])
  const projectList = useSelector(state => state.projectManagementReducer.projectList)
    .map(project => {
      return { ...project, key: project.id }
    })
  const userSearch = useSelector(state => state.userReducer.userSearch)
  const [value, setValue] = useState('')
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
  // let { sortedInfo, filteredInfo } = state;
  // sortedInfo = sortedInfo || {};
  // filteredInfo = filteredInfo || {};
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
        if (projectName2 < projectName1) {
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
        if (categoryName2 < categoryName1) {
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
        if (creator2 < creator1) {
          return -1
        }
        return 1
      })
    },
    {
      title: 'Members',
      dataIndex: 'members',
      key: 'members',
      render: (text, record, index) => {
        return (
          <div className="d-flex">
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement='top'
                  title={"Members"}
                  content={() => {
                    return (
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Avatar</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((member, index) => {
                            return (
                              <tr key={index}>
                                <td className="align-middle">{member.userId}</td>
                                <td className="align-middle text-center"><img alt="avatar" src={member.avatar} width='30' height='30' style={{ borderRadius: '50%' }} /></td>
                                <td className="align-middle">{member.name}</td>
                                <td className="align-middle text-center">
                                  <Button
                                    onClick={() => {
                                      let userProject = {
                                        "projectId": record.id,
                                        "userId": Number(member.userId)
                                      }
                                      dispatch(actDeleteUserProjectSaga(userProject))
                                    }}
                                    style={{ backgroundColor: '#ff4d4f', color: '#fff', borderRadius: '50%' }}
                                    icon={<CloseOutlined style={{ fontSize: 18 }} />}></Button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    )
                  }}
                >
                  <Avatar key={index} src={member.avatar} />
                </Popover>
              )
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}
            <Popover
              placement="rightTop"
              title={"Add user"}
              content={() =>
                <AutoComplete
                  style={{ width: '100%' }}
                  onSearch={(value) => { dispatch(actGetUserApiSaga(value)) }}
                  options={userSearch?.map((item, index) => {
                    return { label: item.name, value: item.userId.toString() }
                  })}
                  value={value}
                  onChange={(text) => {
                    setValue(text)
                  }}
                  onSelect={(value, options) => {
                    setValue(options.label)
                    let userProject = {
                      "projectId": record.id,
                      "userId": Number(options.value)
                    }
                    dispatch(actAddUserProjectSaga(userProject))
                  }}
                />}
              trigger="click"
            >
              <Button style={{ borderRadius: '50%', backgroundColor: '#9254de', color: '#f0f0f0' }} icon={<PlusOutlined style={{ fontSize: 18 }} />}></Button>
            </Popover>
          </div>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              let component = <FormEditProject />
              // Load Edit form modal
              dispatch(actOpenEditModal(component))
              // Fill data to edit form
              console.log(record);
              dispatch(actEditProject(record));
            }}
            className="btn btn-primary"
            style={{
              borderRadius: '3px',
              border: 'none',
            }}>
            <EditOutlined style={{ paddingBottom: '5px' }} />
          </button>
          <Popconfirm
            title='Are you sure to delete this project?'
            onConfirm={() => {
              dispatch(actDeleteProject(record.id))
            }}
            okText="Yes"
            cancelText="No"
          >
            <button
              className="btn btn-danger"
              style={{
                borderRadius: '3px',
                border: 'none',
              }}>
              <DeleteOutlined style={{ paddingBottom: '5px' }} />
            </button>
          </Popconfirm>

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
