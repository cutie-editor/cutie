# Instalar Cutie

Guía de instalación de Cutie, el editor de vídeo para Claude, escrita para el asistente que la sigue (Claude Code, en la app de escritorio o en la terminal). Quien te ha pasado este enlace con su clave de licencia (empieza por `cut_`) te está pidiendo que instales Cutie en su ordenador. La instalación la haces tú con tus herramientas; la persona solo tiene que darte el sí y aceptar las ventanas que le enseñen la app de Claude, el sistema o su antivirus.

Todo lo que se ejecuta es público y se puede leer en https://github.com/cutie-editor/cutie: el instalador (`instalar.ps1` en Windows, `instalar.sh` en Mac) y el plugin (`plugins/cutie`). El README de ese repositorio detalla qué cambia en el equipo. Si la persona pregunta qué hace algo, explícaselo.

Las órdenes tienen que ir exactas. Si tu herramienta para leer webs te ha devuelto un resumen, descarga este documento con la terminal (`Invoke-WebRequest` en Windows, `curl` en Mac) y léelo entero antes de empezar.

## Antes de empezar: cuéntale el plan y espera su sí

Mira qué sistema es (paso 1). Antes de descargar o instalar nada, cuéntale a la persona en pocas líneas y sin jerga qué vas a hacer, y pregúntale si empiezas. Por ejemplo:

> Para instalar Cutie voy a:
> 1. Instalar los programas con los que Cutie monta los vídeos, los que no tengas ya: Git, Node.js, ffmpeg, Python y Google Chrome.
> 2. Descargar el modelo que transcribe tus vídeos (unos 3 GB; tarda un rato).
> 3. Conectar Cutie con tu Claude usando tu clave y preparar esta carpeta, donde aparecerán tus vídeos editados. Para que sus ayudantes no se paren a mitad de un vídeo, cinco herramientas de Cutie quedarán permitidas sin preguntarte; para todo lo demás, Claude te seguirá pidiendo permiso.
>
> Conviene que sepas: Cutie se actualiza solo cuando sale una versión nueva (si prefieres hacerlo tú, dímelo y lo dejo apagado). Tus vídeos no salen de tu ordenador: al servidor de Cutie solo va texto, como la transcripción. Y apago el envío de datos de uso de HyperFrames, el motor que monta los vídeos.
>
> Lo hace el instalador oficial de Cutie. Windows o tu antivirus pueden pedirte permiso alguna vez: te avisaré antes. ¿Empiezo?

En Mac, en lugar de las ventanas de Windows, puede abrirse una de Apple para instalar las herramientas de desarrollo.

Con su sí, sigue hasta el final sin volver a preguntar en cada bloque: antes de cada uno, dile en una línea qué haces. Si tiene dudas, respóndelas. Si prefiere no instalarlo, no instales nada.

## Cómo trabajar

- Habla siempre en el idioma de la persona (en español si te escribe en español), también en los mensajes cortos entre una herramienta y otra. Sin jerga, rutas ni comandos salvo que los pida.
- La clave de licencia solo se usa en el paso 5. No la repitas entera en el chat: como mucho, sus cuatro últimos caracteres.
- Trabaja siempre en la carpeta de esta conversación: es la carpeta de Cutie de la persona.
- No instales nada fuera de estos pasos ni toques otros ficheros. En Mac, nada de `sudo` ni Homebrew.
- Las órdenes en primer plano se cortan a los 10 minutos: lanza los bloques B y C en segundo plano (`run_in_background`) y mira su salida cada minuto o dos hasta que aparezca la línea `RESUMEN:`.
- El instalador escribe una línea por paso: `-> [paso] ok|ya estaba|falta|error|pendiente: ...`, y al final `RESUMEN: ...`. Código de salida: 0 bien · 1 algún paso no quedó bien · 2 uso incorrecto · 3 equipo no compatible · 4 esperando a la persona.
- Si un paso falla dos veces, para, cuéntale qué pasa en una frase y ofrécele escribir al soporte de Cutie (judith@matizbyyuyi.agency).
- Si su antivirus pregunta o bloquea algo, sigue el apartado «Si el antivirus avisa o bloquea algo», al final.

## 1. Mira qué sistema es

- **Windows 10 u 11**: usa la herramienta PowerShell para las órdenes de este documento.
- **macOS 13 o superior**: usa la terminal Bash.
- **Otro (Linux, WSL)**: dile que Cutie funciona en Windows y en Mac, y para.

## 2. Descarga el instalador

Windows:

```powershell
$d = "$env:LOCALAPPDATA\Cutie\instalador"; New-Item -ItemType Directory -Force $d | Out-Null; Invoke-WebRequest -UseBasicParsing https://raw.githubusercontent.com/cutie-editor/cutie/main/instalar.ps1 -OutFile "$d\instalar.ps1"
```

macOS:

```bash
mkdir -p ~/.local/share/cutie/instalador && curl -fsSL https://raw.githubusercontent.com/cutie-editor/cutie/main/instalar.sh -o ~/.local/share/cutie/instalador/instalar.sh
```

Comprobación: el fichero existe y no está vacío. En el resto del documento, **INSTALAR** quiere decir:

- Windows: `powershell -NoProfile -ExecutionPolicy Bypass -File "$env:LOCALAPPDATA\Cutie\instalador\instalar.ps1"`
- macOS: `bash ~/.local/share/cutie/instalador/instalar.sh`

En Windows, `-ExecutionPolicy Bypass` vale solo para esa orden: deja ejecutar el instalador recién descargado sin cambiar la configuración del equipo.

## 3. Mira qué falta (no cambia nada)

Windows: `INSTALAR -SoloComprobar` · macOS: `INSTALAR --solo-comprobar`

Lee la tabla (`[ OK ]`, `[FALTA]`, `[AVISO]`) y la lista «Esto haría el instalador». Cuéntale en una frase qué falta y que lo instalas ahora; ya te dio el sí, así que sigue sin esperar. Si el equipo no es compatible (código 3), díselo y para.

## 4. Instala lo que falte, por bloques

Haz solo los bloques con algún paso en la lista del paso 3, en este orden, y pasa solo esos pasos:

- Windows: `INSTALAR -Si -Pasos <pasos separados por comas>`
- macOS: `INSTALAR --si --pasos <pasos separados por comas>`

**Bloque A · programas base** (`git`, `node`, `ffmpeg`, `python`; y `claude` solo si la lista lo pide).
Di algo como: «Voy a instalar los programas que usa Cutie para montar vídeos: Git, Node.js, ffmpeg (el motor de vídeo) y Python».
- Windows, avísale antes: «Windows te mostrará una o varias ventanas "¿Quieres permitir que esta aplicación haga cambios en el dispositivo?": pulsa "Sí" en cada una».
- Mac, si falta `git`: «Se abrirá una ventana de Apple para instalar las herramientas de desarrollo: pulsa "Instalar" y espera a que termine». Si el paso acaba en `pendiente` (código 4), espera a que la persona diga que ha terminado y repite solo `git`.
- Comprobación: `-> [paso] ok` o `ya estaba` en cada uno.

**Bloque B · Python de Cutie y modelo** (`venv`, `modelo`), en segundo plano.
Di algo como: «Ahora preparo el Python de Cutie y descargo el modelo que transcribe tus vídeos: son unos 3 GB y tarda un rato. Te aviso al terminar».

**Bloque C · herramientas de montaje** (`playwright`, `chrome`, `navegador`, `skills`, `fuentes`, `telemetria`), en segundo plano.
Di algo como: «Instalo las herramientas con las que Cutie monta y revisa los vídeos: el navegador que renderiza, Google Chrome si no lo tienes, las fuentes de las plantillas y las guías de HyperFrames». El paso `telemetria` no envía nada: apaga el envío de datos de uso de HyperFrames en los ajustes de Claude.

Tesseract (`tesseract`) es opcional y no forma parte de esta instalación: instálalo solo si la persona lo pide. Si pregunta por él, explícale que es de otra empresa (Mirage) y que, si lo instala, acepta sus condiciones de uso.

## 5. Conecta Cutie, descárgalo y prepara esta carpeta

Di algo como: «Ahora conecto Cutie con tu Claude, guardo tu clave y preparo esta carpeta. Aquí tendrás la carpeta "videos", donde aparecerán tus vídeos editados».

- Windows: `INSTALAR -Si -Pasos registrar -Licencia <clave> -Carpeta "$PWD"`
- macOS: `INSTALAR --si --pasos registrar --licencia <clave> --carpeta "$PWD"`

`$PWD` es la carpeta de esta conversación: la que la persona eligió para Cutie.

Qué hace este paso, para que se lo puedas explicar si pregunta:
- En los ajustes de Claude de la persona, con copia de seguridad antes y sin tocar lo demás, activa Cutie, guarda la clave y deja que Node.js use también los certificados del sistema (como el navegador), para que Cutie funcione con antivirus que revisan las conexiones seguras.
- Deja permitidas de antemano las cinco herramientas de Cutie que usan sus ayudantes internos, `cutie-director` y `cutie-revisor` (dirección, revisión, variantes, encargo y entrega), porque un ayudante no puede pedir permiso a mitad de trabajo. Las demás herramientas de Cutie siguen pidiéndolo.
- Deja el plugin con actualización automática, salvo que la persona la tuviera apagada (ver «Si prefiere actualizar Cutie a mano»).
- Descarga el plugin de Cutie con la orden `claude`. Si no está, la instala desde el paquete oficial de Anthropic: con winget en Windows y con su instalador en Mac.
- Crea `videos` en esta carpeta y añade el bloque de Cutie a su `CLAUDE.md` (si ya había uno, lo añade al final sin tocar lo demás).

Comprobación: `-> [registrar] ok: registrado y descargado`, y en esta carpeta, `videos` y `CLAUDE.md`. Si los ajustes de Claude no son JSON válido, el instalador no los toca: díselo a la persona y ofrécele el soporte.

## 6. Comprobación final

Windows: `INSTALAR -Doctor` · macOS: `INSTALAR --doctor`

Debe salir todo en verde. «Cutie registrado» tiene que decir «registrado y descargado»; si dice «aún sin descargar», repite el paso 5. La línea «Servidor de Cutie» confirma que la licencia funciona. Si dice «licencia inactiva» o «clave no válida», díselo a la persona con esas mismas palabras y ofrécele el soporte. Un aviso por el plan de Claude (por ejemplo, Pro) no impide seguir. Si falta algo, repite solo ese paso del bloque que toque.

## 7. Reinicia y empieza

Díselo así: «¡Listo! Cierra la app de Claude del todo (en Mac, Cmd+Q; en Windows, ciérrala también desde el icono junto al reloj) y vuelve a abrirla. Después abre una conversación nueva en la pestaña Code, en esta misma carpeta, y escribe "Hola Cutie": te pedirá tu @ de Instagram y te hará unas preguntas para aprender tu estilo. O, si quieres probar ya, di "edítamelo viral". Cuando edites, pega siempre el guion del vídeo: sale mejor. Tus vídeos editados aparecerán en la carpeta "videos"».

## Si el antivirus avisa o bloquea algo

Algunos antivirus (Avast, AVG, Norton) vigilan lo que hace Claude en el ordenador o revisan las conexiones seguras. Si pasa algo de esto:

- **Pide confirmación** (por ejemplo, la protección para agentes de IA de Avast o Norton, que para una orden y pregunta): dile a la persona qué pregunta su antivirus y que es la descarga o el instalador de Cutie. Ella decide: si lo permite, sigue; si no, para.
- **Bloquea un fichero o una orden, o lo pone en cuarentena**: no intentes rodearlo ni cambiar los ajustes del antivirus. Dile qué ha bloqueado y ofrécele escribir al soporte de Cutie con una captura del aviso.
- **Errores de certificado al descargar** («self-signed certificate in certificate chain», «certificate verify failed», «unable to get local issuer certificate», «CRYPT_E_NO_REVOCATION_CHECK»): suelen venir del escaneo de conexiones seguras del antivirus. El instalador ya hace que Node.js y Python usen los certificados del sistema, como el navegador. Repite ese paso una vez; si vuelve a fallar, cuéntaselo y ofrécele el soporte.

## Para actualizar Cutie

Si Cutie dice que está desactualizado, cuéntaselo a la persona y pregúntale si lo actualizas. Si lo pide ella, no hace falta volver a preguntar. Para actualizar, vuelve a descargar el instalador (paso 2, que trae el de siempre al día) y repite solo el paso 5 sin la clave (Windows: `INSTALAR -Si -Pasos registrar -Carpeta "$PWD"`; macOS: `INSTALAR --si --pasos registrar --carpeta "$PWD"`). Después pídele que cierre la app de Claude del todo (en Mac, Cmd+Q) y la vuelva a abrir.

## Si prefiere actualizar Cutie a mano

Si la persona no quiere que Cutie se actualice solo, después del paso 5 apaga la actualización automática: en sus ajustes de Claude (`settings.json` en `~/.claude`, en Windows `%USERPROFILE%\.claude`, o en `CLAUDE_CONFIG_DIR` si existe), con copia de seguridad antes y sin tocar lo demás, pon `"autoUpdate": false` en `extraKnownMarketplaces.cutie`. El instalador lo respeta cuando vuelve a pasar el paso 5. Para ponerse al día, sigue «Para actualizar Cutie».

## Si Cutie avisa de que Node.js no tiene los parches

Al abrir una conversación, Cutie avisa si el Node.js del equipo no tiene el último parche de seguridad de su rama. El aviso no impide editar. Si la persona pide actualizarlo («actualiza el Node.js de Cutie»), vuelve a descargar el instalador (paso 2) y pasa solo el paso `node` (Windows: `INSTALAR -Si -Pasos node`; macOS: `INSTALAR --si --pasos node`). Pone la última versión de Node.js 24 con sus parches. En Windows, avísale antes de la ventana «¿Quieres permitir que esta aplicación haga cambios?» («Sí»).

Comprobación: `-> [node] ok`. Después pídele que cierre la app de Claude del todo y la vuelva a abrir.

## Si después de reiniciar Cutie no responde

- Pasa el doctor (paso 6; antes, el paso 2 si el instalador ya no está).
- Si «Cutie registrado» sigue «aún sin descargar» o no está registrado: repite el paso 5 sin la clave, que ya está guardada (Windows: `INSTALAR -Si -Pasos registrar -Carpeta "$PWD"`; macOS: `INSTALAR --si --pasos registrar --carpeta "$PWD"`). Después, otra vez cerrar la app del todo y abrirla.
- Si falla la licencia: pídele una clave nueva y repite el paso 5.
- En Windows, si Claude no encuentra `node`, `ffmpeg` o `git` justo después de instalarlos, es normal hasta cerrar y abrir la app (el instalador ya los ve).
