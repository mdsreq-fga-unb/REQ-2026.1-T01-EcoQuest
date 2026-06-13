import { Html } from '@elysia/html'


export function Layout({ children, title }: { children: any; title: string }) {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <title>{title}</title>

        <link rel="icon" href="/assets/img/favicon.ico" />

        <script
          src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.10/dist/htmx.min.js"
          integrity="sha384-H5SrcfygHmAuTDZphMHqBJLc3FhssKjG7w/CeCpFReSfwBWDTKpkzPP8c+cLsK+V"
          crossorigin="anonymous"
        ></script>

        <style>{`
          .popup-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.45);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          }
          .popup-box {
            background: #fff;
            border-radius: 12px;
            padding: 1.5rem 2rem;
            max-width: 90vw;
            min-width: 280px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            font-family: sans-serif;
          }
          .popup-box.sucesso { border-top: 6px solid #2e7d32; }
          .popup-box.erro { border-top: 6px solid #c62828; }
          .popup-icone { font-size: 2.5rem; display: block; margin-bottom: 0.5rem; }
          .popup-box.sucesso .popup-icone { color: #2e7d32; }
          .popup-box.erro .popup-icone { color: #c62828; }
          .popup-mensagem { font-size: 1rem; color: #333; margin-bottom: 1rem; }
          .popup-fechar {
            background: #333;
            color: #fff;
            border: none;
            border-radius: 6px;
            padding: 0.5rem 1.25rem;
            cursor: pointer;
            font-size: 0.95rem;
          }
          .popup-box.sucesso .popup-fechar { background: #2e7d32; }
          .popup-box.erro .popup-fechar { background: #c62828; }
        `}</style>

        <script>{`
          document.addEventListener('htmx:afterRequest', function (e) {
            const triggerHeader = e.detail.xhr.getResponseHeader('HX-Trigger');
            if (!triggerHeader) return;

            let payload;
            try {
              payload = JSON.parse(triggerHeader);
            } catch (err) {
              return;
            }

            const popup = payload.popup;
            if (!popup) return;

            mostrarPopup(popup.ok, popup.message, popup.redirect);
          });

          function mostrarPopup(ok, mensagem, redirect) {
            const overlay = document.createElement('div');
            overlay.className = 'popup-overlay';

            const box = document.createElement('div');
            box.className = 'popup-box ' + (ok ? 'sucesso' : 'erro');

            const icone = document.createElement('span');
            icone.className = 'popup-icone';
            icone.textContent = ok ? '✓' : '✗';

            const texto = document.createElement('p');
            texto.className = 'popup-mensagem';
            texto.textContent = mensagem;

            const botao = document.createElement('button');
            botao.className = 'popup-fechar';
            botao.type = 'button';
            botao.textContent = ok ? 'OK' : 'Fechar';

            function fechar() {
              overlay.remove();
              if (ok && redirect) {
                window.location.href = redirect;
              }
            }

            botao.addEventListener('click', fechar);
            overlay.addEventListener('click', function (ev) {
              if (ev.target === overlay) fechar();
            });

            box.appendChild(icone);
            box.appendChild(texto);
            box.appendChild(botao);
            overlay.appendChild(box);
            document.body.appendChild(overlay);

            if (ok && redirect) {
              setTimeout(fechar, 1500);
            }
          }
        `}</script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}