import { useState } from 'react'

function Versions(): React.JSX.Element {
  const [versions] = useState(window.electron.process.versions)

  return (
    <ul className="absolute bottom-[30px] mx-auto py-[15px] px-0 font-mono inline-flex overflow-hidden items-center rounded-[22px] bg-[#202127] backdrop-blur-[24px] max-[620px]:hidden">
      <li className="block float-left border-r border-r-[#515c67] px-5 text-sm leading-[14px] opacity-80 last:border-r-0">
        Electron v{versions.electron}
      </li>
      <li className="block float-left border-r border-r-[#515c67] px-5 text-sm leading-[14px] opacity-80 last:border-r-0">
        Chromium v{versions.chrome}
      </li>
      <li className="block float-left border-r border-r-[#515c67] px-5 text-sm leading-[14px] opacity-80 last:border-r-0">
        Node v{versions.node}
      </li>
      <li className="block float-left border-r border-r-[#515c67] px-5 text-sm leading-[14px] opacity-80 last:border-r-0">
        Tailwind v4
      </li>
    </ul>
  )
}

export default Versions
