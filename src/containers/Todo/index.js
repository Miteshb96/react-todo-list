import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getBucketTodos, updateTodo, addNewTodo } from "../../shared/store";
import { TodoList } from "../../components";

class Todo extends React.Component {
  state = {
    title: "",
    todoId: 1
  };
  componentDidMount() {
    let id = localStorage.getItem("bucket");
    // let token = localStorage.getItem("token");

    //Validate User if invalid move out of application
    if (!id) {
      this.props.history.push(`${process.env.PUBLIC_URL}/`);
    }
    //get details of todo associated with bucket id1
    else {
      this.props.getBucketTodos(id);
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addNewTodo = async () => {
    let bucket_id = localStorage.getItem("bucket");
    if (!this.state.title) {
      alert("add name");
    } else {
      await this.props.addNewTodo({
        "bucket_id" : bucket_id, 
        "todo_id" : bucket_id + 1, 
        "title" : this.state.title, 
        "current_status" : "In Progress", 
        "date" : new Date(), 
        "content" : `running for ${bucket_id - 99} hour` 
      });
      await this.props.getBucketTodos(bucket_id);
      this.setState({
        title: ""
      })
    }
  };

  handletodoStatusChange = async (flag, id) => {
    let bucket_id = localStorage.getItem("bucket");
    await this.props.updateTodo({
      "todo_id" : id,
      "current_status" : flag ? "Done" : "In Progress"
    });
    await this.props.getBucketTodos(bucket_id);
  }

  render() {
    const { todos } = this.props;
    const b_id = localStorage.getItem("bucket") !== "undefined" ? localStorage.getItem("bucket") : (Math.random()*100).toFixed(0)

    return (
      <div>
        <div className="header">
          <h1>To-do Management System</h1>
        </div>
        <div style={{ textAlign: "center" }}>
          <h2>Todos List For Bucket ID: {b_id}</h2>
        </div>
        <div>
          <input
            type="text"
            value={this.state.title}
            name="title"
            className="todoInput"
            onChange={this.handleChange}
            placeholder="Type todo title"
          />
          <button className="todoButton" onClick={this.addNewTodo}>
            Add New Todo
          </button>
          <button
            className="todoButton"
            onClick={() =>
              this.props.history.push(`${process.env.PUBLIC_URL}/`)
            }
          >
            Back
          </button>
        </div>
        {!todos.loading && todos.loaded && todos.todos.length > 0 && (
          <TodoList {...this.props} toggleTodoStatus={this.toggleTodoStatus}
            handletodoStatusChange={this.handletodoStatusChange}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { todos: state.todos };
};
const mapDispatchToProps = dispatch => {
  return {
    getBucketTodos: id => dispatch(getBucketTodos(id)),
    updateTodo: payload => dispatch(updateTodo(payload)),
    addNewTodo: payload => dispatch(addNewTodo(payload))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Todo)
);
