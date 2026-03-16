import { GoogleOutlined } from "@ant-design/icons";

const GoogleButton = () => {
  return (
    <a href={`${import.meta.env.VITE_API_URL}/auth/google`} className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 mb-6">
      <GoogleOutlined />
      Continue with Google
    </a>
  );
}

export default GoogleButton