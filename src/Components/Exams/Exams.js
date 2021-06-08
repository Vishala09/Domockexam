import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import RemoveSharpIcon from '@material-ui/icons/RemoveSharp';
import MuiTreeItem from "@material-ui/lab/TreeItem";
import { withStyles } from "@material-ui/core/styles";

function Exams() {
    const useStyles = makeStyles({
        
        treeview: {
          background:'#0D6EFD',
          minHeight:'85vh',
          zIndex:1,
          color:'white',
          fontWeight:'bold',
          fontFamily: 'Lucida Console, Courier New, monospace',
          paddingRight:'10px'
        },
        treeviewmobile: {
          background:'#0D6EFD',
          minHeight:'85vh',
          zIndex:1,
          fontSize:'11px',
          color:'white',
          fontWeight:'bold',
          fontFamily: 'Lucida Console, Courier New, monospace',
          paddingRight:'10px'
        },

      });
      const TreeItem = withStyles({
        root: {
          "&.Mui-selected > .MuiTreeItem-content": {
            background: "#89CFF0"
          },
          "&.MuiTreeItem-root > .MuiTreeItem-content:hover": {
            background: "gray",
          },
          "&.MuiTreeItem-root > .MuiTreeItem-content:hover > .MuiTreeItem-label": {
            background: "#89CFF0",
          },
          
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        }
      })(MuiTreeItem);
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
                name: 'Sinhala&nbsp;Medium',
            },
            {
                id: '112',
                name: 'Tamil&nbsp;Medium',
            },
          ],
      },
    ]},
    {id: '2',
    name: 'G.C.E&nbspO/L',
    children: [
      {
        id: '21',
        name: 'English&nbsp;Language ',
      },
      {
        id: '22',
        name: 'English&nbsp;Literature ',
      },
      {
        id: '23',
        name: 'Maths ',
        children: [
            {
                id: '231',
                name: 'Sinhala&nbsp;Medium',
            },
            {
                id: '232',
                name: 'Tamil&nbsp;Medium',
            },
            {
                id: '233',
                name: 'English&nbsp;Medium',
            },
          ],
      },
    ],
    },
    {id: '3',
    name: 'G.C.E&nbspA/L',
    children: [
      {
        id: '31',
        name: 'Physics',
        children: [
            {
                id: '311',
                name: 'Sinhala&nbsp;Medium',
            },
            {
                id: '312',
                name: 'Tamil&nbsp;Medium',
            },
            {
                id: '313',
                name: 'English&nbsp;Medium',
            },
          ],
      },
      {
        id: '32',
        name: 'Chemistry',
        children: [
            {
                id: '321',
                name: 'Sinhala&nbsp;Medium',
            },
            {
                id: '322',
                name: 'Tamil&nbsp;Medium',
            },
            {
                id: '323',
                name: 'English&nbsp;Medium',
            },
          ],
      },
      {
        id: '33',
        name: 'General&nbsp;Knowledge ',
        children: [
            {
                id: '331',
                name: 'Sinhala&nbsp;Medium',
            },
            {
                id: '332',
                name: 'Tamil&nbsp;Medium',
            },
            {
                id: '333',
                name: 'English&nbsp;Medium',
            },
          ],
      },
    ],
    }
];
  let getDataByIdResult={};
  const getDataById = (data,id) => {
    
  
    for(let i=0;i<data.length;i++) {
      let el=data[i];
           if(el.id==id)
           {
                console.log(el);
                getDataByIdResult=el;
                return el;
           }     
           else 
           {
              if(Array.isArray(el.children)) 
                  getDataById(el.children,id) 
              else 
                 {
                   console.log('no children')
                    return getDataByIdResult
                 } 
           }
       }
  }
  
  var getSubMenuItem = function (subMenuItems, id) {
    if (subMenuItems) {
        for (var i = 0; i < subMenuItems.length; i++) {
            if (subMenuItems[i].id == id) {
                return subMenuItems[i];
            }
            var found = getSubMenuItem(subMenuItems[i].children, id);
            if (found) return found;
        }
    }
};
  const renderTree = (nodes) => ( 
        <TreeItem key={nodes.id}  nodeId={nodes.id} label={ReactHtmlParser(nodes.name)}>
              {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
  
  );
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    //console.log(nodeIds)
    let sel = getSubMenuItem(data,nodeIds);
    console.log(sel)
   setSelected(sel.name);
  };
  
    return (
        <div style={{top:'20vh'}} >
            {/* <h4 className="text-center" >Exams</h4> */}
            <div className="d-flex flex-row">
              <TreeView className={window.screen.width<770?classes.treeviewmobile+'':classes.treeview+' col-lg-2'} 
                  defaultCollapseIcon={<RemoveSharpIcon />}
                  expanded={expanded}
                  selected={selected}
                  onNodeToggle={handleToggle}
                  onNodeSelect={handleSelect}
                   defaultExpandIcon={<svg class="MuiSvgIcon-root" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   viewBox="0 0 16 16" focusable="true" aria-hidden="true"><rect width="4" height="16" x="6" y="1" rx="1"/><path d="M1.5 14a.5.5  1a.5.5  "/></svg>}
                 
                   
                  >
                  {
                      data.map((nodes)=>renderTree(nodes))
                  }
                  
              </TreeView>
              <div className="col-9">
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                          {ReactHtmlParser(selected)}
                  </div>
                    
              </div>
            </div>
        </div>
    )
}

export default Exams
