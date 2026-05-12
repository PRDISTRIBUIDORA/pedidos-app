import { useState, useEffect, useCallback } from "react";

const PROVEEDORES = ["TODOS","BECHLAB","ESPERANZA","SEDAPIC","ELMER","EVOLUTION PETS","OZI","OZICOS"];
const DIAS = ["Lunes","Martes","Miércoles","Jueves","Viernes"];
const TRANSPORTES = ["MOSTTO","LAL","CLIENTE"];
const USUARIOS = [
  { key:"juan",     name:"Juan",      role:"vendedor",   color:"#1e3a5f", emoji:"🛒" },
  { key:"sabrina",  name:"Sabrina",   role:"vendedor",   color:"#1565c0", emoji:"🛒" },
  { key:"reparto",  name:"Reparto",   role:"repartidor", color:"#e65100", emoji:"🚚" },
  { key:"antonella",name:"Antonella", role:"admin",      color:"#4a148c", emoji:"🏢", pass:"antonella123" },
];

const INIT_PRODUCTS = [
  {id:1824,codigo:"1824",nombre:"SALES ISOTONIC FULL X 10 SOBRE X 20G",precio:14399.62,proveedor:"BECHLAB"},
  {id:5612,codigo:"5612",nombre:"ENROMED 100 MG X 100 COMP",precio:17366.10,proveedor:"BECHLAB"},
  {id:5613,codigo:"5613",nombre:"ENROMED 200 MG X 100 COMP",precio:24698.81,proveedor:"BECHLAB"},
  {id:5614,codigo:"5614",nombre:"KETOBECH 200 MG X 100 COMP",precio:29082.60,proveedor:"BECHLAB"},
  {id:5615,codigo:"5615",nombre:"METROBECH 250 MG X 50 COMP",precio:14362.00,proveedor:"BECHLAB"},
  {id:5616,codigo:"5616",nombre:"METROBECH 500 MG X 40 COMP",precio:17964.00,proveedor:"BECHLAB"},
  {id:5617,codigo:"5617",nombre:"URSOMARINA 10 KG X 50 COMP",precio:26005.28,proveedor:"BECHLAB"},
  {id:5618,codigo:"5618",nombre:"URSOMARINA 20 KG X 50 COMP",precio:43342.49,proveedor:"BECHLAB"},
  {id:5619,codigo:"5619",nombre:"METROBECH INY 5 MG/ML X 100 ML",precio:7208.00,proveedor:"BECHLAB"},
  {id:5627,codigo:"5627",nombre:"CONDROVITAL X 110 G",precio:16611.75,proveedor:"BECHLAB"},
  {id:5628,codigo:"5628",nombre:"COPROBECH PLUS X 100 G",precio:15295.65,proveedor:"BECHLAB"},
  {id:5629,codigo:"5629",nombre:"MATERNIL FORT X 250 GR",precio:5731.99,proveedor:"BECHLAB"},
  {id:5718,codigo:"5718",nombre:"CEFALEXINA SUSP.",precio:6439.00,proveedor:"BECHLAB"},
  {id:5720,codigo:"5720",nombre:"FIPRO BIT 1 A 10 KG",precio:3495.69,proveedor:"BECHLAB"},
  {id:5721,codigo:"5721",nombre:"FIPRO BIT 11 A 20 KG",precio:3984.68,proveedor:"BECHLAB"},
  {id:5722,codigo:"5722",nombre:"FIPRO BIT 21 A 40 KG",precio:4404.12,proveedor:"BECHLAB"},
  {id:5723,codigo:"5723",nombre:"FIPRO BIT 41 A 60 KG",precio:4501.49,proveedor:"BECHLAB"},
  {id:5724,codigo:"5724",nombre:"FIPRO BIT GATO",precio:3215.35,proveedor:"BECHLAB"},
  {id:5725,codigo:"5725",nombre:"DEXASHOCK X 20 ML",precio:12910.63,proveedor:"BECHLAB"},
  {id:5726,codigo:"5726",nombre:"DOXIBECH COMPLEX 100 MG X 50 COMP",precio:27189.00,proveedor:"BECHLAB"},
  {id:5727,codigo:"5727",nombre:"URSOMARINA SUSP. X 100CC",precio:11720.78,proveedor:"BECHLAB"},
  {id:6871,codigo:"6871",nombre:"TIOCTIC 10 MG X 50 COMP.",precio:5324.32,proveedor:"BECHLAB"},
  {id:6872,codigo:"6872",nombre:"CESNEFIN X 100 COMP.",precio:16252.23,proveedor:"BECHLAB"},
  {id:8067,codigo:"8067",nombre:"PREDNI 10 MG.",precio:16728.38,proveedor:"BECHLAB"},
  {id:8068,codigo:"8068",nombre:"PREDNI 20 MG.",precio:27787.90,proveedor:"BECHLAB"},
  {id:8118,codigo:"8118",nombre:"RENAL ADVANCE 100 GR POLVO",precio:11992.56,proveedor:"BECHLAB"},
  {id:9441,codigo:"9441",nombre:"RESVITAL OMEGA X 120 CC",precio:15840.28,proveedor:"BECHLAB"},
  {id:9442,codigo:"9442",nombre:"ENROMED 50 MG X 100 COMP",precio:12541.47,proveedor:"BECHLAB"},
  {id:9569,codigo:"9569",nombre:"PREGALBECH SOL ORAL X30ML",precio:18125.80,proveedor:"BECHLAB"},
  {id:10620,codigo:"10620",nombre:"HEMOSPEED X100 CC",precio:10818.77,proveedor:"BECHLAB"},
  {id:10670,codigo:"10670",nombre:"GABALBECH SOL ORAL X30ML",precio:16940.00,proveedor:"BECHLAB"},
  {id:10836,codigo:"10836",nombre:"BIT TRIO 10.1 A 20KG",precio:10487.07,proveedor:"BECHLAB"},
  {id:10837,codigo:"10837",nombre:"BIT TRIO 2KG A 4.5KG",precio:9788.36,proveedor:"BECHLAB"},
  {id:10838,codigo:"10838",nombre:"BIT TRIO 20.1KG A 40KG",precio:15380.18,proveedor:"BECHLAB"},
  {id:10839,codigo:"10839",nombre:"BIT TRIO 4.6KG A 10KG",precio:10487.07,proveedor:"BECHLAB"},
  {id:1734,codigo:"1734",nombre:"FENOBARBITAL PG 40 MG X 30 COMP",precio:4923.11,proveedor:"ESPERANZA"},
  {id:1992,codigo:"1992",nombre:"POWER COMPRIMIDOS 1400 MG 10 A 20 KG",precio:6086.23,proveedor:"ESPERANZA"},
  {id:1993,codigo:"1993",nombre:"POWER COMPRIMIDOS 2100 MG 20 A 30 KG",precio:7621.70,proveedor:"ESPERANZA"},
  {id:1981,codigo:"1981",nombre:"POWER ULTRA 2 A 4 KG",precio:2547.11,proveedor:"ESPERANZA"},
  {id:1984,codigo:"1984",nombre:"POWER ULTRA 20 A 40 KG",precio:4191.27,proveedor:"ESPERANZA"},
  {id:1905,codigo:"1905",nombre:"POWER ULTRA 40 A 60 KG",precio:5260.58,proveedor:"ESPERANZA"},
  {id:1982,codigo:"1982",nombre:"POWER ULTRA 5 A 10 KG",precio:2768.32,proveedor:"ESPERANZA"},
  {id:1983,codigo:"1983",nombre:"POWER ULTRA 10 A 20 KG",precio:3104.64,proveedor:"ESPERANZA"},
  {id:2054,codigo:"2054",nombre:"ARTRIN PLUS X 18 COMP.",precio:20452.00,proveedor:"ESPERANZA"},
  {id:2032,codigo:"2032",nombre:"ARTRIN PALATABLE X 30 COMPRIMIDOS",precio:18173.85,proveedor:"ESPERANZA"},
  {id:4457,codigo:"4457",nombre:"DERMOMAX X 15 GR",precio:4711.00,proveedor:"ESPERANZA"},
  {id:4458,codigo:"4458",nombre:"DERMOMAX X 40 GRS",precio:9253.97,proveedor:"ESPERANZA"},
  {id:7945,codigo:"7945",nombre:"POWER GOLD 3M DE 4.6 A 10 KG",precio:18207.77,proveedor:"ESPERANZA"},
  {id:7946,codigo:"7946",nombre:"POWER GOLD 3M DE 10.1 A 20 KG",precio:25503.81,proveedor:"ESPERANZA"},
  {id:7947,codigo:"7947",nombre:"POWER GOLD 3M DE 20.1 A 40 KG",precio:29098.03,proveedor:"ESPERANZA"},
  {id:8233,codigo:"8233",nombre:"FORT-E-PEN X 100 ML",precio:36166.90,proveedor:"ESPERANZA"},
  {id:9375,codigo:"9375",nombre:"METHIOVERTAN X 100 ML",precio:18394.92,proveedor:"ESPERANZA"},
  {id:10601,codigo:"10601",nombre:"POWER GOLD 1M DE 4.6 A 10KG",precio:9377.92,proveedor:"ESPERANZA"},
  {id:10602,codigo:"10602",nombre:"POWER GOLD 1M DE 10.1 A 20KG",precio:11996.43,proveedor:"ESPERANZA"},
  {id:10603,codigo:"10603",nombre:"POWER GOLD 1M DE 2 A 4.5KG",precio:8829.86,proveedor:"ESPERANZA"},
  {id:10835,codigo:"10835",nombre:"POWER GOLD 3M DE 40KG A 56KG",precio:35308.72,proveedor:"ESPERANZA"},
  {id:2,codigo:"2",nombre:"ESTAMPA PLUS RAZAS PEQUEÑAS X 8 KG",precio:21064.96,proveedor:"SEDAPIC"},
  {id:3,codigo:"3",nombre:"ESTAMPA PLUS PERRO X 15 KG",precio:37633.35,proveedor:"SEDAPIC"},
  {id:4,codigo:"4",nombre:"ESTAMPA PLUS PERRO X 20 KG",precio:48324.40,proveedor:"SEDAPIC"},
  {id:5,codigo:"5",nombre:"ESTAMPA CRIADORES PERRO X 8 KG",precio:17545.19,proveedor:"SEDAPIC"},
  {id:6,codigo:"6",nombre:"ESTAMPA CRIADORES PERRO X 15 KG",precio:31389.19,proveedor:"SEDAPIC"},
  {id:7,codigo:"7",nombre:"ESTAMPA CRIADORES PERRO X 20 KG",precio:40327.88,proveedor:"SEDAPIC"},
  {id:11,codigo:"11",nombre:"VAGONETA GATO X 1 KG",precio:2810.95,proveedor:"SEDAPIC"},
  {id:12,codigo:"12",nombre:"VAGONETA GATO X 10 KG",precio:24731.97,proveedor:"SEDAPIC"},
  {id:13,codigo:"13",nombre:"VAGONETA GATO X 20 KG",precio:46827.06,proveedor:"SEDAPIC"},
  {id:14,codigo:"14",nombre:"VAGONETA CACHORRO X 15 KG",precio:27970.89,proveedor:"SEDAPIC"},
  {id:15,codigo:"15",nombre:"VAGONETA PERRO CARNE X 20 KG",precio:28757.13,proveedor:"SEDAPIC"},
  {id:23,codigo:"23",nombre:"INSIGNIA PERRO ADULTO X 20 KG",precio:76811.17,proveedor:"SEDAPIC"},
  {id:9601,codigo:"9601",nombre:"INSIGNIA PERRO ADULTO X15KG",precio:57607.73,proveedor:"SEDAPIC"},
  {id:1954,codigo:"1954",nombre:"ACETAZINE 10 COMP.",precio:4553.82,proveedor:"ELMER"},
  {id:1943,codigo:"1943",nombre:"COLIRIO GOTERO X 5 ML",precio:4938.05,proveedor:"ELMER"},
  {id:1921,codigo:"1921",nombre:"GRISEOFULVINA X 20 COMP.",precio:8280.58,proveedor:"ELMER"},
  {id:1935,codigo:"1935",nombre:"HECTOPAR SPOT PLUS S PIPETA 1-4 KG.",precio:1768.08,proveedor:"ELMER"},
  {id:1936,codigo:"1936",nombre:"HECTOPAR SPOT PLUS L PIPETA 11-25 KG.",precio:1768.08,proveedor:"ELMER"},
  {id:1948,codigo:"1948",nombre:"SHAMPOO 2 EN 1 FRASCO X 250 ML",precio:2806.88,proveedor:"ELMER"},
  {id:1946,codigo:"1946",nombre:"SHAMPOO PULGA Y GARRAPATA FRASCO X 250ML",precio:2806.88,proveedor:"ELMER"},
  {id:5709,codigo:"5709",nombre:"HECTOPAR LIQUIDO X 120 CC",precio:6125.74,proveedor:"ELMER"},
  {id:8095,codigo:"8095",nombre:"HUMMS DENTAL CARE X 60 ML",precio:2839.74,proveedor:"ELMER"},
  {id:569,codigo:"569",nombre:"PELOTA LISA 50 P1",precio:3686.00,proveedor:"EVOLUTION PETS"},
  {id:570,codigo:"570",nombre:"PELOTA LIMPIADIENTES CHICA P3",precio:2116.00,proveedor:"EVOLUTION PETS"},
  {id:573,codigo:"573",nombre:"SOGA ARGOLLA S7",precio:9485.00,proveedor:"EVOLUTION PETS"},
  {id:601,codigo:"601",nombre:"MORDILLO SALVAVIDAS M2",precio:8685.00,proveedor:"EVOLUTION PETS"},
  {id:613,codigo:"613",nombre:"COMBO 1",precio:17221.22,proveedor:"EVOLUTION PETS"},
  {id:614,codigo:"614",nombre:"COMBO 2",precio:13849.73,proveedor:"EVOLUTION PETS"},
  {id:8208,codigo:"8208",nombre:"POLAR TALLE 40",precio:3600.00,proveedor:"OZI"},
  {id:8210,codigo:"8210",nombre:"POLAR TALLE 50",precio:5040.00,proveedor:"OZI"},
  {id:8219,codigo:"8219",nombre:"COLCHONETA EST TALLE 1",precio:10800.00,proveedor:"OZI"},
  {id:8225,codigo:"8225",nombre:"COLLAR TALLE 3",precio:1398.00,proveedor:"OZI"},
  {id:8268,codigo:"8268",nombre:"CORREA TALLE 1",precio:4020.00,proveedor:"OZI"},
  {id:9592,codigo:"9592",nombre:"BUZO CORDERITO T1",precio:5280.00,proveedor:"OZI"},
  {id:4410,codigo:"4410",nombre:"PELOTA DE PLASTICO CON SOGA OZK175",precio:3023.60,proveedor:"OZICOS"},
  {id:4416,codigo:"4416",nombre:"PELOTA DE SOGA CON AGARRE OZK117",precio:2127.50,proveedor:"OZICOS"},
  {id:4436,codigo:"4436",nombre:"RASCADOR INTERACTIVO DE COLORES OZK92",precio:15292.24,proveedor:"OZICOS"},
  {id:4491,codigo:"4491",nombre:"CORREA EXTENSIBLE 3 MTS 25 KG OZK10",precio:6172.67,proveedor:"OZICOS"},
  {id:8249,codigo:"8249",nombre:"JAULA INTERACTIVA OZK230",precio:30087.26,proveedor:"OZICOS"},
  {id:10853,codigo:"10853",nombre:"CORREA EXTENSIBLE 5M OZK361",precio:9267.45,proveedor:"OZICOS"},
];

async function apiGet(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const r = await fetch(`/api/sheets?${qs}`);
  return r.json();
}
async function apiPost(action, body = {}) {
  const r = await fetch(`/api/sheets?action=${action}`, {
    method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(body),
  });
  return r.json();
}

// ── HELPERS ───────────────────────────────────────────────────────────────
const today = () => new Date().toLocaleDateString("es-AR");
const parseFecha = (fechaStr) => {
  if (!fechaStr) return "";
  try {
    const d = new Date(fechaStr);
    if (!isNaN(d)) return d.toLocaleDateString("es-AR");
  } catch {}
  return fechaStr.split(",")[0].trim();
};
const dateOf = (o) => parseFecha(o.fecha);
const groupByDate = (orders) => {
  const map = {};
  orders.forEach(o => { const d = dateOf(o); if (!map[d]) map[d] = []; map[d].push(o); });
  return Object.entries(map).sort((a,b) => {
    const da = a[0].split("/").reverse().join("-");
    const db = b[0].split("/").reverse().join("-");
    return db.localeCompare(da);
  });
};

// ── FORM PEDIDO (compartido vendedor y admin) ─────────────────────────────
function FormPedido({ vendedorName, products, stock, color, onSaved }) {
  const [syncing, setSyncing] = useState(false);
  const [cliente, setCliente] = useState("");
  const [tipo, setTipo] = useState("pedido");
  const [promo, setPromo] = useState("");
  const [urgente, setUrgente] = useState(false);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [prov, setProv] = useState("TODOS");
  const [showRes, setShowRes] = useState(null);

  const allP = products.length > 0 ? products : INIT_PRODUCTS;
  const filtered = allP.filter(p => {
    const mP = prov==="TODOS"||p.proveedor===prov;
    const q = search.toLowerCase();
    return mP && (!q || p.nombre.toLowerCase().includes(q) || p.codigo.toLowerCase().includes(q));
  });

  const addItem = p => setItems(prev => { const ex=prev.find(i=>i.id===p.id); if(ex) return prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i); return [...prev,{...p,qty:1}]; });
  const updQty = (id,val) => { const qty=parseInt(val)||0; if(qty<=0) setItems(prev=>prev.filter(i=>i.id!==id)); else setItems(prev=>prev.map(i=>i.id===id?{...i,qty}:i)); };
  const total = items.reduce((s,i)=>s+i.precio*i.qty,0);

  const enviar = async () => {
    if (!cliente.trim()||items.length===0) return alert("Completá cliente y al menos un artículo");
    setSyncing(true);
    const o = { id:Date.now(), vendedor:vendedorName, cliente:cliente.trim(), tipo, promo, urgente, items, total, fecha:new Date().toLocaleString("es-AR"), estado:"pendiente", estadoReparto:"", fechaReparto:"", transporte:"" };
    await apiPost("addPedido", o);
    setShowRes(o); setCliente(""); setPromo(""); setItems([]); setUrgente(false); setTipo("pedido"); setSearch(""); setProv("TODOS");
    setSyncing(false);
    onSaved && onSaved();
  };

  const txtWA = o => {
    const lines = o.items.map(i=>`• ${i.nombre} x${i.qty} — $${(i.precio*i.qty).toLocaleString("es-AR")}`).join("\n");
    return `*${o.tipo.toUpperCase()} — ${o.cliente}*\n${o.urgente?"🔴 URGENTE":"🟢 Puede esperar"}\nVendedor: ${o.vendedor}\nFecha: ${o.fecha}\n${o.promo?`Promo: ${o.promo}\n`:""}\n${lines}\n\n*TOTAL: $${o.total.toLocaleString("es-AR")}*`;
  };

  return (
    <div>
      <div style={cd}>
        <label style={lb}>Cliente</label>
        <input value={cliente} onChange={e=>setCliente(e.target.value)} placeholder="Nombre del cliente" style={iS} />
        <div style={{display:"flex",gap:8,marginBottom:10}}>
          <div style={{flex:1}}><label style={lb}>Tipo</label>
            <select value={tipo} onChange={e=>setTipo(e.target.value)} style={iS}>
              <option value="pedido">📦 Pedido</option>
              <option value="presupuesto">📄 Presupuesto</option>
            </select>
          </div>
          <div style={{flex:1}}><label style={lb}>Prioridad</label>
            <div style={{display:"flex",gap:6,marginTop:4}}>
              <button onClick={()=>setUrgente(true)} style={{flex:1,padding:"8px 0",borderRadius:8,border:`2px solid ${urgente?"#e53935":"#ddd"}`,background:urgente?"#fdecea":"#fff",color:urgente?"#e53935":"#888",cursor:"pointer",fontSize:12}}>🔴 Urgente</button>
              <button onClick={()=>setUrgente(false)} style={{flex:1,padding:"8px 0",borderRadius:8,border:`2px solid ${!urgente?"#43a047":"#ddd"}`,background:!urgente?"#e8f5e9":"#fff",color:!urgente?"#43a047":"#888",cursor:"pointer",fontSize:12}}>🟢 Espera</button>
            </div>
          </div>
        </div>
        <label style={lb}>Promoción / Aclaración</label>
        <input value={promo} onChange={e=>setPromo(e.target.value)} placeholder="Ej: 10% dto, precio especial..." style={iS} />
      </div>
      <div style={cd}>
        <label style={lb}>Proveedor</label>
        <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10}}>
          {PROVEEDORES.map(p=><button key={p} onClick={()=>setProv(p)} style={chip(prov===p,color)}>{p}</button>)}
        </div>
        <label style={lb}>Buscar artículo</label>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Nombre o código..." style={iS} />
        <div style={{maxHeight:220,overflowY:"auto"}}>
          {filtered.slice(0,80).map(p=>{
            const st=stock[p.codigo]??stock[p.id];
            return (
              <div key={p.id} onClick={()=>addItem(p)} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"8px 10px",borderRadius:8,marginBottom:4,background:"#f8fafc",cursor:"pointer",border:"1px solid #e8edf5"}}>
                <div style={{flex:1,minWidth:0,marginRight:8}}>
                  <b style={{fontSize:12,display:"block",lineHeight:1.4}}>{p.nombre}</b>
                  <div style={{fontSize:10,color:"#888"}}>{p.codigo} · {p.proveedor}{st!==undefined?` · Stock: ${st}`:""}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontWeight:700,color,fontSize:12}}>${p.precio.toLocaleString("es-AR")}</div>
                  <div style={{fontSize:10,color:"#43a047"}}>+ agregar</div>
                </div>
              </div>
            );
          })}
          {filtered.length>80&&<p style={{fontSize:11,color:"#888",textAlign:"center"}}>Acotar búsqueda</p>}
        </div>
      </div>
      {items.length>0&&(
        <div style={cd}>
          <b style={{fontSize:14,color}}>Artículos seleccionados</b>
          {items.map(i=>(
            <div key={i.id} style={{display:"flex",alignItems:"center",gap:8,marginTop:8,padding:"8px",background:"#f0f4ff",borderRadius:8}}>
              <div style={{flex:1,minWidth:0}}>
                <b style={{fontSize:12,display:"block",lineHeight:1.4}}>{i.nombre}</b>
                <span style={{color:"#888",fontSize:11}}>${i.precio.toLocaleString("es-AR")} c/u</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <button onClick={()=>updQty(i.id,i.qty-1)} style={qB}>−</button>
                <input type="number" value={i.qty} onChange={e=>updQty(i.id,e.target.value)} style={{width:48,textAlign:"center",fontWeight:700,fontSize:15,border:"1px solid #ddd",borderRadius:8,padding:"4px 0"}} />
                <button onClick={()=>updQty(i.id,i.qty+1)} style={qB}>+</button>
              </div>
              <div style={{fontWeight:700,color,fontSize:12,minWidth:65,textAlign:"right"}}>${(i.precio*i.qty).toLocaleString("es-AR")}</div>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",marginTop:12,padding:"10px 0",borderTop:"2px solid #e8edf5"}}>
            <b>Total</b><b style={{color}}>${total.toLocaleString("es-AR")}</b>
          </div>
          <button onClick={enviar} disabled={syncing} style={bP(color)}>{syncing?"Enviando...":tipo==="pedido"?"📦 Enviar pedido":"📄 Enviar presupuesto"}</button>
        </div>
      )}
      {showRes&&(
        <Modal onClose={()=>setShowRes(null)}>
          <h3 style={{marginTop:0,color}}>✅ {showRes.tipo.charAt(0).toUpperCase()+showRes.tipo.slice(1)} guardado</h3>
          <p style={{fontSize:13,color:"#555"}}>Cliente: <b>{showRes.cliente}</b> · Total: <b>${showRes.total.toLocaleString("es-AR")}</b></p>
          {showRes.tipo==="presupuesto"&&(
            <a href={`https://wa.me/?text=${encodeURIComponent(txtWA(showRes))}`} target="_blank" rel="noreferrer"
              style={{display:"block",textAlign:"center",background:"#25D366",color:"#fff",borderRadius:10,padding:"14px 0",textDecoration:"none",fontWeight:700,marginBottom:8}}>
              📱 Mandar por WhatsApp
            </a>
          )}
          <button onClick={()=>{setShowRes(null);}} style={{...bP(color),marginBottom:8}}>➕ Cargar otro pedido</button>
        </Modal>
      )}
    </div>
  );
}

// ── LOGIN ─────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [showPass, setShowPass] = useState(false);
  const [pass, setPass] = useState(""); const [err, setErr] = useState("");
  const select = u => { if(u.pass){setShowPass(u);setPass("");setErr("");}else onLogin(u); };
  const confirm = () => { if(pass===showPass.pass) onLogin(showPass); else setErr("Contraseña incorrecta"); };
  return (
    <div style={{minHeight:"100vh",background:"#1a1a2e",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{width:"100%",maxWidth:360}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:48}}>🐾</div>
          <h2 style={{color:"#fff",margin:"8px 0 4px"}}>Sistema de Pedidos</h2>
          <p style={{color:"rgba(255,255,255,.5)",fontSize:13,margin:0}}>¿Quién sos?</p>
        </div>
        {!showPass?(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {USUARIOS.map(u=>(
              <button key={u.key} onClick={()=>select(u)} style={{background:u.color,border:"none",borderRadius:16,padding:"24px 12px",cursor:"pointer",color:"#fff"}}>
                <div style={{fontSize:32,marginBottom:8}}>{u.emoji}</div>
                <div style={{fontWeight:700,fontSize:16}}>{u.name}</div>
                {u.pass&&<div style={{fontSize:11,opacity:.7,marginTop:4}}>🔒 requiere contraseña</div>}
              </button>
            ))}
          </div>
        ):(
          <div style={{background:"#fff",borderRadius:16,padding:28}}>
            <p style={{textAlign:"center",fontWeight:700,color:"#4a148c",marginTop:0}}>🔒 Contraseña de {showPass.name}</p>
            <input type="password" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&confirm()} placeholder="Contraseña" autoFocus style={iS} />
            {err&&<p style={{color:"red",fontSize:12,margin:"4px 0 8px"}}>{err}</p>}
            <button onClick={confirm} style={bP("#4a148c")}>Ingresar</button>
            <button onClick={()=>setShowPass(false)} style={{...bP("#888"),marginTop:8}}>Volver</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── VENDEDOR ──────────────────────────────────────────────────────────────
function VendedorApp({ user, onLogout }) {
  const [tab, setTab] = useState("nuevo");
  const [orders, setOrders] = useState([]);
  const [stock, setStock] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [prov, setProv] = useState("TODOS");
  const color = user.color;

  const refresh = useCallback(async () => {
    try {
      const [o,s,a] = await Promise.all([apiGet({action:"getPedidos"}),apiGet({action:"getStock"}),apiGet({action:"getArticulos"})]);
      if(Array.isArray(o)) setOrders(o);
      if(s&&!s.error) setStock(s);
      if(Array.isArray(a)&&a.length>0) setProducts(a);
    } catch(e){console.error(e);}
    setLoading(false);
  },[]);

  useEffect(()=>{refresh();const t=setInterval(refresh,10000);return()=>clearInterval(t);},[refresh]);

  const allP = products.length>0?products:INIT_PRODUCTS;
  const filtP = allP.filter(p=>{const mP=prov==="TODOS"||p.proveedor===prov;const q=search.toLowerCase();return mP&&(!q||p.nombre.toLowerCase().includes(q)||p.codigo.toLowerCase().includes(q));});
  const myOrders = orders.filter(o=>o.vendedor===user.name);

  if(loading) return <Loader/>;

  return (
    <div style={{maxWidth:500,margin:"0 auto",fontFamily:"sans-serif",background:"#f4f6fb",minHeight:"100vh"}}>
      <Header user={user} onLogout={onLogout}/>
      <Tabs tabs={["nuevo","mis-pedidos","precios"]} labels={["➕ Nuevo",`📋 Mis (${myOrders.length})`,"💲 Precios"]} active={tab} onChange={setTab} color={color}/>
      <div style={{padding:16}}>
        {tab==="nuevo"&&<FormPedido vendedorName={user.name} products={products} stock={stock} color={color} onSaved={refresh}/>}
        {tab==="mis-pedidos"&&(
          <div>
            {myOrders.length===0&&<p style={{color:"#888",textAlign:"center"}}>No tenés pedidos aún</p>}
            {myOrders.map(o=>(
              <div key={o.id} style={{...cd,borderLeft:`4px solid ${o.urgente?"#e53935":"#43a047"}`}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div><b>{o.cliente}</b> <TipoBadge tipo={o.tipo}/>
                    <div style={{fontSize:12,color:"#888",marginTop:2}}>{o.fecha}</div></div>
                  <EstadoBadge estado={o.estado} estadoReparto={o.estadoReparto}/>
                </div>
                {o.promo&&<div style={{fontSize:12,color:"#7b1fa2",marginTop:4}}>🏷️ {o.promo}</div>}
                {o.fechaReparto&&<div style={{fontSize:12,color:"#e65100",marginTop:2}}>📅 {o.fechaReparto}{o.transporte?` · ${o.transporte}`:""}</div>}
                <div style={{fontWeight:700,color,marginTop:6}}>Total: ${Number(o.total).toLocaleString("es-AR")}</div>
              </div>
            ))}
          </div>
        )}
        {tab==="precios"&&(
          <div>
            <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10}}>
              {PROVEEDORES.map(p=><button key={p} onClick={()=>setProv(p)} style={chip(prov===p,color)}>{p}</button>)}
            </div>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar..." style={{...iS,marginBottom:8}}/>
            {filtP.slice(0,100).map(p=>(
              <div key={p.id} style={{...cd,padding:"9px 12px"}}>
                <b style={{fontSize:13}}>{p.nombre}</b>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>
                  <span style={{fontSize:11,color:"#888"}}>{p.codigo} · {p.proveedor}</span>
                  <b style={{color,fontSize:13}}>${p.precio.toLocaleString("es-AR")}</b>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── REPARTIDOR ────────────────────────────────────────────────────────────
function RepartidorApp({ user, onLogout }) {
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState("pendiente");
  const [loading, setLoading] = useState(true);
  const [modalOrder, setModalOrder] = useState(null);
  const [fechaSel, setFechaSel] = useState("");
  const [transporteSel, setTransporteSel] = useState("");
  const [showTransporte, setShowTransporte] = useState(null);
  const color = "#e65100";

  const refresh = useCallback(async()=>{
    try{const o=await apiGet({action:"getPedidos"});if(Array.isArray(o))setOrders(o);}catch(e){console.error(e);}
    setLoading(false);
  },[]);
  useEffect(()=>{refresh();const t=setInterval(refresh,10000);return()=>clearInterval(t);},[refresh]);

  const facturados = orders.filter(o=>["facturado","en_reparto","programado","entregado"].includes(o.estado)||o.estadoReparto);
  const filtered = tab==="pendiente"?facturados.filter(o=>!o.estadoReparto||o.estadoReparto==="")
    :tab==="en_reparto"?facturados.filter(o=>o.estadoReparto==="en_reparto")
    :tab==="programado"?facturados.filter(o=>o.estadoReparto==="programado")
    :facturados.filter(o=>o.estadoReparto==="entregado");

  const updReparto = async(id,estadoReparto,fechaReparto="",transporte="")=>{
    setOrders(prev=>prev.map(o=>o.id===id?{...o,estadoReparto,fechaReparto,transporte}:o));
    await apiPost("updReparto",{id,estadoReparto,fechaReparto});
    if(transporte) await apiPost("updateOrder",{...orders.find(o=>o.id===id),estadoReparto,fechaReparto,transporte});
    setModalOrder(null); setShowTransporte(null); setTransporteSel("");
  };

  const handleEntregado = (o) => { setShowTransporte(o); setTransporteSel(""); };

  const counts = {
    pendiente:facturados.filter(o=>!o.estadoReparto||o.estadoReparto==="").length,
    en_reparto:facturados.filter(o=>o.estadoReparto==="en_reparto").length,
    programado:facturados.filter(o=>o.estadoReparto==="programado").length,
    entregado:facturados.filter(o=>o.estadoReparto==="entregado").length,
  };

  if(loading) return <Loader/>;

  return (
    <div style={{maxWidth:500,margin:"0 auto",fontFamily:"sans-serif",background:"#f4f6fb",minHeight:"100vh"}}>
      <Header user={user} onLogout={onLogout}/>
      <div style={{display:"flex",background:"#fff",borderBottom:"2px solid #e8edf5",overflowX:"auto"}}>
        {[{k:"pendiente",label:`📋 Sin asignar (${counts.pendiente})`},{k:"en_reparto",label:`🚚 En reparto (${counts.en_reparto})`},{k:"programado",label:`📅 Programado (${counts.programado})`},{k:"entregado",label:`✅ Entregado (${counts.entregado})`}].map(t=>(
          <button key={t.k} onClick={()=>setTab(t.k)} style={{flex:"0 0 auto",padding:"11px 14px",border:"none",background:"transparent",borderBottom:tab===t.k?`3px solid ${color}`:"3px solid transparent",color:tab===t.k?color:"#888",fontWeight:tab===t.k?700:400,cursor:"pointer",fontSize:12,whiteSpace:"nowrap"}}>{t.label}</button>
        ))}
      </div>
      <div style={{padding:16}}>
        {filtered.length===0&&<p style={{color:"#888",textAlign:"center",paddingTop:20}}>No hay pedidos en esta categoría</p>}
        {filtered.map(o=>(
          <div key={o.id} style={{...cd,borderLeft:`4px solid ${o.estadoReparto==="entregado"?"#43a047":o.estadoReparto==="en_reparto"?"#e65100":o.estadoReparto==="programado"?"#1565c0":"#999"}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div><b style={{fontSize:15}}>{o.cliente}</b>
                <div style={{fontSize:12,color:"#888"}}>{o.vendedor} · {o.fecha}</div>
              </div>
              <RepartoBadge estadoReparto={o.estadoReparto} fechaReparto={o.fechaReparto} transporte={o.transporte}/>
            </div>
            <div style={{marginTop:6,fontSize:12}}>
              {o.items&&o.items.slice(0,3).map((i,idx)=><div key={idx} style={{color:"#555"}}>• {i.nombre} x{i.qty}</div>)}
              {o.items&&o.items.length>3&&<div style={{color:"#aaa"}}>y {o.items.length-3} más...</div>}
            </div>
            <b style={{color,display:"block",marginTop:6}}>Total: ${Number(o.total).toLocaleString("es-AR")}</b>
            <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
              <button onClick={()=>updReparto(o.id,"en_reparto")} style={{...sB,flex:1,background:o.estadoReparto==="en_reparto"?"#e65100":"#e8edf5",color:o.estadoReparto==="en_reparto"?"#fff":"#555"}}>🚚 En reparto</button>
              <button onClick={()=>setModalOrder(o)} style={{...sB,flex:1,background:o.estadoReparto==="programado"?"#1565c0":"#e8edf5",color:o.estadoReparto==="programado"?"#fff":"#555"}}>📅 Programar</button>
              <button onClick={()=>handleEntregado(o)} style={{...sB,flex:1,background:o.estadoReparto==="entregado"?"#43a047":"#e8edf5",color:o.estadoReparto==="entregado"?"#fff":"#555"}}>✅ Entregado</button>
            </div>
          </div>
        ))}
      </div>
      {modalOrder&&(
        <Modal onClose={()=>setModalOrder(null)}>
          <h3 style={{marginTop:0,color:"#1565c0"}}>📅 Programar entrega</h3>
          <p style={{fontWeight:700}}>{modalOrder.cliente}</p>
          <label style={lb}>Día de entrega</label>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
            {DIAS.map(d=><button key={d} onClick={()=>setFechaSel(d)} style={{padding:"10px 14px",borderRadius:10,border:"none",cursor:"pointer",background:fechaSel===d?"#1565c0":"#e8edf5",color:fechaSel===d?"#fff":"#555",fontWeight:fechaSel===d?700:400,fontSize:13}}>{d}</button>)}
          </div>
          <button onClick={()=>fechaSel&&updReparto(modalOrder.id,"programado",fechaSel)} disabled={!fechaSel} style={bP("#1565c0")}>Confirmar</button>
          <button onClick={()=>setModalOrder(null)} style={{...bP("#888"),marginTop:8}}>Cancelar</button>
        </Modal>
      )}
      {showTransporte&&(
        <Modal onClose={()=>setShowTransporte(null)}>
          <h3 style={{marginTop:0,color:"#43a047"}}>✅ Confirmar entrega</h3>
          <p style={{fontWeight:700}}>{showTransporte.cliente}</p>
          <label style={lb}>Transporte</label>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
            {TRANSPORTES.map(t=><button key={t} onClick={()=>setTransporteSel(t)} style={{flex:1,padding:"12px 0",borderRadius:10,border:"none",cursor:"pointer",background:transporteSel===t?"#43a047":"#e8edf5",color:transporteSel===t?"#fff":"#555",fontWeight:transporteSel===t?700:400,fontSize:14}}>{t}</button>)}
          </div>
          <button onClick={()=>transporteSel&&updReparto(showTransporte.id,"entregado","",transporteSel)} disabled={!transporteSel} style={bP("#43a047")}>Confirmar entrega</button>
          <button onClick={()=>setShowTransporte(null)} style={{...bP("#888"),marginTop:8}}>Cancelar</button>
        </Modal>
      )}
    </div>
  );
}

// ── ADMIN ─────────────────────────────────────────────────────────────────
function AdminApp({ user, onLogout }) {
  const [tab, setTab] = useState("pedidos");
  const [orders, setOrders] = useState([]);
  const [stock, setStock] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [stockInput, setStockInput] = useState({});
  const [filterEstado, setFilterEstado] = useState("todos");
  const [search, setSearch] = useState("");
  const [prov, setProv] = useState("TODOS");
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState({codigo:"",nombre:"",precio:"",proveedor:"BECHLAB"});
  const [showForm, setShowForm] = useState(false);
  const [importText, setImportText] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [stockImportText, setStockImportText] = useState("");
  const [showStockImport, setShowStockImport] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [expandedDates, setExpandedDates] = useState({});
  const color = "#4a148c";

  const refresh = useCallback(async()=>{
    try{
      const [o,s,a]=await Promise.all([apiGet({action:"getPedidos"}),apiGet({action:"getStock"}),apiGet({action:"getArticulos"})]);
      if(Array.isArray(o)) setOrders(o);
      if(s&&!s.error) setStock(s);
      if(Array.isArray(a)&&a.length>0) setProducts(a);
    }catch(e){console.error(e);}
    setLoading(false);
    setLastSync(new Date().toLocaleTimeString("es-AR"));
  },[]);
  useEffect(()=>{refresh();const t=setInterval(refresh,8000);return()=>clearInterval(t);},[refresh]);

  const updEstado = async(id,estado)=>{
    setOrders(prev=>prev.map(o=>o.id===id?{...o,estado}:o));
    await apiPost("updEstado",{id,estado});
  };

  const deleteOrderFn = async(id)=>{
    if(!confirm("¿Eliminar este pedido?")) return;
    setOrders(prev=>prev.filter(o=>o.id!==id));
    await apiPost("deleteOrder",{id});
  };

  const saveOrderEdit = async()=>{
    if(!editOrder) return;
    setSaving(true);
    await apiPost("updateOrder",editOrder);
    setOrders(prev=>prev.map(o=>o.id===editOrder.id?editOrder:o));
    setEditOrder(null);
    setSaving(false);
  };

  const saveStock = async()=>{
    setSaving(true);
    const m={...stock};
    Object.entries(stockInput).forEach(([k,v])=>{if(v!=="") m[k]=parseInt(v)||0;});
    await apiPost("saveStock",m);
    setStock(m);setStockInput({});
    setSaving(false);alert("✅ Stock guardado");
  };

  const saveArticulo = async(item)=>{
    setSaving(true);
    const data={...item,precio:parseFloat(item.precio)||0,id:item.id||Date.now()};
    await apiPost("saveArticulo",data);
    setProducts(prev=>{const idx=prev.findIndex(p=>p.id===data.id);if(idx>=0){const n=[...prev];n[idx]=data;return n;}return[...prev,data];});
    setEditItem(null);setShowForm(false);setNewItem({codigo:"",nombre:"",precio:"",proveedor:"BECHLAB"});
    setSaving(false);
  };

  const deleteArticulo = async(id)=>{
    if(!confirm("¿Eliminar este artículo?")) return;
    await apiPost("deleteArticulo",{id});
    setProducts(prev=>prev.filter(p=>p.id!==id));
  };

  const handleImport = async()=>{
    const lines=importText.trim().split("\n").filter(Boolean);
    if(lines.length<2) return alert("Pegá al menos una fila + encabezado");
    const sep=lines[0].includes("\t")?"\t":",";
    const headers=lines[0].split(sep).map(h=>h.trim().toLowerCase());
    const idxCod=headers.findIndex(h=>h.includes("cod"));
    const idxNom=headers.findIndex(h=>h.includes("nom")||h.includes("desc"));
    const idxPre=headers.findIndex(h=>h.includes("prec"));
    const idxProv=headers.findIndex(h=>h.includes("prov"));
    if(idxNom<0||idxPre<0) return alert("Necesitás columnas de Nombre y Precio");
    const incoming=lines.slice(1).map(l=>{const cols=l.split(sep);return{codigo:idxCod>=0?cols[idxCod]?.trim()||"":"",nombre:cols[idxNom]?.trim()||"",precio:parseFloat(cols[idxPre]?.replace(/[^0-9.]/g,""))||0,proveedor:idxProv>=0?cols[idxProv]?.trim()||"":"SIN PROVEEDOR"};}).filter(p=>p.nombre&&p.precio>0);
    const base=[...(products.length>0?products:INIT_PRODUCTS)];
    let actualizados=0,nuevos=0;
    incoming.forEach(item=>{const idx=base.findIndex(p=>String(p.codigo).trim()===String(item.codigo).trim()&&item.codigo!=="");if(idx>=0){base[idx]={...base[idx],nombre:item.nombre,precio:item.precio,proveedor:item.proveedor};actualizados++;}else{base.push({...item,id:Date.now()+Math.random()});nuevos++;}});
    if(!confirm(`Actualizar ${actualizados}, agregar ${nuevos}. ¿Continuar?`)) return;
    setSaving(true);await apiPost("importArticulos",base);setProducts(base);setImportText("");setShowImport(false);
    setSaving(false);alert(`✅ ${actualizados} actualizados, ${nuevos} nuevos`);
  };

  const handleImportStock = async()=>{
    const lines=stockImportText.trim().split("\n").filter(Boolean);
    if(lines.length<2) return alert("Pegá al menos una fila + encabezado");
    const sep=lines[0].includes("\t")?"\t":",";
    const headers=lines[0].split(sep).map(h=>h.trim().toLowerCase());
    const idxCod=headers.findIndex(h=>h.includes("cod"));
    const idxCant=headers.findIndex(h=>h.includes("cant")||h.includes("stock")||h.includes("qty"));
    if(idxCod<0||idxCant<0) return alert("Necesitás columnas de Código y Cantidad");
    const newStock={...stock};let actualizados=0;
    lines.slice(1).forEach(l=>{const cols=l.split(sep);const cod=cols[idxCod]?.trim();const cant=parseInt(cols[idxCant]?.trim())||0;if(cod){newStock[cod]=cant;actualizados++;}});
    if(!confirm(`¿Actualizar stock de ${actualizados} artículos?`)) return;
    setSaving(true);await apiPost("saveStock",newStock);setStock(newStock);setStockImportText("");setShowStockImport(false);
    setSaving(false);alert(`✅ Stock actualizado: ${actualizados} artículos`);
  };

  const allP = products.length>0?products:INIT_PRODUCTS;
  const filtProd = allP.filter(p=>{const mP=prov==="TODOS"||p.proveedor===prov;const q=search.toLowerCase();return mP&&(!q||p.nombre.toLowerCase().includes(q)||p.codigo.toLowerCase().includes(q));});

  // Filtrar y agrupar pedidos por fecha
  const filtOrders = filterEstado==="todos"?orders:orders.filter(o=>o.estado===filterEstado);
  const grouped = groupByDate(filtOrders);
  const todayStr = today();
  const pendientes = orders.filter(o=>o.estado==="pendiente").length;

  const toggleDate = d => setExpandedDates(prev=>({...prev,[d]:!prev[d]}));
  const isExpanded = d => d===todayStr || expandedDates[d]===true || (expandedDates[d]===undefined&&d===grouped[0]?.[0]);

  if(loading) return <Loader/>;

  return (
    <div style={{maxWidth:700,margin:"0 auto",fontFamily:"sans-serif",background:"#f4f6fb",minHeight:"100vh"}}>
      <Header user={user} lastSync={lastSync} onLogout={onLogout}/>
      <Tabs tabs={["pedidos","nuevo","articulos","stock"]} labels={[`📋 Pedidos${pendientes>0?` (${pendientes})`:""}`, "➕ Nuevo pedido","📦 Artículos","📊 Stock"]} active={tab} onChange={setTab} color={color}/>

      <div style={{padding:16}}>
        {/* NUEVO PEDIDO */}
        {tab==="nuevo"&&<FormPedido vendedorName={user.name} products={products} stock={stock} color={color} onSaved={()=>{refresh();setTab("pedidos");}}/>}

        {/* PEDIDOS */}
        {tab==="pedidos"&&(
          <div>
            <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
              {["todos","pendiente","retenido","facturado"].map(e=>(
                <button key={e} onClick={()=>setFilterEstado(e)} style={{padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",background:filterEstado===e?color:"#e8edf5",color:filterEstado===e?"#fff":"#555",fontSize:12,fontWeight:filterEstado===e?700:400}}>
                  {e==="retenido"?"🔴 Retenido":e.charAt(0).toUpperCase()+e.slice(1)}{e==="pendiente"&&pendientes>0?` (${pendientes})`:""}
                </button>
              ))}
            </div>
            {grouped.length===0&&<p style={{color:"#888",textAlign:"center"}}>No hay pedidos</p>}
            {grouped.map(([date,dayOrders])=>(
              <div key={date} style={{marginBottom:12}}>
                <button onClick={()=>toggleDate(date)} style={{width:"100%",background:date===todayStr?"#4a148c":"#e8edf5",color:date===todayStr?"#fff":"#555",border:"none",borderRadius:10,padding:"10px 14px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",fontWeight:700,fontSize:13}}>
                  <span style={{textAlign:"left",flex:1}}>{date===todayStr?"📅 Hoy — "+date:date} · {dayOrders.map(o=>o.cliente).join(", ")}</span>
                  <span style={{marginLeft:8,flexShrink:0}}>{isExpanded(date)?"▲":"▼"}</span>
                </button>
                {isExpanded(date)&&dayOrders.map(o=>(
                  <div key={o.id} style={{...cd,borderLeft:`4px solid ${o.estado==="retenido"?"#c62828":o.urgente?"#e53935":"#43a047"}`,marginTop:6}}>
                    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
                      <div><b style={{fontSize:15}}>{o.cliente}</b> <TipoBadge tipo={o.tipo}/>
                        <div style={{fontSize:12,color:"#888"}}>{o.vendedor} · {o.fecha}</div>
                      </div>
                      <EstadoBadge estado={o.estado} estadoReparto={o.estadoReparto}/>
                    </div>
                    {o.promo&&<div style={{fontSize:12,color:"#7b1fa2",marginTop:4}}>🏷️ {o.promo}</div>}
                    {o.fechaReparto&&<div style={{fontSize:12,color:"#e65100",marginTop:2}}>📅 {o.fechaReparto}{o.transporte?` · ${o.transporte}`:""}</div>}
                    <div style={{marginTop:6}}>{o.items&&o.items.map((i,idx)=><div key={idx} style={{fontSize:12,color:"#444",padding:"1px 0"}}>• {i.nombre} x{i.qty} — ${(i.precio*i.qty).toLocaleString("es-AR")}</div>)}</div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10,flexWrap:"wrap",gap:8}}>
                      <b style={{color}}>Total: ${Number(o.total).toLocaleString("es-AR")}</b>
                      <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                        <button onClick={()=>updEstado(o.id,"pendiente")} style={{...sB,background:o.estado==="pendiente"?color:"#e8edf5",color:o.estado==="pendiente"?"#fff":"#555"}}>⏳</button>
                        <button onClick={()=>updEstado(o.id,"retenido")} style={{...sB,background:o.estado==="retenido"?"#c62828":"#fce4ec",color:o.estado==="retenido"?"#fff":"#c62828"}}>🔴 Retenido</button>
                        <button onClick={()=>updEstado(o.id,"facturado")} style={{...sB,background:o.estado==="facturado"?"#43a047":"#e8edf5",color:o.estado==="facturado"?"#fff":"#555"}}>✅ Facturado</button>
                        <button onClick={()=>setEditOrder({...o})} style={{...sB,background:"#e3f0ff",color:"#1e3a5f"}}>✏️</button>
                        <button onClick={()=>deleteOrderFn(o.id)} style={{...sB,background:"#fdecea",color:"#e53935"}}>🗑️</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ARTÍCULOS */}
        {tab==="articulos"&&(
          <div>
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              <button onClick={()=>{setShowForm(true);setEditItem(null);}} style={{...bP(color),flex:2,marginTop:0}}>➕ Agregar</button>
              <button onClick={()=>setShowImport(!showImport)} style={{...bP("#1565c0"),flex:1,marginTop:0}}>📥 Importar</button>
            </div>
            {showImport&&(
              <div style={{...cd,border:`2px solid #1565c0`,marginBottom:12}}>
                <b style={{color:"#1565c0"}}>📥 Importar lista de precios</b>
                <p style={{fontSize:12,color:"#555",marginTop:6}}>Pegá desde Excel: Código, Nombre, Precio, Proveedor (con encabezado). Actualiza por código.</p>
                <textarea value={importText} onChange={e=>setImportText(e.target.value)} placeholder={"Codigo\tNombre\tPrecio\tProveedor"} style={{width:"100%",height:100,borderRadius:8,border:"1px solid #ddd",padding:10,fontSize:12,boxSizing:"border-box",fontFamily:"monospace"}}/>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={handleImport} disabled={saving} style={{...bP("#1565c0"),flex:2,marginTop:8}}>{saving?"Importando...":"📥 Importar"}</button>
                  <button onClick={()=>{setShowImport(false);setImportText("");}} style={{...bP("#888"),flex:1,marginTop:8}}>Cancelar</button>
                </div>
              </div>
            )}
            {(showForm||editItem)&&(
              <div style={{...cd,border:`2px solid ${color}`,marginBottom:12}}>
                <b style={{color}}>{editItem?"✏️ Editar":"➕ Nuevo"}</b>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:10}}>
                  <input placeholder="Código" value={editItem?editItem.codigo:newItem.codigo} onChange={e=>editItem?setEditItem({...editItem,codigo:e.target.value}):setNewItem({...newItem,codigo:e.target.value})} style={{...iS,flex:1,minWidth:80}}/>
                  <input placeholder="Nombre" value={editItem?editItem.nombre:newItem.nombre} onChange={e=>editItem?setEditItem({...editItem,nombre:e.target.value}):setNewItem({...newItem,nombre:e.target.value})} style={{...iS,flex:3,minWidth:150}}/>
                  <input placeholder="Precio" type="number" value={editItem?editItem.precio:newItem.precio} onChange={e=>editItem?setEditItem({...editItem,precio:e.target.value}):setNewItem({...newItem,precio:e.target.value})} style={{...iS,flex:1,minWidth:90}}/>
                  <select value={editItem?editItem.proveedor:newItem.proveedor} onChange={e=>editItem?setEditItem({...editItem,proveedor:e.target.value}):setNewItem({...newItem,proveedor:e.target.value})} style={{...iS,flex:1,minWidth:110}}>
                    {PROVEEDORES.filter(p=>p!=="TODOS").map(p=><option key={p}>{p}</option>)}
                  </select>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>saveArticulo(editItem||{...newItem})} disabled={saving} style={{...bP(color),flex:2}}>{saving?"Guardando...":"💾 Guardar"}</button>
                  <button onClick={()=>{setEditItem(null);setShowForm(false);}} style={{...bP("#888"),flex:1}}>Cancelar</button>
                </div>
              </div>
            )}
            <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10}}>
              {PROVEEDORES.map(p=><button key={p} onClick={()=>setProv(p)} style={chip(prov===p,color)}>{p}</button>)}
            </div>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar artículo..." style={{...iS,marginBottom:6}}/>
            <p style={{fontSize:11,color:"#888",margin:"0 0 8px"}}>{filtProd.length} artículos</p>
            {filtProd.slice(0,100).map(p=>(
              <div key={p.id} style={{...cd,padding:"8px 12px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{flex:1,minWidth:0,marginRight:8}}>
                    <b style={{fontSize:12,display:"block",lineHeight:1.4}}>{p.nombre}</b>
                    <div style={{fontSize:10,color:"#888"}}>{p.codigo} · {p.proveedor}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                    <b style={{color,fontSize:13}}>${parseFloat(p.precio).toLocaleString("es-AR")}</b>
                    <button onClick={()=>{setEditItem({...p});setShowForm(false);}} style={{padding:"4px 8px",borderRadius:8,border:"none",background:"#e3f0ff",color:"#1e3a5f",cursor:"pointer",fontSize:12}}>✏️</button>
                    <button onClick={()=>deleteArticulo(p.id)} style={{padding:"4px 8px",borderRadius:8,border:"none",background:"#fdecea",color:"#e53935",cursor:"pointer",fontSize:12}}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STOCK */}
        {tab==="stock"&&(
          <div>
            <button onClick={()=>setShowStockImport(!showStockImport)} style={{...bP("#1565c0"),marginBottom:12}}>📥 Importar stock desde Excel</button>
            {showStockImport&&(
              <div style={{...cd,border:"2px solid #1565c0",marginBottom:12}}>
                <b style={{color:"#1565c0"}}>📥 Stock diario</b>
                <p style={{fontSize:12,color:"#555",margin:"6px 0"}}>Pegá desde Excel: <b>Codigo</b> y <b>Cantidad</b>. Solo actualiza los que pegás.</p>
                <textarea value={stockImportText} onChange={e=>setStockImportText(e.target.value)} placeholder={"Codigo\tCantidad\n5720\t24"} style={{width:"100%",height:100,borderRadius:8,border:"1px solid #ddd",padding:10,fontSize:12,boxSizing:"border-box",fontFamily:"monospace"}}/>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={handleImportStock} disabled={saving} style={{...bP("#1565c0"),flex:2,marginTop:8}}>{saving?"Importando...":"📥 Actualizar stock"}</button>
                  <button onClick={()=>{setShowStockImport(false);setStockImportText("");}} style={{...bP("#888"),flex:1,marginTop:8}}>Cancelar</button>
                </div>
              </div>
            )}
            <div style={cd}>
              <b style={{color,fontSize:14}}>📊 Carga manual</b>
              <div style={{display:"flex",gap:4,flexWrap:"wrap",margin:"10px 0"}}>
                {PROVEEDORES.map(p=><button key={p} onClick={()=>setProv(p)} style={chip(prov===p,color)}>{p}</button>)}
              </div>
              <input placeholder="Buscar..." style={{...iS,marginBottom:8}} onChange={e=>setSearch(e.target.value)} value={search}/>
              {filtProd.slice(0,60).map(p=>(
                <div key={p.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                  <div style={{flex:1,minWidth:0}}>
                    <b style={{fontSize:12,display:"block",lineHeight:1.4}}>{p.nombre}</b>
                    <div style={{fontSize:10,color:"#888"}}>Actual: {stock[p.codigo]??stock[p.id]??"—"}</div>
                  </div>
                  <input type="number" placeholder="Cant." value={stockInput[p.codigo]??""} onChange={e=>setStockInput({...stockInput,[p.codigo]:e.target.value})} style={{width:70,padding:"6px 8px",borderRadius:8,border:"1px solid #ddd",fontSize:13}}/>
                </div>
              ))}
              <button onClick={saveStock} disabled={saving} style={bP(color)}>{saving?"Guardando...":"💾 Guardar"}</button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL EDITAR PEDIDO */}
      {editOrder&&(
        <Modal onClose={()=>setEditOrder(null)}>
          <h3 style={{marginTop:0,color}}>✏️ Editar pedido</h3>
          <label style={lb}>Cliente</label>
          <input value={editOrder.cliente} onChange={e=>setEditOrder({...editOrder,cliente:e.target.value})} style={iS}/>
          <label style={lb}>Promoción / Aclaración</label>
          <input value={editOrder.promo||""} onChange={e=>setEditOrder({...editOrder,promo:e.target.value})} style={iS}/>
          <label style={lb}>Prioridad</label>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            <button onClick={()=>setEditOrder({...editOrder,urgente:true})} style={{flex:1,padding:"10px",borderRadius:8,border:`2px solid ${editOrder.urgente?"#e53935":"#ddd"}`,background:editOrder.urgente?"#fdecea":"#fff",color:editOrder.urgente?"#e53935":"#888",cursor:"pointer"}}>🔴 Urgente</button>
            <button onClick={()=>setEditOrder({...editOrder,urgente:false})} style={{flex:1,padding:"10px",borderRadius:8,border:`2px solid ${!editOrder.urgente?"#43a047":"#ddd"}`,background:!editOrder.urgente?"#e8f5e9":"#fff",color:!editOrder.urgente?"#43a047":"#888",cursor:"pointer"}}>🟢 Puede esperar</button>
          </div>
          <div style={{background:"#f4f6fb",borderRadius:8,padding:10,marginBottom:12}}>
            <b style={{fontSize:12,color:"#555"}}>Artículos:</b>
            {editOrder.items&&editOrder.items.map((i,idx)=>(
              <div key={idx} style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
                <span style={{flex:1,fontSize:12}}>{i.nombre}</span>
                <input type="number" value={i.qty} min="0" onChange={e=>{const q=parseInt(e.target.value)||0;const newItems=q===0?editOrder.items.filter((_,ii)=>ii!==idx):editOrder.items.map((it,ii)=>ii===idx?{...it,qty:q}:it);const t=newItems.reduce((s,it)=>s+it.precio*it.qty,0);setEditOrder({...editOrder,items:newItems,total:t});}} style={{width:50,padding:"4px",borderRadius:6,border:"1px solid #ddd",textAlign:"center",fontSize:13}}/>
                <span style={{fontSize:11,color:"#888"}}>${(i.precio*i.qty).toLocaleString("es-AR")}</span>
              </div>
            ))}
            <div style={{marginTop:8,fontWeight:700,color}}>Total: ${editOrder.total?.toLocaleString("es-AR")}</div>
          </div>
          <button onClick={saveOrderEdit} disabled={saving} style={bP(color)}>{saving?"Guardando...":"💾 Guardar cambios"}</button>
          <button onClick={()=>setEditOrder(null)} style={{...bP("#888"),marginTop:8}}>Cancelar</button>
        </Modal>
      )}
    </div>
  );
}

// ── COMPONENTES ───────────────────────────────────────────────────────────
function Header({ user, syncing, lastSync, onLogout }) {
  return (
    <div style={{background:user.color,color:"#fff",padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div><b>{user.emoji} {user.name}</b> <span style={{fontSize:12,opacity:.7}}>{user.role}</span>
        {syncing&&<span style={{fontSize:11,opacity:.8}}> · guardando...</span>}
        {lastSync&&<div style={{fontSize:10,opacity:.6}}>🔄 {lastSync}</div>}
      </div>
      <button onClick={onLogout} style={{background:"transparent",border:"1px solid rgba(255,255,255,.4)",color:"#fff",borderRadius:8,padding:"4px 12px",cursor:"pointer",fontSize:12}}>Salir</button>
    </div>
  );
}

function Tabs({ tabs, labels, active, onChange, color }) {
  return (
    <div style={{display:"flex",background:"#fff",borderBottom:"2px solid #e8edf5",overflowX:"auto"}}>
      {tabs.map((t,i)=>(
        <button key={t} onClick={()=>onChange(t)} style={{flex:1,padding:"11px 6px",border:"none",background:"transparent",borderBottom:active===t?`3px solid ${color}`:"3px solid transparent",color:active===t?color:"#888",fontWeight:active===t?700:400,cursor:"pointer",fontSize:11,whiteSpace:"nowrap"}}>
          {labels[i]}
        </button>
      ))}
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100}}>
      <div style={{background:"#fff",borderRadius:"16px 16px 0 0",padding:24,width:"100%",maxWidth:500,maxHeight:"85vh",overflowY:"auto"}}>
        {children}
      </div>
    </div>
  );
}

function TipoBadge({ tipo }) {
  return <span style={{fontSize:11,background:tipo==="pedido"?"#e3f0ff":"#fff3e0",color:tipo==="pedido"?"#1e3a5f":"#e65100",borderRadius:6,padding:"2px 6px",marginLeft:4}}>{tipo}</span>;
}

function EstadoBadge({ estado, estadoReparto }) {
  if(estadoReparto==="entregado") return <span style={{fontSize:11,fontWeight:700,color:"#43a047"}}>✅ Entregado</span>;
  if(estadoReparto==="en_reparto") return <span style={{fontSize:11,fontWeight:700,color:"#e65100"}}>🚚 En reparto</span>;
  if(estadoReparto==="programado") return <span style={{fontSize:11,fontWeight:700,color:"#1565c0"}}>📅 Programado</span>;
  if(estado==="facturado") return <span style={{fontSize:11,fontWeight:700,color:"#43a047"}}>✅ Facturado</span>;
  if(estado==="retenido") return <span style={{fontSize:11,fontWeight:700,color:"#c62828",background:"#fce4ec",padding:"2px 6px",borderRadius:6}}>🔴 Retenido</span>;
  return <span style={{fontSize:11,fontWeight:700,color:"#1e3a5f"}}>⏳ Pendiente</span>;
}

function RepartoBadge({ estadoReparto, fechaReparto, transporte }) {
  if(estadoReparto==="entregado") return <div style={{textAlign:"right"}}><span style={{fontSize:12,fontWeight:700,color:"#43a047",background:"#e8f5e9",padding:"3px 8px",borderRadius:8}}>✅ Entregado</span>{transporte&&<div style={{fontSize:11,color:"#43a047",marginTop:2}}>{transporte}</div>}</div>;
  if(estadoReparto==="en_reparto") return <span style={{fontSize:12,fontWeight:700,color:"#e65100",background:"#fff3e0",padding:"3px 8px",borderRadius:8}}>🚚 En reparto</span>;
  if(estadoReparto==="programado") return <span style={{fontSize:12,fontWeight:700,color:"#1565c0",background:"#e3f0ff",padding:"3px 8px",borderRadius:8}}>📅 {fechaReparto}</span>;
  return <span style={{fontSize:12,color:"#888",background:"#f0f0f0",padding:"3px 8px",borderRadius:8}}>Sin asignar</span>;
}

function Loader() {
  return <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"sans-serif",color:"#888"}}><div style={{fontSize:32,marginBottom:12}}>🔄</div><p>Cargando...</p></div>;
}

const iS = {width:"100%",padding:"9px 12px",borderRadius:8,border:"1px solid #ddd",fontSize:14,marginBottom:10,boxSizing:"border-box"};
const cd = {background:"#fff",borderRadius:12,padding:14,marginBottom:12,boxShadow:"0 1px 4px rgba(0,0,0,.07)"};
const lb = {fontSize:12,color:"#888",display:"block",marginBottom:4};
const bP = c=>({display:"block",width:"100%",padding:"12px 0",background:c,color:"#fff",border:"none",borderRadius:10,fontWeight:700,cursor:"pointer",fontSize:14,marginTop:4});
const qB = {width:36,height:36,borderRadius:8,border:"1px solid #ddd",background:"#f4f6fb",cursor:"pointer",fontSize:18,fontWeight:700};
const sB = {padding:"7px 10px",borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:600};
const chip = (active,color)=>({padding:"4px 9px",borderRadius:16,border:"none",cursor:"pointer",background:active?color:"#e8edf5",color:active?"#fff":"#555",fontSize:11,fontWeight:active?700:400,marginBottom:4});

export default function Home() {
  const [user, setUser] = useState(null);
  if(!user) return <Login onLogin={setUser}/>;
  const logout = ()=>setUser(null);
  if(user.role==="admin") return <AdminApp user={user} onLogout={logout}/>;
  if(user.role==="repartidor") return <RepartidorApp user={user} onLogout={logout}/>;
  return <VendedorApp user={user} onLogout={logout}/>;
}
