import ClientPaginationGuide from "./components/ClientPaginationGuide";
import PaginationVisualizer from "./components/PaginationVisualizer";

export default function App() {
  return (
    <main className="app">
      <header>
        <h1>Pagination visualizer</h1>
        <p className="muted">High-level pagination concepts, then a TypeScript recipe for long lists.</p>
      </header>

      <PaginationVisualizer />

      <hr className="section-divider" />

      <ClientPaginationGuide />
    </main>
  );
}
