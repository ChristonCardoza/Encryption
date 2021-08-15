import React, { forwardRef } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import MaterialTable  from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const MessageDetails = () => {

    const location = useLocation();
    const currentId = location.pathname.split("messages/")[1];
    const message = useSelector((state) => currentId ? state.messages.find((p) => p._id === currentId) : null);
    // const message = useSelector((state) => state.messages);

    console.log("Message:", message)
    console.log("currentId",currentId)

    const allRowData = [];
    message?.messages.map(row => {
            return allRowData.push(row);
        })
    
   
    const columns= [
        {
            title: 'Name', field:'name'
        },
        {
            title: 'Origin', field:'origin'
        },
        {
            title: 'Destination', field:'destination'
        },
        {
            title: 'Secrete key', field:'secrete_key'
        }
    ]
    
    return (

        <MaterialTable title={message?.startDate + '---to---' +message?.endDate}
            data={ allRowData }
            columns={ columns }
            icons={tableIcons}
            options= {
               { 
                pageSize: 10,
                pageSizeOptions : [ 10 ,15,20 ],
                filtering: true,
                exportButton: true,
                headerStyle: {
                    backgroundColor: '#039be5',
                    color:' #ffffff',
                    textAlign:' left'
                },
                cellStyle: {
                    borderBottom: '1px solid #dddddd',
                    backgroundColor: '#f3f3f3',
                 
                  }
            
                }
                
            }
          
        
        />

    )
}

export default MessageDetails