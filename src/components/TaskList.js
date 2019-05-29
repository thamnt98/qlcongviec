import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
// import App from '../App.css' 
class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterDesc:'',
            filterStartDate:new Date(),
            filterEndDate:new Date(),
            filterStatus :-1
        };
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        // var desc=target.desc;
        // var startdate=target.startdate;
        // var enddate=target.enddate;
 

var value = target.type === 'option' ? target.selected : target.value;
       //var value = target.value;
        var filter = {
            name : name === 'filterName' ? value : this.state.filterName,
            desc : name=== 'filterDesc' ? value : this.state.filterDesc,
            startdate : name === 'filterStartDate' ? value : this.state.filterStartDate,
            enddate : name=== 'filterEndDate' ? value : this.state.filterEndDate,
            status :name === 'filterStatus' ? value : this.state.filterStatus
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name] : value,
        
            // [desc]:desc,
            // [startdate]:startdate,
            // [enddate]:enddate,
   
        });
    }

    render() {
        
        var { tasks, filterTable, keyword, sort } = this.props;
        // filter on table
        if(filterTable.name){
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1
            });
        }

        tasks = tasks.filter((task) => {
            if(filterTable.status === -1){
                return task;
            }else{
                return task.status
                === (filterTable.status === 1 ? true : false);
            }
        });

        // search
        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });

        // sort
        if(sort.by === 'name'){
            tasks.sort((a, b) => {
                if(a.name > b.name) return sort.value;
                else if(a.name < b.name) return -sort.value;
                else return 0;
            });
        }
        else if (sort.by==="startdate")
        {
            tasks.sort((a, b) => {
                if(a.startdate > b.startdate) return sort.value;
                else if(a.startdate < b.startdate) return -sort.value;
                else return 0;
            });
        }
        else if (sort.by==="enddate")
        {
            tasks.sort((a, b) => {
                if(a.enddate > b.enddate) return sort.value;
                else if(a.enddate < b.enddate) return -sort.value;
                else return 0;
            });
        }
        else{
            tasks.sort((a, b) => {
                if(a.status > b.status) return -sort.value;
                else if(a.status < b.status) return sort.value;
                else return 0;
            });
        }

        var elmTasks = tasks.map((task, index) => {
            return (
                <TaskItem
                    key={task.id}
                    task={task}
                    index={index + 1}
                />
            )
        });

        return (    
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className=" text-center">STT</th>
                                <th className=" text-center " >Tên</th>
                                <th  className=" text-center ">Miểu tả</th>
                                <th className=" text-center  ">Ngày bắt đầu </th>
                                <th  className="text-center ">Ngày kết thúc </th>
                                <th className=" text-center ">Trạng Thái
                                
                                    </th>
                                <th className="text-center     ">Hành Động
                                
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr className="row a ">
                                <td className="col-1">
                                 <input
                                        type="text"
                                        className="form-control"
                                        name="filterName"
                                        onChange={ this.onChange }
                                        value={ this.state.filerName }
                                    />
                                    </td>
                                    <td className="col-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="filterDesc"
                                        onChange={ this.onChange }
                                        value={ this.state.filterDesc }
                                    />
                                    </td>
                                    <td className="col-2">
                                    <input
                                        type="Date"
                                        className="form-control"
                                        name="filterStartDate"
                                        onChange={ this.onChange }
                                        value={ this.state.filterStartDate}
                                    />
                                    </td>
                                    <td className="col-2">
                                     <input
                                        type="Date"
                                        className="form-control"
                                        name="filterEndDate"
                                        onChange={ this.onChange }
                                        value={ this.state.filterEndDate}
                                    />

                                    
                                </td>
                                <td className="col-1">
                                <select
                                        className="form-control"
                                        name="filterStatus"
                                        onChange={ this.onChange }
                                        value={ this.state.filterStatus }
                                    >
                                <option value={-1}>Tất Cả</option>
                                        <option value={0}>Đang làm </option>
                                        <option value={1}>Hoàn tất</option>

                                    </select>
                                </td>
                            </tr>
                            { elmTasks }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tasks : state.tasks,
        filterTable : state.filterTable,
        keyword : state.search,
        sort : state.sort
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable : (filter) => {
            dispatch(actions.filterTask(filter));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
