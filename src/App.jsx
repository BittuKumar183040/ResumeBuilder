import { useEffect, useRef, useState } from 'react';
import GeneratePdf from './components/GeneratePdf';
import Builder from './resume/Builder';
import { MenuOutlined } from '@ant-design/icons';
import Header from './userInput/Header';
import { SeperatorVertical } from './components/Seperator';
import Experience from './userInput/Experience';
import Projects from './userInput/Projects';
import Skills from './userInput/Skills';
import Education from './userInput/Education';
import Certification from './userInput/Certification';
import { certificationsData, educationData, experiencesData, headerData, projectsData, skillsData } from './data/ResumeData';
import SettingsToolbar from './components/SettingsToolbar';
import { FONTS } from './data/fonts';


function App() {
  const [sidePanelCollapse, setSidePanelCollapse] = useState(false);
  const resumeContent = useRef(null);

  const [header, setHeader] = useState(headerData)
  const [experiences, setExperiences] = useState(experiencesData)
  const [projects, setProjects] = useState(projectsData)
  const [skills, setSkills] = useState(skillsData)
  const [education, setEducation] = useState(educationData)
  const [certifications, setCertifications] = useState(certificationsData)

  const [settings, setSettings] = useState({
    zoom: { label: "Zoom", value: 1 },
    modifyEnabled: { label: "Free Edit", value: false},
    pageSize:[
      {label: "A4", value: "aspect-[1/1.414] w-198.5 h-280.75"},
      {label: "Letter", value: "aspect-[1.275/1] w-200 h-157.48"},
      {label: "Legal", value: "aspect-[1.275/1] w-200 h-216"}
    ],
    font: FONTS,
    previewType: [
      { label: "Exact", value: "exact" },
      { label: "Webpage", value: "webpage" }
    ]
   })

  useEffect(() => {
    console.log(settings)
    if (settings.modifyEnabled.value && resumeContent.current) {
      resumeContent.current.contentEditable = true;
    } else if (resumeContent.current) {
      resumeContent.current.contentEditable = false;
    }
  }, [settings, settings.modifyEnabled.value])

  return (
    <div className=' flex flex-col h-dvh w-full'>
      <div className=' relative flex-1 flex justify-between overflow-auto'>
        <div className={` resume-sidebar relative shrink-0 space-y-2 shadow overflow-y-auto overflow-x-hidden transition-all 
          ${sidePanelCollapse ? "w-8 p-0" : " xl:w-110 md:w-82 w-60 p-4"}`}>

          <div className='flex items-center justify-between border-b-2 border-gray-300'>
            {!sidePanelCollapse && <img src="/logo.png" alt="Logo" className='h-6' />}
            <button className=' p-2 cursor-pointer' onClick={() => setSidePanelCollapse(!sidePanelCollapse)}> <MenuOutlined /></button>
          </div>

          <div className={` ${sidePanelCollapse && "w-0 opacity-0"} transition-all`}>
            <Header header={header} setHeader={setHeader} />
            <Experience experiences={experiences} setExperiences={setExperiences} />
            <Projects projects={projects} setProjects={setProjects} />
            <Skills skills={skills} setSkills={setSkills} />
            <Education education={education} setEducation={setEducation} />
            <Certification certifications={certifications} setCertifications={setCertifications} />
          </div>

        </div>
        <div style={{ zoom: settings.zoom.value }} className={`resume-divider flex items-start ${settings.previewType.find((o) => o.selected)?.value === "webpage" ? "" : " xl:justify-center"} w-full relative overflow-auto shadow-inner transition-all`}>
          <Builder 
            header={header} 
            experiences={experiences} 
            projects={projects} 
            skills={skills} 
            education={education} 
            certifications={certifications} 
            settings={settings}  
            ref={resumeContent}  
          />
        </div>
      </div>
      <div className=' flex justify-between items-center p-4 bg-white gap-2 shadow-inner'>
        <SettingsToolbar settings={settings} setSettings={setSettings} />
        <div className=' flex items-center h-full gap-4'>
          <SeperatorVertical />
          <GeneratePdf />
        </div>
      </div>
    </div>
  )
}

export default App
