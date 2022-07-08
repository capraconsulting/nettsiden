import { Todo } from "./todo";

export const TodoStories = () => (
  <div className="flex flex-col gap-2">
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
        Bruk <code>badge</code> prop'en for å vise tydlig at komponetet er en
        Todo i de tilfellene man legger på ekstra midlertidig styling
      </p>
    </Todo>
  </div>
);
