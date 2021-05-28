import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

function Exams() {
    const useStyles = makeStyles({
        treeview: {
          background:'#4CAF50',
          minHeight:'80vh',
          zIndex:1
        },
      });
      const classes = useStyles();
  const data =  [
    {id: '1',
    name: 'Grade 5',
    children: [
      {
        id: '11',
        name: 'Scholarship ',
        children: [
            {
                id: '111',
                name: 'Sinhala Medium',
            },
            {
                id: '112',
                name: 'Tamil Medium',
            },
          ],
      },
    ]},
    {id: '2',
    name: 'G.C.E O/L',
    children: [
      {
        id: '21',
        name: 'English Language ',
      },
      {
        id: '22',
        name: 'English Literature ',
      },
      {
        id: '23',
        name: 'Maths ',
        children: [
            {
                id: '231',
                name: 'Sinhala Medium',
            },
            {
                id: '232',
                name: 'Tamil Medium',
            },
            {
                id: '233',
                name: 'English Medium',
            },
          ],
      },
    ],
    },
    {id: '3',
    name: 'G.C.E A/L',
    children: [
      {
        id: '31',
        name: 'Physics',
        children: [
            {
                id: '311',
                name: 'Sinhala Medium',
            },
            {
                id: '312',
                name: 'Tamil Medium',
            },
            {
                id: '313',
                name: 'English Medium',
            },
          ],
      },
      {
        id: '32',
        name: 'Chemistry',
        children: [
            {
                id: '321',
                name: 'Sinhala Medium',
            },
            {
                id: '322',
                name: 'Tamil Medium',
            },
            {
                id: '323',
                name: 'English Medium',
            },
          ],
      },
      {
        id: '33',
        name: 'General Knowledge ',
        children: [
            {
                id: '331',
                name: 'Sinhala Medium',
            },
            {
                id: '332',
                name: 'Tamil Medium',
            },
            {
                id: '333',
                name: 'English Medium',
            },
          ],
      },
    ],
    }
];
  
  const renderTree = (nodes) => (
 
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
              {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
  
  );
    return (
        <div style={{top:'20vh',margin:'20px'}} >
            <h4 className="d-flex justify-content-center" >Exams</h4>
            <div className="row">
            <TreeView className={classes.treeview+' col-3'} 
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                >
                {
                    data.map((nodes)=>renderTree(nodes))
                }
                
            </TreeView>
            </div>
        </div>
    )
}

export default Exams
