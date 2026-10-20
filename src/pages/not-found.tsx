export function NotFoundPage() {
  return (
    <div className="page error-page">
      <main id="main" className="error-content">
        <h1>Page not found</h1>
        <p>This address doesn’t lead anywhere yet.</p>
        <a className="primary-link" href="/">
          Back to Jessie’s home
        </a>
      </main>
    </div>
  );
}
