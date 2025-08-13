import { useFrontContext } from "~/providers/front-context";
import { Button } from "./ui/button"
import { useState } from "react";
import Front from "@frontapp/plugin-sdk";
import type { ConversationContext } from "@frontapp/plugin-sdk";


export type UpdateMode = 'insert' | 'replace';

export function UpdateDraft({ updateMode = 'insert' }: { updateMode?: UpdateMode }) {
  const [isLoading, setIsLoading] = useState(false);
  const context = useFrontContext();
  const icon = {name: "loader" as const, spin: true}

  return (
    <Button onClick={() => updateDraft(context, setIsLoading, updateMode)} disabled={isLoading} icon={isLoading ? icon : undefined}>
      {isLoading ? 'Updating...' : `Update Draft (${updateMode})`}
    </Button>
  );
};

async function updateDraft(
  context: ConversationContext | undefined,
  setIsLoading: (isLoading: boolean) => void,
  updateMode: UpdateMode
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
  const randomSuffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  await Front.updateDraft(conversation.draftId, {
    updateMode,
    content: {
      type: 'text',
      body: `This is a draft ${randomSuffix}`,
    }
  });

  setIsLoading(false);
  } catch (error) {
    console.error(error);
    setIsLoading(false);
  }
}