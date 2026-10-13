import ClientPaginationGuide from "./components/ClientPaginationGuide";
import PaginationVisualizer from "./components/PaginationVisualizer";

export default function App() {
  return (
    <main className="app">
      <header>
        <h1>Pagination visualizer</h1>
        <p className="muted">First the N-item grid. Then paging through a list that is already in memory.</p>
      </header>

      <PaginationVisualizer />

      <hr className="section-divider" />

      <ClientPaginationGuide />
    </main>
  );
}
