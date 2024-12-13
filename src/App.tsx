import { useState } from "react";
import { HttpClient, Tendermint37Client } from "@cosmjs/tendermint-rpc";

function App() {
  const [rpc, setRpc] = useState("");
  const [tmClient, setTmClient] = useState<Tendermint37Client | null>(null);

  const connectRpcClient = async () => {
    try {
      if (!rpc || rpc === "") {
        throw new Error("Please insert RPC address");
      }
      const httpClient = new HttpClient(rpc);
      const client = await Tendermint37Client.create(httpClient);
      const status = await client.status();
      console.log({ rpc, status });
      setTmClient(client);
      window.alert("Connected to RPC successfully!");
    } catch (error) {
      window.alert(error instanceof Error ? error.message : error);
      console.error(error instanceof Error ? error.message : error);
    }
  };

  const disconnectRpcClient = () => {
    try {
      if (!tmClient) {
        throw new Error("No client connected");
      }
      tmClient.disconnect();
      setTmClient(null);
      window.alert("Disconnected from RPC!");
    } catch (error) {
      window.alert(error instanceof Error ? error.message : error);
      console.error(error instanceof Error ? error.message : error);
    }
  };

  return (
    <>
      <main className="max-w-screen-2xl mx-auto py-10">
        <h1 className="text-xl font-extrabold">TEST RPC</h1>
        <p>RPC Address: {rpc}</p>
        <pre>TM Client: {JSON.stringify(tmClient, null, 2)}</pre>
        <input
          type="text"
          onChange={(e) => setRpc(e.target.value)}
          className="border border-black rounded-xl py-2 px-4"
          placeholder="rpc address"
        />
        <button
          onClick={connectRpcClient}
          className="py-2 px-4 bg-blue-200 rounded-xl mx-2"
        >
          Connect to RPC
        </button>
        <button
          className="py-2 px-4 bg-red-200 rounded-xl mx-2"
          onClick={disconnectRpcClient}
          disabled={!tmClient}
        >
          Disconnect
        </button>
      </main>
    </>
  );
}

export default App;
