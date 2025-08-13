import { UpdateDraft } from "./update-draft";

export const PluginContent = () => {
  return (
    <div>
      <UpdateDraft updateMode="insert" />
      <UpdateDraft updateMode="replace" />
    </div>
  );
};