import {createContext, useContext, useEffect, useState, FC} from 'react';
import {ConversationContext} from '@frontapp/plugin-sdk';
import Front from '@frontapp/plugin-sdk';
import { Container } from '~/components/ui/container';

/*
 * Context.
 */

export const FrontContext = createContext<ConversationContext | undefined>(undefined);

/*
 * Hook.
 */

export function useFrontContext() {
  return useContext(FrontContext);
}

/*
 * Component.
 */

export const FrontContextProvider: FC<{children: React.ReactNode}> = ({children}) => {
  const [context, setContext] = useState<ConversationContext>();

  useEffect(() => {
    const subscription = Front.contextUpdates.subscribe(frontContext => {
      setContext(frontContext as ConversationContext);
    })
    return () => subscription.unsubscribe();
  }, [])

  return (
    <FrontContext.Provider value={context}>
      {
        context?.type === "singleConversation" 
          ? children 
          : <RequireSingleConversation />}
    </FrontContext.Provider>
  )
}

const RequireSingleConversation = () => (
  <Container>
    <h1>Not a single conversation</h1>
  </Container>
)