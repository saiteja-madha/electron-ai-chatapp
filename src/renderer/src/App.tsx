import { Button } from './components/ui/button'

function App(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh bg-[#202127]">
      <Button variant="outline" className="cursor-pointer">
        Click me
      </Button>
    </div>
  )
}

export default App
