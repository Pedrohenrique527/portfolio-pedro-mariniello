"use client";

import { useEffect, useRef, useState } from "react";
import Recommendations from "./recommendations";

const SERVICES = [
  { n: "01", icon: "⌕", title: "Entendo o trabalho real", text: "Observo a operação, converso com quem executa e transformo exceções, retrabalho e dependências em um diagnóstico claro.", span: "wide" },
  { n: "02", icon: "↯", title: "Redesenho o fluxo", text: "Removo etapas sem valor, organizo responsabilidades e defino como informações e decisões devem circular.", span: "" },
  { n: "03", icon: "∿", title: "Construo a solução", text: "Traduzo o processo em sistemas, automações, planilhas inteligentes e painéis que cabem na rotina do time.", span: "" },
  { n: "04", icon: "◇", title: "Acompanho o resultado", text: "Crio indicadores, documentação e ciclos de evolução para que a melhoria continue depois da implantação.", span: "wide" },
];

const METHOD = [
  { n: "01", time: "Semana 1–2", title: "Diagnóstico", text: "Entrevistas, dados e observação do trabalho real. O problema deixa de ser opinião e vira mapa." },
  { n: "02", time: "Semana 3–4", title: "Redesenho", text: "Eliminamos etapas sem valor, simplificamos decisões e definimos a arquitetura do novo fluxo." },
  { n: "03", time: "Semana 5–7", title: "Implementação", text: "Automações, integrações e painéis entram em operação com o time, não ao redor dele." },
  { n: "04", time: "Contínuo", title: "Evolução", text: "Acompanhamos indicadores, removemos novas fricções e transformamos melhoria em rotina." },
];

const PROJECTS = [
  {
    id: "financeiro",
    eyebrow: "FINANCEIRO · COMISSÕES",
    title: "Fechamento financeiro sem planilhas paralelas.",
    image: "/projects/financeiro.png",
    alt: "Tela de acesso do Sistema Financeiro de Comissões da Ekko Revestimentos",
    context: "Fechamento comercial de múltiplas lojas, vendedores, metas e campanhas variáveis.",
    problem: "Informações espalhadas e conferências manuais dificultavam rastreabilidade e fechamento.",
    role: "Mapeamento do processo, modelagem das regras, UX e desenvolvimento integral da solução.",
    solution: "Uma operação centralizada por competência, com lançamentos, indicadores, auditoria e relatórios.",
    outcome: "Mais controle sobre o fechamento e menos dependência de planilhas paralelas.",
    description: "Sistema criado para centralizar o fechamento de comissões por loja, vendedor e período, reunindo metas, quinzenas, incentivos e prêmio semestral em uma operação auditável.",
    highlight: "3",
    highlightLabel: "gráficos analíticos",
    features: ["Dashboard financeiro", "Metas e comissões", "Fechamento por loja", "Ranking de vendedores", "Relatórios em PDF", "Histórico e auditoria"],
    steps: [
      ["Selecione o período", "O responsável abre ou consulta uma competência de fechamento."],
      ["Lance os resultados", "Vendas, metas, comissões e incentivos são registrados por vendedor e loja."],
      ["Acompanhe o dashboard", "Filtros mostram vendas, comissões, metas atingidas, ranking e evolução."],
      ["Feche e reporte", "O sistema consolida os valores, guarda o histórico e gera relatórios em PDF."],
    ],
    tech: ["HTML", "CSS", "JavaScript", "Chart.js", "Supabase", "LocalStorage"],
  },
  {
    id: "cotacao",
    eyebrow: "LOGÍSTICA · COTAÇÃO",
    title: "Cotação de fretes com regra, histórico e resposta pronta.",
    image: "/projects/cotacao.png",
    alt: "Tela de acesso do Sistema de Cotação de Fretes da Ekko Revestimentos",
    context: "Cotações comerciais com diferentes transportadoras, fornecedores, rotas e modalidades.",
    problem: "Regras dispersas tornavam o cálculo lento, inconsistente e dependente de conhecimento individual.",
    role: "Levantamento das tabelas, desenho do motor de regras, interface e implantação do fluxo.",
    solution: "Cálculo orientado por modalidade, histórico, documentos e resposta comercial padronizada.",
    outcome: "Respostas mais rápidas, critérios consistentes e histórico consultável das decisões.",
    description: "Plataforma que calcula fretes de revenda e representação para diferentes parceiros, rotas, pesos, medidas e ocorrências logísticas, reduzindo consultas manuais e padronizando a resposta comercial.",
    highlight: "6",
    highlightLabel: "modalidades de cotação",
    features: ["Revenda e representação", "Bravo Transportes", "Mega Mundo", "Regras por fornecedor", "PDF para assinatura", "Painel administrativo"],
    steps: [
      ["Escolha o módulo", "Revenda, representação, Bravo ou Mega Mundo carregam regras específicas."],
      ["Informe a operação", "Pedido, destino, fornecedor, transportadora, peso, metragem e valor fiscal."],
      ["Calcule o frete", "O motor combina tabelas, faixas, adicionais, mínimos e exceções da operação."],
      ["Gere a saída", "A cotação fica no histórico e pode virar PDF ou resposta pronta para e-mail."],
    ],
    tech: ["HTML", "CSS", "JavaScript", "Firebase Auth", "Firestore", "html2pdf"],
  },
  {
    id: "rh",
    eyebrow: "PESSOAS · FOLHA & ENCARGOS",
    title: "RH, folha e obrigações em uma visão única.",
    image: "/projects/rh.png",
    alt: "Tela de acesso do Sistema de RH, Folha e Encargos da Ekko Revestimentos",
    context: "Gestão mensal de pessoas, folha, encargos e obrigações distribuídas entre unidades.",
    problem: "Dados sensíveis e obrigações diferentes exigiam conferências repetidas e visão consolidada.",
    role: "Estruturação das competências, arquitetura das informações, experiência e desenvolvimento.",
    solution: "Módulos integrados para folha, encargos, benefícios, medicina e relatórios por unidade.",
    outcome: "Uma base organizada para conferência, histórico e tomada de decisão do RH.",
    description: "Sistema web para administrar colaboradores, folha mensal, encargos trabalhistas, benefícios, medicina ocupacional e rateio fiscal por unidade, com competências independentes e histórico protegido.",
    highlight: "10+",
    highlightLabel: "módulos integrados",
    features: ["Folha por competência", "DCTFWeb por unidade", "FGTS, INSS e IRRF", "Cadastro de funcionários", "Benefícios e medicina", "Excel e PDF"],
    steps: [
      ["Crie a competência", "Cada mês funciona como um período independente de apuração."],
      ["Lance a folha", "Os valores são registrados por colaborador, cargo, unidade e tipo de encargo."],
      ["Confira os encargos", "FGTS, INSS, IRRF, GILRAT, terceiros e DCTFWeb são consolidados por filial."],
      ["Feche com segurança", "A competência concluída vira registro imutável e alimenta relatórios e dashboards."],
    ],
    tech: ["HTML", "CSS", "JavaScript", "Chart.js", "Supabase", "LocalStorage"],
  },
];

const NODES = [
  { label: "Lead", x0: 8, y0: 15, x1: 7, y1: 33 },
  { label: "Formulário", x0: 34, y0: 7, x1: 24, y1: 33 },
  { label: "E-mail", x0: 68, y0: 16, x1: 41, y1: 33 },
  { label: "CRM", x0: 3, y0: 48, x1: 58, y1: 33 },
  { label: "Revisão", x0: 37, y0: 47, x1: 75, y1: 33, warn: true },
  { label: "Aprovação", x0: 74, y0: 52, x1: 75, y1: 57 },
  { label: "Fatura", x0: 16, y0: 79, x1: 58, y1: 57 },
  { label: "Entrega", x0: 48, y0: 84, x1: 41, y1: 57 },
  { label: "Dados", x0: 82, y0: 79, x1: 24, y1: 57 },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("shown"); io.disconnect(); } }, { threshold: .12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [value, setValue] = useState(0); const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; const start = performance.now();
      const tick = (now: number) => { const p = Math.min((now - start) / 1500, 1); setValue(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick); io.disconnect();
    }); io.observe(el); return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{value}{suffix}</span>;
}

function ChaosToOrder() {
  const section = useRef<HTMLElement>(null); const [p, setP] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => { frame = 0; const el = section.current; if (!el) return; const r = el.getBoundingClientRect(); const distance = r.height - innerHeight; setP(Math.max(0, Math.min(1, -r.top / distance))); };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll); return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(frame); };
  }, []);
  const smooth = p * p * (3 - 2 * p); const stage = p < .28 ? 0 : p < .68 ? 1 : 2;
  const flowPalette = ["#3b82f6", "#22d3ee", "#38bdf8", "#10b981", "#f59e0b", "#14b8a6", "#60a5fa", "#34d399", "#fbbf24"];
  return <section className="flow-story" ref={section} id="transformacao">
    <div className="flow-sticky">
      <div className="flow-copy">
        <div className="label"><span>02</span> TRANSFORMAÇÃO AO VIVO</div>
        <h2>{stage === 0 ? "Toda operação esconde um sistema." : stage === 1 ? "O ruído sai. A lógica aparece." : "Agora, o processo trabalha por você."}</h2>
        <p>{stage === 0 ? "Continue rolando para organizar o fluxo." : stage === 1 ? "Conexões, responsabilidades e dados entram no lugar." : "Uma operação clara, mensurável e pronta para escalar."}</p>
        <div className="flow-progress"><i style={{ width: `${p * 100}%` }} /></div>
      </div>
      <div className="flow-canvas" style={{ "--order": smooth } as React.CSSProperties}>
        <div className="flow-aura" />
        {[0,1,2,3,4,5,6,7].map((_, i) => <i key={i} className={`connector c${i}`} style={{ "--flow-color": flowPalette[i], opacity: .15 + smooth * .85, transform: `rotate(${(i%2?14:-12)*(1-smooth)}deg) scaleX(${.45 + smooth*.55})` } as React.CSSProperties} />)}
        {NODES.map((n, i) => {
          const x = n.x0 + (n.x1 - n.x0) * smooth, y = n.y0 + (n.y1 - n.y0) * smooth;
          return <div className={`process-node ${n.warn ? "bottleneck" : ""}`} key={n.label} style={{ "--flow-color": flowPalette[i], left: `${x}%`, top: `${y}%`, transform: `rotate(${(i % 2 ? 6 : -6) * (1 - smooth)}deg) scale(${n.warn ? 1 - Math.max(0, p - .58) * 1.35 : 1})`, opacity: n.warn ? 1 - Math.max(0, p - .66) * 2.8 : 1 } as React.CSSProperties}><b>{String(i + 1).padStart(2,"0")}</b><span>{n.label}</span><i /></div>;
        })}
        <div className="flow-data" aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i} style={{ "--packet": i, opacity: Math.max(0,(p-.18)*1.8), transform:`translate3d(${smooth*(180+(i%4)*42)}px,${Math.sin((smooth+i)*2.4)*18}px,0) scale(${.6+smooth*.4})` } as React.CSSProperties}/>)}</div>
        <div className="automation-gears" aria-hidden="true" style={{opacity:Math.max(0,(p-.38)*2.2),transform:`rotate(${smooth*180}deg) scale(${.7+smooth*.3})`}}><i/><i/><i/></div>
        <div className="order-dashboard" style={{ opacity: Math.max(0, (p - .68) * 3.2), transform: `translateY(${Math.max(0, 1-p)*45}px) scale(${.92 + p*.08})` }}>
          <div className="od-top"><span>Performance operacional</span><b><i/> AO VIVO</b></div>
          <div className="od-grid"><div className="od-main"><small>Eficiência do fluxo</small><strong>94,8%</strong><div className="spark"><i/><i/><i/><i/><i/><i/><i/><i/></div></div><div className="od-side"><small>Tempo de ciclo</small><strong>-62%</strong><em>↘ esta semana</em></div></div>
        </div>
      </div>
      <div className="flow-stage"><span>CAOS</span><span>CLAREZA</span><span>CONTROLE</span></div>
    </div>
  </section>;
}

function ProjectImage({ project }: { project: typeof PROJECTS[number] }) {
  return <div className={`project-image ${project.id}`}><div className="project-photo"><ProjectDashboard id={project.id}/><div className="photo-glass"><span>TELA INTERNA · DADOS FICTÍCIOS</span><b>{project.eyebrow}</b></div></div><div className="screen-shadow"/></div>;
}

function ProjectDashboard({ id, large = false }: { id: string; large?: boolean }) {
  const data = {
    financeiro: { brand: "FINANCE", title: "Dashboard financeiro", nav: ["Visão geral","Fechamentos","Vendedores","Relatórios"], metrics: [["Vendas","R$ 248,4 mil","+12,8%"],["Comissões","R$ 12,4 mil","5,0%"],["Meta atingida","94%","+8,2%"]], bars: [38,54,49,66,58,81,72,93], table: [["Equipe A","R$ 84.200","98%"],["Equipe B","R$ 76.800","92%"],["Equipe C","R$ 62.400","88%"]], accent: "#45dae8" },
    cotacao: { brand: "LOGISTICS", title: "Nova cotação de frete", nav: ["Cotação","Histórico","Documentos","Admin"], metrics: [["Pedido","DEMO-2026","VALIDADO"],["Peso total","1.250 kg","3 volumes"],["Frete sugerido","R$ 1.842","CALCULADO"]], bars: [28,44,38,59,52,70,83,96], table: [["Origem","Unidade A","OK"],["Destino","Região Centro","OK"],["Modalidade","Revenda","ATIVA"]], accent: "#45dae8" },
    rh: { brand: "PEOPLE", title: "Folha & encargos", nav: ["Dashboard","Competências","Pessoas","Obrigações"], metrics: [["Competência","JUL / 2026","ABERTA"],["Colaboradores","42","DEMO"],["Conferência","100%","CONCLUÍDA"]], bars: [46,57,52,68,74,70,88,95], table: [["Unidade A","Folha conferida","OK"],["Unidade B","FGTS validado","OK"],["Unidade C","DCTF alocada","OK"]], accent: "#8b7cff" },
  }[id] || null;
  if (!data) return null;
  return <div className={`project-dashboard ${large ? "large" : ""}`} style={{ "--dash-accent": data.accent } as React.CSSProperties}>
    <aside><div className="pd-logo"><img src="/pedro-mariniello-logo.png" alt="Pedro Mariniello"/></div><small>{data.brand}</small>{data.nav.map((x,i)=><div className={i===0?"active":""} key={x}><i/>{x}</div>)}</aside>
    <section><header><div><small>AMBIENTE DEMONSTRATIVO</small><h4>{data.title}</h4></div><span><i/> ONLINE</span></header>
      <div className="pd-metrics">{data.metrics.map((m,i)=><article key={m[0]}><small>{m[0]}</small><strong>{m[1]}</strong><em>{m[2]}</em><i style={{width:`${55+i*16}%`}}/></article>)}</div>
      <div className="pd-content"><article className="pd-chart"><div><small>EVOLUÇÃO DO PERÍODO</small><b>↑ 18,4%</b></div><section>{data.bars.map((n,i)=><i style={{height:`${n}%`}} key={i}/>)}</section><footer><span>SEM 1</span><span>SEM 2</span><span>SEM 3</span><span>SEM 4</span></footer></article><article className="pd-table"><div><small>VISÃO OPERACIONAL</small><b>STATUS</b></div>{data.table.map(r=><p key={r[0]}><span>{r[0]}<small>{r[1]}</small></span><em>{r[2]}</em></p>)}</article></div>
      <div className="pd-safe"><i/> DADOS FICTÍCIOS PARA PORTFÓLIO</div>
    </section>
  </div>;
}

function TechLab() {
  return <section className="tech-lab section" id="tecnologia"><Reveal><div className="section-label"><span>05</span> CAMADA TECNOLÓGICA</div><div className="section-head"><h2>Sistemas que pensam<br/><em>em tempo real.</em></h2><p>Interfaces, regras de negócio, bancos de dados e automações trabalhando como uma única arquitetura.</p></div></Reveal><div className="tech-stage">
    <Reveal className="tech-terminal"><div className="terminal-top"><i/><i/><i/><span>pedro@portfolio:~/systems</span></div><code><b>01</b> process.map(<em>operação_real</em>)<br/><b>02</b> data.connect(<em>fonte_segura</em>)<br/><b>03</b> rules.execute(<em>sem_ruído</em>)<br/><b>04</b> dashboard.render(<em>decisão</em>)<br/><strong>✓ FLUXO OTIMIZADO EM 18ms</strong></code><div className="terminal-scan"/></Reveal>
    <Reveal className="tech-core"><div className="core-ring r1"/><div className="core-ring r2"/><div className="core-ring r3"/><div className="core-orb"><img className="core-brand-logo" src="/pedro-mariniello-logo.png" alt="Pedro Mariniello"/><small>SYSTEMS</small></div>{["API","DATA","AI","BI","RPA","CLOUD"].map((x,i)=><i className={`tech-node tn${i}`} key={x}>{x}</i>)}</Reveal>
    <Reveal className="tech-pipeline"><header><span>LIVE ARCHITECTURE</span><i>● ACTIVE</i></header>{["ENTRADA SEGURA","REGRAS DE NEGÓCIO","AUTOMAÇÃO","ANÁLISE & SAÍDA"].map((x,i)=><div key={x}><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span><em>{[96,88,93,99][i]}%</em><i><small style={{width:`${[96,88,93,99][i]}%`}}/></i></div>)}</Reveal>
  </div><div className="stack-ribbon"><span>REACT</span><i>×</i><span>TYPESCRIPT</span><i>×</i><span>SUPABASE</span><i>×</i><span>FIREBASE</span><i>×</i><span>CHART.JS</span><i>×</i><span>AUTOMAÇÕES</span></div></section>;
}

function ExcelStory() {
  const section = useRef<HTMLElement>(null); const [p,setP] = useState(0);
  useEffect(()=>{let frame=0;const update=()=>{frame=0;const el=section.current;if(!el)return;const r=el.getBoundingClientRect();setP(Math.max(0,Math.min(1,-r.top/Math.max(1,r.height-innerHeight))));};const scroll=()=>{if(!frame)frame=requestAnimationFrame(update)};update();addEventListener("scroll",scroll,{passive:true});addEventListener("resize",scroll);return()=>{removeEventListener("scroll",scroll);removeEventListener("resize",scroll);cancelAnimationFrame(frame)}},[]);
  const smooth=p*p*(3-2*p); const stage=p<.3?0:p<.65?1:2;
  const cells=["PEDIDO","CENTRO","1.250","=SOMA()","R$ 84.200","94%","EQUIPE A","JUL/26","OK","META","DCTF","AUTO"];
  return <section className="excel-story" id="excel" ref={section}><div className="excel-sticky"><div className="excel-copy"><div className="section-label"><span>05</span> EXCEL & AUTOMAÇÃO</div><h2>{stage===0?<>Planilhas deixam de ser<br/><em>trabalho manual.</em></>:stage===1?<>Dados ganham<br/><em>estrutura e lógica.</em></>:<>O Excel evolui para<br/><em>uma solução inteligente.</em></>}</h2><p>{stage===0?"Controles dispersos, fórmulas frágeis e tarefas repetitivas.":stage===1?"Macros, validações e integrações organizam o fluxo automaticamente.":"Dashboards, indicadores e relatórios prontos para orientar decisões."}</p><div className="excel-skills">{["PLANILHAS INTELIGENTES","VBA & MACROS","DASHBOARDS","CONSOLIDAÇÃO","RELATÓRIOS AUTOMÁTICOS","INTEGRAÇÕES"].map((x,i)=><span className={smooth>i/9?"active":""} key={x}>{x}</span>)}</div><div className="excel-progress"><i style={{width:`${p*100}%`}}/></div></div>
  <div className="excel-visual" style={{"--excel-progress":smooth} as React.CSSProperties}><div className="excel-aura"/><div className="loose-cells">{cells.map((x,i)=>{const col=i%4,row=Math.floor(i/4);const chaosX=((i*47)%210)-105,chaosY=((i*83)%180)-90;return <div key={x} style={{left:`${18+col*17}%`,top:`${20+row*17}%`,transform:`translate(${chaosX*(1-smooth)}px,${chaosY*(1-smooth)}px) rotate(${((i%3)-1)*12*(1-smooth)}deg)`}}><small>{String.fromCharCode(65+col)}{row+1}</small><b>{x}</b></div>})}</div><div className="formula-line" style={{opacity:Math.max(0,(p-.25)*3)}}><span>fx</span>=SE(STATUS=&quot;OK&quot;; AUTOMATIZAR(); ANALISAR())<i/></div><div className="excel-dashboard" style={{opacity:Math.max(0,(p-.62)*3),transform:`translateY(${(1-smooth)*55}px) scale(${.9+smooth*.1})`}}><header><span>PAINEL GERENCIAL</span><b><i/> ATUALIZAÇÃO AUTOMÁTICA</b></header><section><article><small>PROCESSOS</small><strong>24</strong><em>+8 este mês</em></article><article><small>TEMPO ECONOMIZADO</small><strong>80%</strong><em>↑ automação</em></article><article className="excel-bars"><small>DESEMPENHO</small><div>{[44,68,57,82,71,96].map((x,i)=><i style={{height:`${x}%`}} key={i}/>)}</div></article></section></div><div className="excel-stage-labels"><span className={stage===0?"active":""}>MANUAL</span><span className={stage===1?"active":""}>INTELIGENTE</span><span className={stage===2?"active":""}>AUTOMATIZADO</span></div></div></div></section>;
}

function SystemDemo({ id, active, onChange }: { id: string; active: number; onChange: (step: number) => void }) {
  const demos = {
    financeiro: {
      nav: ["Visão geral", "Lançamentos", "Análise", "Fechamento"],
      title: ["Competência selecionada", "Resultados registrados", "Dashboard atualizado", "Fechamento concluído"],
      metric: ["JUL / 2026", "R$ 248.400", "94%", "PDF PRONTO"],
      label: ["Período demonstrativo", "Vendas fictícias", "Meta demonstrativa", "Relatório gerado"],
      bars: [62, 86, 74, 94],
      rows: [["Equipe A", "R$ 84.200"], ["Equipe B", "R$ 76.800"], ["Equipe C", "R$ 62.400"]],
    },
    cotacao: {
      nav: ["Modalidade", "Operação", "Cálculo", "Documento"],
      title: ["Modalidade escolhida", "Dados validados", "Frete calculado", "Cotação pronta"],
      metric: ["REVENDA", "1.250 kg", "R$ 1.842", "PDF + E-MAIL"],
      label: ["Regra demonstrativa", "Carga fictícia", "Valor sugerido fictício", "Saídas disponíveis"],
      bars: [38, 67, 88, 100],
      rows: [["Pedido", "DEMO-2026"], ["Destino", "Região Centro"], ["Transportadora", "Parceiro A"]],
    },
    rh: {
      nav: ["Competência", "Folha", "Encargos", "Fechamento"],
      title: ["Competência aberta", "Folha consolidada", "Encargos conferidos", "Histórico protegido"],
      metric: ["JUL / 2026", "42 PESSOAS", "100%", "FECHADO"],
      label: ["Período demonstrativo", "Base fictícia", "Conferência simulada", "Registro imutável"],
      bars: [46, 72, 91, 100],
      rows: [["Unidade A", "Folha conferida"], ["Unidade B", "FGTS validado"], ["Unidade C", "DCTF alocada"]],
    },
  }[id] || null;
  if (!demos) return null;
  return <section className={`system-demo ${id}`}>
    <div className="demo-disclaimer"><i/> DEMONSTRAÇÃO INTERATIVA · DADOS 100% FICTÍCIOS</div>
    <div className="demo-shell">
      <aside><div className="demo-mark"><img src="/pedro-mariniello-logo.png" alt="Pedro Mariniello"/></div><small>SISTEMA</small>{demos.nav.map((item, i) => <button className={active === i ? "active" : ""} onClick={() => onChange(i)} key={item}><b>{String(i + 1).padStart(2,"0")}</b>{item}</button>)}</aside>
      <div className="demo-main">
        <div className="demo-top"><div><span>AMBIENTE DE DEMONSTRAÇÃO</span><h3>{demos.title[active]}</h3></div><i>PEDRO MARINIELLO</i></div>
        <div className="demo-metrics"><article><small>{demos.label[active]}</small><strong>{demos.metric[active]}</strong><em>Etapa {active + 1} de 4</em></article><article className="demo-chart"><small>PROGRESSO DO FLUXO</small><div>{demos.bars.map((bar, i) => <i key={i} style={{ height: `${Math.min(bar, active < i ? 18 : bar)}%`, opacity: active < i ? .18 : 1 }}/>)}</div></article></div>
        <div className="demo-table"><div><span>ITEM</span><span>STATUS / VALOR</span></div>{demos.rows.map((row, i) => <div key={row[0]} style={{ opacity: active >= Math.min(i, 2) ? 1 : .35 }}><span><i/>{row[0]}</span><b>{row[1]}</b></div>)}</div>
        <div className="demo-flow">{demos.nav.map((item, i) => <button key={item} className={active === i ? "active" : active > i ? "done" : ""} onClick={() => onChange(i)}><span>{active > i ? "✓" : i + 1}</span>{item}</button>)}</div>
      </div>
    </div>
  </section>;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [demoStep, setDemoStep] = useState(0);
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[number] | null>(null);
  useEffect(() => { const fn = () => { setScrolled(scrollY > 35); setScrollProgress(Math.min(100, scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight) * 100)); }; fn(); addEventListener("scroll", fn, { passive: true }); return () => removeEventListener("scroll", fn); }, []);
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".service-card,.project-photo,.tech-stage>.reveal,.excel-dashboard"));
    const cleanups = elements.map(el => { const move = (e: PointerEvent) => { if (e.pointerType === "touch") return; const r=el.getBoundingClientRect(); el.style.setProperty("--tilt-x",`${((e.clientY-r.top)/r.height-.5)*-5}deg`); el.style.setProperty("--tilt-y",`${((e.clientX-r.left)/r.width-.5)*7}deg`); el.style.setProperty("--glow-x",`${((e.clientX-r.left)/r.width)*100}%`); el.style.setProperty("--glow-y",`${((e.clientY-r.top)/r.height)*100}%`); }; const leave=()=>{el.style.setProperty("--tilt-x","0deg");el.style.setProperty("--tilt-y","0deg")}; el.addEventListener("pointermove",move);el.addEventListener("pointerleave",leave);return()=>{el.removeEventListener("pointermove",move);el.removeEventListener("pointerleave",leave)}});
    return()=>cleanups.forEach(fn=>fn());
  }, []);
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedProject(null); };
    addEventListener("keydown", onKey); return () => { document.body.style.overflow = ""; removeEventListener("keydown", onKey); };
  }, [selectedProject]);
  return <main>
    <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}/>
    <nav className={scrolled ? "nav compact" : "nav"}>
      <a className="logo personal-logo" href="#inicio" aria-label="Pedro Mariniello, voltar ao início"><img src="/pedro-mariniello-logo.png" alt="Pedro Mariniello" width="1942" height="809"/></a>
      <div className="nav-center"><a href="#sobre">Sobre</a><a href="#servicos">Serviços</a><a href="#excel">Excel</a><a href="#tecnologia">Tecnologia</a><a href="#portfolio">Portfólio</a><a href="#recomendacoes">Recomendações</a><a href="#contato">Contato</a></div>
      <a className="nav-button" href="#contato">Agendar diagnóstico <span>↗</span></a>
    </nav>

    <section className="hero" id="inicio">
      <div className="hero-grid"/><div className="hero-light l1"/><div className="hero-light l2"/>
      <div className="hero-index"><span>01</span><i/><b>PEDRO MARINIELLO / PROCESSOS & AUTOMAÇÃO</b></div>
      <div className="hero-main">
        <div className="hero-copy"><div className="status"><i/> PEDRO MARINIELLO · PROCESSOS, SISTEMAS & AUTOMAÇÃO</div><h1><span>Do caos</span><span>operacional ao</span><span className="accent">sistema que flui.</span></h1><p>Eu transformo rotinas complexas em sistemas claros, seguros e prontos para crescer — unindo visão de processo, tecnologia e execução.</p><div className="hero-actions"><a className="button-primary whatsapp-button" href="https://wa.me/5521992823737" target="_blank" rel="noopener noreferrer"><i aria-hidden="true">✆</i> Falar no WhatsApp <span>↗</span></a><a className="button-link email-button" href="mailto:pedromarinho527@gmail.com"><i aria-hidden="true">@</i> Enviar E-mail</a></div></div>
        <div className="hero-system hero-portrait"><div className="portrait-aura"/><img src="/pedro-mariniello-profissional.webp" alt="Pedro Mariniello, Analista de Sistemas" width="1536" height="1024" fetchPriority="high" decoding="async"/><div className="portrait-caption"><i/> ANALISTA DE SISTEMAS <span>RIO DE JANEIRO · BRASIL</span></div></div>
      </div>
      <div className="hero-foot"><span>ROLE PARA EXPLORAR</span><i/><p>Estratégia <b>+</b> tecnologia <b>+</b> execução</p></div>
    </section>

    <section className="identity-strip" id="sobre"><div className="identity-track"><span>PEDRO MARINIELLO</span><i>✦</i><span>PROCESSOS</span><i>✦</i><span>SISTEMAS</span><i>✦</i><span>AUTOMAÇÃO</span><i>✦</i><span>PEDRO MARINIELLO</span><i>✦</i><span>PROCESSOS</span></div></section>
    <section className="identity section"><Reveal><div className="identity-card"><div className="identity-monogram"><img src="/pedro-mariniello-logo.png" alt="Pedro Mariniello"/><span>01</span></div><div><div className="section-label"><span>PERFIL</span> MINHA IDENTIDADE</div><h2>Estratégia de processo.<br/><em>Execução de produto.</em></h2><p>Sou Pedro Mariniello. Desenho soluções digitais a partir da operação real: entendo o fluxo, elimino atritos e construo sistemas que as pessoas conseguem usar, medir e evoluir.</p><div className="identity-tags"><span>PLANEJAMENTO</span><span>PROCESSOS</span><span>EXCEL & VBA</span><span>SISTEMAS WEB</span><span>DADOS</span><span>AUTOMAÇÃO</span></div></div></div></Reveal></section>

    <ChaosToOrder />

    <section className="services section" id="servicos">
      <Reveal><div className="section-label"><span>03</span> CAPACIDADES</div><div className="section-head"><h2>Quatro frentes.<br/><em>Um único fluxo.</em></h2><p>Não entregamos documentos que ficam na gaveta. Construímos sistemas que entram na rotina e mudam o resultado.</p></div></Reveal>
      <div className="service-grid">{SERVICES.map((s,i)=><Reveal key={s.n} className={`service-card ${s.span}`} delay={i*85}><div className="service-top"><span>{s.n}</span><i>{s.icon}</i></div><h3>{s.title}</h3><p>{s.text}</p><a href="#contato" aria-label={`Saiba mais sobre ${s.title}`}>↗</a><div className="card-shine"/></Reveal>)}</div>
      <Reveal className="integration-row"><span>CONECTAMOS O QUE JÁ EXISTE</span><div><b>ERP</b><b>CRM</b><b>BI</b><b>API</b><b>RPA</b><b>IA</b></div></Reveal>
    </section>

    <section className="method section" id="metodo">
      <Reveal><div className="section-label"><span>04</span> MÉTODO NEXO</div><div className="section-head"><h2>Clareza antes<br/><em>da tecnologia.</em></h2><p>Cada fase reduz incerteza antes de aumentar complexidade. Assim, a solução nasce certa e evolui com segurança.</p></div></Reveal>
      <div className="method-list">{METHOD.map((m,i)=><Reveal className="method-item" key={m.n} delay={i*80}><div className="method-num">{m.n}</div><div className="method-time">{m.time}</div><h3>{m.title}</h3><p>{m.text}</p><div className="method-dot"/></Reveal>)}</div>
    </section>

    <ExcelStory />

    <TechLab />

    <section className="cases section" id="portfolio">
      <Reveal><div className="portfolio-title"><div><div className="section-label"><span>06</span> PORTFÓLIO · PEDRO MARINIELLO</div><h2>Projetos reais.<br/><em>Por dentro do fluxo.</em></h2></div><div className="portfolio-index"><b>03</b><span>SISTEMAS<br/>EM DESTAQUE</span><i/></div></div><div className="section-head portfolio-head"><p>Capas com telas internas, não logins. Abra cada case para navegar pelo funcionamento do produto com informações demonstrativas e privacidade preservada.</p><div className="portfolio-signature">PEDRO MARINIELLO <i/> PROCESSOS & SISTEMAS</div></div></Reveal>
      <div className="case-list">{PROJECTS.map((project, i) => <Reveal className={`case-row ${i % 2 ? "reverse" : ""}`} key={project.id}>
        <ProjectImage project={project}/>
        <div className="case-copy">
          <span>{project.eyebrow}</span>
          <h3>{project.title}</h3>
          <p className="case-context">{project.context}</p>
          <dl className="case-story">
            <div><dt>Problema</dt><dd>{project.problem}</dd></div>
            <div><dt>Minha atuação</dt><dd>{project.role}</dd></div>
            <div><dt>Resultado</dt><dd>{project.outcome}</dd></div>
          </dl>
          <button onClick={() => { setDemoStep(0); setSelectedProject(project); }}>Abrir estudo de caso <b>↗</b></button>
        </div>
      </Reveal>)}</div>
    </section>

    {selectedProject && <div className="project-modal" role="dialog" aria-modal="true" aria-label={`Detalhes do projeto ${selectedProject.title}`} onMouseDown={(e) => { if (e.target === e.currentTarget) setSelectedProject(null); }}><article>
      <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Fechar detalhes">×</button>
      <header><span>{selectedProject.eyebrow}</span><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="privacy-seal"><i/> PRIVACIDADE PRESERVADA · NENHUM DADO REAL EXIBIDO</div></header>
      <section className="case-study-brief">
        <div><small>CONTEXTO</small><p>{selectedProject.context}</p></div>
        <div><small>PROBLEMA</small><p>{selectedProject.problem}</p></div>
        <div><small>MINHA ATUAÇÃO</small><p>{selectedProject.role}</p></div>
        <div><small>SOLUÇÃO</small><p>{selectedProject.solution}</p></div>
        <div><small>RESULTADO</small><p>{selectedProject.outcome}</p></div>
      </section>
      <div className="modal-screen dashboard-screen"><ProjectDashboard id={selectedProject.id} large/><div><i/> TELA INTERNA · DADOS FICTÍCIOS</div></div>
      <SystemDemo id={selectedProject.id} active={demoStep} onChange={setDemoStep}/>
      <section className="modal-block"><div className="modal-label">COMO FUNCIONA</div><div className="workflow">{selectedProject.steps.map((step,i)=><button className={demoStep === i ? "active" : ""} onClick={() => setDemoStep(i)} key={step[0]}><b>{String(i+1).padStart(2,"0")}</b><h3>{step[0]}</h3><p>{step[1]}</p><span>VER ETAPA →</span></button>)}</div></section>
      <section className="modal-two"><div><div className="modal-label">PRINCIPAIS MÓDULOS</div><div className="module-tags">{selectedProject.features.map(f=><span key={f}>{f}</span>)}</div></div><div><div className="modal-label">TECNOLOGIAS</div><div className="tech-list">{selectedProject.tech.map(t=><span key={t}>{t}</span>)}</div></div></section>
      <footer className="modal-footer"><p>Concebido e desenvolvido por <strong>Pedro Mariniello</strong>.</p><a href="mailto:pedromarinho527@gmail.com">Quero conversar sobre este projeto <span>↗</span></a></footer>
    </article></div>}

    <section className="numbers section"><Reveal><div className="section-label"><span>07</span> O QUE MUDA</div><h2>Menos ruído.<br/>Mais <em>capacidade.</em></h2></Reveal><div className="number-grid">{[{n:80,s:"%",l:"tempo economizado"},{n:95,s:"%",l:"previsibilidade operacional"},{n:20,s:"+",l:"automações em produção"},{n:10,s:"+",l:"operações transformadas"}].map((x,i)=><Reveal className="number" key={x.l} delay={i*90}><strong><Counter to={x.n} suffix={x.s}/></strong><span>{x.l}</span><i/></Reveal>)}</div></section>

    <Recommendations />

    <section className="contact section" id="contato"><div className="contact-grid"/><div className="contact-glow"/><Reveal><div className="section-label center"><span>08</span> CONTATO</div><h2>Vamos <em>conversar?</em></h2><p>Se sua empresa possui processos manuais, atividades repetitivas ou oportunidades de melhoria através da tecnologia, ficarei feliz em conversar sobre como posso ajudar.</p><div className="contact-cards"><a className="whatsapp-contact" href="https://wa.me/5521992823737" target="_blank" rel="noopener noreferrer"><i><img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="" aria-hidden="true" width="24" height="24"/></i><span><small>WHATSAPP</small><strong>+55 (21) 99282-3737</strong></span><b>↗</b></a><a className="gmail-contact" href="mailto:pedromarinho527@gmail.com"><i><img src="https://cdn.simpleicons.org/gmail/EA4335" alt="" aria-hidden="true" width="24" height="24"/></i><span><small>GMAIL</small><strong>pedromarinho527@gmail.com</strong></span><b>↗</b></a><a className="linkedin-contact" href="https://www.linkedin.com/in/pedro-henrique-mariniello-3011333a9?utm_source=share_via&amp;utm_content=profile&amp;utm_medium=member_ios" target="_blank" rel="noopener noreferrer"><i><img className="linkedin-logo" src="/linkedin-logo.png" alt="" aria-hidden="true" width="24" height="24"/></i><span><small>LINKEDIN</small><strong>Pedro Henrique Mariniello</strong></span><b>↗</b></a></div><div className="availability"><div><i aria-hidden="true">⌖</i><span>Atendimento presencial em todo o estado do Rio de Janeiro.</span></div><div><i aria-hidden="true">◉</i><span>Atendimento remoto para qualquer região do Brasil e do mundo.</span></div><div><i aria-hidden="true">◇</i><span>Para projetos presenciais fora do estado do Rio de Janeiro, consultar disponibilidade.</span></div></div><a className="button-primary invert budget-button" href="https://wa.me/5521992823737" target="_blank" rel="noopener noreferrer"><i aria-hidden="true">✆</i> Solicitar um orçamento <span>↗</span></a></Reveal></section>

    <footer><a className="logo personal-logo" href="#inicio" aria-label="Voltar ao início"><img src="/pedro-mariniello-logo.png" alt="Pedro Mariniello" width="1942" height="809"/></a><p>Processos claros.<br/>Sistemas que avançam.</p><div><a href="#sobre">Sobre</a><a href="#servicos">Serviços</a><a href="#tecnologia">Tecnologia</a><a href="#portfolio">Portfólio</a><a href="#recomendacoes">Recomendações</a><a href="#contato">Contato</a></div><small>© 2026 PEDRO MARINIELLO</small></footer>
  </main>;
}
