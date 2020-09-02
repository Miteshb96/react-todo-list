import React from "react";
import "./style.css";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton, Tooltip } from '@material-ui/core';

function DashboardComponent({
  buckets,
  editInput,
  addNewBucket,
  handleClick,
  bucketname,
  handleChange,
  handleEditInput,
  editBucket,
  handleDeleteBucket
}) {
  
  return (
    <div>
      <div className="header">
        <h1>To-do Management System</h1>
      </div>
      <div style={{ textAlign: "center" }}>
        <h2>Your Buckets List</h2>
      </div>
      {
        !editInput ?
          <div>
            <input
              type="text"
              name="bucketname"
              className="inputtext"
              placeholder="Type bucket name"
              value={bucketname}
              onChange={handleChange}
            />
            <button className="addBucket" onClick={() => addNewBucket()}>
              Add New bucket
            </button>
          </div> 
        : 
          null
      }
      {
        !editInput ?
          <div>
            <b>{"Bucket Name Optionds :"}</b>
            {buckets.buckets.map((obj, index) => {
              return <div> {obj.bucket_name} </div>
            })}
          </div>
          :
          null
      }
      {
        editInput ?
          <div>
            <input
              type="text"
              name="bucketname"
              className="inputtext"
              placeholder="Type bucket name"
              value={bucketname}
              onChange={handleChange}
            />
            <button className="addBucket" onClick={() => editBucket()}>
              Edit bucket
            </button>
          </div>
        : 
          null
      }
      <div className="bucketWrapper">
        {buckets.buckets.map((bucket, index) => {
          return (
            <div
              key={index}
              className="bucketListWrapper"
            >
              <button onClick={() => handleClick(bucket)}><label>{bucket.bucket_name}</label></button>
              <Tooltip title="Edit Bucket">
                <IconButton onClick={() => handleEditInput(bucket)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Bucket">
                <IconButton onClick={() => handleDeleteBucket(bucket)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default DashboardComponent;
