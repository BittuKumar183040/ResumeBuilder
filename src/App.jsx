import { useEffect, useRef, useState } from 'react';
import GeneratePdf from './components/GeneratePdf';
import Builder from './resume/Builder';
import Switch from './components/Switch';
import { GithubOutlined, LinkedinFilled, MailFilled, MenuOutlined, MoreOutlined } from '@ant-design/icons';
import Header from './userInput/Header';
import ZoomHandler from './components/ZoomHandler';
import { SeperatorVertical } from './components/Seperator';
import Experience from './userInput/Experience';
import Projects from './userInput/Projects';
import Skills from './userInput/Skills';
import Education from './userInput/Education';
import Certification from './userInput/Certification';

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

  const [experiences, setExperiences] = useState([
    {
      designation: { label: "Designation", className: "tracking-wide text-sm font-semibold", value: "Software Developer" },
      company: { label: "Company", className: "text-xs font-medium", value: "BosonQ Psi Technology Pvt. Ltd." },
      duration: { label: "Duration", className: "italic text-sm", value: { start: "June 2023", end: "Present" } },
      mode: { label: "Mode", className: "italic text-xs", value: "Remote + Hybrid" },
      location: { label: "Location", className: "italic text-xs", value: "Bangalore" },
      description: {
        label: "Description",
        className: "list-disc pl-5 space-y-1 text-sm ml-4",
        value: [
          <li key={1}>Developed a <span className="font-semibold">full-stack microservices simulation platform used by 1000+ users, handling 200 to 500+ API requests per day</span> build using React, Spring Boot, and FastAPI with secure storage (<span className="font-semibold">S3, PVC</span>), versioning, multi-tenancy, and API access control.</li>,
          <li key={2}>Designed and built a <span className="font-semibold">2D/3D visualization engine</span> using WebGL and Three.js.</li>,
          <li key={3}>Implemented <span className="font-semibold">JWT-based authentication</span> with bcrypt enabling role-based access control.</li>,
          <li key={4}>Built <span className="font-semibold">RESTful APIs</span> across microservices using FastAPI and Spring Boot with OpenAPI.</li>,
          <li key={5}>Crafted a <span className="font-semibold">Responsive UI</span> using React, Redux, TypeScript, and Tailwind CSS.</li>,
          <li key={6}>Maintained high code quality through <span className="font-semibold">modular architecture</span>, unit and integration testing.</li>,
          <li key={7}>Designed optimized PostgreSQL schemas improving query performance by 40%. <span className="font-semibold">ORM-based migrations</span> and efficient data-access patterns.</li>,
          <li key={8}>Containerized and deployed services using <span className="font-semibold">Podman and Docker</span> on AWS with exposure to Kubernetes and GitOps.</li>
        ]
      }
    }
  ])

  const [projects, setProjects] = useState([
    {
      title: { label: "Title", className: "font-semibold", value: "Model Visulization Website" },
      technology: { label: "Technology", className: "text-xs italic", value: ["React JS", "WebGL", "Three JS", "File Processing", "Optimization"] },
      live: { label: "View", className: "font-medium", value: "https://3drr.betoo.co.in" },
      github: { label: "Github", className: "font-medium", value: "https://github.com/BittuKumar183040/3DRenderer" },
      date: { label: "Date", className: "text-xs italic", value: "March 2025" },
      description: {
        label: "Description",
        className: "list-disc pl-5 space-y-1 ml-4 text-sm",
        value: [
          <li key={1}>Designed and developed a <span className="font-semibold">browser-based 2D/3D model visualization tool</span> using <span className="font-semibold">React, WebGL, and Three.js</span>.</li>,
          <li key={2}>Built advanced <span className="font-semibold">scene controls</span> such as orbit controls, axis helpers, mesh isolation.</li>,
          <li key={3}>Solved <span className="font-semibold">scaling and performance challenges</span> using bounding-box fitting and camera auto-framing.</li>
        ]
      }
    },
    {
      title: { label: "Title", className: "font-semibold", value: "Windoes" },
      technology: { label: "Technology", className: "text-xs italic", value: ["React", "Redux", "Express.js", "FastAPI", "Microservices", "Spring Boot", "JWT Auth", "PostgreSQL"] },
      live: { label: "View", className: "font-medium", value: "https://betoo.co.in" },
      github: { label: "Github", className: "font-medium", value: "https://github.com/BittuKumar183040?tab=repositories&q=windoes" },
      date: { label: "Date", className: "text-xs italic", value: "Nov 2025" },
      description: {
        label: "Description",
        className: "list-disc pl-5 space-y-1 ml-4 text-sm",
        value: [
          <li key={1}>Built a <span className="font-semibold">pixel-perfect Windows 11 style web application</span> with highly interactive UI and native-like behavior.</li>,
          <li key={2}>Designed a <span className="font-semibold">microservices architecture</span> including Auth, Identity, services, and API Gateway.</li>,
          <li key={3}>Implemented <span className="font-semibold">centralized JWT validation</span> at the gateway for consistent authorization.</li>,
          <li key={4}>Implemented <span className="font-semibold">Object storage using S3 and PVC</span> for portable storage migration.</li>,
          <li key={5}>Integrated <span className="font-semibold">OpenAPI and Swagger UI</span> for API documentation and testing.</li>,
          <li key={6}>Optimized client-side performance using <span className="font-semibold">browser memory and state management</span>.</li>
        ]
      }
    }
  ])

  const [skills, setSkills] = useState([
    {
      category: { label: "Category", className: "font-semibold text-sm", value: "Languages" },
      items: { label: "Items", className: "text-sm", value: ["JavaScript", "Python", "Java", "SQL", "HTML/CSS"] }
    },
    {
      category: { label: "Category", className: "font-semibold text-sm", value: "Developer Tools" },
      items: { label: "Items", className: "text-sm", value: ["Git", "GitHub", "Azure Repos", "Podman", "Bruno", "VS Code", "IntelliJ", "PyCharm"] }
    },
    {
      category: { label: "Category", className: "font-semibold text-sm", value: "Technologies/Frameworks" },
      items: { label: "Items", className: "text-sm", value: ["React", "Redux", "Node.js", "FastAPI", "Spring Boot", "Express", "PostgreSQL"] }
    },
    {
      category: { label: "Category", className: "font-semibold text-sm", value: "Deployment & DevOps" },
      items: { label: "Items", className: "text-sm", value: ["Containerization", "CI/CD", "SonarQube", "Pen Testing", "AWS", "S3", "PVC"] }
    },
    {
      category: { label: "Category", className: "font-semibold text-sm", value: "Management Skills" },
      items: { label: "Items", className: "text-sm", value: ["Agile delivery", "Sprint Planning", "Task Assignment", "Code Review Oversight", "Cross-Team Communication", "System Architecture Understanding", "Team Mentoring"] }
    }
  ])

  const [education, setEducation] = useState([
    {
      degree: { label: "Degree", className: "text-sm font-medium", value: "MCA - Master in Computer Application" },
      location: { label: "Location", className: "italic text-sm", value: "Bhopal, Madhya Pradesh, IN" },
      college: { label: "College", className: "font-medium text-xs", value: "LNCT - Lakshmi Narain College of Technology" },
      duration: { label: "Duration", className: "italic text-xs", value: "2021 - 2023" }
    }
  ])

  const [certifications, setCertifications] = useState([{ 
    title: { label: "Title", className: "font-medium", value: "Certified Full Stack Developer" },
    year: { label: "Year", className: "italic", value: "2023" },
    issuer: { label: "Issuer", className: "", value: "Mentorkart" }
  }
])



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
          ${sidePanelCollapse ? "w-8 p-0" : " xl:w-110 md:w-82 w-60 p-4"}`}>
          <div className='flex items-center justify-between border-b-2 border-gray-300'>
            {!sidePanelCollapse && <p className=' font-medium truncate'>Betoo Resume Builder</p>}
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
        <div style={{ zoom: zoom }} className={`resume-divider flex items-start xl:justify-center w-full relative overflow-auto shadow-inner transition-all`}>
          <Builder header={header} experiences={experiences} projects={projects} skills={skills} education={education} certifications={certifications}  ref={resumeContent} />
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
