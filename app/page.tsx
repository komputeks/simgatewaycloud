export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          SIM Gateway Cloud
        </h1>
        <p className="text-xl text-zinc-400">Turn Android phones into SMS gateways</p>
        <div className="mt-12 flex gap-4 justify-center">
          <a href="https://github.com/komputeks/simgatewaycloud" className="px-6 py-3 bg-white text-black rounded-xl font-medium">GitHub</a>
        </div>
      </div>
    </div>
  );
}
