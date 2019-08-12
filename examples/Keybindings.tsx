import { NavigateProvider, NavigateProviderProps, Shortcuts } from '../src'
import { KeyDown } from '../src/Shortcuts/KeyDown'

export const Keybindings: React.SFC<{}> = (props) => {
  return (
    <NavigateProvider>
      {(index, imageList, handlers) => (
        <Shortcuts>
          <KeyDown shortKey="arrowLeft" callback={handlers.onNavigatePrev} />
          <KeyDown shortKey="arrowRight" callback={handlers.onNavigateNext} />
        </Shortcuts>
      )}
    </NavigateProvider>
  )
}
Keybindings.displayName = 'Keybindings'
