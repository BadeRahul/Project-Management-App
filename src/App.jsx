import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectSidebar from "./components/ProjectSidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {

  const [projectsState,setProjectState] = useState({
    // currentAction:'nothing-selected'
    selectedProjectId:undefined,
    projects:[],
    tasks:[]
  });

  function handleAddTask(text){

    setProjectState((prevState) =>{
      const taskId = Math.random();
      const newTask = {
        text : text,
        projectId: prevState.selectedProjectId,
        id:taskId,
        
      };
      return{
        ...prevState,
        selectedProjectId:undefined,
        tasks:[newTask,...prevState.tasks],
      };
    });

  }

  function handleDeleteTask(id){
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId:undefined,
        tasks: prevState.tasks.filter((task) => task.id !== id
      ),
      };
    });
  }

  function handleSelectProject(id){
    setProjectState(prevState=>{
      return {
        ...prevState,
        selectedProjectId:id,
      };
    });
  }

  function handleStartAddProject(){
    setProjectState(prevState=>{
      return {
        ...prevState,
        selectedProjectId:null,
      };
    });
  }
  function handleCancelAddProject(){
    setProjectState(prevState=>{
      return {
        ...prevState,
        selectedProjectId:undefined,
      };
    });
  }

  function handleAddProject(projectData){
    setProjectState(prevState =>{
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id:projectId,
        
      };
      return{
        ...prevState,
        selectedProjectId:undefined,
        projects:[...prevState.projects,newProject],
      };
    });
  }

  // console.log(projectsState);

  function handleDeleteProject(){
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId:undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId
      ),
      };
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject } onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectsState.tasks}></SelectedProject>;

  if(projectsState.selectedProjectId=== null){
    content=<NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }else if (projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8 ">
      <ProjectSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject} selectedProjectId={projectsState.selectedProjectId}/>
      {content}
    </main>
  );
}

export default App;
