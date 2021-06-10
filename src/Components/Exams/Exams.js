import React, { useEffect, useState } from 'react'
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
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
import './Exams.css';


import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
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
          minHeight:'100vh',
          zIndex:1,
          fontSize:'11px',
          color:'white',
          fontWeight:'bold',
          fontFamily: 'Lucida Console, Courier New, monospace',
          paddingRight:'10px'
        },
        list: {
          width: 250,
        },
        fullList: {
          width: 'auto',
        }

      });
      
      const TreeItem = withStyles({
        root: {
          "&.MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label": {
            background: "#89CFF0"
          },
          // "&.MuiTreeItem-root > .MuiTreeItem-content:hover": {
          //   background: "gray",
          // },
          "&.MuiTreeItem-root > .MuiTreeItem-content:hover > .MuiTreeItem-label": {
            background: "#89CFF0",
          },
          // '@media (hover: none)': {
          //   backgroundColor: 'transparent',
          // },
          "&.MuiTreeItem-root > .MuiTreeItem-content:hover > .MuiTreeItem-iconContainer svg":{
              background:'gray',
              height:'100%'
          }
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

var isParentNode = function (subMenuItems, id) {
  if (subMenuItems) {
      for (var i = 0; i < subMenuItems.length; i++) {
         
          if (subMenuItems[i].id == id) {
              
              if(subMenuItems[i].children==undefined)
              {
                return false;
              }
              else 
              {
                return true;
              }
          }
          var found = isParentNode(subMenuItems[i].children, id);
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
  const [selectedData, setselectedData] = useState([])
  const handleToggle = (event, nodeIds) => {
    if(nodeIds.length>1)
    {
      let a =nodeIds[0].slice(0,1);
      let b =nodeIds[1].slice(0,1);
      if(a!=b)
      {
         let exp=[nodeIds[0]];
         setExpanded([...exp])
      }
      else
      setExpanded(nodeIds);
    }
    else
      setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
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
    setSelected(id);
    let isParent=isParentNode(data,id,arr)
    if(isParent)
    {
      let exp=expanded.slice(1,expanded.length)
      setExpanded([...exp])
    }
  }
  const [anchor, setanchor] = useState(false);
  const toggleDrawer = (open) => (event) => {
    //console.log(open,event.type,event.key)
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setanchor(open);
  };
  const theme = createMuiTheme();
  
    return (
        <div style={{top:'20vh'}} >
            {/* <h4 className="text-center" >Exams</h4> */}
            <div className="d-flex flex-row">
              {
              window.screen.width >=770 ?
              <TreeView className={window.screen.width<770?classes.treeviewmobile+'':classes.treeview+' col-lg-2'} 
                  expanded={expanded}  selected={selected}
                  onNodeToggle={handleToggle}  onNodeSelect={handleSelect}
                  defaultExpandIcon={<svg className="d-flex justify-content-center" xmlns="http://www.w3.org/2000/svg" 
                  width="16" height="16" fill="currentColor"viewBox="0 0 16 16" focusable="true" aria-hidden="true">
                  <rect width="4" height="16" x="6" y="1" rx="1"/><path d="M1.5 14a.5.5  1a.5.5  "/></svg>}
                defaultCollapseIcon={<span style={{width:'100%'}} ><RemoveSharpIcon /></span>}
                defaultExpandIcon={<span style={{width:'100%'}}><ChevronRightIcon /></span>}  
                > 
                  {
                      data.map((nodes)=>renderTree(nodes))
                  }   
              </TreeView>
              :
              <div>
                  <div style={{position:'fixed',background:'#232F3E',height:'7vh',top:'15vh',left:0,right:0,
                  width:'100%',alignItems:'center',display:'flex',fontWeight:'bolder',zIndex:3000,padding:'10px'}}> 
                        <div className="header row  align-items-start" >
                          <div onClick={toggleDrawer(true)} className="col-1" style={{fontSize:'18px',paddingLeft:'20px'}}>
                              <i class="fa fa-bars" style={{color:'white'}} aria-hidden="true"></i>
                              
                          </div>
                        </div>
                  </div>
                  <Drawer anchor={'left'} open={anchor} style={{zIndex:3000}} onClose={toggleDrawer(false)}>
                  <div
                      className={clsx(classes.list, {
                        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
                      })}
                      role="presentation"
                      // onClick={toggleDrawer(false)}
                      // onKeyDown={toggleDrawer(false)}
                    >
                      <Button style={{width:'100%'}} onClick={toggleDrawer(false)}>Close</Button>
                      <TreeView className={window.screen.width<770?classes.treeviewmobile+'':classes.treeview+' col-lg-2'} 
                          expanded={expanded}  selected={selected}
                          onNodeToggle={handleToggle}  onNodeSelect={handleSelect}
                          defaultExpandIcon={<svg className="d-flex justify-content-center" xmlns="http://www.w3.org/2000/svg" 
                          width="16" height="16" fill="currentColor"viewBox="0 0 16 16" focusable="true" aria-hidden="true">
                          <rect width="4" height="16" x="6" y="1" rx="1"/><path d="M1.5 14a.5.5  1a.5.5  "/></svg>}
                        defaultCollapseIcon={<span style={{width:'100%'}} ><RemoveSharpIcon /></span>}
                        defaultExpandIcon={<span style={{width:'100%'}}><ChevronRightIcon /></span>}  
                        > 
                          {
                              data.map((nodes)=>renderTree(nodes))
                          }   
                      </TreeView>
                    </div>
                  </Drawer>
              </div>
              }
              <div className="col-9" style={{marginTop:window.screen.width<770?'7vh':'0'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'10px'}}>
                          {/* {ReactHtmlParser(selectedData)} */}
                          <div >
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
                                              <Link style={{textDecoration:'none'}} key={idx} color="inherit" to="/" 
                                              onClick={(e)=>handleClick(e,el.id)}>
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
