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
//import data from './Examdata.json';
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
import './Exams.css';


import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import AllTests from './AllTests';
import { useDispatch, useSelector } from 'react-redux';
function Exams() {

    const [data, setData] = useState([]);
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

      const UserLogin = useSelector(state => state.LoginReducer);
      const history = useHistory();
      const dispatch = useDispatch();
      useEffect(() => {
          // if(((UserLogin.username=='undefined' && UserLogin.value?.token=='undefined')))  
          // {
          //    history.push('/login');
          // }
          // else
          {
             dispatch({type:'GET_SUBJECTS_REQUESTED'})
          }
      }, []);
 
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
  const [selectedData, setselectedData] = useState([]);

  const handleToggle = (event, nodeIds) => {
    // if(nodeIds.length>1 && nodeIds.includes(selected))
    // {
    //   let a =nodeIds[0].slice(0,1);
    //   let exp=[nodeIds[0]]
    //   for(let i=1;i<nodeIds.length;i++)
    //   {
    //       if(nodeIds[i].slice(0,1)==a)
    //       {
    //          if(nodeIds[i].length>nodeIds[0].length)
    //          {
    //          }
    //          else
    //          exp.push(nodeIds[i])
    //       }
    //       else
    //       exp.push(nodeIds[i])
    //   }
    //   console.log('Expanded',exp);
    //   setExpanded([...exp]);
    // }
    // else
     { 
    
       let newnodeIds =[]
       if(nodeIds[0]!=undefined)
       {
           newnodeIds.push(nodeIds[0]);
       }
       // this tree view works based on ids.... using L,G,S - 1,2,3 resp in indexes
       let selectedType='L';
       let selectedTypeNum = nodeIds[0]?.slice(0,1);
       if(nodeIds[0]?.includes('G'))
        {
            selectedType='G';
            
        } 
       if(nodeIds[0]?.includes('S'))
        {
            selectedType='S'
        }
       for(let i=1;i<nodeIds.length;i++)
       {
          if(nodeIds[i]?.includes(selectedType) || nodeIds[i]?.slice(0,1)!=(selectedTypeNum))
          {
              
          }
          else
          {
            newnodeIds.push(nodeIds[i]);
          }
       }
       setExpanded(newnodeIds);
       console.log('Expanded',newnodeIds);
      // handleSelect(null,newnodeIds[0]);
     }
  };

  const handleSelect = (event, nodeIds) => {
    let arr=[];
    let sel = getSubMenuItem(data,nodeIds,arr);

   setSelected(nodeIds);
    if(sel?.length>=1)
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

  const GradewiseSubjects = useSelector(state => state.GetSubjectsReducer);
  useEffect(() => {
     // console.log('GradewiseSubjects',GradewiseSubjects);
      let examdata = formatExamData();
      setData([...examdata])
     // console.log('examdata',examdata)
  }, [GradewiseSubjects]);

  function formatExamData ()
  {
    let ExamData = [
      {
         "id":"1L",
         "name":"English",
         "children":[
            
         ]
      },
      {
         "id":"2L",
         "name":"Sinhala ",
         "children":[
   
         ]
      },
      {
         "id":"3L",
         "name":"Tamil ",
         "children":[
            
         ]
      }
   ]
  
    for(let k=0;k<3;k++)
    for(let i=0;i<GradewiseSubjects.length;i++)
    {
        let obj = {}
        obj.id=(k+1)+""+(GradewiseSubjects[i].gradeId)+"G";
        obj.name=GradewiseSubjects[i].gradeName;
        obj.children=[];
        for(let j=0;j<GradewiseSubjects[i].testSubjects.length;j++)
        {
            let cobj={};
            cobj.id=(k+1)+""+(GradewiseSubjects[i].gradeId)+""+GradewiseSubjects[i].testSubjects[j].id+"S"
            cobj.name=GradewiseSubjects[i].testSubjects[j].subjectName;
            obj.children.push(cobj);
        }
        ExamData[k].children.push(obj)
    }

    return ExamData;
  }
  

  const theme = createMuiTheme();
  const BreadcrumbsComp = () => {
    return <div className="col-9" style={{marginTop:window.screen.width<770?'7vh':'0'}}>
    <div style={{marginTop:'10px'}}>
           
        <div style={{background:'silver',marginBottom:'20px',width:'100%'}} >
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
  }
    return (
        <div style={{top:'20vh'}} className="container-fluid" >
            <div className="row">
              {
              window.screen.width >=770 ?
              <>
              <TreeView className={window.screen.width<770?classes.treeviewmobile+'':classes.treeview+' col-md-2'} 
                  expanded={expanded}  selected={selected}
                  onNodeToggle={handleToggle}  
                  onNodeSelect={handleSelect}
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
              <div className="col-10">
                    <div  > {BreadcrumbsComp()} </div>
                    <AllTests selectedData={selectedData}  />
              </div>
              </>
              :
              <div>
                  <div style={{position:'fixed',background:'#232F3E',height:'7vh',top:'15vh',left:0,right:0,
                  width:'100%',alignItems:'center',display:'flex',fontWeight:'bolder',zIndex:2500,padding:'10px'}}> 
                      <div className="row" style={{fontSize:'18px',paddingLeft:'20px',color:'white',width:'100%'}}>
                          <div onClick={toggleDrawer(true)} className="col-1" >
                              <i class="fa fa-chevron-circle-down"></i>
                             
                          </div>
                          <div className="col-10">
                          <span style={{marginLeft:'3px'}}> Courses</span>
                          </div>
                          
                      </div>
                  </div>
                  <Drawer anchor={'left'} open={anchor} style={{zIndex:3000,marginTop:'15vh'}} onClose={toggleDrawer(false)}>
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
                          onNodeToggle={handleToggle}
                          expanded={expanded}  selected={selected}
                          onNodeSelect={handleSelect}
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
                  <div>
                        {BreadcrumbsComp()}
                        <AllTests selectedData={selectedData} />
                  </div>
              </div>
              }
              
              
            </div>
        </div>
    )
}

export default Exams
