import type { MetaFunction } from "@remix-run/node";

import { Todo } from "~/components/Todo";

export const meta: MetaFunction = () => ({
  title: "Kitchen Sink",
});

interface ComponentDemoProps {
  title: React.ReactNode;
  children: React.ReactNode;
}
const ComponentDemo = ({ title, children }: ComponentDemoProps) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-2 font-semibold">{title}</h2>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
};

export default function KitchenSink() {
  return (
    <div className="bg-gray-100 h-screen w-full">
      <h1 className="text-4xl">Kitchen sink</h1>

      <ComponentDemo title="Todo komponent">
        <div>
          <Todo size="small" display="inline-flex" title="Liten" />
        </div>
        <Todo
          badge
          size="small"
          display="inline-flex"
          className="w-48 h-8"
          title="Liten'ish"
        />
        <div>
          <Todo size="small" title="Liten og lang" />
        </div>

        <Todo
          size="small"
          title="Med litt farge"
          className="bg-teal-600 text-gray-100"
        />

        <Todo className="h-40" title="Stor med en høyde" />
        <Todo badge className="h-40" title="Stor med innhold">
          <p>Her kan man putte litt mer beskrivelse av hva som skal lages.</p>
          <p>
            Bruk <code>badge</code> prop'en for å vise tydlig at komponetet er
            en Todo i de tilfellene man legger på ekstra midlertidig styling
          </p>
        </Todo>
      </ComponentDemo>
    </div>
  );
}
