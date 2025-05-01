import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#202127] text-[#e8e6e3]">
      <img
        alt="logo"
        className="mb-5 h-32 w-32 select-none transition-filter duration-300 hover:filter hover:drop-shadow-[0_0_1.2em_#6988e6aa]"
        src={electronLogo}
        style={{ willChange: 'filter', WebkitUserDrag: 'none' } as React.CSSProperties}
      />
      <div className="text-sm leading-4 text-[rgba(235,235,245,0.6)] font-semibold mb-2.5">
        Powered by electron-vite
      </div>
      <div className="text-[28px] text-[rgba(255,255,245,0.86)] font-bold leading-8 text-center mx-2.5 py-4 md:text-[28px] max-md:text-xl">
        Build an Electron app with{' '}
        <span className="bg-gradient-to-br from-[#087ea4] to-[#7c93ee] bg-clip-text text-transparent font-bold">
          React
        </span>
        {' + '}
        <span className="bg-gradient-to-br from-[#3178c6] to-[#f0dc4e] bg-clip-text text-transparent font-bold">
          TypeScript
        </span>
        {' and '}
        <span className="bg-gradient-to-br from-[#06b6d4] to-[#3b82f6] bg-clip-text text-transparent font-bold">
          Tailwind CSS
        </span>
      </div>
      <p className="text-base leading-6 text-[rgba(235,235,245,0.6)] font-semibold max-[350px]:hidden">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="flex flex-wrap pt-8 m-[-6px] justify-start max-[350px]:hidden">
        <div className="flex-shrink-0 p-1.5">
          <a
            href="https://electron-vite.org/"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer no-underline inline-block border border-transparent text-center font-semibold whitespace-nowrap rounded-[20px] px-5 leading-[38px] text-sm text-[rgba(255,255,245,0.86)] bg-[#32363f] hover:border-transparent hover:text-[rgba(255,255,245,0.86)] hover:bg-[#414853]"
          >
            Documentation
          </a>
        </div>
        <div className="flex-shrink-0 p-1.5">
          <a
            target="_blank"
            rel="noreferrer"
            onClick={ipcHandle}
            className="cursor-pointer no-underline inline-block border border-transparent text-center font-semibold whitespace-nowrap rounded-[20px] px-5 leading-[38px] text-sm text-[rgba(255,255,245,0.86)] bg-[#32363f] hover:border-transparent hover:text-[rgba(255,255,245,0.86)] hover:bg-[#414853]"
          >
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions>
    </div>
  )
}

export default App
