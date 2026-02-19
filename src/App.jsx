import { useEffect, useRef, useState } from 'react';
import GeneratePdf from './components/GeneratePdf';
import Builder from './resume/Builder';
import Switch from './components/Switch';
import { GithubOutlined, HolderOutlined, LinkedinFilled, MailFilled, MenuOutlined, MoreOutlined } from '@ant-design/icons';
import Header from './userInput/Header';
import ZoomHandler from './components/ZoomHandler';
import { SeperatorVertical } from './components/Seperator';
import Experience from './userInput/Experience';

function App() {
  const [modifyEnabled, setModifyEnable] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [sidePanelCollapse, setSidePanelCollapse] = useState(false);
  const resumeContent = useRef(null);
  const [header, setHeader] = useState({
    fullname: {
      label: "Full Name",
      className: "text-3xl font-semibold tracking-wide uppercase",
      value: "Bittu Kumar"
    },
    contacts: {
      label: "Contacts",
      className: "font-medium",
      value: "+91-7563872977"
    },
    links: {
      label: "Links",
      className: "flex gap-4 text-sm",
      items: [
        {
          key: "mail",
          icon: MailFilled,
          label: "Email",
          className: "flex gap-1.5 items-center",
          example: "resume@mail.com",
          value: "bk183040@gmail.com"
        },
        {
          key: "linkedin",
          icon: LinkedinFilled,
          label: "Linkedin",
          className: "flex gap-1.5 items-center",
          value: "bittukumar183040",
          example: "https://www.linkedin.com/in/<username>",
          url: "https://www.linkedin.com/in/bittukumar183040/"
        },
        {
          key: "github",
          icon: GithubOutlined,
          label: "GitHub",
          className: "flex gap-1.5 items-center",
          value: "BittuKumar183040",
          example: "https://github.com/<username>",
          url: "https://github.com/BittuKumar183040"
        }
      ]

    },
  })

  const [experiences, setExperiences] = useState({
    label: "EXPERIENCE",
    value: [{
      designation: { lable: "Designation", value: "Software Developer", className: " text-sm font-medium tracking-wide" },
      company: { label: "Company", className: "text-sm font-medium", value: "BosonQ Psi Technology Pvt. Ltd."},
      duration: { label: "Duration", className: "italic text-sm font-medium", start: { label: "Start", value: "June 2023" }, end: { label: "End", value: "Present" } },
      mode: { label: "Mode", value: "Remote + Hybrid", className: " text-sm italic font-medium" },
      location: { lable: "Location", value: "Bangalore", className: " text-sm font-medium" },
      description: {
        lable: "Description",
        className: "list-disc space-y-1 text-sm",
        value: [
          <li key={1}>Developed a <span className="font-semibold ">full-stack microservices-based simulation platform </span>using React, Spring Boot, and FastAPI, supporting secure storage (<span className="font-semibold">S3, PVC</span>), versioning, multi-tenancy, and API access control.</li>,
          <li key={2}>Designed and built a <span className="font-semibold">2D/3D visualization engine </span>using WebGL and Three.js.</li>,
          <li key={3}>Implemented <span className="font-semibold">JWT-based authentication</span> with bcrypt, enabling role-based access control.</li>,
          <li key={4}>Built <span className="font-semibold">RESTful APIs</span> across microservices using FastAPI and Spring Boot with OpenAPI.</li>,
          <li key={5}>Crafted a <span className="font-semibold">responsive UI</span> using React, Redux, TypeScript, and Tailwind CSS.</li>,
          <li key={6}>Maintained high code quality through <span className="font-semibold">modular architecture</span>, unit and integration testing.</li>,
          <li key={7}>Designed PostgreSQL schemas with <span className="font-semibold">ORM-based migrations </span>and efficient data-access patterns.</li>,
          <li key={8}>Containerized and deployed services using <span className="font-semibold">Podman and Docker </span>on AWS with exposure to Kubernetes and GitOps.</li>
        ]}
    }]
  }
)

  useEffect(() => {
    if (modifyEnabled && resumeContent.current) {
      resumeContent.current.contentEditable = true;
    } else if (resumeContent.current) {
      resumeContent.current.contentEditable = false;
    }
  }, [modifyEnabled])

  return (
    <div className=' flex flex-col h-dvh w-full'>
      <div className=' relative flex-1 flex justify-between overflow-auto'>
        <div className={` resume-sidebar relative shrink-0 space-y-2 shadow overflow-y-auto overflow-x-hidden transition-all 
          ${sidePanelCollapse ? "w-8 p-0" : " xl:w-110 md:w-82 w-60 p-4" }`}>
          <div className='flex items-center justify-between border-b-2 border-gray-300'>
            {!sidePanelCollapse && <p className=' font-medium truncate'>Betoo Resume Builder</p> }
            <button className=' p-2 cursor-pointer' onClick={()=>setSidePanelCollapse(!sidePanelCollapse)}> <MenuOutlined /></button>
          </div>
          <div className={` ${sidePanelCollapse && "w-0 opacity-0"} transition-all`}>
            <Header header={header} setHeader={setHeader} />
            {/* <Experience experiences={experiences} setExperiences={setExperiences} /> */}
          </div>
        </div>
        <div style={{ zoom: zoom }} className={`resume-divider flex items-start xl:justify-center w-full relative overflow-auto shadow-inner transition-all`}>
          <Builder header={header} experiences={experiences} ref={resumeContent} />
        </div>
      </div>
      <div className=' flex h-12 justify-between items-center p-4 bg-white gap-2 shadow-inner mt-2'>
        <div className=' flex items-center gap-4 h-full'>
          <ZoomHandler zoom={zoom} setZoom={setZoom} />
          <SeperatorVertical />
          <Switch label="Free Edit" onChange={(val) => setModifyEnable(val)} />
          <SeperatorVertical />
        </div>
        <div className=' flex items-center h-full gap-4'>
          <SeperatorVertical />
          <GeneratePdf />
        </div>
      </div>
    </div>
  )
}

export default App
