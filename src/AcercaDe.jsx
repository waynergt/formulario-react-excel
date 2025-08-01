import React from "react";

const GITHUB_REPO_URL = "https://github.com/waynergt/formulario-react-excel"; // Cambia esto por la URL real

export default function AcercaDe() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h3>Acerca de</h3>
      <p>
        Esta aplicación fue creada por Wayner López. <br />
        Puedes ver el código fuente en GitHub.
      </p>
      <a
        href={GITHUB_REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginTop: "1rem",
          fontSize: "2rem",
          color: "#181A1B",
          background: "#C7F464",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          lineHeight: "48px",
          textAlign: "center"
        }}
        title="Ir al repositorio en GitHub"
      >
        <svg height="24" width="24" viewBox="0 0 24 24" fill="#181A1B" style={{verticalAlign: "middle"}}>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.263.793-.583 0-.288-.012-1.235-.017-2.24-3.338.726-4.042-1.61-4.042-1.61C4.422 17.14 3.633 16.81 3.633 16.81c-1.087-.744.082-.729.082-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.836 2.809 1.306 3.495.998.108-.775.418-1.306.762-1.607-2.665-.305-5.466-1.332-5.466-5.931 0-1.309.469-2.381 1.236-3.222-.124-.304-.535-1.527.117-3.184 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.289-1.552 3.295-1.23 3.295-1.23.654 1.657.243 2.88.12 3.184.77.841 1.235 1.913 1.235 3.222 0 4.609-2.803 5.624-5.475 5.921.429.37.813 1.102.813 2.222 0 1.606-.014 2.898-.014 3.293 0 .323.192.699.801.581C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      </a>
    </div>
  );
}