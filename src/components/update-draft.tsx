import { useFrontContext } from "~/providers/front-context";
import { Button } from "./ui/button"
import { useState } from "react";
import Front from "@frontapp/plugin-sdk";
import type { ConversationContext } from "@frontapp/plugin-sdk";


export function UpdateDraft() {
  const [isLoading, setIsLoading] = useState(false);
  const context = useFrontContext();
  const icon = {name: "loader" as const, spin: true}

  return (
    <Button onClick={() => updateDraft(context, setIsLoading)} disabled={isLoading} icon={isLoading ? icon : undefined}>
      {isLoading ? 'Updating...' : 'Update Draft'}
    </Button>
  );
};

async function updateDraft(
  context: ConversationContext | undefined,
  setIsLoading: (isLoading: boolean) => void
) {
  setIsLoading(true);

  if (context?.type !== 'singleConversation') {
    setIsLoading(false);
    throw new Error('UpdateDraft can only be used in a single conversation');
  }

  const { conversation } = context;

  if (!conversation.draftId) {
    setIsLoading(false);
    throw new Error('Conversation has no draft');
  }

  try {
  await Front.updateDraft(conversation.draftId, {
    updateMode: 'insert',
    content: {
      type: 'text',
      body: 'This is a draft',
    }
  });

  setIsLoading(false);
  } catch (error) {
    console.error(error);
    setIsLoading(false);
  }
}