import React from "react";
import { withRouter } from "react-router-dom";
import { getBuckets, addNewBucket, editBucket, deleteBucket } from "../../shared/store";
import { connect } from "react-redux";
import { DashboardComponent } from "../../components";
class Dashboard extends React.Component {
  state = {
    addNewBucket: false,
    bucketname: "",
    bucketID: 100,
    editInput: false,
    currentEditBucket: null
  };

  componentDidMount() {
    this.props.getBuckets();
  }

  addNewBucket = async() => {
    //Throw alert on empty submit
    if (!this.state.bucketname.length) {
      alert("Please enter name");
    } else {
      await this.props.addNewBucket({ 
        bucket_id: this.state.bucketID,
        bucket_name: this.state.bucketname,
        current_status: "In Progress",
        date: new Date()
      })
      await this.props.getBuckets();
      this.setState({
        bucketID: (this.state.bucketID + 1),
        bucketname: ""
      })
    }
  };

  handleEditInput = (bucket) => {
  
    this.setState({
      bucketname: bucket.bucket_name,
      editInput: true,
      currentEditBucket: bucket
    })
  };

  handleDeleteBucket = async (bucket) => {
    await this.props.deleteBucket({ 
      bucket_id: bucket.bucket_id
    })
    await this.props.getBuckets();
  };

  editBucket = async() => {
    const {currentEditBucket} = this.state;
    
    if (!this.state.bucketname.length) {
      alert("Please enter name");
    } else {
      await this.props.editBucket({ 
        bucket_id: currentEditBucket.bucket_id,
        bucket_name: this.state.bucketname,
        current_status: currentEditBucket.current_status,
        date: new Date()
      })
      await this.props.getBuckets();
      this.setState({
        bucketID: (this.state.bucketID + 1),
        bucketname: "",
        editInput: false,
        currentEditBucket: null
      })
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = bucket => {
    localStorage.setItem("bucket", bucket.bucket_id);
    this.props.history.push(`${process.env.PUBLIC_URL}/bucket/todo`);
  };

  render() {
    const { buckets } = this.props;
    return (
      !buckets.loading &&
      buckets.loaded && (
        <DashboardComponent
          {...this.props}
          editInput={this.state.editInput}
          handleEditInput={this.handleEditInput}
          handleDeleteBucket={this.handleDeleteBucket}
          addNewBucket={this.addNewBucket}
          editBucket={this.editBucket}
          handleClick={this.handleClick}
          handleChange={this.handleChange}
          bucketname={this.state.bucketname}
        />
      )
    );
  }
}
const mapStateToProps = state => {
  return { buckets: state.buckets };
};

const mapDispatchToProps = dispatch => {
  return {
    getBuckets: () => dispatch(getBuckets()),
    addNewBucket: payload => dispatch(addNewBucket(payload)),
    editBucket: payload => dispatch(editBucket(payload)),
    deleteBucket: payload => dispatch(deleteBucket(payload))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
