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
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import data from './Examdata.json';
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
import './Exams.css'
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
  
  var getSubMenuItem = function (subMenuItems, id,arr) {
    if (subMenuItems) {
        for (var i = 0; i < subMenuItems.length; i++) {
            if(subMenuItems[i].children)
            arr.push(subMenuItems[i])

            if (subMenuItems[i].id == id) {
                if(subMenuItems[i].children==undefined)
                arr.push(subMenuItems[i])

                return [subMenuItems[i],arr];
            }
            var found = getSubMenuItem(subMenuItems[i].children, id,arr);
            if (found) return found;
            if(subMenuItems[i].children)
            {
              arr.pop()
            }
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
  const [selectedData, setselectedData] = useState([])
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    //console.log(nodeIds)
    let arr=[];
    let sel = getSubMenuItem(data,nodeIds,arr);
     //console.log('sel',sel);
   setSelected(nodeIds);
   setselectedData(sel[1]);

  };
  function handleClick(event,id) {
    event.preventDefault();
    let arr=[]
    let sel = getSubMenuItem(data,id,arr)
    setselectedData(sel[1]);
  }
  
    return (
        <div style={{top:'20vh'}} >
            {/* <h4 className="text-center" >Exams</h4> */}
            <div className="d-flex flex-row">
              <TreeView className={window.screen.width<770?classes.treeviewmobile+'':classes.treeview+' col-lg-2'} 
                  defaultCollapseIcon={<RemoveSharpIcon />} 
                  expanded={expanded}  selected={selected}
                  onNodeToggle={handleToggle}  onNodeSelect={handleSelect}
                  defaultExpandIcon={<svg class="MuiSvgIcon-root" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   viewBox="0 0 16 16" focusable="true" aria-hidden="true"><rect width="4" height="16" x="6" y="1" rx="1"/>
                   <path d="M1.5 14a.5.5  1a.5.5  "/></svg>}>
                  {
                      data.map((nodes)=>renderTree(nodes))
                  }
                  
              </TreeView>
              <div className="col-9">
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'10px'}}>
                          {/* {ReactHtmlParser(selectedData)} */}
                          <div>
                          <Breadcrumbs separator="›"  aria-label="breadcrumb">
                            {
                               selectedData.map((el,idx)=>
                                        <>
                                            {
                                              idx==selectedData.length-1 ?
                                              <Typography color="textSecondary" key={idx} >
                                                    { ReactHtmlParser(el.name) }
                                              </Typography>
                                              :
                                              <Link style={{textDecoration:'none'}} key={idx} color="inherit" to="/" onClick={(e)=>handleClick(e,el.id)}>
                                                    { ReactHtmlParser(el.name) }
                                              </Link>
                                            }
                                        </>
                                        
                                )
                            }
                            </Breadcrumbs>
                          </div>
                  </div>
                    
              </div>
            </div>
        </div>
    )
}

export default Exams
