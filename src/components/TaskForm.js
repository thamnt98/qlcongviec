import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id : '',
            name : '',
            desc:'',
            startdate:new Date(),
            enddate:new Date(),
            status :false
        };
    }

    componentWillMount() {
        if(this.props.itemEditing && this.props.itemEditing.id !== null){
            this.setState({
                id : this.props.itemEditing.id,
                name : this.props.itemEditing.name,
                desc: this.props.itemEditing.desc,
              startdate : this.props.itemEditing.startdate,
                enddate : this.props.itemEditing.enddate,
                status : this.props.itemEditing.status
            });
        }else{
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.itemEditing){
            this.setState({
                id : nextProps.itemEditing.id,
                name : nextProps.itemEditing.name,
                desc : nextProps.itemEditing.desc,
                startdate: nextProps.itemEditing.startdate,
                enddate: nextProps.itemEditing.enddate,

                status : nextProps.itemEditing.status
            });
        }else{
            this.onClear();
        }
    }

    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
    //     var desc = target.desc;
    //     var  startdate=  target.startdate;
    //     var enddate= target.enddate;
        var value = target.type === 'checkbox' ? target.checked: target.value;
       // var value=target.value;
        this.setState({
            [name] : value,

            
            // [desc]:desc,
            // [startdate]:startdate,
            // [enddate]:enddate,
            // [status]:status
            
        });
    }

    onSave = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onClear();
        this.onExitForm();
    }

    onClear = () => {
        this.setState({
            name : '',
            desc:'',
            startdate:new Date(),
            enddate:new Date(),
            status : false
        });
    }

    onExitForm = () => {
        this.props.onCloseForm();
    }

    render() {
        if(!this.props.isDisplayForm) return null;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { !this.state.id ? 'Thêm Công Việc' : 'Cập Nhật Công Việc' }
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={this.onExitForm}
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSave} >
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={ this.onHandleChange }
                            />
                             <label>Mô tả:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="desc"
                                value={this.state.desc}
                                onChange={ this.onHandleChange }
                            />
                           <label>Ngày bắt đầu: </label>
                            <input
                                type="Date"
                                className="form-control"
                                name="startdate"
                                value={this.state.startdate}
                                onChange={ this.onHandleChange }
                            />
                            <label>Ngày kết thúc : </label>
                            <input
                                type="Date"
                                className="form-control"
                                name="enddate"
                                value={this.state.enddate}
                                onChange={ this.onHandleChange }
                            />
                            
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            value={this.state.status}
                            onChange={this.onHandleChange}
                            name="status"
                        >
                            <option value={true}>Hoàn tất </option>
                            <option value={false}>Đang làm </option>

                        </select><br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Lưu Lại
                            </button>&nbsp;
                            <button type="button" onClick={ this.onClear } className="btn btn-danger">
                                <span className="fa fa-close mr-5"></span>Hủy Bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask : (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);
