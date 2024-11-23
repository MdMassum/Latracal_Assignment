import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [time, setTime] = React.useState(3);

  React.useEffect(() => {
    if (time <= 0) navigate("/home");
  }, [time]);

  React.useEffect(() => {
    setInterval(() => {
      setTime((state) => state - 1);
    }, 1000);
  }, []);
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <p className="text-5xl font-semibold">404</p>
      <p className="text-lg font-medium text-gray-500">Page Not Found</p>
      <p className="mt-4 text-sm">
        Redirecting in {time} seconds to HomePage...
      </p>
    </div>
  );
};

export default NotFoundPage;
