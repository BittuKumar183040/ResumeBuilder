import { DownloadOutlined } from '@ant-design/icons';

const GeneratePdf = () => {

  return (
    <button 
      onClick={() => window.print()}
      className=' flex gap-2 cursor-pointer items-center rounded-md bg-blue-200 text-gray-800 active:scale-95 shadow-md border border-blue-300 p-1 px-3'
    >
      <DownloadOutlined />
      Generate PDF
    </button>
  )
}

export default GeneratePdf