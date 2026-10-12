import ClientPaginationGuide from "./components/ClientPaginationGuide";
import PaginationVisualizer from "./components/PaginationVisualizer";

export default function App() {
  return (
    <main className="app">
      <header>
        <h1>Pagination visualizer</h1>
        <p className="muted">Offset vs page in the grid above. Below, slice a list you already fetched.</p>
      </header>

      <PaginationVisualizer />

      <hr className="section-divider" />

      <ClientPaginationGuide />
    </main>
  );
}
