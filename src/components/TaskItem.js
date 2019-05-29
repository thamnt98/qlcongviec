import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskItem extends Component {
// fu=()=>
// {
//     if(this.props.task.status===1) return "Hoàn tất"
//     else if(this.props.task.status===-1) return "Dự định"
//     else return "Đang làm"
// }
    showStatusElement(){
        return (
            <span
            className={ this.props.task.status ? 'label label-danger' : 'label label-info' }
                onClick={ this.onUpdateStatus }
            >{ 
                
                this.props.task.status === true ? 'Hoàn tất' : 'Đang làm ' 
                
                //this.props.task.status === true ? 'Kích Hoạt' : 'Ẩn'
               
            
            }</span>
        );
    }

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDeleteItem = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }

    onEditTask = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    }
   

    render() {
        return (
            <tr>
                <td>{ this.props.index }</td>
                <td>{ this.props.task.name }</td>
                <td>{ this.props.task.desc }</td>
                <td>{ this.props.task.startdate }</td>
                <td>{ this.props.task.enddate }</td>

                <td>
                    { this.showStatusElement() }
                </td>
                <td>
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={ this.onEditTask }>
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button
                        type="button" className="btn btn-danger"
                        onClick={ this.onDeleteItem }>
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus : (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask : (id) => {
            dispatch(actions.deleteTask(id))
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        },
        onOpenForm : () => {
            dispatch(actions.openForm());
        },
        onEditTask : (task) => {
            dispatch(actions.editTask(task));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
