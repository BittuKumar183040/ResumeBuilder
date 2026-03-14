import { DownloadOutlined } from '@ant-design/icons';

const GeneratePdf = () => {
  return (
    <button
      onClick={() => window.print()}
      className="flex gap-2 text-sm cursor-pointer items-center rounded-lg border whitespace-nowrap
      border-emerald-300 bg-emerald-600 text-white active:scale-95 shadow-md shadow-emerald-200 p-1 px-3 
      hover:bg-emerald-700 transition-all duration-200"
    >
      <DownloadOutlined size={10} />
      Generate PDF
    </button>
  );
};

export default GeneratePdf;