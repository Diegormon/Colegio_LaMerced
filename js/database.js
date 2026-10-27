// BASE DE DATOS CENTRALIZADA EN TIEMPO REAL - I.E.P. LA MERCED (RUC 20601528631)

const INITIAL_DATA = {
    estudiantes: [
        {
            dni: "78451236",
            nombre: "Valentina Flores Mendoza",
            grado: "3.° Grado de Primaria",
            apoderado: "Rosa Mendoza Quispe",
            celular: "987654321",
            asistencia: "P",
            comunicacion: "AD",
            matematica: "AD",
            personal: "A",
            ciencia: "A",
            tutoria: "Participa activamente en clase, demuestra empatía y excelente comprensión lectora.",
            psicologia: "Adecuada adaptación socioemocional y liderazgo positivo en dinámicas de grupo.",
            estadoPension: "Conciliado",
            operacionYape: "Yape #8492014",
            montoPension: 310
        },
        {
            dni: "79124580",
            nombre: "Thiago Ramírez Huamán",
            grado: "1.° Grado de Primaria",
            apoderado: "Luis Ramírez Soto",
            celular: "912345678",
            asistencia: "P",
            comunicacion: "A",
            matematica: "A",
            personal: "A",
            ciencia: "A",
            tutoria: "Progreso constante en razonamiento matemático y lectoescritura inicial.",
            psicologia: "Atención sostenida favorable. Se recomienda reforzar rutinas de lectura en casa.",
            estadoPension: "Conciliado",
            operacionYape: "Yape #8501192",
            montoPension: 310
        },
        {
            dni: "81236547",
            nombre: "Camila Paredes Soto",
            grado: "Inicial - 5 Años",
            apoderado: "Carmen Soto Vega",
            celular: "945678123",
            asistencia: "P",
            comunicacion: "AD",
            matematica: "A",
            personal: "AD",
            ciencia: "A",
            tutoria: "Destaca en psicomotricidad fina, expresión oral y trabajo colaborativo.",
            psicologia: "Excelente desarrollo de autonomía y socialización temprana.",
            estadoPension: "Por Conciliar",
            operacionYape: "Pendiente de pago",
            montoPension: 310
        },
        {
            dni: "76548912",
            nombre: "Sebastián Castro Díaz",
            grado: "5.° Grado de Primaria",
            apoderado: "Jorge Castro Luján",
            celular: "965432189",
            asistencia: "T",
            comunicacion: "A",
            matematica: "B",
            personal: "A",
            ciencia: "A",
            tutoria: "Asiste a sesiones de refuerzo en matemática. Muestra mayor disposición.",
            psicologia: "En seguimiento tutorial para fortalecer hábitos de estudio y organización del tiempo.",
            estadoPension: "Alerta Morosidad",
            operacionYape: "Vencido hace 4 días",
            montoPension: 310
        }
    ],
    comunicados: [
        {
            id: 1,
            autor: "DIRECCIÓN PEDAGÓGICA: Prof. Carlos Percy Gálvez Castro",
            fecha: "Hace 2 días",
            titulo: "Entrega de Informe de Progreso de Competencias (Libretas Digitales)",
            contenido: "Estimados padres de familia, ya se encuentran disponibles las calificaciones por competencias y el informe psicopedagógico en el Portal Familiar. Pueden descargar e imprimir la libreta oficial directamente desde su celular.",
            leido: false,
            color: "#7c1623"
        },
        {
            id: 2,
            autor: "ADMINISTRACIÓN Y TESORERÍA: Sra. Gina Sue Narváez López",
            fecha: "Semana pasada",
            titulo: "Conciliación Automática de Pagos de Pensiones por Yape",
            contenido: "Recordamos a las familias que todo pago de mensualidad (S/ 310.00) realizado mediante nuestro código QR de Yape queda registrado al instante ingresando su número de operación en el Portal.",
            leido: true,
            color: "#d97706"
        },
        {
            id: 3,
            autor: "DEPARTAMENTO DE TUTORÍA Y APOYO PSICOLÓGICO",
            fecha: "Mes actual",
            titulo: "Escuela de Padres: Acompañamiento Emocional y Hábitos de Estudio",
            contenido: "Invitamos a todas las familias de Inicial y Primaria a nuestra jornada formativa presencial en nuestro local institucional (Av. El Triunfo N.° 1250 - VMT).",
            leido: true,
            color: "#1e3a8a"
        }
    ],
    backups: [
        {
            id: "BKP-2026-042",
            modulos: "Matrícula, Notas SIAGIE, Tesorería Yape y Tutoría",
            fecha: "Domingo 02:00 a.m. (Automático)",
            estado: "Encriptado OK"
        },
        {
            id: "BKP-2026-041",
            modulos: "Matrícula, Notas SIAGIE, Tesorería Yape y Tutoría",
            fecha: "Semana anterior (Automático)",
            estado: "Encriptado OK"
        }
    ]
};

function getDB() {
    const data = localStorage.getItem('laMercedDB_v2');
    if (!data) {
        localStorage.setItem('laMercedDB_v2', JSON.stringify(INITIAL_DATA));
        return INITIAL_DATA;
    }
    return JSON.parse(data);
}

function saveDB(data) {
    localStorage.setItem('laMercedDB_v2', JSON.stringify(data));
}

// IMPRESIÓN OFICIAL DE LIBRETA DE NOTAS (MINEDU / I.E.P. LA MERCED)
function imprimirLibretaOficial(dni) {
    const db = getDB();
    const est = db.estudiantes.find(e => e.dni === dni) || db.estudiantes[0];
    const fecha = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' });

    const win = window.open('', '_blank', 'width=860,height=760');
    win.document.write(`
        <html>
        <head>
            <title>Libreta de Notas - ${est.nombre}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 35px; color: #1e293b; }
                .top { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #7c1623; padding-bottom: 12px; margin-bottom: 20px; }
                .top h2 { margin: 0; color: #7c1623; font-size: 20px; }
                .top p { margin: 2px 0; font-size: 12px; color: #475569; }
                .title { text-align: center; background: #112240; color: #fff; padding: 8px; font-weight: bold; font-size: 15px; margin-bottom: 15px; }
                .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; background: #f8fafc; padding: 12px; border: 1px solid #cbd5e1; font-size: 13px; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; }
                th, td { border: 1px solid #94a3b8; padding: 9px; text-align: left; }
                th { background: #f1f5f9; color: #112240; }
                .grade { text-align: center; font-weight: bold; font-size: 15px; color: #7c1623; }
                .box { border: 1px solid #cbd5e1; padding: 12px; margin-bottom: 15px; font-size: 13px; background: #fffbeb; }
                .signatures { display: flex; justify-content: space-around; margin-top: 65px; text-align: center; font-size: 13px; }
                .sig-line { width: 220px; border-top: 1px solid #000; padding-top: 5px; }
            </style>
        </head>
        <body>
            <div class="top">
                <div>
                    <h2>INSTITUCIÓN EDUCATIVA PARTICULAR "LA MERCED"</h2>
                    <p>Corporación Educativa La Merced S.R.L. • RUC: 20601528631</p>
                    <p>Av. El Triunfo N.° 1250, Villa María del Triunfo • UGEL 01 • Cód. Modular: 1778091</p>
                </div>
                <div style="text-align:right; font-size:12px;">
                    <strong>MINISTERIO DE EDUCACIÓN</strong><br>Formato Oficial SIAGIE
                </div>
            </div>
            <div class="title">INFORME DE PROGRESO DEL APRENDIZAJE DEL ESTUDIANTE (LIBRETA DE NOTAS)</div>
            <div class="info-grid">
                <div><strong>Estudiante:</strong> ${est.nombre}</div>
                <div><strong>DNI / Código Estudiante:</strong> ${est.dni}</div>
                <div><strong>Nivel / Grado:</strong> ${est.grado}</div>
                <div><strong>Apoderado:</strong> ${est.apoderado}</div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Área Curricular (Currículo Nacional CNEB)</th>
                        <th style="text-align:center;">Calificación</th>
                        <th>Descripción del Nivel de Logro Alcanzado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Comunicación Integral</strong></td>
                        <td class="grade">${est.comunicacion}</td>
                        <td>${est.comunicacion === 'AD' ? 'Logro Destacado' : 'Logro Esperado'} en comprensión y expresión de textos.</td>
                    </tr>
                    <tr>
                        <td><strong>Matemática y Razonamiento</strong></td>
                        <td class="grade">${est.matematica}</td>
                        <td>${est.matematica === 'AD' ? 'Logro Destacado' : est.matematica === 'A' ? 'Logro Esperado' : 'En Proceso de fortalecimiento'} en resolución de problemas.</td>
                    </tr>
                    <tr>
                        <td><strong>Personal Social y Valores</strong></td>
                        <td class="grade">${est.personal || 'A'}</td>
                        <td>Logro Esperado en convivencia armónica e identidad ciudadana.</td>
                    </tr>
                    <tr>
                        <td><strong>Ciencia y Tecnología</strong></td>
                        <td class="grade">${est.ciencia || 'A'}</td>
                        <td>Logro Esperado en indagación mediante métodos científicos.</td>
                    </tr>
                </tbody>
            </table>
            <div class="box">
                <strong>Apreciación del Docente Tutor:</strong><br>${est.tutoria}
            </div>
            <div class="box" style="background:#f0fdf4;">
                <strong>Informe del Departamento de Orientación y Apoyo Psicológico:</strong><br>${est.psicologia}
            </div>
            <p style="text-align:right; font-size:12px;">Villa María del Triunfo, ${fecha}</p>
            <div class="signatures">
                <div class="sig-line"><strong>Tutor(a) de Aula</strong><br>I.E.P. La Merced</div>
                <div class="sig-line"><strong>Prof. Carlos Percy Gálvez Castro</strong><br>Director de la I.E.P. La Merced</div>
            </div>
            <script>window.print();<\/script>
        </body>
        </html>
    `);
    win.document.close();
}