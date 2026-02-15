import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons'

const ZoomHandler = ({ zoom, setZoom, className }) => {

  return (<div className={` flex items-center gap-2 text-gray-800 ${className}`}>
  
    <button 
      className={` active:scale-90 transition-all cursor-pointer
        ${zoom < 0.2 && "pointer-events-none opacity-40"}
      `}
      onClick={() => setZoom(prev => prev - 0.1)}
    >
      <ZoomOutOutlined className=' text-xl'/>
    </button>
    <button 
      className={` active:scale-90 transition-all cursor-pointer
        ${zoom >= 1 && "pointer-events-none opacity-40"}
      `}
      onClick={() => setZoom(prev => prev + 0.1)}>
      <ZoomInOutlined className=' text-xl'/>
    </button>
    <select value={zoom} className=' outline-0 w-16 h-8 p-0 border rounded-md border-gray-300 text-gray-800' onChange={(e) => setZoom(parseFloat(e.target.value))}>
      {[0.75, 0.85, 0.95, ...Array.from({ length: 10 }, (_, i) => (i + 1) * 0.1)].sort((a, b) => a - b).map(value => (
        <option key={value} value={value}>{Math.round(value * 100)}%</option>
      ))}
    </select>
  </div>
  )
}

export default ZoomHandler