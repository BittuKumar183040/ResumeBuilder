import { DownloadOutlined } from '@ant-design/icons';

const GeneratePdf = () => {
  return (
    <button 
      onClick={() => window.print()}
      className=' flex gap-2 text-sm cursor-pointer items-center rounded-md border
      border-blue-300 bg-blue-200 text-gray-800 active:scale-95 shadow-md  p-1 px-3'
    >
      <DownloadOutlined size={10} />
      Generate PDF
    </button>
  )
}

export default GeneratePdf