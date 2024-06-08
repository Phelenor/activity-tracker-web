import React, { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const ws = new WebSocket("wss://your-websocket-url");

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData((prevData) => [...prevData, newData]);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="p-4 bg-surface-light text-surface-on">
      <h2 className="text-2xl font-bold mb-4 text-primary-light">Dashboard</h2>
      <div className="flex flex-wrap">
        {data.map((item, index) => (
          <div key={index} className="w-1/4 p-2">
            <div className="border p-4 rounded shadow bg-surface-container-high">
              <pre className="text-surface-on">{JSON.stringify(item, null, 2)}</pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
