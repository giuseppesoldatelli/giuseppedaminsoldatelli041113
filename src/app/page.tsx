export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center bg-muted px-4 pt-24">
      <div className="flex max-w-2xl flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          🐾 Gestão de Pets
        </h1>

        <p className="mt-6 text-lg text-muted-foreground">
          Registro público de{" "}
          <span className="font-medium text-primary">Pets e Tutores</span> do
          Estado de Mato Grosso.
          <br />
          Cadastre, edite e consulte dados de forma simples e organizada!
        </p>

        <p className="mt-4 text-sm text-muted-foreground">
          Acesso gratuito à API pública para desenvolvedores.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
            <span>📋</span>
            <span className="text-sm font-medium">Cadastro de Pets</span>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
            <span>🔗</span>
            <span className="text-sm font-medium">API Pública</span>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
            <span>🔍</span>
            <span className="text-sm font-medium">Consulta de Dados</span>
          </div>
        </div>
      </div>
    </section>
  );
}
