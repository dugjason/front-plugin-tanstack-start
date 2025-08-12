import { createFileRoute } from '@tanstack/react-router';
import { PluginContent } from '~/components/plugin-content';
import { Container } from '~/components/ui/container';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <Container>
    <div className="text-center py-8 justify-center">
      <h1 className="font-medium text-xl mb-4">Front Plugin Demo</h1>

      <PluginContent />
    </div>
    </Container>
  );
}
