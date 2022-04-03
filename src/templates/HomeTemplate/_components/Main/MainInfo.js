import React from 'react'
import ReactHtmlParser from 'html-react-parser'

export default function MainInfo(props) {

  const { projectDetail } = props;

  const renderMember = () => {
    return projectDetail.members?.map((member, index) => {
      return (
        <div className="avatar" key={index}>
          <img src={member.avatar} alt={member.avatar} />
        </div>
      )
    })
  }
  return (
    <>
      <h3>{projectDetail.projectName}</h3>
      <section className="mb-3">
        {projectDetail.description && ReactHtmlParser(projectDetail.description)}
      </section>
      <div className="info" style={{ display: 'flex', alignItems: 'center'}}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{ display: 'flex' }}>
          {renderMember()}
        </div>
        <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
        <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
      </div>
    </>
  )
}
