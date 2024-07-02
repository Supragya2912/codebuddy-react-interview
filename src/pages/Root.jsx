import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-tr from-[#fef3ed] to-[#6fb1f2] py-7 text-black">
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
