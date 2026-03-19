import { useState, useRef, useEffect } from "react";

const LANGS = [
  { id:"es", name:"Spanish", flag:"🇪🇸", color:"#58CC02", glow:"#58cc0244" },
  { id:"fr", name:"French", flag:"🇫🇷", color:"#1CB0F6", glow:"#1cb0f644" },
  { id:"de", name:"German", flag:"🇩🇪", color:"#FFC800", glow:"#ffc80044" },
  { id:"ja", name:"Japanese", flag:"🇯🇵", color:"#FF9600", glow:"#ff960044" },
  { id:"hi", name:"Hindi", flag:"🇮🇳", color:"#CE82FF", glow:"#ce82ff44" },
  { id:"ko", name:"Korean", flag:"🇰🇷", color:"#FF4B4B", glow:"#ff4b4b44" },
  { id:"pt", name:"Portuguese", flag:"🇧🇷", color:"#FF6B8A", glow:"#ff6b8a44" },
  { id:"it", name:"Italian", flag:"🇮🇹", color:"#1CB0F6", glow:"#1cb0f644" },
];

const CHARS=[
  {name:"Hoot",bg:"#78C800",dark:"#58a600",light:"#9be03a"},
  {name:"Falstaff",bg:"#CD853F",dark:"#a0693a",light:"#e8c47a"},
  {name:"Lily",bg:"#CE82FF",dark:"#a855e0",light:"#e4bbff"},
  {name:"Bea",bg:"#FFC800",dark:"#d4a600",light:"#ffe066"},
  {name:"Junior",bg:"#1CB0F6",dark:"#0088cc",light:"#7dd4ff"},
  {name:"Eddy",bg:"#FF4B4B",dark:"#d03030",light:"#ff8888"},
  {name:"Zari",bg:"#FF6B8A",dark:"#d04a68",light:"#ffaabb"},
  {name:"Oscar",bg:"#6EC1E4",dark:"#4090b0",light:"#a8ddf0"},
];

function CharSVG({ci=0,size=54,mood="idle"}){
  const c=CHARS[ci%CHARS.length];const m=mood==="correct"?"laugh":mood==="wrong"?"sad":"smile";const t=ci%4;
  const brow=mood==="wrong";const happy=mood==="correct";
  return <svg viewBox="0 0 100 100" width={size} height={size} style={{display:"block",overflow:"visible"}}>
    <defs>
      <radialGradient id={`g${ci}${size}`} cx="38%" cy="30%" r="65%"><stop offset="0%" stopColor={c.light}/><stop offset="100%" stopColor={c.bg}/></radialGradient>
      <radialGradient id={`h${ci}${size}`} cx="50%" cy="20%" r="50%"><stop offset="0%" stopColor="#fff" stopOpacity=".18"/><stop offset="100%" stopColor="#fff" stopOpacity="0"/></radialGradient>
      <filter id={`sh${ci}${size}`}><feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor={c.dark} floodOpacity=".3"/></filter>
    </defs>

    {t===0&&<g filter={`url(#sh${ci}${size})`}>{/* ═ OWL — Hoot ═ */}
      <ellipse cx="50" cy="58" rx="35" ry="37" fill={`url(#g${ci}${size})`}/>
      <ellipse cx="50" cy="58" rx="35" ry="37" fill={`url(#h${ci}${size})`}/>
      {/* Belly patch */}
      <ellipse cx="50" cy="65" rx="22" ry="20" fill={c.light} opacity=".2"/>
      {/* Ear tufts with inner detail */}
      <polygon points="20,28 15,5 34,22" fill={c.bg}/><polygon points="22,26 19,12 32,24" fill={c.light} opacity=".3"/>
      <polygon points="80,28 85,5 66,22" fill={c.bg}/><polygon points="78,26 81,12 68,24" fill={c.light} opacity=".3"/>
      {/* Eye sockets */}
      <circle cx="36" cy="48" r="15" fill="#fff"/><circle cx="64" cy="48" r="15" fill="#fff"/>
      <circle cx="36" cy="48" r="15" fill="rgba(0,0,0,.03)"/>
      {/* Pupils — shift on mood */}
      <circle cx={happy?39:brow?35:38} cy={happy?46:48} r="7.5" fill="#1a1a2e"/>
      <circle cx={happy?67:brow?63:66} cy={happy?46:48} r="7.5" fill="#1a1a2e"/>
      {/* Double eye shine */}
      <circle cx="40" cy="43" r="3" fill="#fff" opacity=".95"/><circle cx="68" cy="43" r="3" fill="#fff" opacity=".95"/>
      <circle cx="36" cy="50" r="1.5" fill="#fff" opacity=".4"/><circle cx="64" cy="50" r="1.5" fill="#fff" opacity=".4"/>
      {/* Eyebrows */}
      {brow&&<><line x1="28" y1="35" x2="42" y2="38" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="72" y1="35" x2="58" y2="38" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round"/></>}
      {happy&&<><path d="M28 38 Q35 34 42 37" stroke={c.dark} strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M72 38 Q65 34 58 37" stroke={c.dark} strokeWidth="2" fill="none" strokeLinecap="round"/></>}
      {/* Beak with highlight */}
      <polygon points="50,55 43,64 57,64" fill="#FFA500"/>
      <polygon points="50,55 47,60 53,60" fill="#FFD04A" opacity=".4"/>
      {/* Mouth */}
      {m==="laugh"&&<path d="M41 68 Q50 78 59 68" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>}
      {m==="sad"&&<path d="M42 73 Q50 67 58 73" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round"/>}
      {m==="smile"&&<path d="M43 68 Q50 73 57 68" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round"/>}
      {/* Cheek blush */}
      <circle cx="24" cy="58" r="5" fill="#FF6B8A" opacity=".15"/><circle cx="76" cy="58" r="5" fill="#FF6B8A" opacity=".15"/>
      {/* Wings with feather lines */}
      <ellipse cx="20" cy="65" rx="9" ry="15" fill={c.dark} opacity=".3"/>
      <ellipse cx="80" cy="65" rx="9" ry="15" fill={c.dark} opacity=".3"/>
      <path d="M16 58 Q20 65 18 75" stroke={c.dark} strokeWidth="1" opacity=".2" fill="none"/>
      <path d="M84 58 Q80 65 82 75" stroke={c.dark} strokeWidth="1" opacity=".2" fill="none"/>
      {/* Feet */}
      <ellipse cx="40" cy="93" rx="8" ry="4" fill={c.dark}/><ellipse cx="60" cy="93" rx="8" ry="4" fill={c.dark}/>
      <ellipse cx="40" cy="92" rx="6" ry="2.5" fill={c.bg} opacity=".3"/><ellipse cx="60" cy="92" rx="6" ry="2.5" fill={c.bg} opacity=".3"/>
    </g>}

    {t===1&&<g filter={`url(#sh${ci}${size})`}>{/* ═ BEAR — Falstaff ═ */}
      <ellipse cx="50" cy="60" rx="37" ry="37" fill={`url(#g${ci}${size})`}/>
      <ellipse cx="50" cy="60" rx="37" ry="37" fill={`url(#h${ci}${size})`}/>
      {/* Ears with inner pink */}
      <circle cx="20" cy="28" r="13" fill={c.bg}/><circle cx="20" cy="28" r="8" fill={c.dark}/>
      <circle cx="20" cy="28" r="5" fill="#FF6B8A" opacity=".2"/>
      <circle cx="80" cy="28" r="13" fill={c.bg}/><circle cx="80" cy="28" r="8" fill={c.dark}/>
      <circle cx="80" cy="28" r="5" fill="#FF6B8A" opacity=".2"/>
      {/* Belly with fur texture */}
      <ellipse cx="50" cy="70" rx="24" ry="22" fill={c.light} opacity=".25"/>
      <path d="M35 60 Q38 58 40 62 M45 56 Q48 54 50 58 M55 56 Q58 54 60 58 M60 60 Q63 58 65 62" stroke={c.light} strokeWidth=".8" opacity=".15" fill="none"/>
      {/* Eyes */}
      <ellipse cx="38" cy="50" rx="9" ry="8.5" fill="#fff"/><ellipse cx="62" cy="50" rx="9" ry="8.5" fill="#fff"/>
      <circle cx={happy?40:brow?37:39} cy={happy?48:50} r="5" fill="#1a1a2e"/>
      <circle cx={happy?64:brow?61:63} cy={happy?48:50} r="5" fill="#1a1a2e"/>
      <circle cx="41" cy="46" r="2.2" fill="#fff" opacity=".9"/><circle cx="65" cy="46" r="2.2" fill="#fff" opacity=".9"/>
      <circle cx="38" cy="52" r="1" fill="#fff" opacity=".35"/><circle cx="62" cy="52" r="1" fill="#fff" opacity=".35"/>
      {/* Eyebrows */}
      {brow&&<><line x1="30" y1="40" x2="44" y2="42" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="70" y1="40" x2="56" y2="42" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round"/></>}
      {/* Snout with nose detail */}
      <ellipse cx="50" cy="63" rx="12" ry="8" fill={c.light}/>
      <ellipse cx="50" cy="60" rx="5" ry="3.5" fill="#1a1a2e"/>
      <ellipse cx="49" cy="59" rx="2" ry="1" fill="#555" opacity=".4"/>
      {/* Mouth */}
      {m==="laugh"&&<path d="M42 67 Q50 76 58 67" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>}
      {m==="sad"&&<path d="M43 72 Q50 66 57 72" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round"/>}
      {m==="smile"&&<path d="M44 67 Q50 72 56 67" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round"/>}
      {/* Cheek blush */}
      <circle cx="28" cy="60" r="5.5" fill="#FF6B8A" opacity=".12"/><circle cx="72" cy="60" r="5.5" fill="#FF6B8A" opacity=".12"/>
    </g>}

    {t===2&&<g filter={`url(#sh${ci}${size})`}>{/* ═ FOX — Lily ═ */}
      <ellipse cx="50" cy="60" rx="33" ry="35" fill={`url(#g${ci}${size})`}/>
      <ellipse cx="50" cy="60" rx="33" ry="35" fill={`url(#h${ci}${size})`}/>
      {/* Ears with inner glow */}
      <polygon points="23,32 14,2 37,24" fill={c.bg}/><polygon points="25,30 19,10 35,26" fill={c.light} opacity=".35"/>
      <polygon points="77,32 86,2 63,24" fill={c.bg}/><polygon points="75,30 81,10 65,26" fill={c.light} opacity=".35"/>
      {/* White face mask */}
      <ellipse cx="50" cy="66" rx="22" ry="24" fill="#fff" opacity=".12"/>
      {/* Half-lidded eyes */}
      <ellipse cx="38" cy="50" rx="9" ry={happy?5.5:7} fill="#fff"/>
      <ellipse cx="62" cy="50" rx="9" ry={happy?5.5:7} fill="#fff"/>
      <circle cx={happy?40:brow?37:39} cy="50" r="4.5" fill="#1a1a2e"/>
      <circle cx={happy?64:brow?61:63} cy="50" r="4.5" fill="#1a1a2e"/>
      <circle cx="41" cy="48" r="1.8" fill="#fff" opacity=".9"/><circle cx="65" cy="48" r="1.8" fill="#fff" opacity=".9"/>
      {/* Sly eyelids */}
      <path d="M29 46 Q38 41 47 46" stroke={c.bg} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M53 46 Q62 41 71 46" stroke={c.bg} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      {/* Eyebrows */}
      {brow&&<><line x1="30" y1="38" x2="44" y2="40" stroke={c.dark} strokeWidth="2" strokeLinecap="round"/>
        <line x1="70" y1="38" x2="56" y2="40" stroke={c.dark} strokeWidth="2" strokeLinecap="round"/></>}
      {/* Nose */}
      <ellipse cx="50" cy="60" rx="4" ry="3" fill="#1a1a2e"/>
      <ellipse cx="49" cy="59" rx="1.5" ry=".8" fill="#444" opacity=".4"/>
      {/* Whiskers */}
      <line x1="20" y1="57" x2="38" y2="60" stroke={c.dark} strokeWidth="1" opacity=".25"/><line x1="19" y1="63" x2="37" y2="63" stroke={c.dark} strokeWidth="1" opacity=".25"/>
      <line x1="62" y1="60" x2="80" y2="57" stroke={c.dark} strokeWidth="1" opacity=".25"/><line x1="63" y1="63" x2="81" y2="63" stroke={c.dark} strokeWidth="1" opacity=".25"/>
      {/* Mouth */}
      {m==="laugh"&&<path d="M43 64 Q50 72 57 64" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round"/>}
      {m==="sad"&&<path d="M43 68 Q50 63 57 68" stroke="#1a1a2e" strokeWidth="1.5" fill="none" strokeLinecap="round"/>}
      {m==="smile"&&<path d="M45 64 Q50 69 55 64" stroke="#1a1a2e" strokeWidth="1.5" fill="none" strokeLinecap="round"/>}
      {/* Fluffy tail with gradient */}
      <path d="M80 72 Q97 52 90 34 Q84 44 78 56" fill={c.bg} opacity=".6"/>
      <path d="M88 38 Q84 48 80 56" fill="#fff" opacity=".12"/>
      {/* Cheek blush */}
      <circle cx="28" cy="58" r="4.5" fill="#FF6B8A" opacity=".15"/><circle cx="72" cy="58" r="4.5" fill="#FF6B8A" opacity=".15"/>
    </g>}

    {t===3&&<g filter={`url(#sh${ci}${size})`}>{/* ═ PENGUIN — Oscar ═ */}
      <ellipse cx="50" cy="58" rx="31" ry="37" fill={`url(#g${ci}${size})`}/>
      <ellipse cx="50" cy="58" rx="31" ry="37" fill={`url(#h${ci}${size})`}/>
      {/* White belly with subtle gradient */}
      <ellipse cx="50" cy="66" rx="21" ry="25" fill="#fff" opacity=".82"/>
      <ellipse cx="50" cy="62" rx="16" ry="14" fill="#fff" opacity=".1"/>
      {/* Eyes */}
      <circle cx="38" cy="46" r="10" fill="#fff"/><circle cx="62" cy="46" r="10" fill="#fff"/>
      <circle cx={happy?40:brow?37:39} cy={happy?44:46} r="5.5" fill="#1a1a2e"/>
      <circle cx={happy?64:brow?61:63} cy={happy?44:46} r="5.5" fill="#1a1a2e"/>
      <circle cx="42" cy="42" r="2.2" fill="#fff" opacity=".9"/><circle cx="66" cy="42" r="2.2" fill="#fff" opacity=".9"/>
      <circle cx="38" cy="48" r="1" fill="#fff" opacity=".35"/><circle cx="62" cy="48" r="1" fill="#fff" opacity=".35"/>
      {/* Eyebrows */}
      {brow&&<><line x1="30" y1="36" x2="44" y2="38" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round"/>
        <line x1="70" y1="36" x2="56" y2="38" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round"/></>}
      {/* Rosy cheeks */}
      <circle cx="28" cy="56" r="6.5" fill="#FF6B8A" opacity=".2"/><circle cx="72" cy="56" r="6.5" fill="#FF6B8A" opacity=".2"/>
      {/* Beak with highlight */}
      <polygon points="50,53 43,60 57,60" fill="#FF9600"/>
      <polygon points="50,53 47,57 53,57" fill="#FFD04A" opacity=".35"/>
      {/* Mouth */}
      {m==="laugh"&&<path d="M41 64 Q50 73 59 64" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>}
      {m==="sad"&&<path d="M43 68 Q50 64 57 68" stroke="#1a1a2e" strokeWidth="1.5" fill="none" strokeLinecap="round"/>}
      {m==="smile"&&<path d="M43 64 Q50 69 57 64" stroke="#1a1a2e" strokeWidth="1.5" fill="none" strokeLinecap="round"/>}
      {/* Flippers with feather detail */}
      <ellipse cx="19" cy="62" rx="7" ry="15" fill={c.dark} opacity=".4" transform="rotate(8 19 62)"/>
      <ellipse cx="81" cy="62" rx="7" ry="15" fill={c.dark} opacity=".4" transform="rotate(-8 81 62)"/>
      <path d="M16 56 Q19 62 17 72" stroke={c.dark} strokeWidth=".8" opacity=".2" fill="none"/>
      <path d="M84 56 Q81 62 83 72" stroke={c.dark} strokeWidth=".8" opacity=".2" fill="none"/>
      {/* Feet */}
      <ellipse cx="40" cy="94" rx="9" ry="4" fill="#FF9600"/><ellipse cx="60" cy="94" rx="9" ry="4" fill="#FF9600"/>
      <ellipse cx="40" cy="93" rx="6" ry="2" fill="#FFD04A" opacity=".3"/><ellipse cx="60" cy="93" rx="6" ry="2" fill="#FFD04A" opacity=".3"/>
      {/* Scarf with stripes */}
      <rect x="30" y="33" width="40" height="7" rx="3.5" fill="#FF4B4B"/>
      <rect x="35" y="35" width="6" height="3" rx="1.5" fill="#fff" opacity=".15"/>
      <rect x="47" y="35" width="6" height="3" rx="1.5" fill="#fff" opacity=".15"/>
      <rect x="59" y="35" width="6" height="3" rx="1.5" fill="#fff" opacity=".15"/>
      <rect x="58" y="34" width="7" height="18" rx="3.5" fill="#FF4B4B"/>
    </g>}
  </svg>;
}

function CharAvatar({ci=0,size=54,mood="idle"}){
  const c=CHARS[ci%CHARS.length];const ring=mood==="correct"?"#78C800":mood==="wrong"?"#FF4B4B":c.bg;
  return <div style={{width:size,height:size,borderRadius:size*.32,
    background:`radial-gradient(circle at 35% 25%,${c.bg}33,${c.bg}11)`,
    border:`3px solid ${ring}`,display:"inline-flex",alignItems:"center",justifyContent:"center",
    boxShadow:mood==="correct"?`0 0 20px #78C80044,0 4px 14px ${c.bg}33`:mood==="wrong"?`0 0 16px #FF4B4B33,0 4px 14px ${c.bg}33`:`0 4px 14px ${c.bg}33`,
    overflow:"hidden",flexShrink:0,
    animation:mood==="correct"?"charCorrect .6s cubic-bezier(.4,2,.6,1)":mood==="wrong"?"charWrong .5s ease":"charIdle 4s ease-in-out infinite",
    transition:"border-color .3s, box-shadow .4s"}}>
    <CharSVG ci={ci} size={size*.85} mood={mood}/>
  </div>;
}

function CharBubble({ci=0,text,mood="idle"}){
  const c=CHARS[ci%CHARS.length];const bdr=mood==="correct"?"#78C800":mood==="wrong"?"#FF4B4B":c.bg+"55";
  return <div style={{display:"flex",alignItems:"flex-end",gap:12,marginBottom:14,animation:"fadeUp .4s ease"}}>
    <CharAvatar ci={ci} size={48} mood={mood}/>
    {text&&<div style={{padding:"10px 14px",borderRadius:"16px 16px 16px 4px",background:mood==="correct"?"rgba(120,200,0,.08)":mood==="wrong"?"rgba(255,75,75,.08)":"rgba(255,255,255,.04)",border:`1.5px solid ${bdr}`,maxWidth:260,animation:"slideR .3s ease .05s both"}}>
      <span style={{fontSize:10,fontWeight:800,color:c.bg,letterSpacing:.5}}>{c.name}</span>
      <div style={{fontSize:13,fontWeight:700,color:"#fff",marginTop:2,lineHeight:1.45}}>{text}</div>
    </div>}
  </div>;
}


const REACT_MSG={correct:["Brilliant!","Nailed it!","Amazing!","Superstar!","Perfect!","Genius!","Flawless!","On fire!"],wrong:["Almost!","Keep trying!","So close!","Don't give up!","Next time!","You've got this!"],done:["Lesson complete!","You did it!","Champion!","Legendary!","Outstanding!"]};
const pick=a=>a[Math.floor(Math.random()*a.length)];


// ═══ WORD BANKS + SECTION GENERATOR ═══
// 23 topics × 5 lessons = 115 lessons per section, 3 sections = 345 per language
const TOPIC_KEYS=["greetings","numbers","colors","food","family","animals","body","clothes","home","weather","school","work","transport","shopping","health","nature","sports","emotions","directions","restaurant","travel","time","hobbies"];
const TOPIC_ICONS={"greetings":"👋","numbers":"🔢","colors":"🎨","food":"🍽️","family":"👨‍👩‍👧","animals":"🐾","body":"🏃","clothes":"👕","home":"🏠","weather":"🌦️","school":"📚","work":"💼","transport":"🚌","shopping":"🛍️","health":"🏥","nature":"🌳","sports":"⚽","emotions":"😊","directions":"🗺️","restaurant":"🍴","travel":"✈️","time":"⏰","hobbies":"🎵"};
const TOPIC_NAMES={"greetings":"Greetings","numbers":"Numbers","colors":"Colors","food":"Food & Drink","family":"Family","animals":"Animals","body":"Body Parts","clothes":"Clothing","home":"At Home","weather":"Weather","school":"School","work":"Workplace","transport":"Transport","shopping":"Shopping","health":"Health","nature":"Nature","sports":"Sports","emotions":"Feelings","directions":"Directions","restaurant":"Dining Out","travel":"Travel","time":"Time","hobbies":"Hobbies"};
const WB={
es:{greetings:[["hola","hello"],["adiós","goodbye"],["buenos días","good morning"],["buenas noches","good night"],["por favor","please"],["gracias","thank you"],["de nada","you're welcome"],["perdón","sorry"],["¿cómo estás?","how are you?"],["bien","good"]],numbers:[["uno","one"],["dos","two"],["tres","three"],["cuatro","four"],["cinco","five"],["seis","six"],["siete","seven"],["ocho","eight"],["nueve","nine"],["diez","ten"]],colors:[["rojo","red"],["azul","blue"],["verde","green"],["amarillo","yellow"],["blanco","white"],["negro","black"],["naranja","orange"],["rosa","pink"],["morado","purple"],["gris","gray"]],food:[["pan","bread"],["agua","water"],["leche","milk"],["carne","meat"],["pescado","fish"],["arroz","rice"],["huevo","egg"],["fruta","fruit"],["queso","cheese"],["pollo","chicken"]],family:[["madre","mother"],["padre","father"],["hermano","brother"],["hermana","sister"],["hijo","son"],["hija","daughter"],["abuelo","grandfather"],["abuela","grandmother"],["tío","uncle"],["primo","cousin"]],animals:[["perro","dog"],["gato","cat"],["pájaro","bird"],["pez","fish"],["caballo","horse"],["vaca","cow"],["cerdo","pig"],["conejo","rabbit"],["ratón","mouse"],["tortuga","turtle"]],body:[["cabeza","head"],["mano","hand"],["pie","foot"],["ojo","eye"],["boca","mouth"],["nariz","nose"],["oreja","ear"],["brazo","arm"],["pierna","leg"],["dedo","finger"]],clothes:[["camisa","shirt"],["pantalón","pants"],["zapato","shoe"],["sombrero","hat"],["vestido","dress"],["chaqueta","jacket"],["falda","skirt"],["calcetín","sock"],["bufanda","scarf"],["guante","glove"]],home:[["casa","house"],["puerta","door"],["ventana","window"],["cocina","kitchen"],["baño","bathroom"],["cama","bed"],["mesa","table"],["silla","chair"],["jardín","garden"],["techo","roof"]],weather:[["sol","sun"],["lluvia","rain"],["nieve","snow"],["viento","wind"],["nube","cloud"],["calor","hot"],["frío","cold"],["tormenta","storm"],["arcoíris","rainbow"],["hielo","ice"]],school:[["escuela","school"],["libro","book"],["lápiz","pencil"],["profesor","teacher"],["alumno","student"],["clase","class"],["examen","exam"],["tarea","homework"],["pizarra","blackboard"],["mochila","backpack"]],work:[["trabajo","work"],["oficina","office"],["jefe","boss"],["reunión","meeting"],["computadora","computer"],["teléfono","phone"],["dinero","money"],["cliente","client"],["proyecto","project"],["equipo","team"]],transport:[["coche","car"],["autobús","bus"],["tren","train"],["avión","plane"],["bicicleta","bicycle"],["taxi","taxi"],["metro","subway"],["barco","boat"],["moto","motorcycle"],["camión","truck"]],shopping:[["tienda","store"],["precio","price"],["barato","cheap"],["caro","expensive"],["bolsa","bag"],["comprar","to buy"],["vender","to sell"],["recibo","receipt"],["descuento","discount"],["oferta","offer"]],health:[["médico","doctor"],["hospital","hospital"],["medicina","medicine"],["dolor","pain"],["fiebre","fever"],["enfermo","sick"],["salud","health"],["pastilla","pill"],["herida","wound"],["ambulancia","ambulance"]],nature:[["árbol","tree"],["flor","flower"],["río","river"],["montaña","mountain"],["mar","sea"],["bosque","forest"],["lago","lake"],["playa","beach"],["isla","island"],["piedra","rock"]],sports:[["fútbol","soccer"],["nadar","swim"],["correr","run"],["pelota","ball"],["equipo","team"],["gol","goal"],["ganar","win"],["perder","lose"],["jugar","play"],["campo","field"]],emotions:[["feliz","happy"],["triste","sad"],["enojado","angry"],["cansado","tired"],["nervioso","nervous"],["emocionado","excited"],["aburrido","bored"],["sorprendido","surprised"],["tranquilo","calm"],["orgulloso","proud"]],directions:[["izquierda","left"],["derecha","right"],["recto","straight"],["cerca","near"],["lejos","far"],["norte","north"],["sur","south"],["esquina","corner"],["cruce","crossroad"],["mapa","map"]],restaurant:[["menú","menu"],["camarero","waiter"],["cuenta","bill"],["propina","tip"],["reserva","reservation"],["plato","dish"],["bebida","drink"],["postre","dessert"],["entrada","starter"],["copa","glass"]],travel:[["pasaporte","passport"],["maleta","suitcase"],["vuelo","flight"],["hotel","hotel"],["turista","tourist"],["foto","photo"],["recuerdo","souvenir"],["aventura","adventure"],["vacaciones","vacation"],["billete","ticket"]],time:[["hora","hour"],["minuto","minute"],["día","day"],["semana","week"],["mes","month"],["año","year"],["hoy","today"],["mañana","tomorrow"],["ayer","yesterday"],["siempre","always"]],hobbies:[["música","music"],["bailar","dance"],["cantar","sing"],["pintar","paint"],["leer","read"],["cocinar","cook"],["viajar","travel"],["fotografía","photography"],["película","movie"],["jardín","garden"]]},
fr:{greetings:[["bonjour","hello"],["au revoir","goodbye"],["merci","thank you"],["s'il vous plaît","please"],["excusez-moi","excuse me"],["bonsoir","good evening"],["bonne nuit","good night"],["comment allez-vous?","how are you?"],["enchanté","nice to meet you"],["bien","good"]],numbers:[["un","one"],["deux","two"],["trois","three"],["quatre","four"],["cinq","five"],["six","six"],["sept","seven"],["huit","eight"],["neuf","nine"],["dix","ten"]],colors:[["rouge","red"],["bleu","blue"],["vert","green"],["jaune","yellow"],["blanc","white"],["noir","black"],["orange","orange"],["rose","pink"],["violet","purple"],["gris","gray"]],food:[["pain","bread"],["eau","water"],["lait","milk"],["viande","meat"],["poisson","fish"],["riz","rice"],["oeuf","egg"],["fruit","fruit"],["fromage","cheese"],["poulet","chicken"]],family:[["mère","mother"],["père","father"],["frère","brother"],["soeur","sister"],["fils","son"],["fille","daughter"],["grand-père","grandfather"],["grand-mère","grandmother"],["oncle","uncle"],["cousin","cousin"]],animals:[["chien","dog"],["chat","cat"],["oiseau","bird"],["poisson","fish"],["cheval","horse"],["vache","cow"],["cochon","pig"],["lapin","rabbit"],["souris","mouse"],["tortue","turtle"]],body:[["tête","head"],["main","hand"],["pied","foot"],["oeil","eye"],["bouche","mouth"],["nez","nose"],["oreille","ear"],["bras","arm"],["jambe","leg"],["doigt","finger"]],clothes:[["chemise","shirt"],["pantalon","pants"],["chaussure","shoe"],["chapeau","hat"],["robe","dress"],["veste","jacket"],["jupe","skirt"],["chaussette","sock"],["écharpe","scarf"],["gant","glove"]],home:[["maison","house"],["porte","door"],["fenêtre","window"],["cuisine","kitchen"],["salle de bain","bathroom"],["lit","bed"],["table","table"],["chaise","chair"],["jardin","garden"],["toit","roof"]],weather:[["soleil","sun"],["pluie","rain"],["neige","snow"],["vent","wind"],["nuage","cloud"],["chaud","hot"],["froid","cold"],["orage","storm"],["arc-en-ciel","rainbow"],["glace","ice"]],school:[["école","school"],["livre","book"],["crayon","pencil"],["professeur","teacher"],["élève","student"],["classe","class"],["examen","exam"],["devoir","homework"],["tableau","blackboard"],["sac","backpack"]],work:[["travail","work"],["bureau","office"],["patron","boss"],["réunion","meeting"],["ordinateur","computer"],["téléphone","phone"],["argent","money"],["client","client"],["projet","project"],["équipe","team"]],transport:[["voiture","car"],["bus","bus"],["train","train"],["avion","plane"],["vélo","bicycle"],["taxi","taxi"],["métro","subway"],["bateau","boat"],["moto","motorcycle"],["camion","truck"]],shopping:[["magasin","store"],["prix","price"],["bon marché","cheap"],["cher","expensive"],["sac","bag"],["acheter","to buy"],["vendre","to sell"],["reçu","receipt"],["solde","sale"],["offre","offer"]],health:[["médecin","doctor"],["hôpital","hospital"],["médicament","medicine"],["douleur","pain"],["fièvre","fever"],["malade","sick"],["santé","health"],["comprimé","pill"],["blessure","wound"],["ambulance","ambulance"]],nature:[["arbre","tree"],["fleur","flower"],["rivière","river"],["montagne","mountain"],["mer","sea"],["forêt","forest"],["lac","lake"],["plage","beach"],["île","island"],["pierre","rock"]],sports:[["football","soccer"],["nager","swim"],["courir","run"],["ballon","ball"],["équipe","team"],["but","goal"],["gagner","win"],["perdre","lose"],["jouer","play"],["terrain","field"]],emotions:[["heureux","happy"],["triste","sad"],["en colère","angry"],["fatigué","tired"],["nerveux","nervous"],["excité","excited"],["ennuyé","bored"],["surpris","surprised"],["calme","calm"],["fier","proud"]],directions:[["gauche","left"],["droite","right"],["tout droit","straight"],["près","near"],["loin","far"],["nord","north"],["sud","south"],["coin","corner"],["carrefour","crossroad"],["plan","map"]],restaurant:[["menu","menu"],["serveur","waiter"],["addition","bill"],["pourboire","tip"],["réservation","reservation"],["plat","dish"],["boisson","drink"],["dessert","dessert"],["entrée","starter"],["verre","glass"]],travel:[["passeport","passport"],["valise","suitcase"],["vol","flight"],["hôtel","hotel"],["touriste","tourist"],["photo","photo"],["souvenir","souvenir"],["aventure","adventure"],["vacances","vacation"],["billet","ticket"]],time:[["heure","hour"],["minute","minute"],["jour","day"],["semaine","week"],["mois","month"],["année","year"],["aujourd'hui","today"],["demain","tomorrow"],["hier","yesterday"],["toujours","always"]],hobbies:[["musique","music"],["danser","dance"],["chanter","sing"],["peindre","paint"],["lire","read"],["cuisiner","cook"],["voyager","travel"],["photographie","photography"],["film","movie"],["jardinage","garden"]]},
de:{greetings:[["hallo","hello"],["tschüss","goodbye"],["guten Morgen","good morning"],["gute Nacht","good night"],["bitte","please"],["danke","thank you"],["Entschuldigung","excuse me"],["wie geht's?","how are you?"],["gut","good"],["willkommen","welcome"]],numbers:[["eins","one"],["zwei","two"],["drei","three"],["vier","four"],["fünf","five"],["sechs","six"],["sieben","seven"],["acht","eight"],["neun","nine"],["zehn","ten"]],colors:[["rot","red"],["blau","blue"],["grün","green"],["gelb","yellow"],["weiß","white"],["schwarz","black"],["orange","orange"],["rosa","pink"],["lila","purple"],["grau","gray"]],food:[["Brot","bread"],["Wasser","water"],["Milch","milk"],["Fleisch","meat"],["Fisch","fish"],["Reis","rice"],["Ei","egg"],["Obst","fruit"],["Käse","cheese"],["Huhn","chicken"]],family:[["Mutter","mother"],["Vater","father"],["Bruder","brother"],["Schwester","sister"],["Sohn","son"],["Tochter","daughter"],["Großvater","grandfather"],["Großmutter","grandmother"],["Onkel","uncle"],["Cousin","cousin"]],animals:[["Hund","dog"],["Katze","cat"],["Vogel","bird"],["Fisch","fish"],["Pferd","horse"],["Kuh","cow"],["Schwein","pig"],["Kaninchen","rabbit"],["Maus","mouse"],["Schildkröte","turtle"]],body:[["Kopf","head"],["Hand","hand"],["Fuß","foot"],["Auge","eye"],["Mund","mouth"],["Nase","nose"],["Ohr","ear"],["Arm","arm"],["Bein","leg"],["Finger","finger"]],clothes:[["Hemd","shirt"],["Hose","pants"],["Schuh","shoe"],["Hut","hat"],["Kleid","dress"],["Jacke","jacket"],["Rock","skirt"],["Socke","sock"],["Schal","scarf"],["Handschuh","glove"]],home:[["Haus","house"],["Tür","door"],["Fenster","window"],["Küche","kitchen"],["Bad","bathroom"],["Bett","bed"],["Tisch","table"],["Stuhl","chair"],["Garten","garden"],["Dach","roof"]],weather:[["Sonne","sun"],["Regen","rain"],["Schnee","snow"],["Wind","wind"],["Wolke","cloud"],["heiß","hot"],["kalt","cold"],["Sturm","storm"],["Regenbogen","rainbow"],["Eis","ice"]],school:[["Schule","school"],["Buch","book"],["Bleistift","pencil"],["Lehrer","teacher"],["Schüler","student"],["Klasse","class"],["Prüfung","exam"],["Hausaufgabe","homework"],["Tafel","blackboard"],["Rucksack","backpack"]],work:[["Arbeit","work"],["Büro","office"],["Chef","boss"],["Besprechung","meeting"],["Computer","computer"],["Telefon","phone"],["Geld","money"],["Kunde","client"],["Projekt","project"],["Team","team"]],transport:[["Auto","car"],["Bus","bus"],["Zug","train"],["Flugzeug","plane"],["Fahrrad","bicycle"],["Taxi","taxi"],["U-Bahn","subway"],["Boot","boat"],["Motorrad","motorcycle"],["LKW","truck"]],shopping:[["Geschäft","store"],["Preis","price"],["billig","cheap"],["teuer","expensive"],["Tasche","bag"],["kaufen","to buy"],["verkaufen","to sell"],["Quittung","receipt"],["Rabatt","discount"],["Angebot","offer"]],health:[["Arzt","doctor"],["Krankenhaus","hospital"],["Medizin","medicine"],["Schmerz","pain"],["Fieber","fever"],["krank","sick"],["Gesundheit","health"],["Tablette","pill"],["Wunde","wound"],["Krankenwagen","ambulance"]],nature:[["Baum","tree"],["Blume","flower"],["Fluss","river"],["Berg","mountain"],["Meer","sea"],["Wald","forest"],["See","lake"],["Strand","beach"],["Insel","island"],["Stein","rock"]],sports:[["Fußball","soccer"],["schwimmen","swim"],["laufen","run"],["Ball","ball"],["Mannschaft","team"],["Tor","goal"],["gewinnen","win"],["verlieren","lose"],["spielen","play"],["Feld","field"]],emotions:[["glücklich","happy"],["traurig","sad"],["wütend","angry"],["müde","tired"],["nervös","nervous"],["aufgeregt","excited"],["gelangweilt","bored"],["überrascht","surprised"],["ruhig","calm"],["stolz","proud"]],directions:[["links","left"],["rechts","right"],["geradeaus","straight"],["nah","near"],["weit","far"],["Norden","north"],["Süden","south"],["Ecke","corner"],["Kreuzung","crossroad"],["Karte","map"]],restaurant:[["Speisekarte","menu"],["Kellner","waiter"],["Rechnung","bill"],["Trinkgeld","tip"],["Reservierung","reservation"],["Gericht","dish"],["Getränk","drink"],["Nachtisch","dessert"],["Vorspeise","starter"],["Glas","glass"]],travel:[["Reisepass","passport"],["Koffer","suitcase"],["Flug","flight"],["Hotel","hotel"],["Tourist","tourist"],["Foto","photo"],["Andenken","souvenir"],["Abenteuer","adventure"],["Urlaub","vacation"],["Fahrkarte","ticket"]],time:[["Stunde","hour"],["Minute","minute"],["Tag","day"],["Woche","week"],["Monat","month"],["Jahr","year"],["heute","today"],["morgen","tomorrow"],["gestern","yesterday"],["immer","always"]],hobbies:[["Musik","music"],["tanzen","dance"],["singen","sing"],["malen","paint"],["lesen","read"],["kochen","cook"],["reisen","travel"],["Fotografie","photography"],["Film","movie"],["Gartenarbeit","garden"]]},
ja:{greetings:[["こんにちは","hello"],["さようなら","goodbye"],["おはよう","good morning"],["おやすみ","good night"],["ください","please"],["ありがとう","thank you"],["すみません","excuse me"],["お元気ですか","how are you?"],["はじめまして","nice to meet you"],["はい","yes"]],numbers:[["いち","one"],["に","two"],["さん","three"],["よん","four"],["ご","five"],["ろく","six"],["なな","seven"],["はち","eight"],["きゅう","nine"],["じゅう","ten"]],colors:[["あか","red"],["あお","blue"],["みどり","green"],["きいろ","yellow"],["しろ","white"],["くろ","black"],["オレンジ","orange"],["ピンク","pink"],["むらさき","purple"],["はいいろ","gray"]],food:[["パン","bread"],["みず","water"],["ぎゅうにゅう","milk"],["にく","meat"],["さかな","fish"],["ごはん","rice"],["たまご","egg"],["くだもの","fruit"],["チーズ","cheese"],["とりにく","chicken"]],family:[["おかあさん","mother"],["おとうさん","father"],["おにいさん","brother"],["おねえさん","sister"],["むすこ","son"],["むすめ","daughter"],["おじいさん","grandfather"],["おばあさん","grandmother"],["おじさん","uncle"],["いとこ","cousin"]],animals:[["いぬ","dog"],["ねこ","cat"],["とり","bird"],["さかな","fish"],["うま","horse"],["うし","cow"],["ぶた","pig"],["うさぎ","rabbit"],["ねずみ","mouse"],["かめ","turtle"]],body:[["あたま","head"],["て","hand"],["あし","foot"],["め","eye"],["くち","mouth"],["はな","nose"],["みみ","ear"],["うで","arm"],["あし","leg"],["ゆび","finger"]],clothes:[["シャツ","shirt"],["ズボン","pants"],["くつ","shoe"],["ぼうし","hat"],["ワンピース","dress"],["ジャケット","jacket"],["スカート","skirt"],["くつした","sock"],["マフラー","scarf"],["てぶくろ","glove"]],home:[["いえ","house"],["ドア","door"],["まど","window"],["だいどころ","kitchen"],["おふろ","bathroom"],["ベッド","bed"],["テーブル","table"],["いす","chair"],["にわ","garden"],["やね","roof"]],weather:[["たいよう","sun"],["あめ","rain"],["ゆき","snow"],["かぜ","wind"],["くも","cloud"],["あつい","hot"],["さむい","cold"],["あらし","storm"],["にじ","rainbow"],["こおり","ice"]],school:[["がっこう","school"],["ほん","book"],["えんぴつ","pencil"],["せんせい","teacher"],["せいと","student"],["クラス","class"],["しけん","exam"],["しゅくだい","homework"],["こくばん","blackboard"],["かばん","bag"]],work:[["しごと","work"],["オフィス","office"],["じょうし","boss"],["かいぎ","meeting"],["パソコン","computer"],["でんわ","phone"],["おかね","money"],["きゃく","client"],["プロジェクト","project"],["チーム","team"]],transport:[["くるま","car"],["バス","bus"],["でんしゃ","train"],["ひこうき","plane"],["じてんしゃ","bicycle"],["タクシー","taxi"],["ちかてつ","subway"],["ふね","boat"],["バイク","motorcycle"],["トラック","truck"]],shopping:[["みせ","store"],["ねだん","price"],["やすい","cheap"],["たかい","expensive"],["ふくろ","bag"],["かう","to buy"],["うる","to sell"],["レシート","receipt"],["わりびき","discount"],["セール","sale"]],health:[["いしゃ","doctor"],["びょういん","hospital"],["くすり","medicine"],["いたみ","pain"],["ねつ","fever"],["びょうき","sick"],["けんこう","health"],["じょうざい","pill"],["きず","wound"],["きゅうきゅうしゃ","ambulance"]],nature:[["き","tree"],["はな","flower"],["かわ","river"],["やま","mountain"],["うみ","sea"],["もり","forest"],["みずうみ","lake"],["はま","beach"],["しま","island"],["いし","rock"]],sports:[["サッカー","soccer"],["およぐ","swim"],["はしる","run"],["ボール","ball"],["チーム","team"],["ゴール","goal"],["かつ","win"],["まける","lose"],["あそぶ","play"],["グラウンド","field"]],emotions:[["うれしい","happy"],["かなしい","sad"],["おこる","angry"],["つかれた","tired"],["きんちょう","nervous"],["わくわく","excited"],["たいくつ","bored"],["おどろく","surprised"],["おちつく","calm"],["ほこり","proud"]],directions:[["ひだり","left"],["みぎ","right"],["まっすぐ","straight"],["ちかい","near"],["とおい","far"],["きた","north"],["みなみ","south"],["かど","corner"],["こうさてん","crossroad"],["ちず","map"]],restaurant:[["メニュー","menu"],["ウェイター","waiter"],["おかいけい","bill"],["チップ","tip"],["よやく","reservation"],["りょうり","dish"],["のみもの","drink"],["デザート","dessert"],["ぜんさい","starter"],["コップ","glass"]],travel:[["パスポート","passport"],["スーツケース","suitcase"],["フライト","flight"],["ホテル","hotel"],["かんこうきゃく","tourist"],["しゃしん","photo"],["おみやげ","souvenir"],["ぼうけん","adventure"],["きゅうか","vacation"],["きっぷ","ticket"]],time:[["じかん","hour"],["ふん","minute"],["ひ","day"],["しゅう","week"],["つき","month"],["ねん","year"],["きょう","today"],["あした","tomorrow"],["きのう","yesterday"],["いつも","always"]],hobbies:[["おんがく","music"],["おどる","dance"],["うたう","sing"],["えをかく","paint"],["よむ","read"],["りょうりする","cook"],["りょこう","travel"],["しゃしん","photography"],["えいが","movie"],["えんげい","garden"]]},
hi:{greetings:[["नमस्ते","hello"],["अलविदा","goodbye"],["सुप्रभात","good morning"],["शुभ रात्रि","good night"],["कृपया","please"],["धन्यवाद","thank you"],["माफ कीजिए","excuse me"],["आप कैसे हैं?","how are you?"],["ठीक","good"],["स्वागत","welcome"]],numbers:[["एक","one"],["दो","two"],["तीन","three"],["चार","four"],["पाँच","five"],["छह","six"],["सात","seven"],["आठ","eight"],["नौ","nine"],["दस","ten"]],colors:[["लाल","red"],["नीला","blue"],["हरा","green"],["पीला","yellow"],["सफ़ेद","white"],["काला","black"],["नारंगी","orange"],["गुलाबी","pink"],["बैंगनी","purple"],["स्लेटी","gray"]],food:[["रोटी","bread"],["पानी","water"],["दूध","milk"],["मांस","meat"],["मछली","fish"],["चावल","rice"],["अंडा","egg"],["फल","fruit"],["पनीर","cheese"],["मुर्ग़ी","chicken"]],family:[["माँ","mother"],["पिताजी","father"],["भाई","brother"],["बहन","sister"],["बेटा","son"],["बेटी","daughter"],["दादा","grandfather"],["दादी","grandmother"],["चाचा","uncle"],["भतीजा","cousin"]],animals:[["कुत्ता","dog"],["बिल्ली","cat"],["चिड़िया","bird"],["मछली","fish"],["घोड़ा","horse"],["गाय","cow"],["सूअर","pig"],["खरगोश","rabbit"],["चूहा","mouse"],["कछुआ","turtle"]],body:[["सिर","head"],["हाथ","hand"],["पैर","foot"],["आँख","eye"],["मुँह","mouth"],["नाक","nose"],["कान","ear"],["बाजू","arm"],["टाँग","leg"],["उंगली","finger"]],clothes:[["कमीज़","shirt"],["पतलून","pants"],["जूता","shoe"],["टोपी","hat"],["कपड़ा","dress"],["जैकेट","jacket"],["स्कर्ट","skirt"],["मोज़ा","sock"],["दुपट्टा","scarf"],["दस्ताना","glove"]],home:[["घर","house"],["दरवाज़ा","door"],["खिड़की","window"],["रसोई","kitchen"],["स्नानघर","bathroom"],["बिस्तर","bed"],["मेज़","table"],["कुर्सी","chair"],["बगीचा","garden"],["छत","roof"]],weather:[["धूप","sun"],["बारिश","rain"],["बर्फ़","snow"],["हवा","wind"],["बादल","cloud"],["गरम","hot"],["ठंडा","cold"],["तूफ़ान","storm"],["इंद्रधनुष","rainbow"],["बर्फ़","ice"]],school:[["स्कूल","school"],["किताब","book"],["पेंसिल","pencil"],["शिक्षक","teacher"],["छात्र","student"],["कक्षा","class"],["परीक्षा","exam"],["गृहकार्य","homework"],["बोर्ड","blackboard"],["बस्ता","backpack"]],work:[["काम","work"],["दफ़्तर","office"],["बॉस","boss"],["मीटिंग","meeting"],["कंप्यूटर","computer"],["फ़ोन","phone"],["पैसे","money"],["ग्राहक","client"],["परियोजना","project"],["टीम","team"]],transport:[["गाड़ी","car"],["बस","bus"],["ट्रेन","train"],["हवाई जहाज़","plane"],["साइकिल","bicycle"],["टैक्सी","taxi"],["मेट्रो","subway"],["नाव","boat"],["मोटरसाइकिल","motorcycle"],["ट्रक","truck"]],shopping:[["दुकान","store"],["दाम","price"],["सस्ता","cheap"],["महँगा","expensive"],["थैला","bag"],["ख़रीदना","to buy"],["बेचना","to sell"],["रसीद","receipt"],["छूट","discount"],["ऑफर","offer"]],health:[["डॉक्टर","doctor"],["अस्पताल","hospital"],["दवाई","medicine"],["दर्द","pain"],["बुख़ार","fever"],["बीमार","sick"],["स्वास्थ्य","health"],["गोली","pill"],["ज़ख़्म","wound"],["एम्बुलेंस","ambulance"]],nature:[["पेड़","tree"],["फूल","flower"],["नदी","river"],["पहाड़","mountain"],["समुद्र","sea"],["जंगल","forest"],["झील","lake"],["तट","beach"],["द्वीप","island"],["पत्थर","rock"]],sports:[["क्रिकेट","cricket"],["तैरना","swim"],["दौड़ना","run"],["गेंद","ball"],["टीम","team"],["गोल","goal"],["जीतना","win"],["हारना","lose"],["खेलना","play"],["मैदान","field"]],emotions:[["ख़ुश","happy"],["उदास","sad"],["गुस्सा","angry"],["थका हुआ","tired"],["घबराया","nervous"],["उत्साहित","excited"],["ऊबा हुआ","bored"],["हैरान","surprised"],["शांत","calm"],["गर्व","proud"]],directions:[["बाएँ","left"],["दाएँ","right"],["सीधा","straight"],["पास","near"],["दूर","far"],["उत्तर","north"],["दक्षिण","south"],["कोना","corner"],["चौराहा","crossroad"],["नक़्शा","map"]],restaurant:[["मेनू","menu"],["वेटर","waiter"],["बिल","bill"],["टिप","tip"],["आरक्षण","reservation"],["व्यंजन","dish"],["पेय","drink"],["मिठाई","dessert"],["स्टार्टर","starter"],["गिलास","glass"]],travel:[["पासपोर्ट","passport"],["सूटकेस","suitcase"],["उड़ान","flight"],["होटल","hotel"],["पर्यटक","tourist"],["फ़ोटो","photo"],["स्मारिका","souvenir"],["साहस","adventure"],["छुट्टी","vacation"],["टिकट","ticket"]],time:[["घंटा","hour"],["मिनट","minute"],["दिन","day"],["हफ़्ता","week"],["महीना","month"],["साल","year"],["आज","today"],["कल","tomorrow"],["कल","yesterday"],["हमेशा","always"]],hobbies:[["संगीत","music"],["नाचना","dance"],["गाना","sing"],["चित्र बनाना","paint"],["पढ़ना","read"],["खाना बनाना","cook"],["यात्रा","travel"],["फ़ोटोग्राफ़ी","photography"],["फ़िल्म","movie"],["बागवानी","garden"]]},
ko:{greetings:[["안녕하세요","hello"],["안녕히 가세요","goodbye"],["좋은 아침","good morning"],["잘 자요","good night"],["주세요","please"],["감사합니다","thank you"],["죄송합니다","excuse me"],["어떻게 지내세요?","how are you?"],["반갑습니다","nice to meet you"],["네","yes"]],numbers:[["하나","one"],["둘","two"],["셋","three"],["넷","four"],["다섯","five"],["여섯","six"],["일곱","seven"],["여덟","eight"],["아홉","nine"],["열","ten"]],colors:[["빨간색","red"],["파란색","blue"],["초록색","green"],["노란색","yellow"],["흰색","white"],["검은색","black"],["주황색","orange"],["분홍색","pink"],["보라색","purple"],["회색","gray"]],food:[["빵","bread"],["물","water"],["우유","milk"],["고기","meat"],["생선","fish"],["밥","rice"],["계란","egg"],["과일","fruit"],["치즈","cheese"],["닭고기","chicken"]],family:[["어머니","mother"],["아버지","father"],["형","brother"],["언니","sister"],["아들","son"],["딸","daughter"],["할아버지","grandfather"],["할머니","grandmother"],["삼촌","uncle"],["사촌","cousin"]],animals:[["개","dog"],["고양이","cat"],["새","bird"],["물고기","fish"],["말","horse"],["소","cow"],["돼지","pig"],["토끼","rabbit"],["쥐","mouse"],["거북이","turtle"]],body:[["머리","head"],["손","hand"],["발","foot"],["눈","eye"],["입","mouth"],["코","nose"],["귀","ear"],["팔","arm"],["다리","leg"],["손가락","finger"]],clothes:[["셔츠","shirt"],["바지","pants"],["신발","shoe"],["모자","hat"],["드레스","dress"],["재킷","jacket"],["치마","skirt"],["양말","sock"],["목도리","scarf"],["장갑","glove"]],home:[["집","house"],["문","door"],["창문","window"],["부엌","kitchen"],["욕실","bathroom"],["침대","bed"],["테이블","table"],["의자","chair"],["정원","garden"],["지붕","roof"]],weather:[["해","sun"],["비","rain"],["눈","snow"],["바람","wind"],["구름","cloud"],["더워요","hot"],["추워요","cold"],["폭풍","storm"],["무지개","rainbow"],["얼음","ice"]],school:[["학교","school"],["책","book"],["연필","pencil"],["선생님","teacher"],["학생","student"],["수업","class"],["시험","exam"],["숙제","homework"],["칠판","blackboard"],["가방","backpack"]],work:[["일","work"],["사무실","office"],["사장님","boss"],["회의","meeting"],["컴퓨터","computer"],["전화","phone"],["돈","money"],["고객","client"],["프로젝트","project"],["팀","team"]],transport:[["차","car"],["버스","bus"],["기차","train"],["비행기","plane"],["자전거","bicycle"],["택시","taxi"],["지하철","subway"],["배","boat"],["오토바이","motorcycle"],["트럭","truck"]],shopping:[["가게","store"],["가격","price"],["싸요","cheap"],["비싸요","expensive"],["가방","bag"],["사다","to buy"],["팔다","to sell"],["영수증","receipt"],["할인","discount"],["세일","sale"]],health:[["의사","doctor"],["병원","hospital"],["약","medicine"],["아픔","pain"],["열","fever"],["아파요","sick"],["건강","health"],["알약","pill"],["상처","wound"],["구급차","ambulance"]],nature:[["나무","tree"],["꽃","flower"],["강","river"],["산","mountain"],["바다","sea"],["숲","forest"],["호수","lake"],["해변","beach"],["섬","island"],["돌","rock"]],sports:[["축구","soccer"],["수영","swim"],["달리기","run"],["공","ball"],["팀","team"],["골","goal"],["이기다","win"],["지다","lose"],["놀다","play"],["운동장","field"]],emotions:[["행복해요","happy"],["슬퍼요","sad"],["화났어요","angry"],["피곤해요","tired"],["긴장해요","nervous"],["신나요","excited"],["지루해요","bored"],["놀랐어요","surprised"],["차분해요","calm"],["자랑스러워요","proud"]],directions:[["왼쪽","left"],["오른쪽","right"],["직진","straight"],["가까워요","near"],["멀어요","far"],["북쪽","north"],["남쪽","south"],["모퉁이","corner"],["교차로","crossroad"],["지도","map"]],restaurant:[["메뉴","menu"],["웨이터","waiter"],["계산서","bill"],["팁","tip"],["예약","reservation"],["요리","dish"],["음료","drink"],["디저트","dessert"],["전채","starter"],["잔","glass"]],travel:[["여권","passport"],["여행 가방","suitcase"],["비행","flight"],["호텔","hotel"],["관광객","tourist"],["사진","photo"],["기념품","souvenir"],["모험","adventure"],["휴가","vacation"],["표","ticket"]],time:[["시간","hour"],["분","minute"],["날","day"],["주","week"],["달","month"],["년","year"],["오늘","today"],["내일","tomorrow"],["어제","yesterday"],["항상","always"]],hobbies:[["음악","music"],["춤추다","dance"],["노래하다","sing"],["그리다","paint"],["읽다","read"],["요리하다","cook"],["여행하다","travel"],["사진","photography"],["영화","movie"],["원예","garden"]]},
pt:{greetings:[["olá","hello"],["tchau","goodbye"],["bom dia","good morning"],["boa noite","good night"],["por favor","please"],["obrigado","thank you"],["desculpe","excuse me"],["como vai?","how are you?"],["bem","good"],["prazer","nice to meet you"]],numbers:[["um","one"],["dois","two"],["três","three"],["quatro","four"],["cinco","five"],["seis","six"],["sete","seven"],["oito","eight"],["nove","nine"],["dez","ten"]],colors:[["vermelho","red"],["azul","blue"],["verde","green"],["amarelo","yellow"],["branco","white"],["preto","black"],["laranja","orange"],["rosa","pink"],["roxo","purple"],["cinza","gray"]],food:[["pão","bread"],["água","water"],["leite","milk"],["carne","meat"],["peixe","fish"],["arroz","rice"],["ovo","egg"],["fruta","fruit"],["queijo","cheese"],["frango","chicken"]],family:[["mãe","mother"],["pai","father"],["irmão","brother"],["irmã","sister"],["filho","son"],["filha","daughter"],["avô","grandfather"],["avó","grandmother"],["tio","uncle"],["primo","cousin"]],animals:[["cachorro","dog"],["gato","cat"],["pássaro","bird"],["peixe","fish"],["cavalo","horse"],["vaca","cow"],["porco","pig"],["coelho","rabbit"],["rato","mouse"],["tartaruga","turtle"]],body:[["cabeça","head"],["mão","hand"],["pé","foot"],["olho","eye"],["boca","mouth"],["nariz","nose"],["orelha","ear"],["braço","arm"],["perna","leg"],["dedo","finger"]],clothes:[["camisa","shirt"],["calça","pants"],["sapato","shoe"],["chapéu","hat"],["vestido","dress"],["jaqueta","jacket"],["saia","skirt"],["meia","sock"],["cachecol","scarf"],["luva","glove"]],home:[["casa","house"],["porta","door"],["janela","window"],["cozinha","kitchen"],["banheiro","bathroom"],["cama","bed"],["mesa","table"],["cadeira","chair"],["jardim","garden"],["telhado","roof"]],weather:[["sol","sun"],["chuva","rain"],["neve","snow"],["vento","wind"],["nuvem","cloud"],["quente","hot"],["frio","cold"],["tempestade","storm"],["arco-íris","rainbow"],["gelo","ice"]],school:[["escola","school"],["livro","book"],["lápis","pencil"],["professor","teacher"],["aluno","student"],["aula","class"],["prova","exam"],["dever","homework"],["quadro","blackboard"],["mochila","backpack"]],work:[["trabalho","work"],["escritório","office"],["chefe","boss"],["reunião","meeting"],["computador","computer"],["telefone","phone"],["dinheiro","money"],["cliente","client"],["projeto","project"],["equipe","team"]],transport:[["carro","car"],["ônibus","bus"],["trem","train"],["avião","plane"],["bicicleta","bicycle"],["táxi","taxi"],["metrô","subway"],["barco","boat"],["moto","motorcycle"],["caminhão","truck"]],shopping:[["loja","store"],["preço","price"],["barato","cheap"],["caro","expensive"],["sacola","bag"],["comprar","to buy"],["vender","to sell"],["recibo","receipt"],["desconto","discount"],["oferta","offer"]],health:[["médico","doctor"],["hospital","hospital"],["remédio","medicine"],["dor","pain"],["febre","fever"],["doente","sick"],["saúde","health"],["comprimido","pill"],["ferida","wound"],["ambulância","ambulance"]],nature:[["árvore","tree"],["flor","flower"],["rio","river"],["montanha","mountain"],["mar","sea"],["floresta","forest"],["lago","lake"],["praia","beach"],["ilha","island"],["pedra","rock"]],sports:[["futebol","soccer"],["nadar","swim"],["correr","run"],["bola","ball"],["time","team"],["gol","goal"],["ganhar","win"],["perder","lose"],["jogar","play"],["campo","field"]],emotions:[["feliz","happy"],["triste","sad"],["com raiva","angry"],["cansado","tired"],["nervoso","nervous"],["animado","excited"],["entediado","bored"],["surpreso","surprised"],["calmo","calm"],["orgulhoso","proud"]],directions:[["esquerda","left"],["direita","right"],["reto","straight"],["perto","near"],["longe","far"],["norte","north"],["sul","south"],["esquina","corner"],["cruzamento","crossroad"],["mapa","map"]],restaurant:[["cardápio","menu"],["garçom","waiter"],["conta","bill"],["gorjeta","tip"],["reserva","reservation"],["prato","dish"],["bebida","drink"],["sobremesa","dessert"],["entrada","starter"],["copo","glass"]],travel:[["passaporte","passport"],["mala","suitcase"],["voo","flight"],["hotel","hotel"],["turista","tourist"],["foto","photo"],["lembrança","souvenir"],["aventura","adventure"],["férias","vacation"],["bilhete","ticket"]],time:[["hora","hour"],["minuto","minute"],["dia","day"],["semana","week"],["mês","month"],["ano","year"],["hoje","today"],["amanhã","tomorrow"],["ontem","yesterday"],["sempre","always"]],hobbies:[["música","music"],["dançar","dance"],["cantar","sing"],["pintar","paint"],["ler","read"],["cozinhar","cook"],["viajar","travel"],["fotografia","photography"],["filme","movie"],["jardinagem","garden"]]},
it:{greetings:[["ciao","hello"],["arrivederci","goodbye"],["buongiorno","good morning"],["buonanotte","good night"],["per favore","please"],["grazie","thank you"],["scusi","excuse me"],["come sta?","how are you?"],["bene","good"],["piacere","nice to meet you"]],numbers:[["uno","one"],["due","two"],["tre","three"],["quattro","four"],["cinque","five"],["sei","six"],["sette","seven"],["otto","eight"],["nove","nine"],["dieci","ten"]],colors:[["rosso","red"],["blu","blue"],["verde","green"],["giallo","yellow"],["bianco","white"],["nero","black"],["arancione","orange"],["rosa","pink"],["viola","purple"],["grigio","gray"]],food:[["pane","bread"],["acqua","water"],["latte","milk"],["carne","meat"],["pesce","fish"],["riso","rice"],["uovo","egg"],["frutta","fruit"],["formaggio","cheese"],["pollo","chicken"]],family:[["madre","mother"],["padre","father"],["fratello","brother"],["sorella","sister"],["figlio","son"],["figlia","daughter"],["nonno","grandfather"],["nonna","grandmother"],["zio","uncle"],["cugino","cousin"]],animals:[["cane","dog"],["gatto","cat"],["uccello","bird"],["pesce","fish"],["cavallo","horse"],["mucca","cow"],["maiale","pig"],["coniglio","rabbit"],["topo","mouse"],["tartaruga","turtle"]],body:[["testa","head"],["mano","hand"],["piede","foot"],["occhio","eye"],["bocca","mouth"],["naso","nose"],["orecchio","ear"],["braccio","arm"],["gamba","leg"],["dito","finger"]],clothes:[["camicia","shirt"],["pantaloni","pants"],["scarpa","shoe"],["cappello","hat"],["vestito","dress"],["giacca","jacket"],["gonna","skirt"],["calzino","sock"],["sciarpa","scarf"],["guanto","glove"]],home:[["casa","house"],["porta","door"],["finestra","window"],["cucina","kitchen"],["bagno","bathroom"],["letto","bed"],["tavolo","table"],["sedia","chair"],["giardino","garden"],["tetto","roof"]],weather:[["sole","sun"],["pioggia","rain"],["neve","snow"],["vento","wind"],["nuvola","cloud"],["caldo","hot"],["freddo","cold"],["tempesta","storm"],["arcobaleno","rainbow"],["ghiaccio","ice"]],school:[["scuola","school"],["libro","book"],["matita","pencil"],["insegnante","teacher"],["studente","student"],["classe","class"],["esame","exam"],["compiti","homework"],["lavagna","blackboard"],["zaino","backpack"]],work:[["lavoro","work"],["ufficio","office"],["capo","boss"],["riunione","meeting"],["computer","computer"],["telefono","phone"],["soldi","money"],["cliente","client"],["progetto","project"],["squadra","team"]],transport:[["macchina","car"],["autobus","bus"],["treno","train"],["aereo","plane"],["bicicletta","bicycle"],["taxi","taxi"],["metropolitana","subway"],["barca","boat"],["moto","motorcycle"],["camion","truck"]],shopping:[["negozio","store"],["prezzo","price"],["economico","cheap"],["caro","expensive"],["borsa","bag"],["comprare","to buy"],["vendere","to sell"],["scontrino","receipt"],["sconto","discount"],["offerta","offer"]],health:[["medico","doctor"],["ospedale","hospital"],["medicina","medicine"],["dolore","pain"],["febbre","fever"],["malato","sick"],["salute","health"],["pillola","pill"],["ferita","wound"],["ambulanza","ambulance"]],nature:[["albero","tree"],["fiore","flower"],["fiume","river"],["montagna","mountain"],["mare","sea"],["foresta","forest"],["lago","lake"],["spiaggia","beach"],["isola","island"],["pietra","rock"]],sports:[["calcio","soccer"],["nuotare","swim"],["correre","run"],["palla","ball"],["squadra","team"],["gol","goal"],["vincere","win"],["perdere","lose"],["giocare","play"],["campo","field"]],emotions:[["felice","happy"],["triste","sad"],["arrabbiato","angry"],["stanco","tired"],["nervoso","nervous"],["emozionato","excited"],["annoiato","bored"],["sorpreso","surprised"],["calmo","calm"],["orgoglioso","proud"]],directions:[["sinistra","left"],["destra","right"],["dritto","straight"],["vicino","near"],["lontano","far"],["nord","north"],["sud","south"],["angolo","corner"],["incrocio","crossroad"],["mappa","map"]],restaurant:[["menù","menu"],["cameriere","waiter"],["conto","bill"],["mancia","tip"],["prenotazione","reservation"],["piatto","dish"],["bevanda","drink"],["dolce","dessert"],["antipasto","starter"],["bicchiere","glass"]],travel:[["passaporto","passport"],["valigia","suitcase"],["volo","flight"],["albergo","hotel"],["turista","tourist"],["foto","photo"],["souvenir","souvenir"],["avventura","adventure"],["vacanza","vacation"],["biglietto","ticket"]],time:[["ora","hour"],["minuto","minute"],["giorno","day"],["settimana","week"],["mese","month"],["anno","year"],["oggi","today"],["domani","tomorrow"],["ieri","yesterday"],["sempre","always"]],hobbies:[["musica","music"],["ballare","dance"],["cantare","sing"],["dipingere","paint"],["leggere","read"],["cucinare","cook"],["viaggiare","travel"],["fotografia","photography"],["film","movie"],["giardinaggio","garden"]]}
};
const SEC_COLORS=["#58CC02","#1CB0F6","#FF9600"];const SEC_NAMES=["Rookie","Explorer","Champion"];const SEC_ICONS=["🌱","🧭","🌍"];
const UNIT_COLORS=["#58CC02","#1CB0F6","#FFC800","#FF9600","#CE82FF","#FF4B4B","#FF6B8A","#78C800"];
function _genLessons(words,si,ti){
  const ls=[];
  for(let li=0;li<5;li++){
    const s=(li*2+si)%words.length;const p4=Array.from({length:4},(_,i)=>words[(s+i)%words.length]);
    const ex=[];
    ex.push({t:"translate",p:p4[0][1],a:p4[0][0],o:p4.map(w=>w[0]).sort(()=>Math.random()-.5)});
    ex.push({t:"match",pairs:p4.map(w=>[w[1],w[0]])});
    ex.push({t:"listen",w:p4[1][0],m:p4[1][1],o:p4.map(w=>w[1]).sort(()=>Math.random()-.5)});
    if(si<2){ex.push({t:"fill",s:"_____ means "+p4[2][1],a:p4[2][0],h:p4[2][1]});}
    else{ex.push({t:"speak",ph:p4[2][0],m:p4[2][1]});}
    if(li%2===0&&p4[3][0].length<=8){const d=p4[3][0].toUpperCase().split("").sort(()=>Math.random()-.5).join(" ");ex.push({t:"scramble",w:p4[3][0].toUpperCase(),h:p4[3][1],d});}
    else{ex.push({t:"speak",ph:p4[3][0],m:p4[3][1]});}
    ls.push({id:si*10000+ti*100+li+1,title:TOPIC_NAMES[TOPIC_KEYS[ti]]+" "+(li+1),icon:TOPIC_ICONS[TOPIC_KEYS[ti]],ci:(ti+li+si)%8,ex});
  }
  return ls;
}
const SECTIONS={};
["es","fr","de","ja","hi","ko","pt","it"].forEach(lid=>{
  const bank=WB[lid];if(!bank)return;
  SECTIONS[lid]=[];
  for(let si=0;si<3;si++){
    const units=[];
    TOPIC_KEYS.forEach((tk,ti)=>{
      const words=bank[tk];if(!words)return;
      const shifted=[...words.slice((si*3)%words.length),...words.slice(0,(si*3)%words.length)];
      units.push({unit:ti+1,title:TOPIC_NAMES[tk],color:UNIT_COLORS[ti%8],icon:TOPIC_ICONS[tk],lessons:_genLessons(shifted,si,ti)});
    });
    SECTIONS[lid].push({section:si+1,title:SEC_NAMES[si],color:SEC_COLORS[si],icon:SEC_ICONS[si],units});
  }
});

function norm(ex){return ex.map(e=>{
  if(e.t==="translate")return{type:"translate",prompt:e.p,answer:e.a,options:e.o};
  if(e.t==="match")return{type:"match",pairs:e.pairs};
  if(e.t==="fill")return{type:"fill",sentence:e.s,answer:e.a,hint:e.h};
  if(e.t==="listen")return{type:"listen",word:e.w,meaning:e.m,options:e.o};
  if(e.t==="scramble")return{type:"scramble",word:e.w,hint:e.h,display:e.d};
  if(e.t==="speak")return{type:"speak",phrase:e.ph,meaning:e.m};
  if(e.t==="story")return{type:"story",title:e.title,story:e.story,question:e.q,answer:e.a,options:e.o};
  return e;
});}

const NOISE_SVG=`data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E`;
const SPEECH_LANGS={es:"es-ES",fr:"fr-FR",de:"de-DE",ja:"ja-JP",hi:"hi-IN",ko:"ko-KR",pt:"pt-BR",it:"it-IT"};
function ttsSpeak(text,lc){if(typeof window==="undefined"||!window.speechSynthesis)return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=lc||"en";u.rate=0.85;const v=window.speechSynthesis.getVoices().find(x=>x.lang===lc);if(v)u.voice=v;window.speechSynthesis.speak(u);}
const audioCtx=typeof window!=="undefined"?new(window.AudioContext||window.webkitAudioContext)():null;
function playSound(type){if(!audioCtx)return;if(audioCtx.state==="suspended")audioCtx.resume();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.connect(g);g.connect(audioCtx.destination);if(type==="correct"){o.type="sine";o.frequency.setValueAtTime(523,audioCtx.currentTime);o.frequency.setValueAtTime(659,audioCtx.currentTime+0.1);o.frequency.setValueAtTime(784,audioCtx.currentTime+0.2);g.gain.setValueAtTime(0.12,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.4);o.start();o.stop(audioCtx.currentTime+0.4);}else if(type==="wrong"){o.type="square";o.frequency.setValueAtTime(200,audioCtx.currentTime);o.frequency.setValueAtTime(150,audioCtx.currentTime+0.15);g.gain.setValueAtTime(0.08,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.3);o.start();o.stop(audioCtx.currentTime+0.3);}else{o.type="sine";o.frequency.setValueAtTime(880,audioCtx.currentTime);g.gain.setValueAtTime(0.06,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.15);o.start();o.stop(audioCtx.currentTime+0.15);}}
const hasSpeechAPI=typeof window!=="undefined"&&(window.SpeechRecognition||window.webkitSpeechRecognition);
function speakNorm(s){return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[.,!?¿¡'"]/g,"").replace(/\s+/g," ").trim();}
function speakMatch(said,exp){const a=speakNorm(said),b=speakNorm(exp);if(a===b)return 1;const aw=a.split(" "),bw=b.split(" ");let h=0;bw.forEach(w=>{if(aw.includes(w))h++;});return bw.length>0?h/bw.length:0;}

const CSS=`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka:wght@400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}button{font-family:'Nunito',sans-serif;-webkit-tap-highlight-color:transparent}input{font-family:'Nunito',sans-serif}input:focus{outline:none}
:root{--bg1:#131F24;--bg2:#1a1a2e;--bg3:#16213e}
@keyframes confettiFall{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(105vh) rotate(720deg);opacity:0}}
@keyframes xpPop{0%{opacity:0;transform:translate(-50%,-50%) scale(.3)}25%{opacity:1;transform:translate(-50%,-50%) scale(1.35)}55%{transform:translate(-50%,-65%) scale(1)}100%{opacity:0;transform:translate(-50%,-140%) scale(.7)}}
@keyframes flame{0%{transform:scale(1) rotate(-6deg)}100%{transform:scale(1.2) rotate(6deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
@keyframes glow{0%,100%{box-shadow:0 0 12px var(--gc,#58CC0244)}50%{box-shadow:0 0 28px var(--gc,#58CC0266)}}
@keyframes bounceIn{0%{transform:scale(0)}55%{transform:scale(1.2)}80%{transform:scale(.95)}100%{transform:scale(1)}}
@keyframes slideL{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideR{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
@keyframes wiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-8deg)}75%{transform:rotate(8deg)}}
@keyframes charIdle{0%,100%{transform:translateY(0) rotate(0)}25%{transform:translateY(-3px) rotate(-2deg)}50%{transform:translateY(-1px) rotate(0)}75%{transform:translateY(-3px) rotate(2deg)}}
@keyframes charCorrect{0%{transform:scale(1) rotate(0)}15%{transform:scale(1.15) rotate(-6deg)}30%{transform:scale(1.1) rotate(6deg)}45%{transform:scale(1.12) rotate(-4deg)}60%{transform:scale(1.08) rotate(3deg)}80%{transform:scale(1.02) rotate(-1deg)}100%{transform:scale(1) rotate(0)}}
@keyframes charWrong{0%{transform:translateX(0)}10%{transform:translateX(-10px) rotate(-3deg)}20%{transform:translateX(10px) rotate(3deg)}30%{transform:translateX(-8px) rotate(-2deg)}40%{transform:translateX(8px) rotate(2deg)}50%{transform:translateX(-5px)}60%{transform:translateX(5px)}70%{transform:translateX(-3px)}80%{transform:translateX(2px)}100%{transform:translateX(0)}}
@keyframes correctFlash{0%{background-color:rgba(88,204,2,0)}30%{background-color:rgba(88,204,2,.06)}100%{background-color:transparent}}
@keyframes wrongFlash{0%{background-color:rgba(255,75,75,0)}30%{background-color:rgba(255,75,75,.06)}100%{background-color:transparent}}
@keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes ctaPulse{0%,100%{box-shadow:0 5px 0 var(--sh)}50%{box-shadow:0 5px 0 var(--sh),0 0 16px var(--gl)}}
@keyframes tileAppear{from{opacity:0;transform:scale(.7) rotate(-5deg)}to{opacity:1;transform:scale(1) rotate(0)}}
@keyframes popIn{0%{opacity:0;transform:scale(0)}60%{transform:scale(1.15)}100%{opacity:1;transform:scale(1)}}
@keyframes micPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,75,75,.4)}50%{box-shadow:0 0 0 16px rgba(255,75,75,0)}}
@keyframes micWave{0%{transform:scale(1);opacity:.5}100%{transform:scale(2.2);opacity:0}}
@keyframes slideDown{from{opacity:0;transform:translateY(-14px)}to{opacity:1;transform:translateY(0)}}
@keyframes nodeGlow{0%,100%{filter:drop-shadow(0 0 6px var(--gc,#58CC0244))}50%{filter:drop-shadow(0 0 14px var(--gc,#58CC0266))}}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes bossGlow{0%,100%{box-shadow:0 0 15px var(--bc,#FFC80044),0 0 30px var(--bc,#FFC80022)}50%{box-shadow:0 0 25px var(--bc,#FFC80066),0 0 50px var(--bc,#FFC80033)}}
@keyframes bossRotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes starPop{0%{transform:scale(0) rotate(-180deg);opacity:0}60%{transform:scale(1.3) rotate(10deg);opacity:1}100%{transform:scale(1) rotate(0deg);opacity:1}}
@keyframes crownFloat{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-5px) rotate(3deg)}}
@keyframes shieldPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
@keyframes owlFly{0%{transform:translateY(0) scale(1) rotate(0);opacity:1}30%{transform:translateY(-80px) scale(1.3) rotate(-8deg);opacity:1}60%{transform:translateY(-220px) scale(1.1) rotate(5deg);opacity:.9}100%{transform:translateY(-500px) scale(.6) rotate(0);opacity:0}}
@keyframes owlBounce{0%{transform:translateY(0) scale(1)}20%{transform:translateY(10px) scale(.92,.1.08)}45%{transform:translateY(-40px) scale(1.05)}55%{transform:translateY(-35px) scale(1)}100%{transform:translateY(0) scale(1)}}
@keyframes skyReveal{0%{opacity:0;background-position:50% 100%}100%{opacity:1;background-position:50% 30%}}
@keyframes starTrail{0%{transform:translateY(0) scale(0);opacity:0}20%{transform:translateY(-20px) scale(1);opacity:1}100%{transform:translateY(-120px) scale(.3);opacity:0}}
@keyframes gradText{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes typeIn{from{width:0;opacity:0}to{width:100%;opacity:1}}
@keyframes endFadeUp{0%{opacity:0;transform:translateY(40px)}100%{opacity:1;transform:translateY(0)}}
@keyframes endScale{0%{opacity:0;transform:scale(.5)}60%{transform:scale(1.08)}100%{opacity:1;transform:scale(1)}}
@keyframes ribbonWave{0%,100%{transform:rotate(-2deg) scaleX(1)}50%{transform:rotate(2deg) scaleX(1.02)}}
@keyframes sparkle{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
@keyframes leagueShieldIn{0%{transform:scale(0) rotate(-30deg);opacity:0}50%{transform:scale(1.3) rotate(8deg);opacity:1}70%{transform:scale(.95) rotate(-3deg)}100%{transform:scale(1) rotate(0)}}
@keyframes leagueGlow{0%{box-shadow:0 0 0 0 var(--lc,#fff4)}50%{box-shadow:0 0 60px 30px var(--lc,#fff2),0 0 120px 60px var(--lc,#fff1)}100%{box-shadow:0 0 40px 15px var(--lc,#fff1)}}
@keyframes leagueRays{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes leagueTextIn{0%{opacity:0;transform:translateY(30px) scale(.8)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes leagueBurst{0%{transform:scale(0);opacity:1}100%{transform:scale(3);opacity:0}}
@keyframes demoteFall{0%{transform:translateY(-40px) rotate(5deg);opacity:0}40%{transform:translateY(10px) rotate(-3deg);opacity:1}100%{transform:translateY(0) rotate(0);opacity:1}}
@keyframes demoteShake{0%,100%{transform:translateX(0)}15%{transform:translateX(-6px)}30%{transform:translateX(6px)}45%{transform:translateX(-4px)}60%{transform:translateX(4px)}75%{transform:translateX(-2px)}90%{transform:translateX(2px)}}
@keyframes diamondShimmer{0%{transform:translateX(-120%) rotate(25deg)}100%{transform:translateX(220%) rotate(25deg)}}
@keyframes aurora{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes iceFloat{0%,100%{transform:translateY(0) rotate(0deg);opacity:.4}50%{transform:translateY(-12px) rotate(180deg);opacity:.8}}
@keyframes diamondPulse{0%,100%{filter:drop-shadow(0 0 20px #40D8F055) drop-shadow(0 0 40px #90F0FF22)}50%{filter:drop-shadow(0 0 35px #40D8F088) drop-shadow(0 0 60px #CE82FF33)}}
@keyframes prismRotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`;

function GraduationScreen({lang,onClose,onRestart}){
  const[phase,setPhase]=useState(0); // 0=owl bouncing, 1=owl flying, 2=sky+text, 3=full reveal
  const F="'Fredoka',sans-serif";
  useState(()=>{
    setTimeout(()=>setPhase(1),800);
    setTimeout(()=>setPhase(2),2200);
    setTimeout(()=>setPhase(3),3500);
  },[]);
  const stars=Array.from({length:25},(_,i)=>({x:10+Math.random()*80,y:10+Math.random()*60,s:4+Math.random()*8,d:Math.random()*3,c:["#FFC800","#FF9600","#CE82FF","#1CB0F6","#58CC02","#FF6B8A"][i%6]}));
  const trails=Array.from({length:12},(_,i)=>({x:42+Math.random()*16,d:.5+i*.15,s:6+Math.random()*10}));

  return <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,
    background:phase>=2?"radial-gradient(ellipse at 50% 30%,#1a2744 0%,#0d1520 50%,#060a10 100%)":"#0d1520",transition:"background 2s ease"}}>

    {/* ── Night sky with stars ── */}
    {phase>=2&&<div style={{position:"absolute",inset:0,overflow:"hidden",animation:"skyReveal 2s ease both"}}>
      {stars.map((s,i)=><div key={i} style={{position:"absolute",left:`${s.x}%`,top:`${s.y}%`,width:s.s,height:s.s,borderRadius:"50%",background:s.c,opacity:0,
        animation:`sparkle ${1.5+Math.random()}s ease-in-out ${s.d}s infinite`,boxShadow:`0 0 ${s.s*2}px ${s.c}44`}}/>)}
      {/* Moon */}
      <div style={{position:"absolute",top:"8%",right:"15%",width:60,height:60,borderRadius:"50%",background:"radial-gradient(circle at 40% 35%,#FFF8E7,#FFE4A0)",boxShadow:"0 0 40px rgba(255,244,200,.3),0 0 80px rgba(255,244,200,.15)",opacity:0,animation:"endScale 1.5s ease 3s both"}}/>
      {/* Shooting stars */}
      <div style={{position:"absolute",top:"20%",left:"10%",width:80,height:2,background:"linear-gradient(90deg,transparent,#fff,transparent)",borderRadius:2,opacity:0,transform:"rotate(-25deg)",animation:"endFadeUp 1s ease 4s both"}}/>
      <div style={{position:"absolute",top:"15%",right:"20%",width:60,height:1.5,background:"linear-gradient(90deg,transparent,#CE82FF,transparent)",borderRadius:2,opacity:0,transform:"rotate(-30deg)",animation:"endFadeUp 1s ease 5s both"}}/>
    </div>}

    {/* ── Hoot the owl ── */}
    <div style={{position:"relative",zIndex:10,marginBottom:phase>=2?40:0,transition:"margin 1s ease"}}>
      {/* Star trails behind owl during flight */}
      {phase>=1&&phase<3&&trails.map((t,i)=><div key={i} style={{position:"absolute",left:`${t.x}%`,bottom:0,width:t.s,height:t.s,borderRadius:"50%",background:["#FFC800","#FF9600","#CE82FF"][i%3],animation:`starTrail 1.2s ease ${t.d}s infinite`,zIndex:5}}/>)}

      <div style={{
        animation:phase===0?"owlBounce 1s ease-in-out":phase===1?"owlFly 1.8s cubic-bezier(.4,0,.2,1) forwards":"none",
        opacity:phase>=2?0:1,transition:phase>=2?"opacity .5s":"none"
      }}>
        <CharSVG ci={0} size={phase===0?120:100} mood="correct"/>
      </div>

      {/* Owl reappears small at top after flight */}
      {phase>=3&&<div style={{animation:"endScale .8s cubic-bezier(.4,2,.6,1) both"}}>
        <CharSVG ci={0} size={80} mood="correct"/>
      </div>}
    </div>

    {/* ── Main text ── */}
    {phase>=2&&<div style={{position:"relative",zIndex:10,textAlign:"center",maxWidth:420}}>
      <h1 style={{fontSize:36,fontWeight:900,fontFamily:F,lineHeight:1.2,marginBottom:12,opacity:0,
        background:"linear-gradient(135deg,#FFC800,#FF9600,#CE82FF,#1CB0F6,#58CC02)",backgroundSize:"300% 300%",
        WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
        animation:`endFadeUp .8s ease 3.2s both, gradText 4s ease infinite`}}>
        This is the end of<br/>your {lang?.name} course
      </h1>

      {/* Ribbon banner */}
      <div style={{display:"inline-block",padding:"8px 28px",borderRadius:30,marginBottom:16,opacity:0,
        background:"linear-gradient(135deg,#FFC800,#FF9600)",boxShadow:"0 4px 20px rgba(255,200,0,.3)",
        animation:`endScale .6s ease 3.8s both, ribbonWave 3s ease-in-out infinite`}}>
        <span style={{fontSize:14,fontWeight:900,color:"#fff",fontFamily:F,letterSpacing:2,textTransform:"uppercase"}}>🎓 Course Complete 🎓</span>
      </div>

      <p style={{fontSize:15,color:"rgba(255,255,255,.5)",fontWeight:600,lineHeight:1.6,marginBottom:8,opacity:0,animation:"endFadeUp .6s ease 4.2s both"}}>
        You've mastered all lessons, conquered every level test,<br/>and completed 20 days of daily challenges.
      </p>

      {/* Stats row */}
      <div style={{display:"flex",justifyContent:"center",gap:16,marginBottom:24,marginTop:16}}>
        {[{v:"23",l:"Lessons",i:"📚",d:"4.5s"},{v:"3",l:"Units",i:"🏆",d:"4.7s"},{v:"20",l:"Days",i:"📅",d:"4.9s"},{v:"⭐",l:"Master",i:"",d:"5.1s"}].map((s,i)=>
          <div key={i} style={{padding:"12px 8px",borderRadius:14,background:"rgba(255,255,255,.04)",border:"1.5px solid rgba(255,255,255,.08)",minWidth:60,opacity:0,animation:`endScale .5s ease ${s.d} both`}}>
            <div style={{fontSize:22}}>{s.i||s.v}</div>
            <div style={{fontSize:16,fontWeight:900,color:"#FFC800",fontFamily:F,marginTop:2}}>{s.i?s.v:""}</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,.35)",fontWeight:700}}>{s.l}</div>
          </div>)}
      </div>

      {/* Message from Hoot */}
      <div style={{padding:"14px 20px",borderRadius:16,background:"rgba(120,200,0,.06)",border:"1.5px solid rgba(120,200,0,.15)",marginBottom:20,opacity:0,animation:"endFadeUp .6s ease 5.3s both",textAlign:"left",display:"flex",gap:12,alignItems:"center"}}>
        <CharAvatar ci={0} size={44} mood="correct"/>
        <div>
          <span style={{fontSize:10,fontWeight:800,color:"#78C800",fontFamily:F}}>Hoot says</span>
          <p style={{fontSize:13,color:"rgba(255,255,255,.6)",fontWeight:700,marginTop:2,lineHeight:1.4}}>I'm so proud of you! You've come such a long way. Keep practicing — every language opens a new world! 🌍</p>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",opacity:0,animation:"endFadeUp .6s ease 5.8s both"}}>
        <button onClick={onRestart} style={{padding:"14px 32px",borderRadius:14,border:"none",background:"linear-gradient(135deg,#58CC02,#4CAF00)",color:"#fff",fontSize:15,fontWeight:900,cursor:"pointer",fontFamily:F,boxShadow:"0 4px 0 #388200,0 6px 20px rgba(88,204,2,.2)",textTransform:"uppercase",letterSpacing:1}}>
          🔄 Restart Course
        </button>
        <button onClick={onClose} style={{padding:"14px 32px",borderRadius:14,border:"2px solid rgba(255,255,255,.12)",background:"transparent",color:"rgba(255,255,255,.6)",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:F}}>
          Back to Path
        </button>
      </div>
    </div>}

    {/* ── Ground/landscape at bottom ── */}
    <div style={{position:"absolute",bottom:0,left:0,right:0,height:80,background:"linear-gradient(180deg,transparent,#0a0f18)",zIndex:1}}/>
    {phase<2&&<div style={{position:"absolute",bottom:20,left:0,right:0,display:"flex",justifyContent:"center",gap:8,zIndex:5}}>
      {[...Array(7)].map((_,i)=><div key={i} style={{width:16+Math.random()*20,height:20+Math.random()*30,borderRadius:"8px 8px 0 0",background:["#58CC02","#4CAF00","#388200"][i%3],opacity:.15+i*.02,animation:`float ${2+i*.3}s ease-in-out infinite ${i*.2}s`}}/>)}
    </div>}
  </div>;
}

function Confetti({active}){if(!active)return null;return <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9999}}>{Array.from({length:55},(_,i)=><div key={i} style={{position:"absolute",left:`${Math.random()*100}%`,top:-20,width:4+Math.random()*10,height:6+Math.random()*12,backgroundColor:["#FF4B4B","#1CB0F6","#FFC800","#FF9600","#CE82FF","#78C800","#FF6B8A","#58CC02"][i%8],borderRadius:Math.random()>.5?"50%":"2px",transform:`rotate(${Math.random()*360}deg)`,animation:`confettiFall ${1.5+Math.random()*2}s ${Math.random()*.8}s ease-in forwards`}}/>)}</div>;}
function Hearts({lives,max=5}){return <div style={{display:"flex",gap:2}}>{Array.from({length:max},(_,i)=><span key={i} style={{fontSize:17,display:"inline-block",filter:i<lives?"none":"grayscale(1) opacity(0.2)",transition:"all .4s cubic-bezier(.4,2,.6,1)",transform:i<lives?"scale(1)":"scale(0.6)"}}>❤️</span>)}</div>;}
function ProgressBar({current,total,color="#58CC02",h=12}){const pct=total>0?Math.min(100,Math.round(current/total*100)):0;return <div style={{width:"100%",height:h,backgroundColor:"rgba(255,255,255,0.08)",borderRadius:h,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,borderRadius:h,background:`linear-gradient(90deg,${color},${color}dd)`,transition:"width .5s cubic-bezier(.4,2,.6,1)",position:"relative",overflow:"hidden"}}><div style={{position:"absolute",inset:0,borderRadius:h,background:"linear-gradient(180deg,rgba(255,255,255,.2) 0%,transparent 55%)"}}/></div></div>;}
function XPPopup({n,v}){if(!v)return null;return <div style={{position:"fixed",top:"42%",left:"50%",fontSize:48,fontWeight:900,color:"#FFC800",textShadow:"0 0 30px rgba(255,200,0,.5),0 4px 10px rgba(0,0,0,.4)",animation:"xpPop 1.2s ease-out forwards",zIndex:9998,pointerEvents:"none",fontFamily:"'Fredoka',sans-serif"}}>+{n} XP</div>;}
// ═══ LEAGUE SHIELD — Modern Duolingo-style 3D trophy ═══
function LeagueShield({color="#CD7F32",size=48,tier=0}){
  const C=[
    {main:"#8B6914",dark:"#5C4410",light:"#C49B40",glow:"#8B691444",gem:"#A07820",gemLight:"#D4B060"},
    {main:"#CD7F32",dark:"#8B5E23",light:"#E8B870",glow:"#CD7F3244",gem:"#D4944A",gemLight:"#F0C880"},
    {main:"#FFC800",dark:"#CC9900",light:"#FFE066",glow:"#FFC80044",gem:"#FFD633",gemLight:"#FFF0A0"},
    {main:"#E8E4D9",dark:"#B0A898",light:"#FFF8F0",glow:"#E8E4D944",gem:"#F5F0E8",gemLight:"#FFFFFF"},
    {main:"#9966CC",dark:"#6B3FA0",light:"#CC99FF",glow:"#9966CC44",gem:"#AA77DD",gemLight:"#DDC0FF"},
    {main:"#4A4A5A",dark:"#2A2A35",light:"#6A6A7A",glow:"#4A4A5A44",gem:"#3A3A48",gemLight:"#5A5A6A"},
    {main:"#40D8F0",dark:"#1890B8",light:"#90F0FF",glow:"#40D8F066",gem:"#60E8FF",gemLight:"#D0FAFF"},
  ][tier]||{main:color,dark:color,light:color,glow:color+"44",gem:color,gemLight:"#fff"};
  const uid=`lg${tier}${size}${Math.random().toString(36).slice(2,6)}`;
  const isDiamond=tier===6;

  return <svg viewBox="0 0 120 155" width={size} height={size*1.29} style={{display:"block",overflow:"visible"}}>
    <defs>
      <linearGradient id={`${uid}m`} x1="0" y1="0" x2=".2" y2="1"><stop offset="0%" stopColor={C.light}/><stop offset="45%" stopColor={C.main}/><stop offset="100%" stopColor={C.dark}/></linearGradient>
      <linearGradient id={`${uid}g`} x1=".1" y1="0" x2=".9" y2="1"><stop offset="0%" stopColor={C.gemLight}/><stop offset="35%" stopColor={C.gem}/><stop offset="100%" stopColor={C.dark}/></linearGradient>
      <linearGradient id={`${uid}b`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C8D0D8"/><stop offset="100%" stopColor="#8890A0"/></linearGradient>
      <linearGradient id={`${uid}b2`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#A0A8B8"/><stop offset="100%" stopColor="#707080"/></linearGradient>
      <filter id={`${uid}s`}><feDropShadow dx="0" dy="2.5" stdDeviation="3.5" floodColor={C.dark} floodOpacity=".4"/></filter>
      {isDiamond&&<>
        <linearGradient id={`${uid}rain`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FF6B8A" stopOpacity=".18"/><stop offset="25%" stopColor="#FFC800" stopOpacity=".15"/><stop offset="50%" stopColor="#58CC02" stopOpacity=".12"/><stop offset="75%" stopColor="#1CB0F6" stopOpacity=".18"/><stop offset="100%" stopColor="#CE82FF" stopOpacity=".15"/></linearGradient>
        <linearGradient id={`${uid}ice`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFFFFF" stopOpacity=".35"/><stop offset="50%" stopColor="#90F0FF" stopOpacity=".15"/><stop offset="100%" stopColor="#40D8F0" stopOpacity=".05"/></linearGradient>
        <filter id={`${uid}dg`}><feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#40D8F0" floodOpacity=".5"/><feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#1890B8" floodOpacity=".35"/></filter>
      </>}
    </defs>
    <g filter={isDiamond?`url(#${uid}dg)`:`url(#${uid}s)`}>
      {/* ═══ Outer shell ═══ */}
      <path d="M60 5 C72 3 88 8 100 18 Q110 28 112 44 L112 58 Q112 78 98 92 L72 112 Q60 122 48 112 L22 92 Q8 78 8 58 L8 44 Q10 28 20 18 C32 8 48 3 60 5Z" fill={C.dark}/>
      {/* Main shield face */}
      <path d="M60 9 C70 7 84 12 95 20 Q104 28 106 42 L106 56 Q106 74 94 86 L70 106 Q60 114 50 106 L26 86 Q14 74 14 56 L14 42 Q16 28 25 20 C36 12 50 7 60 9Z" fill={`url(#${uid}m)`}/>
      {/* Crown bumps at top */}
      <ellipse cx="38" cy="12" rx="10" ry="8" fill={C.main}/>
      <ellipse cx="60" cy="7" rx="12" ry="9" fill={C.light} opacity=".85"/>
      <ellipse cx="82" cy="12" rx="10" ry="8" fill={C.main}/>
      {/* Diamond: extra shimmer on crown bumps */}
      {isDiamond&&<><ellipse cx="60" cy="7" rx="10" ry="7" fill="#fff" opacity=".25"/><ellipse cx="38" cy="12" rx="6" ry="4" fill="#fff" opacity=".12"/><ellipse cx="82" cy="12" rx="6" ry="4" fill="#fff" opacity=".12"/></>}
      {/* Inner recessed area */}
      <path d="M60 22 C68 20 80 24 88 32 Q94 38 94 48 L94 58 Q94 72 84 82 L68 94 Q60 100 52 94 L36 82 Q26 72 26 58 L26 48 Q26 38 32 32 C40 24 52 20 60 22Z" fill="rgba(0,0,0,.18)"/>
      {/* ═══ Inner gem ═══ */}
      <path d="M60 26 C66 24 76 28 84 34 Q88 38 88 46 L88 56 Q88 68 80 78 L66 88 Q60 92 54 88 L40 78 Q32 68 32 56 L32 46 Q32 38 36 34 C44 28 54 24 60 26Z" fill={`url(#${uid}g)`}/>
      {/* Diamond: rainbow prismatic overlay on gem */}
      {isDiamond&&<path d="M60 26 C66 24 76 28 84 34 Q88 38 88 46 L88 56 Q88 68 80 78 L66 88 Q60 92 54 88 L40 78 Q32 68 32 56 L32 46 Q32 38 36 34 C44 28 54 24 60 26Z" fill={`url(#${uid}rain)`}/>}
      {/* Diamond: ice glaze overlay */}
      {isDiamond&&<path d="M60 26 C66 24 76 28 84 34 Q88 38 88 46 L88 56 Q88 68 80 78 L66 88 Q60 92 54 88 L40 78 Q32 68 32 56 L32 46 Q32 38 36 34 C44 28 54 24 60 26Z" fill={`url(#${uid}ice)`}/>}
      {/* Facet lines — diamond cut */}
      <polygon points="60,30 82,54 60,82 38,54" fill="#fff" opacity={isDiamond?".14":".1"}/>
      <polygon points="60,30 70,42 60,56 50,42" fill="#fff" opacity={isDiamond?".3":".22"}/>
      <polygon points="50,42 60,56 38,54" fill="#fff" opacity={isDiamond?".1":".07"}/>
      <polygon points="70,42 82,54 60,56" fill="#fff" opacity={isDiamond?".08":".05"}/>
      <line x1="38" y1="54" x2="82" y2="54" stroke="#fff" strokeWidth=".7" opacity=".12"/>
      <line x1="60" y1="56" x2="60" y2="82" stroke="#fff" strokeWidth=".5" opacity=".06"/>
      {/* Diamond: extra refraction lines for brilliant cut look */}
      {isDiamond&&<>
        <line x1="44" y1="34" x2="60" y2="56" stroke="#fff" strokeWidth=".6" opacity=".1"/>
        <line x1="76" y1="34" x2="60" y2="56" stroke="#fff" strokeWidth=".6" opacity=".1"/>
        <line x1="38" y1="54" x2="54" y2="88" stroke="#fff" strokeWidth=".4" opacity=".06"/>
        <line x1="82" y1="54" x2="66" y2="88" stroke="#fff" strokeWidth=".4" opacity=".06"/>
        <polygon points="60,30 52,42 60,38 68,42" fill="#fff" opacity=".18"/>
        <polygon points="38,54 50,56 42,66" fill="#90F0FF" opacity=".08"/>
        <polygon points="82,54 70,56 78,66" fill="#CE82FF" opacity=".06"/>
        <polygon points="60,56 50,68 60,82 70,68" fill="#fff" opacity=".06"/>
      </>}
      {/* Shine highlights */}
      <ellipse cx="48" cy="38" rx="14" ry="16" fill="#fff" opacity={isDiamond?".22":".15"} transform="rotate(-18 48 38)"/>
      <ellipse cx="46" cy="34" rx="6" ry="7" fill="#fff" opacity={isDiamond?".35":".25"} transform="rotate(-12 46 34)"/>
      {/* Diamond: extra sparkle dots */}
      {isDiamond&&<>
        <circle cx="70" cy="40" r="1.8" fill="#fff" opacity=".5"/><circle cx="72" cy="42" r=".8" fill="#fff" opacity=".3"/>
        <circle cx="52" cy="70" r="1.5" fill="#fff" opacity=".35"/><circle cx="68" cy="64" r="1.2" fill="#fff" opacity=".3"/>
        <circle cx="44" cy="52" r="1" fill="#90F0FF" opacity=".4"/><circle cx="76" cy="50" r="1" fill="#CE82FF" opacity=".3"/>
        <circle cx="60" cy="42" r="2" fill="#fff" opacity=".2"/><circle cx="56" cy="78" r="1" fill="#FFC800" opacity=".15"/>
        <circle cx="38" cy="62" r="1.2" fill="#FF6B8A" opacity=".2"/><circle cx="78" cy="72" r="1" fill="#58CC02" opacity=".15"/>
      </>}
      {/* Diamond: animated shimmer sweep across gem */}
      {isDiamond&&<>
        <clipPath id={`${uid}clip`}><path d="M60 26 C66 24 76 28 84 34 Q88 38 88 46 L88 56 Q88 68 80 78 L66 88 Q60 92 54 88 L40 78 Q32 68 32 56 L32 46 Q32 38 36 34 C44 28 54 24 60 26Z"/></clipPath>
        <g clipPath={`url(#${uid}clip)`}>
          <rect x="-30" y="20" width="20" height="80" rx="10" fill="url(#${uid}ice)" style={{animation:"diamondShimmer 3s ease-in-out infinite"}}/>
        </g>
      </>}
      {/* Outer edge highlight */}
      <path d="M60 11 C70 9 84 14 94 22 Q102 30 104 44" fill="none" stroke="#fff" strokeWidth={isDiamond?"2.5":"1.8"} opacity={isDiamond?".2":".12"} strokeLinecap="round"/>
      {/* Diamond: second edge highlight on other side */}
      {isDiamond&&<path d="M60 11 C50 9 36 14 26 22 Q18 30 16 44" fill="none" stroke="#fff" strokeWidth="1.5" opacity=".1" strokeLinecap="round"/>}
      {/* ═══ Diamond: triple golden star crown ═══ */}
      {isDiamond&&<>
        <g transform="translate(60,-2)">
          <polygon points="0,-5 2,0 6,0 3,3 4,7 0,5 -4,7 -3,3 -6,0 -2,0" fill="#FFC800" opacity=".9"/>
          <polygon points="0,-3 1.2,0 3.5,0 2,1.8 2.5,4 0,2.8 -2.5,4 -2,1.8 -3.5,0 -1.2,0" fill="#FFE866" opacity=".6"/>
        </g>
        <g transform="translate(44,2)">
          <polygon points="0,-3.5 1.4,0 4,0 2,2 2.8,5 0,3.5 -2.8,5 -2,2 -4,0 -1.4,0" fill="#FFC800" opacity=".7"/>
          <polygon points="0,-2 .8,0 2.5,0 1.2,1.2 1.6,3 0,2 -1.6,3 -1.2,1.2 -2.5,0 -.8,0" fill="#FFE866" opacity=".45"/>
        </g>
        <g transform="translate(76,2)">
          <polygon points="0,-3.5 1.4,0 4,0 2,2 2.8,5 0,3.5 -2.8,5 -2,2 -4,0 -1.4,0" fill="#FFC800" opacity=".7"/>
          <polygon points="0,-2 .8,0 2.5,0 1.2,1.2 1.6,3 0,2 -1.6,3 -1.2,1.2 -2.5,0 -.8,0" fill="#FFE866" opacity=".45"/>
        </g>
      </>}
      {/* ═══ Stem ═══ */}
      <path d="M50 108 L50 118 Q50 122 54 122 L66 122 Q70 122 70 118 L70 108" fill={isDiamond?"#88D0E8":"#A8B0C0"}/>
      <rect x="53" y="110" width="14" height="4" rx="2" fill={isDiamond?"#B0E8FF":"#C8D0D8"} opacity=".5"/>
      {isDiamond&&<rect x="55" y="112" width="10" height="2" rx="1" fill="#fff" opacity=".15"/>}
      {/* ═══ Pedestal ═══ */}
      <path d="M36 122 L84 122 L88 130 Q88 134 84 134 L36 134 Q32 134 32 130 Z" fill={isDiamond?`url(#${uid}b)`:`url(#${uid}b)`}/>
      {isDiamond&&<path d="M36 122 L84 122 L88 130 Q88 134 84 134 L36 134 Q32 134 32 130 Z" fill="rgba(64,216,240,.08)"/>}
      <rect x="38" y="124" width="44" height="3" rx="1.5" fill={isDiamond?"#B0E8FF":"#D8E0E8"} opacity=".35"/>
      <path d="M30 134 L90 134 L92 141 Q92 144 90 144 L30 144 Q28 144 28 141 Z" fill={`url(#${uid}b2)`}/>
      {isDiamond&&<path d="M30 134 L90 134 L92 141 Q92 144 90 144 L30 144 Q28 144 28 141 Z" fill="rgba(64,216,240,.06)"/>}
      <rect x="34" y="136" width="52" height="2.5" rx="1.2" fill="#9098A8" opacity=".25"/>
      <rect x="52" y="138" width="16" height="4" rx="2" fill="#686878" opacity=".4"/>
      {/* Diamond: larger gem inlaid in pedestal + side gems */}
      {isDiamond&&<>
        <polygon points="60,136 64,140 60,144 56,140" fill="#40D8F0" opacity=".45"/>
        <polygon points="60,137 62.5,140 60,143 57.5,140" fill="#90F0FF" opacity=".35"/>
        <polygon points="60,138.5 61,140 60,141.5 59,140" fill="#fff" opacity=".3"/>
        <circle cx="42" cy="140" r="1.5" fill="#40D8F0" opacity=".2"/><circle cx="78" cy="140" r="1.5" fill="#40D8F0" opacity=".2"/>
      </>}
    </g>
  </svg>;
}

function StreakBadge({streak}){return <div style={{display:"flex",alignItems:"center",gap:4,padding:"4px 10px",background:"linear-gradient(135deg,#FF9600,#FF4B4B)",borderRadius:16,color:"#fff",fontWeight:800,fontSize:13,fontFamily:"'Fredoka',sans-serif",boxShadow:"0 2px 8px rgba(255,75,75,.3)"}}><span style={{fontSize:14,animation:streak>0?"flame .6s ease-in-out infinite alternate":"none"}}>🔥</span>{streak}</div>;}

// ═══ TAP-TO-TRANSLATE WORD COMPONENT ═══
function TapText({text,dict,style={},wordStyle={}}){
  const[tip,setTip]=useState(null);const[tipPos,setTipPos]=useState({x:0,y:0});const tipTimer=useRef(null);
  function handleTap(word,e){
    const clean=word.toLowerCase().replace(/[.,!?¿¡'":;()]/g,"").trim();
    if(clean.length<1)return;
    const entry=dict[clean];
    if(!entry)return;
    const meaning=typeof entry==="string"?entry:entry.meaning;
    const spell=typeof entry==="object"?entry.spell:clean;
    const rect=e.target.getBoundingClientRect();
    setTipPos({x:Math.min(Math.max(rect.left+rect.width/2,80),window.innerWidth-80),y:rect.top-8});
    setTip({word:spell||clean,meaning});
    if(tipTimer.current)clearTimeout(tipTimer.current);
    tipTimer.current=setTimeout(()=>setTip(null),3000);
  }
  const words=(text||"").split(/(\s+)/);
  return <span style={{...style,position:"relative"}}>
    {words.map((w,i)=>{
      if(/^\s+$/.test(w))return <span key={i}>{w}</span>;
      const clean=w.toLowerCase().replace(/[.,!?¿¡'":;()]/g,"").trim();
      const hasMeaning=clean.length>=1&&dict[clean];
      return <span key={i} onClick={hasMeaning?(e)=>{e.stopPropagation();handleTap(w,e);}:undefined}
        style={{...wordStyle,cursor:hasMeaning?"pointer":"default",
          borderBottom:hasMeaning?"1.5px dashed rgba(255,255,255,.2)":"none",
          paddingBottom:hasMeaning?1:0,transition:"all .2s",
          borderRadius:2}}>
        {w}
      </span>;
    })}
    {/* Tooltip — shows word spelling + meaning */}
    {tip&&<div style={{position:"fixed",left:tipPos.x,top:tipPos.y,transform:"translate(-50%,-100%)",
      padding:"10px 16px",borderRadius:14,background:"linear-gradient(135deg,#1e2a3a,#1a1a2e)",
      border:"1.5px solid rgba(28,176,246,.3)",boxShadow:"0 8px 24px rgba(0,0,0,.5)",
      zIndex:999,animation:"bounceIn .25s ease",pointerEvents:"none",maxWidth:260,textAlign:"left"}}>
      <div style={{fontSize:15,fontWeight:900,color:"#fff",fontFamily:"'Fredoka',sans-serif",marginBottom:3}}>{tip.word}</div>
      <div style={{fontSize:12,fontWeight:700,color:"#1CB0F6"}}>{tip.meaning}</div>
      <div style={{position:"absolute",bottom:-5,left:"50%",transform:"translateX(-50%)",width:10,height:10,background:"#1a1a2e",border:"1.5px solid rgba(28,176,246,.3)",borderTop:"none",borderLeft:"none",rotate:"45deg"}}/>
    </div>}
  </span>;
}

function MatchExercise({pairs,onComplete,dict={}}){const[sel,setSel]=useState(null);const[matched,setMatched]=useState([]);const[wrongPair,setWrongPair]=useState(null);const busyRef=useRef(false);const[shuffled]=useState(()=>[...pairs.map(p=>p[1])].sort(()=>Math.random()-.5));const[,bump]=useState(0);
  function tap(item,side){if(busyRef.current||matched.includes(item))return;if(!sel){setSel({item,side});return;}if(sel.side===side){setSel({item,side});return;}const left=side==="left"?item:sel.item,right=side==="right"?item:sel.item;const norm=s=>(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim();if(pairs.some(p=>norm(p[0])===norm(left)&&norm(p[1])===norm(right))){const nm=[...matched,left,right];setMatched(nm);setSel(null);if(nm.length>=pairs.length*2){busyRef.current=true;setTimeout(()=>onComplete(),500);}}else{busyRef.current=true;setWrongPair([left,right]);bump(n=>n+1);setTimeout(()=>{setWrongPair(null);setSel(null);busyRef.current=false;bump(n=>n+1);},600);}}
  function sty(item,side){const m=matched.includes(item),s=sel?.item===item&&sel?.side===side,w=wrongPair?.includes(item);let bg="rgba(255,255,255,.04)",bd="rgba(255,255,255,.1)";if(m){bg="rgba(120,200,0,.12)";bd="#78C800";}else if(w){bg="rgba(255,75,75,.12)";bd="#FF4B4B";}else if(s){bg="rgba(28,176,246,.1)";bd="#1CB0F6";}return {padding:"12px",borderRadius:14,border:`2.5px solid ${bd}`,backgroundColor:bg,color:"#fff",fontSize:14,fontWeight:700,cursor:m?"default":"pointer",transition:"all .25s cubic-bezier(.4,2,.6,1)",transform:w?"scale(.96)":s?"scale(1.04)":"scale(1)",opacity:m?.45:1,userSelect:"none",animation:w?"shake .4s ease":"none"};}
  return <div><p style={{fontSize:15,fontWeight:800,marginBottom:14,color:"rgba(255,255,255,.6)",textAlign:"center",fontFamily:"'Fredoka',sans-serif"}}>Tap the matching pairs</p><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,maxWidth:400,margin:"0 auto"}}><div style={{display:"flex",flexDirection:"column",gap:7}}>{pairs.map(([l],i)=><button key={l} onClick={()=>tap(l,"left")} style={{...sty(l,"left"),animation:`slideL .3s ease ${i*.05}s both`}}><TapText text={l} dict={dict}/>{matched.includes(l)&&" ✓"}</button>)}</div><div style={{display:"flex",flexDirection:"column",gap:7}}>{shuffled.map((r,i)=><button key={r} onClick={()=>tap(r,"right")} style={{...sty(r,"right"),animation:`slideR .3s ease ${i*.05}s both`}}><TapText text={r} dict={dict}/>{matched.includes(r)&&" ✓"}</button>)}</div></div></div>;}

function ScrambleExercise({word,hint,display,onComplete}){const letters=display.split(" ").filter(Boolean);const[placed,setPlaced]=useState([]);const[available,setAvailable]=useState(letters.map((l,i)=>({letter:l,id:i})));const[wrong,setWrong]=useState(false);const busyRef=useRef(false);const[,bump]=useState(0);
  function tapL(item){if(busyRef.current)return;const np=[...placed,item];setPlaced(np);setAvailable(prev=>prev.filter(a=>a.id!==item.id));if(np.length===letters.length){const attempt=np.map(p=>p.letter).join("");if(attempt.toUpperCase()===word.toUpperCase()){busyRef.current=true;setTimeout(()=>onComplete(true),400);}else{busyRef.current=true;setWrong(true);bump(n=>n+1);setTimeout(()=>{setPlaced([]);setAvailable(letters.map((l,i)=>({letter:l,id:i})));setWrong(false);busyRef.current=false;bump(n=>n+1);},800);}}}
  function removeL(item){if(busyRef.current)return;setPlaced(prev=>prev.filter(p=>p.id!==item.id));setAvailable(prev=>[...prev,item]);}
  return <div style={{textAlign:"center"}}><p style={{fontSize:15,fontWeight:800,marginBottom:4,color:"rgba(255,255,255,.6)",fontFamily:"'Fredoka',sans-serif"}}>🧩 Unscramble the word</p><p style={{fontSize:12,color:"rgba(255,255,255,.3)",marginBottom:18}}>💡 {hint}</p>
    <div style={{display:"flex",justifyContent:"center",gap:5,marginBottom:20,minHeight:48}}>{letters.map((_,i)=>{const p=placed[i];return <div key={i} onClick={()=>p&&removeL(p)} style={{width:38,height:44,borderRadius:10,border:`2.5px ${p?"solid":"dashed"} ${wrong?"#FF4B4B":p?"#1CB0F6":"rgba(255,255,255,.12)"}`,background:wrong?"rgba(255,75,75,.08)":p?"rgba(28,176,246,.06)":"rgba(255,255,255,.02)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:900,color:"#fff",fontFamily:"'Fredoka',sans-serif",cursor:p?"pointer":"default",transition:"all .2s",animation:wrong?"shake .4s ease":p?`popIn .2s ease ${i*.04}s both`:"none"}}>{p?.letter||""}</div>;})}</div>
    <div style={{display:"flex",justifyContent:"center",gap:7,flexWrap:"wrap"}}>{available.map((item,i)=><button key={item.id} onClick={()=>tapL(item)} style={{width:42,height:48,borderRadius:12,border:"none",background:"linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.03))",color:"#fff",fontSize:18,fontWeight:900,cursor:"pointer",fontFamily:"'Fredoka',sans-serif",boxShadow:"0 3px 0 rgba(255,255,255,.06)",transition:"all .15s",userSelect:"none",animation:`tileAppear .25s ease ${i*.05}s both`}}>{item.letter}</button>)}</div></div>;}

function SpeakExercise({phrase,meaning,langCode,onComplete,dict={}}){
  const[mode,setMode]=useState("type"); // "type"|"mic"|"listening"|"heard"|"checked"
  const[typedVal,setTypedVal]=useState("");
  const[transcript,setTranscript]=useState("");
  const[micErr,setMicErr]=useState("");
  const recRef=useRef(null);
  const busyRef=useRef(false);
  const F="'Fredoka',sans-serif";

  function checkInput(input){
    if(busyRef.current||!input.trim())return;
    busyRef.current=true;
    const sc=speakMatch(input,phrase);
    setTimeout(()=>{onComplete(sc>=0.5,input);busyRef.current=false;},250);
  }

  function tryMic(){
    setMicErr("");
    const SR=typeof window!=="undefined"&&(window.SpeechRecognition||window.webkitSpeechRecognition);
    if(!SR){setMicErr("Speech recognition not supported in this browser");return;}
    try{
      const rec=new SR();rec.lang=langCode||"es-ES";rec.interimResults=true;rec.continuous=false;
      recRef.current=rec;setMode("listening");setTranscript("");
      rec.onresult=e=>{let t="";for(let i=0;i<e.results.length;i++)t+=e.results[i][0].transcript;setTranscript(t);};
      rec.onerror=e=>{
        const msg=e.error==="not-allowed"?"Microphone blocked by browser. Use the text input below."
          :e.error==="service-not-available"?"Speech service unavailable. Type your answer instead."
          :"Mic error: "+e.error+". Try typing instead.";
        setMicErr(msg);setMode("type");
      };
      rec.onend=()=>{setMode(m=>m==="listening"?"heard":m);};
      rec.start();
    }catch(err){setMicErr("Cannot access microphone here. Type your answer instead.");setMode("type");}
  }

  function stopMic(){if(recRef.current)try{recRef.current.stop();}catch(e){}setMode("heard");}

  return <div style={{textAlign:"center",animation:"fadeUp .35s ease"}}>
    <p style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:2,marginBottom:6,fontFamily:F}}>Say this phrase</p>
    <div style={{padding:"18px 20px",borderRadius:18,background:"linear-gradient(145deg,rgba(28,176,246,.06),rgba(28,176,246,.02))",border:"2px solid rgba(28,176,246,.12)",marginBottom:6,animation:"bounceIn .4s ease"}}>
      <button onClick={()=>ttsSpeak(phrase,langCode)} style={{fontSize:26,background:"none",border:"none",cursor:"pointer",padding:2,marginBottom:4}}>🔊</button>
      <p style={{fontSize:26,fontWeight:900,fontFamily:F,color:"#fff",lineHeight:1.4}}><TapText text={phrase} dict={dict}/></p>
    </div>
    <p style={{fontSize:12,color:"rgba(255,255,255,.35)",marginBottom:16}}>({meaning}) — Tap 🔊 to hear</p>

    {/* ── Type mode (primary) ── */}
    {mode==="type"&&(<div style={{animation:"fadeUp .3s ease"}}>
      <div style={{display:"flex",gap:8,maxWidth:380,margin:"0 auto"}}>
        <input value={typedVal} onChange={e=>setTypedVal(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter")checkInput(typedVal);}}
          placeholder="Type the phrase here..." autoFocus
          style={{flex:1,padding:"14px 16px",borderRadius:12,border:"2px solid rgba(255,255,255,.15)",background:"rgba(255,255,255,.04)",color:"#fff",fontSize:15,fontWeight:700}}/>
        <button onClick={()=>checkInput(typedVal)} disabled={!typedVal.trim()} style={{padding:"14px 24px",borderRadius:12,border:"none",background:typedVal.trim()?"#58CC02":"#333",color:"#fff",fontSize:14,fontWeight:800,cursor:typedVal.trim()?"pointer":"default",boxShadow:typedVal.trim()?"0 3px 0 #458200":"none",transition:"all .2s"}}>Check</button>
      </div>
      <button onClick={tryMic} style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:14,padding:"8px 16px",borderRadius:10,border:"1.5px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.03)",color:"rgba(255,255,255,.5)",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all .2s"}}>
        <span style={{fontSize:16}}>🎤</span> Try microphone instead
      </button>
      {micErr&&<p style={{fontSize:11,color:"#FF9600",marginTop:10,maxWidth:340,margin:"10px auto 0",lineHeight:1.4}}>{micErr}</p>}
    </div>)}

    {/* ── Mic listening ── */}
    {mode==="listening"&&(<div style={{animation:"fadeUp .3s ease"}}>
      <div style={{position:"relative",display:"inline-block",marginBottom:8}}>
        <div style={{position:"absolute",inset:-12,borderRadius:"50%",border:"3px solid #FF4B4B",animation:"micWave 1.5s ease-out infinite",opacity:.4}}/>
        <button onClick={stopMic} style={{width:76,height:76,borderRadius:"50%",border:"none",background:"radial-gradient(circle at 40% 35%,#FF4B4Bdd,#FF4B4B)",color:"#fff",fontSize:30,cursor:"pointer",animation:"micPulse 1.5s ease-in-out infinite",position:"relative",zIndex:1,display:"inline-flex",alignItems:"center",justifyContent:"center"}}>⏹️</button>
      </div>
      <p style={{fontSize:12,color:"#FF4B4B",fontWeight:700,animation:"pulse 1s ease-in-out infinite"}}>Listening... tap ⏹️ when done</p>
      {transcript&&<div style={{marginTop:12,padding:"10px 16px",borderRadius:12,background:"rgba(255,255,255,.03)",border:"1.5px solid rgba(255,255,255,.08)",display:"inline-block"}}><p style={{fontSize:10,color:"rgba(255,255,255,.3)"}}>Hearing:</p><p style={{fontSize:16,fontWeight:800,color:"#fff",fontFamily:F}}>{transcript}</p></div>}
      <div><button onClick={()=>{stopMic();setMode("type");}} style={{background:"none",border:"none",color:"rgba(255,255,255,.25)",fontSize:10,cursor:"pointer",marginTop:10}}>Cancel & type instead</button></div>
    </div>)}

    {/* ── Mic heard result ── */}
    {mode==="heard"&&(<div style={{animation:"fadeUp .3s ease"}}>
      {transcript?(<div>
        <div style={{padding:"12px 18px",borderRadius:14,background:"rgba(255,255,255,.04)",border:"1.5px solid rgba(255,255,255,.1)",display:"inline-block",marginBottom:14}}>
          <p style={{fontSize:10,color:"rgba(255,255,255,.35)",marginBottom:2}}>You said:</p>
          <p style={{fontSize:20,fontWeight:900,color:"#fff",fontFamily:F}}>{transcript}</p>
        </div>
        <div><button onClick={()=>checkInput(transcript)} style={{padding:"14px 40px",borderRadius:14,border:"none",background:"#58CC02",color:"#fff",fontSize:16,fontWeight:800,cursor:"pointer",fontFamily:F,boxShadow:"0 4px 0 #458200"}}>Check</button></div>
        <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:12}}>
          <button onClick={tryMic} style={{background:"none",border:"none",color:"rgba(255,255,255,.3)",fontSize:11,cursor:"pointer"}}>🎤 Try again</button>
          <button onClick={()=>setMode("type")} style={{background:"none",border:"none",color:"rgba(255,255,255,.3)",fontSize:11,cursor:"pointer"}}>⌨️ Type instead</button>
        </div>
      </div>):(<div>
        <p style={{fontSize:13,color:"rgba(255,255,255,.4)",marginBottom:12}}>Didn't catch anything. Try again or type it.</p>
        <div style={{display:"flex",gap:10,justifyContent:"center"}}>
          <button onClick={tryMic} style={{padding:"10px 20px",borderRadius:10,border:"1.5px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.03)",color:"rgba(255,255,255,.5)",fontSize:12,fontWeight:700,cursor:"pointer"}}>🎤 Retry</button>
          <button onClick={()=>setMode("type")} style={{padding:"10px 20px",borderRadius:10,border:"1.5px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.03)",color:"rgba(255,255,255,.5)",fontSize:12,fontWeight:700,cursor:"pointer"}}>⌨️ Type it</button>
        </div>
      </div>)}
    </div>)}
  </div>;}


// ═══════════════════ MAIN APP ═══════════════════
const NODE_OFFSETS=[0,36,56,36,0,-36,-56,-36];

export default function LinguaQuest(){
  const[screen,setScreen]=useState("home");const[lang,setLang]=useState(null);const[lesson,setLesson]=useState(null);const[exIdx,setExIdx]=useState(0);
  const[lives,setLives]=useState(5);const[score,setScore]=useState(0);const[complete,setComplete]=useState(false);
  const[picked,setPicked]=useState(null);const[result,setResult]=useState(null);const[fillVal,setFillVal]=useState("");const[charMsg,setCharMsg]=useState("");
  const[xp,setXp]=useState(0);const[streak,setStreak]=useState(3);const[level,setLevel]=useState(1);const[done,setDone]=useState({});
  const[confetti,setConfetti]=useState(false);const[xpPop,setXpPop]=useState({n:0,v:false});const lockedRef=useRef(false);

  // ═══ AVATAR SYSTEM ═══
  const AVATARS=[
    {id:0,name:"Owl",emoji:"🦉",bg:"#58CC02"},
    {id:1,name:"Bear",emoji:"🐻",bg:"#FF9600"},
    {id:2,name:"Fox",emoji:"🦊",bg:"#FF4B4B"},
    {id:3,name:"Penguin",emoji:"🐧",bg:"#1CB0F6"},
    {id:4,name:"Cat",emoji:"🐱",bg:"#CE82FF"},
    {id:5,name:"Dog",emoji:"🐶",bg:"#FFC800"},
    {id:6,name:"Panda",emoji:"🐼",bg:"#78C800"},
    {id:7,name:"Rabbit",emoji:"🐰",bg:"#FF6B8A"},
    {id:8,name:"Lion",emoji:"🦁",bg:"#FF9600"},
    {id:9,name:"Koala",emoji:"🐨",bg:"#8890A0"},
    {id:10,name:"Tiger",emoji:"🐯",bg:"#FFC800"},
    {id:11,name:"Dragon",emoji:"🐉",bg:"#58CC02"},
  ];
  const[avatarId,setAvatarId]=useState(0);
  const[showAvatarPicker,setShowAvatarPicker]=useState(false);

  // ═══ LEAGUE WEEK TIMER ═══
  const[leagueWeekStart,setLeagueWeekStart]=useState(()=>Date.now());
  const LEAGUE_WEEK_MS=6*24*60*60*1000; // 6 days in ms
  const[leagueTimeLeft,setLeagueTimeLeft]=useState("");

  // ═══ TABS & NAVIGATION ═══
  const[activeTab,setActiveTab]=useState("learn"); // learn|leagues|quests|profile|progress
  const[lessonsCompleted,setLessonsCompleted]=useState(0);

  // ═══ RAMP-UP CHALLENGE — 566 XP per lesson while stopwatch runs ═══
  const RAMPUP_XP=566;
  const[rampUpActive,setRampUpActive]=useState(false);
  const[rampUpStart,setRampUpStart]=useState(0);
  const[rampUpElapsed,setRampUpElapsed]=useState("00:00");
  const[rampUpLessons,setRampUpLessons]=useState(0);
  const[rampUpXpEarned,setRampUpXpEarned]=useState(0);
  const rampUpTimerRef=useRef(null);

  function startRampUp(){
    setRampUpActive(true);setRampUpStart(Date.now());setRampUpLessons(0);setRampUpXpEarned(0);setRampUpElapsed("00:00");
  }
  function stopRampUp(){
    setRampUpActive(false);if(rampUpTimerRef.current)clearInterval(rampUpTimerRef.current);
  }

  useEffect(()=>{
    if(rampUpActive){
      rampUpTimerRef.current=setInterval(()=>{
        const s=Math.floor((Date.now()-rampUpStart)/1000);
        const m=Math.floor(s/60),sec=s%60;
        setRampUpElapsed(`${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`);
      },1000);
      return()=>clearInterval(rampUpTimerRef.current);
    }
  },[rampUpActive,rampUpStart]);

  // ═══ LEAGUES ═══
  const LEAGUES=[
    {name:"Wood",icon:"🪵",color:"#8B6914",min:0,max:149,tier:0},
    {name:"Bronze",icon:"🥉",color:"#CD7F32",min:150,max:499,tier:1},
    {name:"Gold",icon:"🥇",color:"#FFC800",min:500,max:999,tier:2},
    {name:"Pearl",icon:"🤍",color:"#E8E4D9",min:1000,max:1999,tier:3},
    {name:"Amethyst",icon:"💜",color:"#9966CC",min:2000,max:4499,tier:4},
    {name:"Obsidian",icon:"🖤",color:"#3D3D3D",min:4500,max:7999,tier:5},
    {name:"Diamond",icon:"💎",color:"#B9F2FF",min:8000,max:99999,tier:6},
  ];
  const[leagueIdx,setLeagueIdx]=useState(0);
  // Generate 29 fake competitors for the leaderboard
  const[leaguePlayers]=useState(()=>{
    const names=["Emma","Liam","Sofia","Noah","Mia","Oliver","Ava","Lucas","Yuki","Kenji","Priya","Arjun","Min-jun","Ji-won","Carlos","Maria","Pierre","Léa","Hans","Elke","Marco","Giulia","Paulo","Ana","Sato","Chen","Ali","Fatima","Kofi"];
    const flags=["🇺🇸","🇬🇧","🇫🇷","🇩🇪","🇯🇵","🇮🇳","🇰🇷","🇧🇷","🇮🇹","🇪🇸","🇨🇦","🇦🇺","🇲🇽","🇳🇬","🇹🇷","🇵🇱","🇸🇪","🇳🇱","🇹🇭","🇻🇳","🇵🇭","🇪🇬","🇦🇷","🇨🇴","🇨🇱","🇵🇪","🇮🇩","🇲🇾","🇿🇦"];
    const streaks=["3+ years","1+ year","6+ months","3+ months","1+ month","2+ years","4+ years","1+ year","6+ months","3+ months"];
    return names.map((n,i)=>({name:n,flag:flags[i%flags.length],xp:Math.floor(Math.random()*300+20),id:i,streak:streaks[i%streaks.length]}));
  });
  function getLeague(){return LEAGUES[leagueIdx]||LEAGUES[0];}
  function getLeagueProgress(){const li=leagueIdx;if(li>=LEAGUES.length-1)return 100;const lg=LEAGUES[li];return Math.min(100,Math.round((xp-lg.min)/(lg.max-lg.min+1)*100));}
  function getNextLeague(){return leagueIdx<LEAGUES.length-1?LEAGUES[leagueIdx+1]:null;}
  const[leagueAnim,setLeagueAnim]=useState(null); // {type:"promote"|"demote", from, to}
  function promoteLeague(){
    if(leagueIdx>=LEAGUES.length-1)return;
    const from=LEAGUES[leagueIdx],to=LEAGUES[leagueIdx+1];
    setLeagueIdx(p=>p+1);
    setLeagueAnim({type:"promote",from,to,toIdx:leagueIdx+1});
    playSound("correct");
    setTimeout(()=>setLeagueAnim(null),4000);
  }
  function demoteLeague(){
    if(leagueIdx<=0)return;
    const from=LEAGUES[leagueIdx],to=LEAGUES[leagueIdx-1];
    setLeagueIdx(p=>p-1);
    setLeagueAnim({type:"demote",from,to,toIdx:leagueIdx-1});
    playSound("wrong");
    setTimeout(()=>setLeagueAnim(null),3500);
  }

  // ═══ ACHIEVEMENTS ═══
  const ACHIEVEMENTS=[
    {id:"first_lesson",icon:"🌟",title:"First Steps",desc:"Complete your first lesson",check:()=>Object.keys(done).length>=1},
    {id:"five_lessons",icon:"📚",title:"Bookworm",desc:"Complete 5 lessons",check:()=>Object.keys(done).length>=5},
    {id:"ten_lessons",icon:"🎓",title:"Scholar",desc:"Complete 10 lessons",check:()=>Object.keys(done).length>=10},
    {id:"full_unit",icon:"🏆",title:"Unit Master",desc:"Complete all lessons in a unit",check:()=>units.some(u=>u.lessons.every(l=>done[`${lang?.id}-${l.id}`]))},
    {id:"all_lessons",icon:"👑",title:"Course Champion",desc:"Complete all 23 lessons",check:()=>isCourseComplete()},
    {id:"streak_5",icon:"🔥",title:"On Fire",desc:"Reach a 5-day streak",check:()=>streak>=5},
    {id:"streak_10",icon:"🔥",title:"Unstoppable",desc:"Reach a 10-day streak",check:()=>streak>=10},
    {id:"xp_500",icon:"💎",title:"XP Hunter",desc:"Earn 500 XP",check:()=>xp>=500},
    {id:"xp_2000",icon:"💎",title:"XP Legend",desc:"Earn 2000 XP",check:()=>xp>=2000},
    {id:"xp_5000",icon:"💎",title:"XP Master",desc:"Earn 5000 XP",check:()=>xp>=5000},
    {id:"level_5",icon:"⬆️",title:"Rising Star",desc:"Reach level 5",check:()=>level>=5},
    {id:"level_10",icon:"⬆️",title:"Veteran",desc:"Reach level 10",check:()=>level>=10},
    {id:"star_3",icon:"⭐",title:"Perfect Test",desc:"Get 3 stars on a level test",check:()=>Object.values(unitStars).some(s=>s===3)},
    {id:"all_stars",icon:"🌟",title:"Star Collector",desc:"Get stars on all level tests",check:()=>units.length>0&&units.every(u=>unitStars[`${lang?.id}-${u.unit}`]>0)},
    {id:"jump_pass",icon:"⏭️",title:"Skipper",desc:"Pass a jump test",check:()=>false}, // set manually
    {id:"daily_1",icon:"📅",title:"Daily Debut",desc:"Complete your first daily",check:()=>(dailyCount[lang?.id]||0)>=1},
    {id:"daily_10",icon:"📅",title:"Committed",desc:"Complete 10 daily challenges",check:()=>(dailyCount[lang?.id]||0)>=10},
    {id:"daily_20",icon:"🏅",title:"Graduate",desc:"Complete all 20 daily challenges",check:()=>(dailyCount[lang?.id]||0)>=20},
    {id:"wood",icon:"🪵",title:"Wood League",desc:"Reach Wood league",check:()=>leagueIdx>=0},
    {id:"bronze",icon:"🥉",title:"Bronze League",desc:"Reach Bronze league",check:()=>leagueIdx>=1},
    {id:"gold",icon:"🥇",title:"Gold League",desc:"Reach Gold league",check:()=>leagueIdx>=2},
    {id:"pearl",icon:"🤍",title:"Pearl League",desc:"Reach Pearl league",check:()=>leagueIdx>=3},
    {id:"amethyst",icon:"💜",title:"Amethyst League",desc:"Reach Amethyst league",check:()=>leagueIdx>=4},
    {id:"obsidian",icon:"🖤",title:"Obsidian League",desc:"Reach Obsidian league",check:()=>leagueIdx>=5},
    {id:"diamond",icon:"💎",title:"Diamond League",desc:"Reach Diamond league",check:()=>leagueIdx>=6},
  ];
  const[jumpPassed,setJumpPassed]=useState(false);

  // ═══ QUESTS ═══
  const QUESTS=[
    {id:"q1",icon:"📖",title:"Lesson Learner",desc:"Complete 1 lesson today",target:1,getCurrent:()=>lessonsCompleted,color:"#58CC02"},
    {id:"q2",icon:"💎",title:"XP Earner",desc:"Earn 50 XP today",target:50,getCurrent:()=>xp,color:"#FFC800"},
    {id:"q3",icon:"🎯",title:"Perfect Round",desc:"Get 100% on a lesson",target:100,getCurrent:()=>{const acc=exercises.length>0?Math.round(score/(exercises.length*10)*100):0;return complete&&result==="correct"?acc:0;},color:"#1CB0F6"},
    {id:"q4",icon:"🔥",title:"Streak Builder",desc:"Maintain a 3+ streak",target:3,getCurrent:()=>streak,color:"#FF9600"},
    {id:"q5",icon:"📚",title:"Study Session",desc:"Complete 3 lessons today",target:3,getCurrent:()=>lessonsCompleted,color:"#CE82FF"},
  ];

  // ═══ LEVEL TEST SYSTEM ═══
  const[unitStars,setUnitStars]=useState({}); // {"es-1": 3, "es-2": 2}
  const[isLevelTest,setIsLevelTest]=useState(false);
  const[testUnit,setTestUnit]=useState(null);

  // ═══ JUMP SYSTEM ═══
  const[isJumpTest,setIsJumpTest]=useState(false);
  const[jumpUnit,setJumpUnit]=useState(null);
  const[showJumpModal,setShowJumpModal]=useState(null); // holds the unit or null

  // ═══ ENERGY SYSTEM — UNLIMITED ═══
  const MAX_ENERGY=99;
  const[energy]=useState(99);
  const[isPractice,setIsPractice]=useState(false);
  const[showEnergyModal,setShowEnergyModal]=useState(false);
  const[nextRefill]=useState(null);
  const timerRef=useRef(null);
  function startRefillTimer(){}
  function refillOne(){}
  function getRefillText(){return"";}

  // ═══ DAILY CHALLENGE SYSTEM — 20 days max ═══
  const DAILY_MAX=20;
  const[dailyDone,setDailyDone]=useState({}); // {"es":"2026-03-18"}
  const[dailyCount,setDailyCount]=useState({}); // {"es":5} — how many days completed
  const[isDaily,setIsDaily]=useState(false);
  const[dailyTick,setDailyTick]=useState(0);
  const dailyTimerRef=useRef(null);

  function getTodayStr(){return new Date().toISOString().split("T")[0];}
  function isCourseComplete(){return lang&&allLessons.length>0&&allLessons.every(ls=>done[`${lang.id}-${ls.id}`]);}
  function getDaysLeft(){return lang?DAILY_MAX-(dailyCount[lang.id]||0):0;}
  function isDailyAvailable(){return isCourseComplete()&&getDaysLeft()>0&&dailyDone[lang.id]!==getTodayStr();}
  function isDailyCompleted(){return lang&&dailyDone[lang.id]===getTodayStr();}
  function isDailyExhausted(){return lang&&getDaysLeft()<=0;}
  const[showGrad,setShowGrad]=useState(false);

  function getDailyRefreshText(){
    const now=new Date();
    const tomorrow=new Date(now);tomorrow.setDate(tomorrow.getDate()+1);tomorrow.setHours(0,0,0,0);
    const diff=tomorrow-now;
    const h=Math.floor(diff/3600000);const m=Math.floor((diff%3600000)/60000);const s=Math.floor((diff%60000)/1000);
    return `${h}h ${m}m ${s}s`;
  }

  // Tick the daily timer every second when on path
  function startDailyTimer(){
    if(dailyTimerRef.current)clearInterval(dailyTimerRef.current);
    dailyTimerRef.current=setInterval(()=>setDailyTick(t=>t+1),1000);
  }

  function startDaily(){
    if(!isDailyAvailable())return;
    const allEx=allLessons.flatMap(l=>l.ex||[]);
    if(allEx.length===0)return;
    // Build 24 exercises: mix all types, shuffle, pick 24 (or all if less)
    const pool=[...allEx].sort(()=>Math.random()-.5);
    const selected=pool.slice(0,Math.min(24,pool.length));
    const dailyLesson={id:"daily",title:"Daily Challenge",icon:"📅",ci:Math.floor(Math.random()*8),ex:selected};
    setIsDaily(true);setIsPractice(false);setIsLevelTest(false);setTestUnit(null);setShowEnergyModal(false);
    setLesson(dailyLesson);setExIdx(0);setLives(5);setPicked(null);setResult(null);setFillVal("");setComplete(false);setScore(0);
    setCharMsg("Daily Challenge! 24 exercises — go!");lockedRef.current=false;setScreen("lesson");
  }

  // ═══ PROGRESS SAVING & LOADING ═══
  const loadedRef=useRef(false);
  const saveTimeoutRef=useRef(null);

  // Load progress on mount
  useEffect(()=>{
    (async()=>{
      try{
        const res=await window.storage.get("linguaquest-progress");
        if(res&&res.value){
          const d=JSON.parse(res.value);
          if(d.xp!=null)setXp(d.xp);
          if(d.streak!=null)setStreak(d.streak);
          if(d.level!=null)setLevel(d.level);
          if(d.done)setDone(d.done);
          if(d.leagueIdx!=null)setLeagueIdx(d.leagueIdx);
          if(d.unitStars)setUnitStars(d.unitStars);
          if(d.dailyDone)setDailyDone(d.dailyDone);
          if(d.dailyCount)setDailyCount(d.dailyCount);
          if(d.lessonsCompleted!=null)setLessonsCompleted(d.lessonsCompleted);
          if(d.jumpPassed)setJumpPassed(d.jumpPassed);
          if(d.avatarId!=null)setAvatarId(d.avatarId);
          if(d.leagueWeekStart)setLeagueWeekStart(d.leagueWeekStart);
          if(d.langId){const found=LANGS.find(l=>l.id===d.langId);if(found){setLang(found);setScreen("path");}}
        }
      }catch(e){/* first load or storage unavailable */}
      loadedRef.current=true;
    })();
  },[]);

  // Save progress whenever key state changes (debounced)
  useEffect(()=>{
    if(!loadedRef.current)return;
    if(saveTimeoutRef.current)clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current=setTimeout(async()=>{
      try{
        await window.storage.set("linguaquest-progress",JSON.stringify({
          xp,streak,level,done,leagueIdx,unitStars,dailyDone,dailyCount,
          lessonsCompleted,jumpPassed,langId:lang?.id||null,
          avatarId,leagueWeekStart
        }));
      }catch(e){/* storage unavailable */}
    },400);
  },[xp,streak,level,done,leagueIdx,unitStars,dailyDone,dailyCount,lessonsCompleted,jumpPassed,lang,avatarId,leagueWeekStart]);

  // ═══ LEAGUE TIMER — tick every second, auto-promote/demote on expiry ═══
  useEffect(()=>{
    function tick(){
      const elapsed=Date.now()-leagueWeekStart;
      const remaining=Math.max(0,LEAGUE_WEEK_MS-elapsed);
      if(remaining<=0){
        // Week ended — check rank and auto-promote/demote
        const you2={name:"You",xp,isYou:true};
        const board2=[you2,...leaguePlayers].sort((a,b)=>b.xp-a.xp);
        const rank=board2.findIndex(p=>p.isYou)+1;
        if(rank<=10&&leagueIdx<LEAGUES.length-1){
          // Promote — in promotion zone and not at max
          const from=LEAGUES[leagueIdx],to=LEAGUES[leagueIdx+1];
          setLeagueIdx(p=>p+1);
          setLeagueAnim({type:"promote",from,to,toIdx:leagueIdx+1});
        }else if(rank>25&&leagueIdx>0){
          // Demote — in demotion zone and not at Bronze
          const from=LEAGUES[leagueIdx],to=LEAGUES[leagueIdx-1];
          setLeagueIdx(p=>p-1);
          setLeagueAnim({type:"demote",from,to,toIdx:leagueIdx-1});
        }else if(rank>25&&leagueIdx===0){
          // In demotion zone BUT already at Bronze — can't go lower, show "survived" 
          setLeagueAnim({type:"survived",to:LEAGUES[0],from:LEAGUES[0]});
        }else{
          // Safe zone — stayed in same league
          setLeagueAnim({type:"stayed",to:LEAGUES[leagueIdx],from:LEAGUES[leagueIdx]});
        }
        // Reset week
        setLeagueWeekStart(Date.now());
        return;
      }
      const d=Math.floor(remaining/(24*60*60*1000));
      const h=Math.floor((remaining%(24*60*60*1000))/(60*60*1000));
      const m=Math.floor((remaining%(60*60*1000))/(60*1000));
      setLeagueTimeLeft(d>0?`${d}D ${h}H`:`${h}H ${m}M`);
    }
    tick();
    const iv=setInterval(tick,30000); // tick every 30s
    return()=>clearInterval(iv);
  },[leagueWeekStart,xp,leagueIdx]);

  const sections=lang?(SECTIONS[lang.id]||[]):[]; const units=sections.flatMap(s=>(s.units||[]).map(u=>({...u,sTitle:s.title,sColor:s.color,sIcon:s.icon,sNum:s.section})));
  const allLessons=units.flatMap(u=>u.lessons);
  const exercises=lesson?norm(lesson.ex):[];const ex=exercises[exIdx];const ci=lesson?.ci??0;
  const F="'Fredoka',sans-serif";
  const[openSection,setOpenSection]=useState(1); // which section is expanded (1,2,3 or null)

  // ═══ TAP-TO-TRANSLATE DICTIONARY ═══
  // Stores: key(lowercase) → {meaning, spell} where spell is the original foreign word
  const dictRef=useRef({});const dictLangRef=useRef(null);
  if(lang?.id!==dictLangRef.current){
    const d={};
    function addWord(foreign,english){
      if(!foreign||!english)return;
      // Foreign → English (with original foreign spelling)
      d[foreign.toLowerCase()]={meaning:english,spell:foreign};
      // English → Foreign (with original english spelling)
      d[english.toLowerCase()]={meaning:foreign,spell:english};
      // Individual words from multi-word phrases
      foreign.split(/\s+/).forEach(w=>{const c=w.toLowerCase().replace(/[.,!?¿¡'":;()]/g,"");if(c.length>1&&!d[c])d[c]={meaning:english,spell:w};});
      english.split(/\s+/).forEach(w=>{const c=w.toLowerCase().replace(/[.,!?¿¡'":;()]/g,"");if(c.length>1&&!d[c])d[c]={meaning:foreign,spell:w};});
    }
    units.forEach(u=>u.lessons?.forEach(l=>(l.ex||[]).forEach(e=>{
      if(e.t==="translate"&&e.p&&e.a)addWord(e.a,e.p);
      if(e.t==="listen"&&e.w&&e.m)addWord(e.w,e.m);
      if(e.t==="speak"&&e.ph&&e.m)addWord(e.ph,e.m);
      if(e.t==="match"&&e.pairs)e.pairs.forEach(([en,fo])=>addWord(fo,en));
      if(e.t==="fill"&&e.a&&e.h)addWord(e.a,e.h);
      if(e.t==="scramble"&&e.w&&e.h)addWord(e.w,e.h);
    })));
    // Also build from word banks directly for comprehensive coverage
    const bank=WB[lang?.id];
    if(bank)Object.values(bank).forEach(pairs=>pairs.forEach(([fo,en])=>addWord(fo,en)));
    dictRef.current=d;dictLangRef.current=lang?.id;
  }
  const dict=dictRef.current;

  function flashXP(n){setXpPop({n,v:true});setTimeout(()=>setXpPop({n:0,v:false}),1200);}
  // ═══ ROBUST ANSWER MATCHING ═══
  function normalize(s){return(s||"").toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[¿¡!?.,;:'"(){}[\]\/\\-]/g,"").replace(/\s+/g," ");}
  function answersMatch(given,expected){
    const g=normalize(given),e=normalize(expected);
    if(g===e)return true;
    // Allow if only whitespace/punctuation differs
    if(g.replace(/\s/g,"")===e.replace(/\s/g,""))return true;
    // Levenshtein for close matches (typos) — allow distance <=2 for words 4+ chars
    if(e.length>=4){
      let dp=Array.from({length:g.length+1},(_,i)=>i);
      for(let j=1;j<=e.length;j++){const prev=[...dp];dp[0]=j;for(let i=1;i<=g.length;i++){dp[i]=g[i-1]===e[j-1]?prev[i-1]:1+Math.min(prev[i-1],prev[i],dp[i-1]);}}
      if(dp[g.length]<=Math.min(2,Math.floor(e.length/4)))return true;
    }
    return false;
  }
  function submitAnswer(av,dv){if(lockedRef.current)return;lockedRef.current=true;const expected=ex.answer||ex.meaning||"";const ok=answersMatch(av,expected);setPicked(dv??av);setResult(ok?"correct":"wrong");setCharMsg(ok?pick(REACT_MSG.correct):pick(REACT_MSG.wrong));if(ok){setXp(p=>p+10);setScore(p=>p+10);flashXP(10);playSound("correct");}else{setLives(p=>Math.max(0,p-1));playSound("wrong");}}
  function onMatchDone(){if(lockedRef.current)return;lockedRef.current=true;setResult("correct");setCharMsg(pick(REACT_MSG.correct));setXp(p=>p+15);setScore(p=>p+15);flashXP(15);playSound("correct");}
  function onScrambleDone(){if(lockedRef.current)return;lockedRef.current=true;setResult("correct");setCharMsg(pick(REACT_MSG.correct));setXp(p=>p+20);setScore(p=>p+20);flashXP(20);playSound("correct");}
  function onSpeakDone(ok,said){if(lockedRef.current)return;lockedRef.current=true;setPicked(said||"");setResult(ok?"correct":"wrong");setCharMsg(ok?pick(REACT_MSG.correct):pick(REACT_MSG.wrong));if(ok){setXp(p=>p+15);setScore(p=>p+15);flashXP(15);playSound("correct");}else{setLives(p=>Math.max(0,p-1));playSound("wrong");}}
  function handleContinue(){const isLast=exIdx+1>=exercises.length,noLives=result==="wrong"&&lives<=0;
    if(isLast||noLives){setComplete(true);
      if(isJumpTest){
        const acc=exercises.length>0?score/(exercises.length*10):0;
        const passed=acc>=0.7;
        if(passed&&jumpUnit){
          // Mark ALL lessons in the unit as done
          const newDone={};jumpUnit.lessons.forEach(ls=>{newDone[`${lang.id}-${ls.id}`]=true;});
          setDone(p=>({...p,...newDone}));
          setXp(p=>p+50);flashXP(50);setStreak(p=>p+1);setJumpPassed(true);
          setConfetti(true);setTimeout(()=>setConfetti(false),3500);playSound("correct");
          setCharMsg(`Unit ${jumpUnit.unit} skipped! All ${jumpUnit.lessons.length} lessons unlocked!`);
        }else{
          setCharMsg(noLives?"Out of hearts! Need 70% to pass.":"Need 70% accuracy to skip. Keep learning!");
          playSound("wrong");
        }
      }else if(isDaily){
        if(isLast&&result==="correct"){
          setDailyDone(p=>({...p,[lang.id]:getTodayStr()}));
          setDailyCount(p=>({...p,[lang.id]:(p[lang.id]||0)+1}));
          const acc=exercises.length>0?score/(exercises.length*10):0;
          const bonus=Math.round(acc*100);
          setXp(p=>p+bonus);flashXP(bonus);setStreak(p=>p+1);
          setConfetti(true);setTimeout(()=>setConfetti(false),3500);playSound("correct");
          const left=DAILY_MAX-((dailyCount[lang.id]||0)+1);
          setCharMsg(left>0?`Day ${(dailyCount[lang.id]||0)+1}/${DAILY_MAX} done! +${bonus} XP`:`All ${DAILY_MAX} days complete! 🏆`);
        }else{setCharMsg(noLives?"Out of hearts! Try again tomorrow.":"Keep going!");}
      }else if(isLevelTest){
        // Calculate stars based on accuracy
        const acc=exercises.length>0?score/(exercises.length*10):0;
        const stars=acc>=0.9?3:acc>=0.7?2:acc>=0.4?1:0;
        if(stars>0&&testUnit){
          const sKey=`${lang.id}-${testUnit.unit}`;
          setUnitStars(p=>({...p,[sKey]:Math.max(p[sKey]||0,stars)}));
        }
        if(stars>0){setConfetti(true);setTimeout(()=>setConfetti(false),3500);setXp(p=>p+stars*25);flashXP(stars*25);playSound("correct");
          setCharMsg(stars===3?"⭐⭐⭐ Perfect! Master level!":stars===2?"⭐⭐ Great job! Almost perfect!":"⭐ Passed! Keep improving!");
        }else{setCharMsg("Keep practicing the unit lessons!");playSound("wrong");}
      }else if(isPractice){
        if(isLast&&result==="correct"){refillOne();setCharMsg("Practice complete!");playSound("correct");setConfetti(true);setTimeout(()=>setConfetti(false),2500);}
        else{setCharMsg(noLives?"Out of hearts!":"Practice more!");}
      }else{
        if(isLast&&result==="correct"){const rxp=rampUpActive?RAMPUP_XP:20;setConfetti(true);setDone(p=>({...p,[`${lang.id}-${lesson.id}`]:true}));setStreak(p=>p+1);setXp(p=>p+rxp);flashXP(rxp);setLessonsCompleted(p=>p+1);if(rampUpActive){setRampUpLessons(p=>p+1);setRampUpXpEarned(p=>p+rxp);}setCharMsg(rampUpActive?`🚀 RAMP-UP! +${rxp} XP!`:pick(REACT_MSG.done));if(xp+score+rxp>=level*100)setLevel(p=>p+1);setTimeout(()=>setConfetti(false),3500);playSound("correct");}
        else{setCharMsg(noLives?"Out of hearts!":"Keep going!");}
      }}
    else{setExIdx(p=>p+1);setPicked(null);setResult(null);setFillVal("");setCharMsg("");playSound("xp");}lockedRef.current=false;}

  function startLesson(l){
    setLesson(l);setExIdx(0);setLives(5);setPicked(null);setResult(null);setFillVal("");setComplete(false);setScore(0);setCharMsg("");lockedRef.current=false;setIsLevelTest(false);setIsJumpTest(false);setTestUnit(null);setJumpUnit(null);setScreen("lesson");
  }

  // ═══ LEVEL TEST — boss level at end of unit ═══
  function startLevelTest(unit){
    const allUnitEx=unit.lessons.flatMap(l=>l.ex||[]);
    const pool=[...allUnitEx].sort(()=>Math.random()-.5);
    const selected=pool.slice(0,Math.min(6,pool.length));
    if(selected.length===0)return;
    const testLesson={id:`test-${unit.unit}`,title:`Unit ${unit.unit} Test`,icon:"🏰",ci:unit.unit%8,ex:selected};
    setIsLevelTest(true);setTestUnit(unit);setIsPractice(false);setShowEnergyModal(false);
    setLesson(testLesson);setExIdx(0);setLives(3);setPicked(null);setResult(null);setFillVal("");setComplete(false);setScore(0);setCharMsg("Unit Level Test! Earn up to 3 stars!");lockedRef.current=false;setScreen("lesson");
  }

  // ═══ JUMP TEST — skip an entire unit by passing a harder test ═══
  function startJumpTest(unit){
    const allUnitEx=unit.lessons.flatMap(l=>l.ex||[]);
    const pool=[...allUnitEx].sort(()=>Math.random()-.5);
    const selected=pool.slice(0,Math.min(8,pool.length)); // 8 exercises, harder than level test
    if(selected.length===0)return;
    const jumpLesson={id:`jump-${unit.unit}`,title:`Skip Unit ${unit.unit}`,icon:"⏭️",ci:unit.unit%8,ex:selected};
    setIsJumpTest(true);setJumpUnit(unit);setIsPractice(false);setIsLevelTest(false);setIsDaily(false);setTestUnit(null);setShowJumpModal(null);
    setLesson(jumpLesson);setExIdx(0);setLives(2);setPicked(null);setResult(null);setFillVal("");setComplete(false);setScore(0);setCharMsg("Jump Test! Pass to skip this unit!");lockedRef.current=false;setScreen("lesson");
  }

  // Practice mode — generates 4 random review exercises
  function startPractice(){
    const allEx=allLessons.flatMap(l=>l.ex||[]);
    const pool=allEx.filter(e=>e.t==="translate"||e.t==="listen"||e.t==="fill");
    const shuffled=[...pool].sort(()=>Math.random()-.5).slice(0,4);
    if(shuffled.length===0){setCharMsg("Complete a lesson first!");return;}
    const practiceLesson={id:"practice",title:"Practice",icon:"💪",ci:Math.floor(Math.random()*8),ex:shuffled};
    setIsPractice(true);setShowEnergyModal(false);
    setLesson(practiceLesson);setExIdx(0);setLives(3);setPicked(null);setResult(null);setFillVal("");setComplete(false);setScore(0);setCharMsg("Practice to earn energy!");lockedRef.current=false;setScreen("lesson");
  }

  function goPath(){setScreen("path");setComplete(false);setLesson(null);setCharMsg("");setIsPractice(false);setIsLevelTest(false);setIsDaily(false);setIsJumpTest(false);setJumpUnit(null);setTestUnit(null);setShowJumpModal(null);setActiveTab("learn");lockedRef.current=false;startDailyTimer();}

  const cColor=result==="correct"?"#58CC02":result==="wrong"?"#FF4B4B":(lang?.color||"#58CC02");
  const cShadow=result==="correct"?"#458200":result==="wrong"?"#a83232":(lang?.color||"#58CC02")+"88";

  // ═════════ RENDER ═════════
  return <div style={{minHeight:"100vh",fontFamily:"'Nunito',sans-serif",background:"linear-gradient(160deg,var(--bg1),var(--bg2) 40%,var(--bg3))",color:"#fff",position:"relative",overflow:"hidden"}}>
    <style>{CSS}</style>
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:1,backgroundImage:`url("${NOISE_SVG}")`,backgroundRepeat:"repeat",backgroundSize:"200px",opacity:.5,mixBlendMode:"overlay"}}/>
    <Confetti active={confetti}/><XPPopup n={xpPop.n} v={xpPop.v}/>

    {/* ══════ HOME ══════ */}
    {screen==="home"&&(<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:24,position:"relative",zIndex:2}}>
      <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap",justifyContent:"center"}}>{CHARS.map((_,i)=><div key={i} style={{animation:`float ${2.5+i*.3}s ease-in-out infinite ${i*.15}s`}}><CharAvatar ci={i} size={44}/></div>)}</div>
      <h1 style={{fontSize:48,fontWeight:900,letterSpacing:-1,marginBottom:8,fontFamily:F,background:"linear-gradient(135deg,#58CC02,#1CB0F6,#FFC800,#FF4B4B,#CE82FF)",backgroundSize:"400% 400%",animation:"gradientShift 6s ease infinite",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>LinguaQuest</h1>
      <p style={{fontSize:15,color:"rgba(255,255,255,.45)",marginBottom:32,fontWeight:600}}>The free, fun way to learn a language!</p>
      <button onClick={()=>setScreen("select")} style={{padding:"16px 56px",borderRadius:16,border:"none",background:"linear-gradient(135deg,#58CC02,#4CAF00)",color:"#fff",fontSize:18,fontWeight:900,cursor:"pointer",textTransform:"uppercase",letterSpacing:1.5,fontFamily:F,boxShadow:"0 5px 0 #388200,0 8px 24px rgba(88,204,2,.25)",animation:"pulse 2s ease-in-out infinite"}}>Get Started</button>
      <div style={{display:"flex",gap:28,marginTop:40}}>{[{i:"🎯",l:"Bite-sized"},{i:"📖",l:"Stories"},{i:"🧩",l:"Games"},{i:"🎤",l:"Speaking"},{i:"🏆",l:"XP & Streaks"}].map((f,i)=><div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,animation:`fadeUp .5s ease ${.4+i*.1}s both`}}><span style={{fontSize:24}}>{f.i}</span><span style={{fontSize:10,color:"rgba(255,255,255,.4)",fontWeight:700}}>{f.l}</span></div>)}</div>
    </div>)}

    {/* ══════ SELECT LANGUAGE ══════ */}
    {screen==="select"&&(<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:24,position:"relative",zIndex:2}}>
      <h2 style={{fontSize:28,fontWeight:900,marginBottom:6,fontFamily:F,animation:"fadeUp .3s ease"}}>I want to learn...</h2>
      <p style={{color:"rgba(255,255,255,.4)",marginBottom:28,fontWeight:600,fontSize:14}}>Choose your language</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:12,maxWidth:640,width:"100%"}}>
        {LANGS.map((l,i)=><button key={l.id} onClick={()=>{setLang(l);setScreen("path")}} style={{padding:"20px 16px",borderRadius:18,border:"2.5px solid rgba(255,255,255,.06)",background:"rgba(255,255,255,.02)",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",gap:10,fontSize:16,fontWeight:800,transition:"all .25s",animation:`fadeUp .3s ease ${i*.05}s both`}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=l.color;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 6px 20px ${l.glow}`}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.06)";e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="none"}}>
          <span style={{fontSize:28}}>{l.flag}</span><div style={{textAlign:"left"}}><div>{l.name}</div><div style={{fontSize:10,color:"rgba(255,255,255,.3)",fontWeight:600}}>{(SECTIONS[l.id]||[]).reduce((a,s)=>a+(s.units||[]).reduce((b,u)=>b+u.lessons.length,0),0)} lessons</div></div>
        </button>)}
      </div>
      <button onClick={()=>setScreen("home")} style={{marginTop:24,padding:"8px 20px",borderRadius:10,border:"2px solid rgba(255,255,255,.1)",background:"transparent",color:"rgba(255,255,255,.4)",fontSize:13,fontWeight:700,cursor:"pointer"}}>← Back</button>
    </div>)}

    {/* ══════ LEARNING PATH — Duolingo winding circle nodes ══════ */}
    {screen==="path"&&lang&&(<div style={{maxWidth:480,margin:"0 auto",padding:"0 20px",position:"relative",zIndex:2}}>
      {/* Sticky top bar */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,.06)",position:"sticky",top:0,background:"rgba(19,31,36,.94)",backdropFilter:"blur(12px)",zIndex:10}}>
        <button onClick={()=>setScreen("select")} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#fff",cursor:"pointer",fontSize:14,fontWeight:800}}>
          <span style={{fontSize:20}}>{lang.flag}</span>{lang.name}</button>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <StreakBadge streak={streak}/>
          <div style={{display:"flex",alignItems:"center",gap:3,padding:"4px 10px",borderRadius:16,background:"rgba(88,204,2,.1)",border:"1.5px solid #58CC0233"}}>
            <span style={{fontSize:14}}>⚡</span>
            <span style={{fontWeight:800,fontSize:13,fontFamily:F,color:"#58CC02"}}>∞</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:3,color:"#FFC800",fontWeight:800,fontSize:13,fontFamily:F}}>💎 {xp}</div>
        </div>
      </div>
      {/* Level bar */}
      <div style={{padding:"12px 0 4px"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,.45)"}}>Level {level}</span><span style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.3)"}}>{xp}/{level*100} XP</span></div><ProgressBar current={xp%(level*100)} total={level*100} color="#1CB0F6"/></div>

      {activeTab==="learn"&&<>
      {/* ═══ UNLIMITED ENERGY + PRACTICE ═══ */}
      <div style={{margin:"12px 0 4px",padding:"14px 16px",borderRadius:16,background:"linear-gradient(135deg,rgba(88,204,2,.06),rgba(88,204,2,.02))",border:"1.5px solid rgba(88,204,2,.15)",animation:"fadeUp .3s ease",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:18}}>⚡</span>
          <span style={{fontSize:14,fontWeight:800,color:"#58CC02",fontFamily:F}}>Unlimited Energy</span>
          <span style={{fontSize:11,color:"rgba(255,255,255,.3)",fontWeight:600}}>— Learn all you want!</span>
        </div>
        <button onClick={startPractice} style={{padding:"8px 16px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#FF9600,#FF7600)",color:"#fff",fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:F,boxShadow:"0 2px 0 #cc6600",display:"flex",alignItems:"center",gap:5,transition:"all .15s"}}>
          <span style={{fontSize:13}}>💪</span> Practice
        </button>
      </div>

      {/* ═══ RAMP-UP CHALLENGE ═══ */}
      <div style={{margin:"8px 0 12px",padding:"16px",borderRadius:16,position:"relative",overflow:"hidden",
        background:rampUpActive?"linear-gradient(135deg,rgba(206,130,255,.12),rgba(255,75,75,.06))":"linear-gradient(135deg,rgba(206,130,255,.06),rgba(206,130,255,.02))",
        border:`2px solid ${rampUpActive?"rgba(206,130,255,.3)":"rgba(206,130,255,.12)"}`,animation:"fadeUp .3s ease .1s both"}}>
        {/* Animated glow when active */}
        {rampUpActive&&<div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 50%,rgba(206,130,255,.08),transparent 70%)",animation:"pulse 2s ease-in-out infinite",pointerEvents:"none"}}/>}
        <div style={{position:"relative",display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:44,height:44,borderRadius:12,background:rampUpActive?"linear-gradient(135deg,#CE82FF,#FF4B4B)":"rgba(206,130,255,.12)",border:`2px solid ${rampUpActive?"#CE82FF44":"rgba(206,130,255,.2)"}`,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,
            animation:rampUpActive?"pulse 1.5s ease-in-out infinite":"none"}}>
            🚀
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:14,fontWeight:900,color:rampUpActive?"#CE82FF":"#fff",fontFamily:F}}>Ramp-Up Challenge</div>
            {!rampUpActive&&<div style={{fontSize:11,color:"rgba(255,255,255,.35)",fontWeight:600}}>Earn <span style={{color:"#FFC800",fontWeight:800}}>{RAMPUP_XP} XP</span> per lesson! Start the stopwatch.</div>}
            {rampUpActive&&<div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
              <div style={{display:"flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:8,background:"rgba(255,255,255,.06)",border:"1.5px solid rgba(255,255,255,.08)"}}>
                <span style={{fontSize:12}}>⏱</span>
                <span style={{fontSize:16,fontWeight:900,color:"#fff",fontFamily:"'Courier New',monospace",letterSpacing:2}}>{rampUpElapsed}</span>
              </div>
              <span style={{fontSize:10,color:"rgba(255,255,255,.3)"}}>•</span>
              <span style={{fontSize:11,fontWeight:800,color:"#FFC800"}}>{rampUpLessons} lessons</span>
              <span style={{fontSize:10,color:"rgba(255,255,255,.3)"}}>•</span>
              <span style={{fontSize:11,fontWeight:800,color:"#CE82FF"}}>+{rampUpXpEarned} XP</span>
            </div>}
          </div>
          {!rampUpActive&&<button onClick={startRampUp} style={{padding:"10px 18px",borderRadius:10,border:"none",
            background:"linear-gradient(135deg,#CE82FF,#9966CC)",color:"#fff",fontSize:12,fontWeight:800,cursor:"pointer",
            fontFamily:F,boxShadow:"0 3px 0 #6B3FA0",display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}>
            ⏱ Start
          </button>}
          {rampUpActive&&<button onClick={stopRampUp} style={{padding:"10px 18px",borderRadius:10,border:"none",
            background:"linear-gradient(135deg,#FF4B4B,#d03030)",color:"#fff",fontSize:12,fontWeight:800,cursor:"pointer",
            fontFamily:F,boxShadow:"0 3px 0 #a82020",display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}>
            ⏹ Stop
          </button>}
        </div>
      </div>

      {/* ═══ WINDING PATH ═══ */}
      <div style={{padding:"16px 0 80px"}}>
        {sections.map((sec,si)=>{
          const secUnits=units.filter(u=>u.sNum===sec.section);
          const secLessons=secUnits.flatMap(u=>u.lessons);
          const secDone=secLessons.filter(l=>done[`${lang.id}-${l.id}`]).length;
          const secPct=secLessons.length>0?Math.round(secDone/secLessons.length*100):0;
          const isOpen=openSection===sec.section;
          // Section is locked if previous section isn't at least started
          const prevSecLessons=si>0?units.filter(u=>u.sNum===sections[si-1].section).flatMap(u=>u.lessons):[];
          const prevSecDone=prevSecLessons.filter(l=>done[`${lang.id}-${l.id}`]).length;
          const secLocked=si>0&&prevSecDone===0;

          return <div key={sec.section}>
            {/* ── SECTION CARD (clickable) ── */}
            <button onClick={()=>{if(!secLocked)setOpenSection(isOpen?null:sec.section);}} style={{width:"100%",textAlign:"left",border:"none",cursor:secLocked?"default":"pointer",
              margin:si===0?"8px 0 12px":"28px 0 12px",padding:"20px 22px",borderRadius:22,position:"relative",overflow:"hidden",animation:`fadeUp .4s ease ${si*.1}s both`,
              background:isOpen?`linear-gradient(145deg,${sec.color}22,${sec.color}0a)`:`linear-gradient(145deg,${sec.color}10,${sec.color}04)`,
              border2:`2px solid ${isOpen?sec.color+"33":sec.color+"18"}`,
              outline:isOpen?`2px solid ${sec.color}33`:`2px solid ${sec.color}15`,
              opacity:secLocked?.45:1,transition:"all .3s"}}>

              {/* Background sparkles */}
              <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
                {[...Array(6)].map((_,i)=><div key={i} style={{position:"absolute",width:3+Math.random()*5,height:3+Math.random()*5,borderRadius:"50%",background:sec.color,opacity:.06+Math.random()*.05,left:`${Math.random()*100}%`,top:`${Math.random()*100}%`}}/>)}
              </div>

              <div style={{position:"relative",display:"flex",alignItems:"center",gap:14}}>
                {/* Section icon */}
                <div style={{width:52,height:52,borderRadius:16,background:`${sec.color}15`,border:`2px solid ${sec.color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0,
                  animation:isOpen?"charIdle 3s ease-in-out infinite":"none"}}>
                  {secLocked?"🔒":sec.icon}
                </div>

                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:10,fontWeight:900,color:sec.color,textTransform:"uppercase",letterSpacing:2,fontFamily:F}}>Section {sec.section}</div>
                  <div style={{fontSize:19,fontWeight:900,color:secLocked?"rgba(255,255,255,.3)":"#fff",fontFamily:F,marginTop:1}}>{sec.title}</div>

                  {/* Stats row */}
                  <div style={{display:"flex",alignItems:"center",gap:10,marginTop:6}}>
                    <div style={{flex:1,maxWidth:130}}><ProgressBar current={secDone} total={secLessons.length} color={sec.color} h={5}/></div>
                    <span style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.35)",flexShrink:0}}>{secPct}%</span>
                  </div>

                  {/* Lesson count chips */}
                  <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
                    <span style={{fontSize:9,padding:"2px 8px",borderRadius:6,background:"rgba(255,255,255,.04)",color:"rgba(255,255,255,.35)",fontWeight:700}}>{secUnits.length} units</span>
                    <span style={{fontSize:9,padding:"2px 8px",borderRadius:6,background:"rgba(255,255,255,.04)",color:"rgba(255,255,255,.35)",fontWeight:700}}>{secLessons.length} lessons</span>
                    <span style={{fontSize:9,padding:"2px 8px",borderRadius:6,background:"rgba(255,255,255,.04)",color:"rgba(255,255,255,.35)",fontWeight:700}}>{secDone}/{secLessons.length} done</span>
                  </div>
                </div>

                {/* Expand/collapse arrow */}
                {!secLocked&&<div style={{fontSize:18,color:sec.color,transition:"transform .3s",transform:isOpen?"rotate(180deg)":"rotate(0deg)",flexShrink:0}}>▼</div>}
              </div>
            </button>

            {/* ── Expanded section content: units + lessons ── */}
            {isOpen&&!secLocked&&<div style={{animation:"fadeUp .3s ease"}}>
              {secUnits.map((unit,ui)=>{
                const globalIdx=units.slice(0,units.indexOf(unit)).reduce((a,u)=>a+u.lessons.length,0);
                const anyDoneInUnit=unit.lessons.some(ls=>done[`${lang.id}-${ls.id}`]);
                const firstGIdx=globalIdx;
                const firstPrevKey=firstGIdx>0?`${lang.id}-${allLessons[firstGIdx-1].id}`:null;
                const firstIsNext=!done[`${lang.id}-${unit.lessons[0]?.id}`]&&(firstGIdx===0||(firstPrevKey&&done[firstPrevKey]));
                const unitLocked=!anyDoneInUnit&&!firstIsNext&&ui>0;
                const allUnitDone=unit.lessons.every(ls=>done[`${lang.id}-${ls.id}`]);

                return <div key={`${sec.section}-${unit.unit}`}>
                  {/* ── Unit Banner ── */}
                  <div style={{margin:"12px 0 10px",padding:"10px 14px",borderRadius:13,background:`linear-gradient(135deg,${sec.color}12,${sec.color}04)`,border:`1.5px solid ${sec.color}1a`,display:"flex",alignItems:"center",gap:10,animation:`fadeUp .3s ease ${ui*.05}s both`}}>
                    <div style={{width:30,height:30,borderRadius:8,background:`${sec.color}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>{unit.icon}</div>
                    <div style={{flex:1}}><div style={{fontSize:9,fontWeight:800,color:sec.color,textTransform:"uppercase",letterSpacing:1,fontFamily:F}}>Unit {unit.unit}</div><div style={{fontSize:13,fontWeight:800,color:"#fff",fontFamily:F}}>{unit.title}</div></div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      {unitStars[`${lang.id}-${unit.unit}`]>0&&<div style={{display:"flex",gap:1}}>{[1,2,3].map(s=><span key={s} style={{fontSize:10,filter:s<=unitStars[`${lang.id}-${unit.unit}`]?"none":"grayscale(1) opacity(0.2)"}}>{s<=unitStars[`${lang.id}-${unit.unit}`]?"⭐":"☆"}</span>)}</div>}
                      {unitLocked&&!allUnitDone&&<button onClick={()=>setShowJumpModal(unit)} style={{padding:"3px 8px",borderRadius:6,border:"none",background:"linear-gradient(135deg,#1CB0F6,#0088cc)",color:"#fff",fontSize:9,fontWeight:800,cursor:"pointer",fontFamily:F,boxShadow:"0 2px 0 #006699",display:"flex",alignItems:"center",gap:3}}>
                        <span style={{fontSize:10}}>⏭️</span>Jump
                      </button>}
                      <span style={{fontSize:10,color:"rgba(255,255,255,.2)",fontWeight:700}}>{unit.lessons.length}</span>
                    </div>
                  </div>
            <div style={{position:"relative"}}>
              {unit.lessons.map((ls,i)=>{
                const gIdx=globalIdx+i;
                const key=`${lang.id}-${ls.id}`;
                const comp=done[key];
                const prevKey=gIdx>0?`${lang.id}-${allLessons[gIdx-1].id}`:null;
                const isNext=!comp&&(gIdx===0||done[prevKey]);
                const locked=!comp&&!isNext;
                const offset=NODE_OFFSETS[i%8];
                const nodeSize=isNext?68:comp?62:58;
                const bgC=comp?unit.sColor:isNext?unit.sColor:locked?"#2a2a3a":"#333";
                const bdC=comp?"#fff3":isNext?"#fff4":"#fff1";

                return <div key={ls.id} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"6px 0",position:"relative",animation:`fadeUp .3s ease ${(ui*8+i)*.04}s both`}}>
                  {/* Connector line */}
                  {i>0&&<div style={{position:"absolute",top:-6,left:"50%",transform:`translateX(${(offset+NODE_OFFSETS[(i-1)%8])/2}px)`,width:2,height:12,background:comp?"rgba(255,255,255,.1)":"rgba(255,255,255,.04)",borderRadius:2}}/>}

                  <div style={{transform:`translateX(${offset}px)`,transition:"transform .3s"}}>
                    {/* Bouncing arrow for current lesson */}
                    {isNext&&<div style={{textAlign:"center",marginBottom:4,animation:"bounce 1s ease-in-out infinite"}}><div style={{display:"inline-block",padding:"3px 12px",borderRadius:8,background:unit.sColor,color:"#fff",fontSize:10,fontWeight:800,fontFamily:F,letterSpacing:1}}>START</div></div>}

                    {/* ── Circle Node ── */}
                    <button onClick={()=>{if(!locked)startLesson(ls)}} disabled={locked} style={{
                      width:nodeSize,height:nodeSize,borderRadius:"50%",border:`3px solid ${bdC}`,cursor:locked?"default":"pointer",
                      background:locked?`radial-gradient(circle at 40% 35%,#3a3a4a,#2a2a3a)`:`radial-gradient(circle at 40% 35%,${bgC}dd,${bgC})`,
                      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:1,
                      boxShadow:isNext?`0 0 20px ${unit.sColor}44,0 4px 12px rgba(0,0,0,.3)`:comp?`0 4px 12px rgba(0,0,0,.2)`:"none",
                      transition:"all .3s",opacity:locked?.4:1,position:"relative",overflow:"visible",
                      "--gc":unit.sColor+"44",
                      animation:isNext?"nodeGlow 2s ease-in-out infinite":"none",
                    }}>
                      <span style={{fontSize:isNext?24:20,lineHeight:1,filter:locked?"grayscale(1)":"none"}}>{locked?"🔒":ls.icon}</span>
                      {!locked&&<span style={{fontSize:8,fontWeight:800,color:"rgba(255,255,255,.8)",fontFamily:F,lineHeight:1}}>{ls.title.length>8?ls.title.slice(0,7)+"…":ls.title}</span>}
                      {/* Crown for completed */}
                      {comp&&<div style={{position:"absolute",top:-8,right:-4,fontSize:16,filter:"drop-shadow(0 1px 2px rgba(0,0,0,.4))"}}>👑</div>}
                    </button>
                  </div>
                </div>;
              })}

              {/* ═══ BOSS LEVEL NODE — Unit Checkpoint ═══ */}
              {(()=>{
                const allUnitDone=unit.lessons.every(ls=>done[`${lang.id}-${ls.id}`]);
                const lastLessonDone=unit.lessons.length>0&&done[`${lang.id}-${unit.lessons[unit.lessons.length-1].id}`];
                const bossKey=`${lang.id}-${unit.unit}`;
                const bossStars=unitStars[bossKey]||0;
                const bossUnlocked=allUnitDone;
                const bossCompleted=bossStars>0;
                const bossIsNext=bossUnlocked&&!bossCompleted;
                const bossLocked=!bossUnlocked;
                const bossIdx=unit.lessons.length;
                const bossOffset=NODE_OFFSETS[bossIdx%8];

                return <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"10px 0 16px",position:"relative",animation:"fadeUp .4s ease"}}>
                  {/* Connector to boss */}
                  <div style={{position:"absolute",top:-2,left:"50%",transform:`translateX(${bossOffset/2}px)`,width:2,height:12,background:bossUnlocked?"rgba(255,200,0,.2)":"rgba(255,255,255,.04)",borderRadius:2}}/>

                  <div style={{transform:`translateX(${bossOffset}px)`,transition:"transform .3s"}}>
                    {/* Boss label */}
                    {bossIsNext&&<div style={{textAlign:"center",marginBottom:6,animation:"bounce 1s ease-in-out infinite"}}>
                      <div style={{display:"inline-block",padding:"4px 14px",borderRadius:10,background:"linear-gradient(135deg,#FFC800,#FF9600)",color:"#fff",fontSize:10,fontWeight:900,fontFamily:F,letterSpacing:1.5,boxShadow:"0 2px 8px rgba(255,200,0,.3)"}}>⚔️ LEVEL TEST</div>
                    </div>}
                    {bossCompleted&&<div style={{textAlign:"center",marginBottom:4}}>
                      <div style={{display:"flex",justifyContent:"center",gap:2}}>{[1,2,3].map(s=><span key={s} style={{fontSize:12,animation:s<=bossStars?`starPop .4s ease ${s*.15}s both`:"none",filter:s<=bossStars?"none":"grayscale(1) opacity(0.2)"}}>{s<=bossStars?"⭐":"☆"}</span>)}</div>
                    </div>}

                    {/* Boss node — shield/castle shape */}
                    <button onClick={()=>{if(bossUnlocked)startLevelTest(unit)}} disabled={bossLocked} style={{
                      width:78,height:78,borderRadius:18,cursor:bossLocked?"default":"pointer",position:"relative",overflow:"visible",
                      border:`3px solid ${bossCompleted?"#FFC80066":bossIsNext?"#FFC80088":"rgba(255,255,255,.08)"}`,
                      background:bossLocked?"linear-gradient(145deg,#2a2a3a,#1e1e2e)":bossCompleted?`linear-gradient(145deg,${unit.sColor}44,${unit.sColor}22)`:"linear-gradient(145deg,#FFC80022,#FF960011)",
                      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,
                      opacity:bossLocked?.3:1,transition:"all .3s",
                      "--bc":unit.sColor+"66",
                      boxShadow:bossIsNext?`0 0 24px #FFC80044,0 0 48px #FFC80022,0 4px 16px rgba(0,0,0,.3)`:bossCompleted?`0 4px 16px ${unit.sColor}33`:"none",
                      animation:bossIsNext?"bossGlow 2s ease-in-out infinite":bossCompleted?"shieldPulse 3s ease-in-out infinite":"none",
                    }}>
                      {/* Decorative corner turrets */}
                      <div style={{position:"absolute",top:-3,left:-3,width:12,height:12,borderRadius:"4px 0 4px 0",background:bossLocked?"#333":bossCompleted?unit.sColor:"#FFC800",opacity:bossLocked?.3:.6}}/>
                      <div style={{position:"absolute",top:-3,right:-3,width:12,height:12,borderRadius:"0 4px 0 4px",background:bossLocked?"#333":bossCompleted?unit.sColor:"#FFC800",opacity:bossLocked?.3:.6}}/>
                      <div style={{position:"absolute",bottom:-3,left:-3,width:12,height:12,borderRadius:"0 4px 0 4px",background:bossLocked?"#333":bossCompleted?unit.sColor:"#FFC800",opacity:bossLocked?.3:.4}}/>
                      <div style={{position:"absolute",bottom:-3,right:-3,width:12,height:12,borderRadius:"4px 0 4px 0",background:bossLocked?"#333":bossCompleted?unit.sColor:"#FFC800",opacity:bossLocked?.3:.4}}/>

                      <span style={{fontSize:28,lineHeight:1,filter:bossLocked?"grayscale(1)":"none",animation:bossIsNext?"crownFloat 2s ease-in-out infinite":"none"}}>{bossLocked?"🔒":bossCompleted?"🏆":"🏰"}</span>
                      <span style={{fontSize:7,fontWeight:900,color:bossLocked?"rgba(255,255,255,.3)":bossCompleted?"#FFC800":"rgba(255,255,255,.8)",fontFamily:F,letterSpacing:.5,lineHeight:1}}>LEVEL {unit.unit}</span>

                      {/* Rotating ring for active boss */}
                      {bossIsNext&&<div style={{position:"absolute",inset:-8,borderRadius:22,border:"2px dashed #FFC80044",animation:"bossRotate 12s linear infinite"}}/>}
                    </button>
                  </div>
                </div>;
              })()}
            </div>
          </div>;
        })}
        </div>}
        </div>;
      })}
      </div>

      {/* ═══ DAILY CHALLENGE — 20 days max, only after course complete ═══ */}
      {isCourseComplete()&&(
        <div style={{margin:"0 0 30px",padding:"20px",borderRadius:20,animation:"fadeUp .5s ease",position:"relative",overflow:"hidden",
          background:isDailyExhausted()?"linear-gradient(145deg,rgba(255,200,0,.06),rgba(255,200,0,.02))":isDailyCompleted()?"linear-gradient(145deg,rgba(88,204,2,.08),rgba(88,204,2,.03))":"linear-gradient(145deg,rgba(206,130,255,.1),rgba(28,176,246,.06))",
          border:`2px solid ${isDailyExhausted()?"rgba(255,200,0,.2)":isDailyCompleted()?"rgba(88,204,2,.2)":"rgba(206,130,255,.25)"}`}}>
          {/* Sparkles for available state */}
          {isDailyAvailable()&&<div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
            {[...Array(8)].map((_,i)=><div key={i} style={{position:"absolute",width:3+Math.random()*4,height:3+Math.random()*4,borderRadius:"50%",background:["#CE82FF","#1CB0F6","#FFC800","#FF9600"][i%4],opacity:.15+Math.random()*.15,left:`${10+Math.random()*80}%`,top:`${10+Math.random()*80}%`,animation:`float ${2+Math.random()*3}s ease-in-out infinite ${Math.random()*2}s`}}/>)}
          </div>}

          <div style={{display:"flex",alignItems:"center",gap:14,position:"relative"}}>
            <div style={{width:56,height:56,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0,
              background:isDailyExhausted()?"rgba(255,200,0,.12)":isDailyCompleted()?"rgba(88,204,2,.12)":"linear-gradient(135deg,rgba(206,130,255,.2),rgba(28,176,246,.15))",
              border:`2px solid ${isDailyExhausted()?"rgba(255,200,0,.25)":isDailyCompleted()?"rgba(88,204,2,.25)":"rgba(206,130,255,.3)"}`,
              animation:isDailyAvailable()?"shieldPulse 2s ease-in-out infinite":"none"}}>
              {isDailyExhausted()?"🏅":isDailyCompleted()?"✅":"📅"}
            </div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                <span style={{fontSize:15,fontWeight:900,color:"#fff",fontFamily:F}}>Daily Challenge</span>
                {isDailyCompleted()&&<span style={{fontSize:9,padding:"2px 8px",borderRadius:6,background:"rgba(88,204,2,.15)",color:"#58CC02",fontWeight:800}}>DONE ✓</span>}
                {isDailyExhausted()&&<span style={{fontSize:9,padding:"2px 8px",borderRadius:6,background:"rgba(255,200,0,.15)",color:"#FFC800",fontWeight:800}}>COMPLETE 🏅</span>}
              </div>
              {/* Day counter progress bar */}
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                <div style={{flex:1,height:6,borderRadius:4,background:"rgba(255,255,255,.06)",overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${((dailyCount[lang?.id]||0)/DAILY_MAX)*100}%`,borderRadius:4,background:isDailyExhausted()?"linear-gradient(90deg,#FFC800,#FF9600)":"linear-gradient(90deg,#CE82FF,#1CB0F6)",transition:"width .6s cubic-bezier(.4,2,.6,1)"}}/>
                </div>
                <span style={{fontSize:10,fontWeight:800,color:"rgba(255,255,255,.4)",fontFamily:F,flexShrink:0}}>{dailyCount[lang?.id]||0}/{DAILY_MAX}</span>
              </div>
              {isDailyExhausted()?
                <p style={{fontSize:11,color:"rgba(255,200,0,.6)",fontWeight:600}}>All 20 days mastered! You're a champion! 🏆</p>:
              isDailyCompleted()?
                <p style={{fontSize:11,color:"rgba(255,255,255,.35)",fontWeight:600}}>Next in <strong style={{color:"#CE82FF"}}>{getDailyRefreshText()}</strong> · Day {(dailyCount[lang?.id]||0)}/{DAILY_MAX}</p>:
                <p style={{fontSize:11,color:"rgba(255,255,255,.4)",fontWeight:600}}>{getDaysLeft()} days remaining · 24 exercises</p>
              }
            </div>
            {isDailyAvailable()&&<button onClick={startDaily} style={{padding:"10px 20px",borderRadius:12,border:"none",
              background:"linear-gradient(135deg,#CE82FF,#1CB0F6)",color:"#fff",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:F,
              boxShadow:"0 3px 0 #8855cc,0 4px 16px rgba(206,130,255,.25)",flexShrink:0,animation:"pulse 2s ease-in-out infinite"}}>
              Day {(dailyCount[lang?.id]||0)+1}
            </button>}
            {isDailyExhausted()&&<button onClick={()=>setShowGrad(true)} style={{padding:"10px 20px",borderRadius:12,border:"none",
              background:"linear-gradient(135deg,#FFC800,#FF9600)",color:"#fff",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:F,
              boxShadow:"0 3px 0 #cc8800,0 4px 16px rgba(255,200,0,.25)",flexShrink:0,animation:"pulse 2s ease-in-out infinite"}}>
              🎓 Graduate
            </button>}
          </div>
        </div>
      )}

      {/* ═══ GRADUATION CEREMONY ═══ */}
      {showGrad&&<GraduationScreen lang={lang} onClose={()=>setShowGrad(false)} onRestart={()=>{setShowGrad(false);setDone({});setDailyCount(p=>({...p,[lang.id]:0}));setDailyDone(p=>({...p,[lang.id]:""}));}}/>}

      {/* ═══ JUMP MODAL ═══ */}
      {showJumpModal&&<div style={{position:"fixed",inset:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setShowJumpModal(null)}>
        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.6)",backdropFilter:"blur(4px)"}}/>
        <div onClick={e=>e.stopPropagation()} style={{position:"relative",width:"100%",maxWidth:380,borderRadius:24,background:"linear-gradient(160deg,#1e2a3a,#1a1a2e)",border:"2px solid rgba(28,176,246,.15)",padding:"28px 24px",textAlign:"center",animation:"bounceIn .4s ease",boxShadow:"0 20px 60px rgba(0,0,0,.5)"}}>
          {/* Header */}
          <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:64,height:64,borderRadius:18,background:"linear-gradient(135deg,rgba(28,176,246,.15),rgba(28,176,246,.05))",border:"2px solid rgba(28,176,246,.25)",marginBottom:14}}>
            <span style={{fontSize:32}}>⏭️</span>
          </div>
          <h3 style={{fontSize:22,fontWeight:900,fontFamily:F,marginBottom:4,color:"#fff"}}>Jump Test</h3>
          <p style={{fontSize:14,fontWeight:800,color:showJumpModal.color,fontFamily:F,marginBottom:12}}>Unit {showJumpModal.unit}: {showJumpModal.title}</p>

          {/* Rules */}
          <div style={{textAlign:"left",padding:"12px 16px",borderRadius:14,background:"rgba(255,255,255,.03)",border:"1.5px solid rgba(255,255,255,.06)",marginBottom:16}}>
            {[{i:"📝",t:"8 exercises from this unit"},{i:"❤️",t:"Only 2 lives — no room for error"},{i:"🎯",t:"Need 70% accuracy to pass"},{i:"✅",t:`Pass = all ${showJumpModal.lessons?.length||0} lessons unlocked`}].map((r,i)=>
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:i<3?"1px solid rgba(255,255,255,.04)":"none"}}>
                <span style={{fontSize:16,flexShrink:0}}>{r.i}</span>
                <span style={{fontSize:12,color:"rgba(255,255,255,.5)",fontWeight:600}}>{r.t}</span>
              </div>)}
          </div>

          <p style={{fontSize:11,color:"rgba(255,255,255,.3)",marginBottom:16}}>Already know this material? Prove it and skip ahead!</p>

          <button onClick={()=>startJumpTest(showJumpModal)} style={{width:"100%",padding:"16px",borderRadius:14,border:"none",background:"linear-gradient(135deg,#1CB0F6,#0088cc)",color:"#fff",fontSize:16,fontWeight:900,cursor:"pointer",fontFamily:F,boxShadow:"0 4px 0 #006699,0 6px 20px rgba(28,176,246,.2)",marginBottom:10,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <span style={{fontSize:18}}>⏭️</span> Start Jump Test
          </button>
          <button onClick={()=>setShowJumpModal(null)} style={{width:"100%",padding:"12px",borderRadius:12,border:"2px solid rgba(255,255,255,.1)",background:"transparent",color:"rgba(255,255,255,.5)",fontSize:14,fontWeight:700,cursor:"pointer"}}>Cancel</button>
        </div>
      </div>}
      </>}

    </div>)}

    {/* ══════ LESSON SCREEN ══════ */}
    {screen==="lesson"&&lesson&&(<div style={{maxWidth:500,margin:"0 auto",padding:"0 20px",position:"relative",zIndex:2,display:"flex",flexDirection:"column",minHeight:"100vh"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",animation:"slideDown .3s ease",flexShrink:0}}>
        <button onClick={goPath} style={{background:"none",border:"none",color:"rgba(255,255,255,.45)",cursor:"pointer",fontSize:20,lineHeight:1,padding:4}}>✕</button>
        {isPractice&&<div style={{padding:"3px 10px",borderRadius:8,background:"linear-gradient(135deg,#FF960022,#FF960011)",border:"1.5px solid #FF960033",display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:12}}>💪</span><span style={{fontSize:10,fontWeight:800,color:"#FF9600",fontFamily:F}}>PRACTICE</span></div>}
        {isLevelTest&&<div style={{padding:"3px 10px",borderRadius:8,background:"linear-gradient(135deg,#FFC80022,#FFC80011)",border:"1.5px solid #FFC80033",display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:12}}>🏰</span><span style={{fontSize:10,fontWeight:800,color:"#FFC800",fontFamily:F}}>LEVEL TEST</span></div>}
        {isDaily&&<div style={{padding:"3px 10px",borderRadius:8,background:"linear-gradient(135deg,#CE82FF22,#CE82FF11)",border:"1.5px solid #CE82FF33",display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:12}}>📅</span><span style={{fontSize:10,fontWeight:800,color:"#CE82FF",fontFamily:F}}>DAILY</span></div>}
        {isJumpTest&&<div style={{padding:"3px 10px",borderRadius:8,background:"linear-gradient(135deg,#1CB0F622,#1CB0F611)",border:"1.5px solid #1CB0F633",display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:12}}>⏭️</span><span style={{fontSize:10,fontWeight:800,color:"#1CB0F6",fontFamily:F}}>JUMP</span></div>}
        {rampUpActive&&<div style={{padding:"3px 10px",borderRadius:8,background:"linear-gradient(135deg,#CE82FF22,#FF4B4B11)",border:"1.5px solid #CE82FF44",display:"flex",alignItems:"center",gap:4,animation:"pulse 2s ease-in-out infinite"}}><span style={{fontSize:10}}>🚀</span><span style={{fontSize:10,fontWeight:900,color:"#CE82FF",fontFamily:"'Courier New',monospace"}}>{rampUpElapsed}</span><span style={{fontSize:8,color:"#FFC800",fontWeight:800}}>×{RAMPUP_XP}</span></div>}
        <div style={{flex:1}}><ProgressBar current={exIdx+(result?1:0)} total={exercises.length} color={isJumpTest?"#1CB0F6":isDaily?"#CE82FF":isLevelTest?"#FFC800":isPractice?"#FF9600":lang?.color||"#58CC02"}/></div>
        <Hearts lives={lives}/>
      </div>

      {!complete?(<div style={{flex:1,display:"flex",flexDirection:"column"}}><div key={exIdx} style={{flex:1,padding:"10px 0",animation:"fadeUp .3s ease"}}>
        <CharBubble ci={ci} text={charMsg||null} mood={result||"idle"}/>

        {/* TRANSLATE */}
        {ex?.type==="translate"&&(<div><p style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,.35)",textAlign:"center",textTransform:"uppercase",letterSpacing:2,marginBottom:6,fontFamily:F}}>Translate this word</p>
          <p style={{fontSize:32,fontWeight:900,textAlign:"center",marginBottom:24,animation:"bounceIn .4s ease",fontFamily:F}}><TapText text={ex.prompt} dict={dict}/></p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{ex.options.map((opt,i)=>{const isAns=normalize(opt)===normalize(ex.answer),isPicked=picked===opt;let bg="rgba(255,255,255,.04)",bd="rgba(255,255,255,.1)";if(result&&isAns){bg="rgba(88,204,2,.12)";bd="#58CC02";}else if(result==="wrong"&&isPicked){bg="rgba(255,75,75,.12)";bd="#FF4B4B";}
            return <button key={opt} disabled={!!result} onClick={()=>submitAnswer(opt,opt)} style={{position:"relative",padding:"14px 16px",borderRadius:14,border:`3px solid ${bd}`,backgroundColor:bg,color:"#fff",fontSize:15,fontWeight:700,cursor:result?"default":"pointer",transition:"all .2s",userSelect:"none",animation:`fadeUp .25s ease ${i*.06}s both`}}>
              <TapText text={opt} dict={dict}/>{result&&isAns&&<span style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",animation:"bounceIn .3s ease"}}>✓</span>}
              {result==="wrong"&&isPicked&&<span style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",animation:"bounceIn .3s ease"}}>✗</span>}
            </button>;})}</div></div>)}

        {/* LISTEN */}
        {ex?.type==="listen"&&(<div><p style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,.35)",textAlign:"center",textTransform:"uppercase",letterSpacing:2,marginBottom:6,fontFamily:F}}>What does this mean?</p>
          <div style={{textAlign:"center",padding:18,borderRadius:18,background:"rgba(255,255,255,.03)",border:"2px solid rgba(255,255,255,.07)",marginBottom:20,animation:"bounceIn .4s ease"}}>
            <button onClick={()=>ttsSpeak(ex.word,SPEECH_LANGS[lang?.id])} style={{fontSize:28,background:"none",border:"none",cursor:"pointer",animation:"wiggle 1s ease-in-out infinite",padding:4}}>🔊</button>
            <p style={{fontSize:22,fontWeight:900,marginTop:6,fontFamily:F}}><TapText text={ex.word} dict={dict}/></p>
            <p style={{fontSize:10,color:"rgba(255,255,255,.25)",marginTop:4}}>Tap 🔊 to listen · Tap <span style={{borderBottom:"1px dashed rgba(255,255,255,.3)"}}>words</span> for meaning</p></div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>{ex.options.map((opt,i)=>{const isAns=normalize(opt)===normalize(ex.meaning),isPicked=picked===opt;let bg="rgba(255,255,255,.04)",bd="rgba(255,255,255,.1)";if(result&&isAns){bg="rgba(88,204,2,.12)";bd="#58CC02";}else if(result==="wrong"&&isPicked){bg="rgba(255,75,75,.12)";bd="#FF4B4B";}
            return <button key={opt} disabled={!!result} onClick={()=>submitAnswer(isAns?ex.meaning:"__wrong__",opt)} style={{padding:"14px 16px",borderRadius:14,border:`3px solid ${bd}`,backgroundColor:bg,color:"#fff",fontSize:14,fontWeight:700,cursor:result?"default":"pointer",transition:"all .2s",textAlign:"left",userSelect:"none",animation:`fadeUp .25s ease ${i*.06}s both`}}>
              <TapText text={opt} dict={dict}/>{result&&isAns&&<span style={{float:"right",animation:"bounceIn .3s ease"}}>✓</span>}{result==="wrong"&&isPicked&&<span style={{float:"right",animation:"bounceIn .3s ease"}}>✗</span>}
            </button>;})}</div></div>)}

        {/* FILL */}
        {ex?.type==="fill"&&(<div><p style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,.35)",textAlign:"center",textTransform:"uppercase",letterSpacing:2,marginBottom:6,fontFamily:F}}>Fill in the blank</p>
          <p style={{fontSize:22,fontWeight:900,textAlign:"center",marginBottom:4,lineHeight:1.5,fontFamily:F,animation:"fadeUp .3s ease"}}>
            {ex.sentence.split("_____").map((part,i,arr)=><span key={i}><TapText text={part} dict={dict}/>{i<arr.length-1&&<span style={{display:"inline-block",minWidth:60,borderBottom:"3px solid",borderColor:result==="correct"?"#58CC02":result==="wrong"?"#FF4B4B":lang?.color||"#1CB0F6",margin:"0 3px",padding:"0 3px",transition:"all .3s",fontStyle:"italic",color:result==="correct"?"#58CC02":result==="wrong"?"#FF4B4B":"#fff"}}>{result?(result==="correct"?fillVal:ex.answer):"\u00A0"}</span>}</span>)}</p>
          <p style={{fontSize:11,color:"rgba(255,255,255,.25)",textAlign:"center",marginBottom:20}}>💡 {ex.hint}</p>
          {!result&&(<div style={{display:"flex",gap:8,maxWidth:360,margin:"0 auto",animation:"fadeUp .3s ease .1s both"}}>
            <input value={fillVal} onChange={e=>setFillVal(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&fillVal.trim())submitAnswer(fillVal.trim(),fillVal.trim())}} placeholder="Type answer..." autoFocus style={{flex:1,padding:"13px 16px",borderRadius:12,border:"2px solid rgba(255,255,255,.12)",background:"rgba(255,255,255,.03)",color:"#fff",fontSize:15,fontWeight:700}}/>
            <button onClick={()=>{if(fillVal.trim())submitAnswer(fillVal.trim(),fillVal.trim())}} style={{padding:"13px 22px",borderRadius:12,border:"none",background:lang?.color||"#58CC02",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",boxShadow:`0 3px 0 ${lang?.color||"#58CC02"}88`}}>Check</button>
          </div>)}</div>)}

        {/* MATCH */}
        {ex?.type==="match"&&<MatchExercise key={`m-${exIdx}`} pairs={ex.pairs} onComplete={onMatchDone} dict={dict}/>}

        {/* STORY */}
        {ex?.type==="story"&&(<div>
          <div style={{padding:"16px",borderRadius:16,background:"linear-gradient(145deg,rgba(28,176,246,.06),rgba(28,176,246,.02))",border:"2px solid rgba(28,176,246,.1)",marginBottom:16,animation:"fadeUp .4s ease"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><span style={{fontSize:20}}>📖</span><span style={{fontSize:15,fontWeight:800,color:"#1CB0F6",fontFamily:F}}>{ex.title}</span></div>
            <p style={{fontSize:13,lineHeight:1.7,color:"rgba(255,255,255,.7)",fontWeight:600}}><TapText text={ex.story} dict={dict}/></p></div>
          <p style={{fontSize:13,fontWeight:800,color:"rgba(255,255,255,.55)",textAlign:"center",marginBottom:12,fontFamily:F}}><TapText text={ex.question} dict={dict}/></p>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>{ex.options.map((opt,i)=>{const isAns=normalize(opt)===normalize(ex.answer),isPicked=picked===opt;let bg="rgba(255,255,255,.04)",bd="rgba(255,255,255,.1)";if(result&&isAns){bg="rgba(88,204,2,.12)";bd="#58CC02";}else if(result==="wrong"&&isPicked){bg="rgba(255,75,75,.12)";bd="#FF4B4B";}
            return <button key={opt} disabled={!!result} onClick={()=>submitAnswer(isAns?ex.answer:"__wrong__",opt)} style={{padding:"12px 16px",borderRadius:14,border:`3px solid ${bd}`,backgroundColor:bg,color:"#fff",fontSize:14,fontWeight:700,cursor:result?"default":"pointer",transition:"all .2s",textAlign:"left",userSelect:"none",animation:`fadeUp .25s ease ${i*.06}s both`}}>
              <TapText text={opt} dict={dict}/>{result&&isAns&&<span style={{float:"right",animation:"bounceIn .3s ease"}}>✓</span>}{result==="wrong"&&isPicked&&<span style={{float:"right",animation:"bounceIn .3s ease"}}>✗</span>}
            </button>;})}</div></div>)}

        {/* SCRAMBLE */}
        {ex?.type==="scramble"&&!result&&<ScrambleExercise key={`s-${exIdx}`} word={ex.word} hint={ex.hint} display={ex.display} onComplete={onScrambleDone}/>}
        {ex?.type==="scramble"&&result&&(<div style={{textAlign:"center",animation:"fadeUp .3s ease"}}><p style={{fontSize:15,fontWeight:800,color:"rgba(255,255,255,.6)",marginBottom:6,fontFamily:F}}>🧩 Unscrambled!</p><p style={{fontSize:32,fontWeight:900,color:"#58CC02",fontFamily:F,animation:"bounceIn .4s ease"}}><TapText text={ex.word} dict={dict}/></p></div>)}

        {/* SPEAK */}
        {ex?.type==="speak"&&!result&&<SpeakExercise key={`sp-${exIdx}`} phrase={ex.phrase} meaning={ex.meaning} langCode={SPEECH_LANGS[lang?.id]} onComplete={onSpeakDone} dict={dict}/>}
        {ex?.type==="speak"&&result&&(<div style={{textAlign:"center",animation:"fadeUp .3s ease"}}><p style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,.35)",textTransform:"uppercase",letterSpacing:2,marginBottom:8,fontFamily:F}}>Speaking</p><p style={{fontSize:26,fontWeight:900,fontFamily:F,color:result==="correct"?"#58CC02":"#FF4B4B",animation:"bounceIn .4s ease"}}><TapText text={ex.phrase} dict={dict}/></p><p style={{fontSize:12,color:"rgba(255,255,255,.35)",marginTop:4}}>({ex.meaning})</p>{picked&&<div style={{marginTop:12,padding:"8px 14px",borderRadius:10,background:"rgba(255,255,255,.03)",border:"1.5px solid rgba(255,255,255,.08)",display:"inline-block"}}><p style={{fontSize:10,color:"rgba(255,255,255,.3)"}}>You said:</p><p style={{fontSize:14,fontWeight:700,color:"#fff"}}>{picked}</p></div>}</div>)}

        {/* Feedback toast */}
        {result&&ex?.type!=="match"&&ex?.type!=="scramble"&&ex?.type!=="speak"&&(<div style={{marginTop:20,padding:"12px 16px",borderRadius:14,background:result==="correct"?"rgba(88,204,2,.08)":"rgba(255,75,75,.08)",border:`2px solid ${result==="correct"?"#58CC02":"#FF4B4B"}`,display:"flex",alignItems:"center",gap:10,animation:"fadeUp .3s ease"}}>
          <span style={{fontSize:22,animation:"bounceIn .4s ease"}}>{result==="correct"?"🎉":"💪"}</span>
          <div><div style={{fontWeight:800,fontSize:14,color:result==="correct"?"#58CC02":"#FF4B4B"}}>{result==="correct"?"Excellent!":"Not quite!"}</div>
            {result==="wrong"&&(ex?.answer||ex?.meaning)&&<div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginTop:2}}>Correct: <strong style={{color:"#58CC02"}}>{ex.answer||ex.meaning}</strong></div>}</div></div>)}
      </div>

      {/* CONTINUE BUTTON */}
      {result&&(<div style={{padding:"14px 0 24px",flexShrink:0,animation:"fadeUp .2s ease"}}>
        <button onClick={handleContinue} style={{width:"100%",padding:"16px",borderRadius:14,border:"none",background:cColor,color:"#fff",fontSize:17,fontWeight:900,cursor:"pointer",textTransform:"uppercase",letterSpacing:1.5,fontFamily:F,"--sh":cShadow,"--gl":cColor+"44",boxShadow:`0 5px 0 ${cShadow}`,animation:"ctaPulse 2s ease-in-out infinite"}}>
          {(exIdx+1>=exercises.length||(result==="wrong"&&lives<=0))?"Finish":"Continue"}</button></div>)}
      </div>):(
        /* ══ LESSON COMPLETE ══ */
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",animation:"fadeUp .5s ease",padding:"20px 0"}}>
          <div style={{display:"flex",gap:12,marginBottom:14}}>{[ci,(ci+1)%CHARS.length,(ci+2)%CHARS.length].map((c,i)=><div key={i} style={{animation:`float ${2+i*.4}s ease-in-out infinite ${i*.2}s`}}><CharAvatar ci={c} size={50}/></div>)}</div>

          {/* ── Level Test Stars Display ── */}
          {isLevelTest&&(()=>{
            const acc=exercises.length>0?score/(exercises.length*10):0;
            const stars=acc>=0.9?3:acc>=0.7?2:acc>=0.4?1:0;
            return <div style={{marginBottom:16}}>
              {/* Big trophy or retry icon */}
              <span style={{fontSize:64,display:"block",marginBottom:8,animation:"bounceIn .6s ease"}}>{stars>0?"🏆":"😤"}</span>
              {/* Star row */}
              <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:12}}>
                {[1,2,3].map(s=><div key={s} style={{width:52,height:52,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",
                  background:s<=stars?"linear-gradient(145deg,#FFC80033,#FFC80011)":"rgba(255,255,255,.03)",
                  border:`2.5px solid ${s<=stars?"#FFC800":"rgba(255,255,255,.08)"}`,
                  animation:s<=stars?`starPop .5s ease ${.2+s*.2}s both`:"fadeUp .3s ease",
                  boxShadow:s<=stars?"0 0 16px #FFC80033":"none",transition:"all .3s"}}>
                  <span style={{fontSize:28,filter:s<=stars?"none":"grayscale(1) opacity(0.15)"}}>{s<=stars?"⭐":"☆"}</span>
                </div>)}
              </div>
              <h2 style={{fontSize:26,fontWeight:900,marginBottom:4,fontFamily:F,color:stars===3?"#FFC800":stars>0?"#fff":"#FF4B4B"}}>
                {stars===3?"★ Perfect Score! ★":stars===2?"Great Performance!":stars===1?"Level Passed!":"Not Quite — Try Again!"}
              </h2>
              {stars>0&&<div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 16px",borderRadius:10,background:"linear-gradient(135deg,#FFC80015,#FFC80008)",border:"1.5px solid #FFC80033",marginBottom:4}}>
                <span style={{fontSize:14}}>💎</span><span style={{fontSize:15,fontWeight:800,color:"#FFC800",fontFamily:F}}>+{stars*25} XP</span>
              </div>}
              {testUnit&&<p style={{fontSize:12,color:"rgba(255,255,255,.3)",marginTop:6}}>Unit {testUnit.unit}: {testUnit.title}</p>}
            </div>;
          })()}

          {/* ── Jump Test Result ── */}
          {isJumpTest&&(()=>{
            const acc=exercises.length>0?score/(exercises.length*10):0;
            const passed=acc>=0.7;
            return <div style={{marginBottom:16}}>
              <span style={{fontSize:64,display:"block",marginBottom:8,animation:"bounceIn .6s ease"}}>{passed?"⏭️":"🚫"}</span>
              <h2 style={{fontSize:26,fontWeight:900,marginBottom:6,fontFamily:F,color:passed?"#1CB0F6":"#FF4B4B"}}>
                {passed?"Unit Skipped!":"Not Quite — 70% Needed"}
              </h2>
              {passed&&jumpUnit&&<div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 18px",borderRadius:12,background:"linear-gradient(135deg,rgba(28,176,246,.1),rgba(28,176,246,.04))",border:"1.5px solid rgba(28,176,246,.2)",marginBottom:8,animation:"bounceIn .5s ease .3s both"}}>
                <span style={{fontSize:16}}>✅</span>
                <span style={{fontSize:14,fontWeight:800,color:"#1CB0F6",fontFamily:F}}>{jumpUnit.lessons.length} lessons unlocked</span>
                <span style={{fontSize:12}}>+50 XP</span>
              </div>}
              {!passed&&<p style={{fontSize:12,color:"rgba(255,255,255,.35)",marginTop:4}}>Your accuracy: {Math.round(acc*100)}% — you needed 70%</p>}
              {jumpUnit&&<p style={{fontSize:11,color:"rgba(255,255,255,.25)",marginTop:6}}>Unit {jumpUnit.unit}: {jumpUnit.title}</p>}
            </div>;
          })()}

          {/* ── Normal / Practice / Daily complete ── */}
          {!isLevelTest&&!isJumpTest&&<>
            <span style={{fontSize:64,animation:"bounceIn .6s ease",display:"block",marginBottom:10}}>{isDaily?(lives>0?"📅":"😤"):lives>0?(isPractice?"⚡":"🏆"):"💪"}</span>
            <h2 style={{fontSize:28,fontWeight:900,marginBottom:4,fontFamily:F}}>{isDaily?(lives>0?"Daily Complete!":"Try Again Tomorrow!"):(isPractice?(lives>0?"Practice Done!":"Keep Trying!"):(lives>0?"Lesson Complete!":"Keep Practicing!"))}</h2>
          </>}

          <p style={{color:"rgba(255,255,255,.4)",fontSize:14,fontWeight:600,marginBottom:6}}>{charMsg}</p>

          {/* Ramp-Up bonus display */}
          {rampUpActive&&lives>0&&!isPractice&&!isLevelTest&&!isJumpTest&&<div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 22px",borderRadius:14,
            background:"linear-gradient(135deg,rgba(206,130,255,.12),rgba(255,75,75,.06))",border:"2px solid rgba(206,130,255,.25)",
            marginBottom:12,animation:"bounceIn .5s ease .2s both"}}>
            <span style={{fontSize:24,animation:"pulse 1.5s ease-in-out infinite"}}>🚀</span>
            <div>
              <div style={{fontSize:18,fontWeight:900,color:"#CE82FF",fontFamily:F}}>+{RAMPUP_XP} XP</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>Ramp-Up Bonus • ⏱ {rampUpElapsed}</div>
            </div>
            <div style={{marginLeft:"auto",textAlign:"right"}}>
              <div style={{fontSize:12,fontWeight:800,color:"#FFC800"}}>{rampUpLessons} lessons</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,.25)"}}>{rampUpXpEarned} total XP</div>
            </div>
          </div>}

          {/* Daily challenge bonus XP display */}
          {isDaily&&lives>0&&<div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 20px",borderRadius:14,background:"linear-gradient(135deg,rgba(206,130,255,.1),rgba(28,176,246,.06))",border:"1.5px solid rgba(206,130,255,.2)",marginBottom:8,animation:"bounceIn .5s ease .2s both"}}>
            <span style={{fontSize:20}}>💎</span>
            <span style={{fontSize:16,fontWeight:800,color:"#CE82FF",fontFamily:F}}>+{Math.round((exercises.length>0?score/(exercises.length*10):0)*100)} XP</span>
            <span style={{fontSize:11,color:"rgba(255,255,255,.3)"}}>Daily Bonus</span>
          </div>}
          {isDaily&&lives>0&&<p style={{fontSize:11,color:"rgba(255,255,255,.3)",marginBottom:16}}>Next daily refreshes at midnight</p>}

          {/* Stats grid for normal lessons */}
          {!isPractice&&!isLevelTest&&!isDaily&&!isJumpTest&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:32,width:"100%",maxWidth:320}}>
            {[{l:"XP",v:`+${rampUpActive?RAMPUP_XP:score}`,i:"💎",c:"#FFC800"},{l:"Accuracy",v:`${exercises.length>0?Math.round(score/(exercises.length*10)*100):0}%`,i:"🎯",c:"#1CB0F6"},{l:"Streak",v:streak,i:"🔥",c:"#FF9600"}].map((s,i)=>
              <div key={i} style={{padding:"12px 6px",borderRadius:14,background:"rgba(255,255,255,.03)",border:"2px solid rgba(255,255,255,.05)",animation:`fadeUp .4s ease ${.1+i*.08}s both`}}>
                <div style={{fontSize:20}}>{s.i}</div><div style={{fontSize:20,fontWeight:900,color:s.c,marginTop:2,fontFamily:F}}>{s.v}</div><div style={{fontSize:9,color:"rgba(255,255,255,.3)",fontWeight:700}}>{s.l}</div></div>)}
          </div>}
          {(isPractice||isLevelTest||isJumpTest)&&<div style={{marginBottom:24}}/>}

          <button onClick={goPath} style={{padding:"16px 48px",borderRadius:16,border:"none",
            background:isJumpTest?"linear-gradient(135deg,#1CB0F6,#0088ccbb)":isDaily?"linear-gradient(135deg,#CE82FF,#1CB0F6bb)":isLevelTest?"linear-gradient(135deg,#FFC800,#FF9600bb)":isPractice?"linear-gradient(135deg,#FF9600,#FF7600bb)":`linear-gradient(135deg,${lang?.color||"#58CC02"},${lang?.color||"#58CC02"}bb)`,
            color:"#fff",fontSize:17,fontWeight:900,cursor:"pointer",fontFamily:F,
            boxShadow:isJumpTest?"0 5px 0 #00669977":isDaily?"0 5px 0 #8855cc77":isLevelTest?"0 5px 0 #cc880077":isPractice?"0 5px 0 #cc660077":`0 5px 0 ${lang?.color||"#58CC02"}77`,
            textTransform:"uppercase",letterSpacing:1.5}}>Continue</button>
        </div>
      )}
    </div>)}

    {/* ══════ LEAGUES SCREEN — Duolingo-style leaderboard ══════ */}
    {screen==="path"&&activeTab==="leagues"&&lang&&(()=>{
      // Build sorted leaderboard: 29 bots + you
      const you={name:"You",flag:lang.flag,xp,id:"you",isYou:true};
      const board=[you,...leaguePlayers].sort((a,b)=>b.xp-a.xp);
      const yourRank=board.findIndex(p=>p.isYou)+1;
      const PROMO=10,SAFE=25; // top 10 promote, 11-25 safe, 26-30 demote
      const lg=getLeague();

      return <div style={{maxWidth:480,margin:"0 auto",padding:"0 20px 90px",position:"relative",zIndex:2}}>
        {/* ═══ LEAGUE HEADER — Duolingo-style animated crystal ═══ */}
        <div style={{padding:"20px 0 16px",textAlign:"center",position:"relative",overflow:"hidden"}}>
          {/* Diamond: aurora borealis background */}
          {lg.tier===6&&<div style={{position:"absolute",inset:0,
            background:"linear-gradient(135deg,rgba(64,216,240,.04),rgba(144,240,255,.02),rgba(206,130,255,.04),rgba(255,200,0,.02),rgba(64,216,240,.03))",
            backgroundSize:"400% 400%",animation:"aurora 8s ease infinite",pointerEvents:"none"}}/>}
          {/* Background glow — Diamond gets ice-blue mega glow */}
          <div style={{position:"absolute",top:"20%",left:"50%",transform:"translateX(-50%)",width:lg.tier===6?320:250,height:lg.tier===6?320:250,borderRadius:"50%",
            background:lg.tier===6?`radial-gradient(circle,#40D8F040 0%,#90F0FF18 30%,#CE82FF08 60%,transparent 80%)`:`radial-gradient(circle,${lg.color}25 0%,${lg.color}08 40%,transparent 70%)`,
            animation:lg.tier===6?"pulse 2s ease-in-out infinite":"pulse 3s ease-in-out infinite",pointerEvents:"none"}}/>

          {/* Diamond: second pulsing ring */}
          {lg.tier===6&&<div style={{position:"absolute",top:"25%",left:"50%",transform:"translateX(-50%)",width:220,height:220,borderRadius:"50%",
            border:"2px solid rgba(64,216,240,.12)",animation:"pulse 2.5s ease-in-out infinite",pointerEvents:"none"}}/>}

          {/* Rotating light rays — Diamond gets double rays + rainbow */}
          <div style={{position:"absolute",top:"30%",left:"50%",transform:"translateX(-50%)",width:200,height:200,animation:"leagueRays 20s linear infinite",opacity:lg.tier===6?.18:.12,pointerEvents:"none"}}>
            {[...Array(lg.tier===6?12:8)].map((_,i)=><div key={i} style={{position:"absolute",top:"50%",left:"50%",width:lg.tier===6?3:2.5,height:lg.tier===6?120:100,
              background:lg.tier===6?`linear-gradient(180deg,${["#40D8F0","#90F0FF","#CE82FF","#FFC800","#fff","#FF6B8A","#58CC02","#1CB0F6","#40D8F0","#FF9600","#CE82FF","#fff"][i]},transparent)`:`linear-gradient(180deg,${lg.color},transparent)`,transformOrigin:"top center",
              transform:`rotate(${i*(lg.tier===6?30:45)}deg)`,borderRadius:4}}/>)}
          </div>

          {/* Diamond: counter-rotating inner rays */}
          {lg.tier===6&&<div style={{position:"absolute",top:"32%",left:"50%",transform:"translateX(-50%)",width:160,height:160,animation:"leagueRays 15s linear infinite reverse",opacity:.08,pointerEvents:"none"}}>
            {[...Array(6)].map((_,i)=><div key={i} style={{position:"absolute",top:"50%",left:"50%",width:2,height:80,
              background:`linear-gradient(180deg,#fff,transparent)`,transformOrigin:"top center",
              transform:`rotate(${i*60}deg)`,borderRadius:4}}/>)}
          </div>}

          {/* Floating sparkle particles — Diamond gets 20 with rainbow colors */}
          <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
            {[...Array(lg.tier===6?20:12)].map((_,i)=><div key={i} style={{position:"absolute",
              width:lg.tier===6?3+Math.random()*7:3+Math.random()*5,height:lg.tier===6?3+Math.random()*7:3+Math.random()*5,borderRadius:lg.tier===6&&i%4===0?"2px":"50%",
              background:lg.tier===6?["#fff","#40D8F0","#90F0FF","#CE82FF","#FFC800","#FF6B8A","#58CC02","#1CB0F6"][i%8]:i%3===0?"#fff":i%3===1?lg.color:"#FFC800",
              left:`${10+Math.random()*80}%`,top:`${5+Math.random()*55}%`,
              opacity:lg.tier===6?.2+Math.random()*.4:.15+Math.random()*.25,
              animation:`sparkle ${1+Math.random()*2}s ease-in-out ${Math.random()*2}s infinite`,
              transform:lg.tier===6&&i%4===0?`rotate(${Math.random()*360}deg)`:"none",
              boxShadow:lg.tier===6?`0 0 ${6+Math.random()*10}px ${["#40D8F0","#90F0FF","#CE82FF","#fff"][i%4]}55`:`0 0 ${4+Math.random()*6}px ${i%2===0?lg.color:"#fff"}44`}}/>)}
          </div>

          {/* Diamond: floating ice crystal shapes */}
          {lg.tier===6&&<div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
            {[...Array(6)].map((_,i)=><div key={i} style={{position:"absolute",
              left:`${5+i*16}%`,top:`${15+Math.random()*40}%`,
              width:0,height:0,
              borderLeft:`${4+Math.random()*5}px solid transparent`,borderRight:`${4+Math.random()*5}px solid transparent`,
              borderBottom:`${8+Math.random()*10}px solid rgba(144,240,255,${.06+Math.random()*.1})`,
              transform:`rotate(${Math.random()*360}deg)`,
              animation:`float ${3+Math.random()*3}s ease-in-out ${Math.random()*2}s infinite`,
              filter:"blur(0.5px)"}}/>)}
          </div>}

          {/* Shield badge — floating animation */}
          <div style={{position:"relative",zIndex:5,display:"inline-block",marginBottom:8}}>
            <div style={{animation:lg.tier===6?"bounce 2s ease-in-out infinite":"charIdle 3s ease-in-out infinite",
              filter:lg.tier===6?`drop-shadow(0 0 30px #40D8F066) drop-shadow(0 0 50px #90F0FF33) drop-shadow(0 4px 12px rgba(0,0,0,.3))`:`drop-shadow(0 0 20px ${lg.color}44) drop-shadow(0 4px 12px rgba(0,0,0,.3))`}}>
              <div style={lg.tier===6?{animation:"diamondPulse 3s ease-in-out infinite"}:{}}>
                <LeagueShield color={lg.color} tier={lg.tier} size={lg.tier===6?95:80}/>
              </div>
            </div>
            {/* Orbiting sparkles — Diamond gets 6 with rainbow */}
            {(lg.tier===6?[0,60,120,180,240,300]:[0,120,240]).map((deg,i)=><div key={i} style={{position:"absolute",top:"50%",left:"50%",width:lg.tier===6?7:6,height:lg.tier===6?7:6,borderRadius:lg.tier===6&&i%2===0?"1px":"50%",
              background:lg.tier===6?["#fff","#40D8F0","#CE82FF","#FFC800","#90F0FF","#FF6B8A"][i]:i===0?"#fff":i===1?lg.color:"#FFC800",
              boxShadow:lg.tier===6?`0 0 12px ${["#fff","#40D8F0","#CE82FF","#FFC800","#90F0FF","#FF6B8A"][i]}88`:`0 0 8px ${i===0?"#fff":lg.color}66`,
              transform:`rotate(${deg}deg) translateX(${lg.tier===6?55:50}px) translateY(-50%)`,
              animation:`leagueRays ${3+i*.5}s linear infinite`,opacity:lg.tier===6?.8:.6}}/>)}
          </div>

          {/* League title — Diamond gets rainbow gradient text */}
          {lg.tier===6?
            <h2 style={{fontSize:26,fontWeight:900,fontFamily:F,position:"relative",zIndex:5,
              background:"linear-gradient(135deg,#40D8F0,#90F0FF,#CE82FF,#FFC800,#40D8F0)",backgroundSize:"200% 200%",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
              animation:"gradientShift 4s ease infinite",
              filter:"drop-shadow(0 0 10px rgba(64,216,240,.3))"}}>💎 Diamond League 💎</h2>
          :
            <h2 style={{fontSize:24,fontWeight:900,fontFamily:F,color:lg.color,position:"relative",zIndex:5,
              textShadow:`0 0 20px ${lg.color}33`}}>{lg.name} League</h2>
          }

          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginTop:6,position:"relative",zIndex:5}}>
            <span style={{fontSize:10,padding:"3px 10px",borderRadius:8,background:"rgba(88,204,2,.12)",color:"#58CC02",fontWeight:800,border:"1px solid rgba(88,204,2,.2)"}}>⏱ {leagueTimeLeft||"6D 0H"}</span>
            <span style={{fontSize:10,padding:"3px 10px",borderRadius:8,background:`${lg.color}12`,color:lg.color,fontWeight:800,border:`1px solid ${lg.color}22`}}>◆ PHOENIX</span>
            {lg.tier===6&&<span style={{fontSize:10,padding:"3px 10px",borderRadius:8,
              background:"linear-gradient(135deg,rgba(64,216,240,.12),rgba(206,130,255,.08))",
              border:"1px solid rgba(64,216,240,.25)",
              color:"#90F0FF",fontWeight:900,letterSpacing:1}}>✦ ELITE</span>}
          </div>
          <p style={{fontSize:11,color:"rgba(255,255,255,.3)",marginTop:6,position:"relative",zIndex:5}}>Top 10 promote · Bottom 5 demote</p>
        </div>

        {/* Zone legend */}
        <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:14}}>
          {[{c:"#58CC02",l:"Promotion",n:"1-10"},{c:"rgba(255,255,255,.15)",l:"Safe Zone",n:"11-25"},{c:"#FF4B4B",l:"Demotion",n:"26-30"}].map((z,i)=>
            <div key={i} style={{display:"flex",alignItems:"center",gap:4}}>
              <div style={{width:10,height:10,borderRadius:3,background:z.c}}/>
              <span style={{fontSize:9,color:"rgba(255,255,255,.35)",fontWeight:700}}>{z.l} ({z.n})</span>
            </div>)}
        </div>

        {/* Leaderboard list */}
        <div style={{display:"flex",flexDirection:"column",gap:3}}>
          {board.map((p,i)=>{
            const rank=i+1;
            const inPromo=rank<=PROMO;
            const inDemote=rank>SAFE;
            const isYou=p.isYou;
            const zoneBg=inPromo?"rgba(88,204,2,.06)":inDemote?"rgba(255,75,75,.06)":"rgba(255,255,255,.015)";
            const zoneBd=inPromo?"rgba(88,204,2,.15)":inDemote?"rgba(255,75,75,.15)":"rgba(255,255,255,.04)";
            const rankColor=rank===1?"#FFC800":rank===2?"#C0C0C0":rank===3?"#CD7F32":inPromo?"#58CC02":inDemote?"#FF4B4B":"rgba(255,255,255,.3)";

            return <div key={p.id} style={{display:"flex",alignItems:"center",gap:10,padding:isYou?"12px 12px":"10px 12px",borderRadius:12,
              background:isYou?`linear-gradient(135deg,${lg.color}18,${lg.color}08)`:zoneBg,
              border:isYou?`2px solid ${lg.color}44`:`1.5px solid ${zoneBd}`,
              animation:`fadeUp .2s ease ${i*.02}s both`,transition:"all .2s",
              transform:isYou?"scale(1.02)":"scale(1)",boxShadow:isYou?`0 4px 16px ${lg.color}22`:"none"}}>

              {/* Rank number */}
              <div style={{width:28,textAlign:"center",flexShrink:0}}>
                {rank<=3?<span style={{fontSize:rank===1?20:16}}>{rank===1?"🥇":rank===2?"🥈":"🥉"}</span>:
                <span style={{fontSize:13,fontWeight:900,color:rankColor,fontFamily:F}}>{rank}</span>}
              </div>

              {/* Avatar */}
              <div style={{width:36,height:36,borderRadius:10,background:isYou?`${lg.color}22`:"rgba(255,255,255,.04)",border:`2px solid ${isYou?lg.color+"44":"rgba(255,255,255,.06)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:isYou?20:18,flexShrink:0}}>
                {isYou?(AVATARS[avatarId]?.emoji||"🦉"):p.flag}
              </div>

              {/* Name + streak */}
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:5}}>
                  <span style={{fontSize:13,fontWeight:isYou?900:700,color:isYou?"#fff":"rgba(255,255,255,.7)",fontFamily:F,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}{isYou&&" (You)"}</span>
                  {!isYou&&p.streak&&<span style={{fontSize:8,padding:"1px 5px",borderRadius:4,background:"rgba(88,204,2,.1)",color:"#58CC02",fontWeight:700,border:"1px solid rgba(88,204,2,.15)",whiteSpace:"nowrap"}}>🔥 {p.streak}</span>}
                  {isYou&&streak>0&&<span style={{fontSize:8,padding:"1px 5px",borderRadius:4,background:"rgba(255,150,0,.1)",color:"#FF9600",fontWeight:700,border:"1px solid rgba(255,150,0,.15)",whiteSpace:"nowrap"}}>🔥 {streak} day{streak!==1?"s":""}</span>}
                </div>
              </div>

              {/* XP */}
              <div style={{textAlign:"right",flexShrink:0}}>
                <span style={{fontSize:13,fontWeight:800,color:isYou?lg.color:"rgba(255,255,255,.5)",fontFamily:F}}>{p.xp} XP</span>
              </div>

              {/* Zone indicator */}
              <div style={{width:6,height:28,borderRadius:3,flexShrink:0,
                background:inPromo?"linear-gradient(180deg,#58CC02,#4CAF00)":inDemote?"linear-gradient(180deg,#FF4B4B,#d03030)":"rgba(255,255,255,.06)"}}/>
            </div>;
          })}
        </div>

        {/* Your status card */}
        <div style={{margin:"16px 0",padding:"16px 20px",borderRadius:16,
          background:yourRank<=PROMO?"linear-gradient(135deg,rgba(88,204,2,.1),rgba(88,204,2,.03))":yourRank>SAFE?"linear-gradient(135deg,rgba(255,75,75,.1),rgba(255,75,75,.03))":"linear-gradient(135deg,rgba(255,255,255,.04),rgba(255,255,255,.01))",
          border:`2px solid ${yourRank<=PROMO?"rgba(88,204,2,.2)":yourRank>SAFE?"rgba(255,75,75,.2)":"rgba(255,255,255,.06)"}`,
          textAlign:"center",animation:"fadeUp .4s ease"}}>
          <span style={{fontSize:13,fontWeight:800,fontFamily:F,
            color:yourRank<=PROMO?"#58CC02":yourRank>SAFE?"#FF4B4B":"rgba(255,255,255,.5)"}}>
            {yourRank<=PROMO?`⬆️ Rank #${yourRank} — Promotion Zone!`:yourRank>SAFE?`⬇️ Rank #${yourRank} — Demotion Zone!`:`📍 Rank #${yourRank} — Safe Zone`}
          </span>
          {yourRank<=PROMO&&getNextLeague()&&<p style={{fontSize:11,color:"rgba(255,255,255,.3)",marginTop:4}}>You'll advance to {getNextLeague().name} {getNextLeague().icon} at week end!</p>}
          {yourRank>SAFE&&leagueIdx>0&&<p style={{fontSize:11,color:"rgba(255,255,255,.3)",marginTop:4}}>Earn more XP to avoid dropping to {LEAGUES[leagueIdx-1].name}!</p>}
        </div>

        {/* Promote / Demote buttons */}
        {(()=>{const canPromote=yourRank<=PROMO&&leagueIdx<LEAGUES.length-1;const canDemote=yourRank>SAFE&&leagueIdx>0;
        return <div style={{display:"flex",gap:10,marginBottom:16}}>
          <button onClick={canDemote?demoteLeague:undefined} disabled={!canDemote} style={{flex:1,padding:"12px",borderRadius:12,border:"none",
            background:canDemote?"linear-gradient(135deg,#FF4B4B,#d03030)":"rgba(255,255,255,.03)",
            color:canDemote?"#fff":"rgba(255,255,255,.12)",fontSize:13,fontWeight:800,cursor:canDemote?"pointer":"default",
            fontFamily:F,boxShadow:canDemote?"0 3px 0 #a82020":"none",opacity:canDemote?1:.35,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
            ⬇️ Demote {canDemote?`to ${LEAGUES[leagueIdx-1].name}`:""}
          </button>
          <button onClick={canPromote?promoteLeague:undefined} disabled={!canPromote} style={{flex:1,padding:"12px",borderRadius:12,border:"none",
            background:canPromote?"linear-gradient(135deg,#58CC02,#4CAF00)":"rgba(255,255,255,.03)",
            color:canPromote?"#fff":"rgba(255,255,255,.12)",fontSize:13,fontWeight:800,cursor:canPromote?"pointer":"default",
            fontFamily:F,boxShadow:canPromote?"0 3px 0 #388200":"none",opacity:canPromote?1:.35,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
            ⬆️ Promote {canPromote?`to ${LEAGUES[leagueIdx+1].name}`:""}
          </button>
        </div>;})()}

        {/* All leagues tiers */}
        <h3 style={{fontSize:13,fontWeight:800,fontFamily:F,color:"rgba(255,255,255,.3)",marginBottom:8}}>All Leagues</h3>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center"}}>
          {LEAGUES.map((l,i)=><div key={l.name} style={{padding:"6px 10px",borderRadius:10,display:"flex",alignItems:"center",gap:4,
            background:i===leagueIdx?`${l.color}18`:"rgba(255,255,255,.02)",border:`1.5px solid ${i===leagueIdx?l.color+"44":"rgba(255,255,255,.05)"}`,opacity:i<=leagueIdx?1:.35,cursor:"pointer"}} onClick={()=>setLeagueIdx(i)}>
            <LeagueShield color={l.color} tier={l.tier} size={22}/>
            <span style={{fontSize:10,fontWeight:800,color:i===leagueIdx?l.color:"rgba(255,255,255,.4)",fontFamily:F}}>{l.name}</span>
          </div>)}
        </div>
      </div>;
    })()}

    {/* ══════ QUESTS SCREEN ══════ */}
    {screen==="path"&&activeTab==="quests"&&lang&&(<div style={{maxWidth:480,margin:"0 auto",padding:"0 20px 90px",position:"relative",zIndex:2}}>
      <div style={{padding:"16px 0",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
        <h2 style={{fontSize:24,fontWeight:900,fontFamily:F,textAlign:"center"}}>⚔️ Daily Quests</h2>
      </div>
      <p style={{fontSize:12,color:"rgba(255,255,255,.35)",textAlign:"center",margin:"12px 0 20px"}}>Complete quests to earn bonus XP</p>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {QUESTS.map((q,i)=>{const cur=Math.min(q.getCurrent(),q.target);const pct=Math.round(cur/q.target*100);const done2=pct>=100;
          return <div key={q.id} style={{padding:"16px",borderRadius:16,background:done2?`linear-gradient(135deg,${q.color}12,${q.color}04)`:"rgba(255,255,255,.02)",
            border:`2px solid ${done2?q.color+"33":"rgba(255,255,255,.06)"}`,animation:`fadeUp .3s ease ${i*.08}s both`}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
              <div style={{width:42,height:42,borderRadius:12,background:done2?`${q.color}15`:"rgba(255,255,255,.04)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,border:`2px solid ${done2?q.color+"33":"rgba(255,255,255,.06)"}`}}>{done2?"✅":q.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:800,color:done2?q.color:"#fff",fontFamily:F}}>{q.title}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{q.desc}</div>
              </div>
              <span style={{fontSize:12,fontWeight:800,color:done2?q.color:"rgba(255,255,255,.3)",fontFamily:F}}>{done2?"Done!":pct+"%"}</span>
            </div>
            <ProgressBar current={cur} total={q.target} color={q.color} h={6}/>
          </div>;
        })}
      </div>
    </div>)}

    {/* ══════ PROFILE SCREEN ══════ */}
    {screen==="path"&&activeTab==="profile"&&lang&&(<div style={{maxWidth:480,margin:"0 auto",padding:"0 20px 90px",position:"relative",zIndex:2}}>
      <div style={{padding:"16px 0",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
        <h2 style={{fontSize:24,fontWeight:900,fontFamily:F,textAlign:"center"}}>👤 Profile</h2>
      </div>
      {/* Avatar card */}
      <div style={{margin:"20px 0",padding:"24px",borderRadius:20,background:"linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.01))",border:"2px solid rgba(255,255,255,.06)",textAlign:"center",animation:"fadeUp .4s ease"}}>
        {/* Main avatar display */}
        <div onClick={()=>setShowAvatarPicker(!showAvatarPicker)} style={{cursor:"pointer",position:"relative",display:"inline-block"}}>
          <div style={{width:90,height:90,borderRadius:22,background:`linear-gradient(145deg,${AVATARS[avatarId]?.bg||"#58CC02"}33,${AVATARS[avatarId]?.bg||"#58CC02"}11)`,
            border:`3px solid ${AVATARS[avatarId]?.bg||"#58CC02"}44`,display:"flex",alignItems:"center",justifyContent:"center",
            animation:"charIdle 3s ease-in-out infinite",fontSize:48}}>
            {AVATARS[avatarId]?.emoji||"🦉"}
          </div>
          <div style={{position:"absolute",bottom:-4,right:-4,width:26,height:26,borderRadius:8,background:"#1CB0F6",border:"2px solid #0d1114",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>✏️</div>
        </div>
        <h3 style={{fontSize:22,fontWeight:900,fontFamily:F,marginTop:12}}>{AVATARS[avatarId]?.name||"Learner"}</h3>
        <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:6}}>
          <div style={{padding:"3px 10px",borderRadius:8,background:getLeague().color+"15",border:`1.5px solid ${getLeague().color}33`}}>
            <span style={{fontSize:11,fontWeight:800,color:getLeague().color,display:"flex",alignItems:"center",gap:3}}><LeagueShield color={getLeague().color} tier={getLeague().tier} size={18}/> {getLeague().name}</span>
          </div>
          <div style={{padding:"3px 10px",borderRadius:8,background:"rgba(255,150,0,.1)",border:"1.5px solid rgba(255,150,0,.2)"}}>
            <span style={{fontSize:11,fontWeight:800,color:"#FF9600"}}>🔥 {streak}</span>
          </div>
        </div>

        {/* Avatar picker grid */}
        {showAvatarPicker&&<div style={{marginTop:16,padding:"14px",borderRadius:16,background:"rgba(0,0,0,.15)",border:"1.5px solid rgba(255,255,255,.06)",animation:"fadeUp .3s ease"}}>
          <p style={{fontSize:11,color:"rgba(255,255,255,.4)",fontWeight:700,marginBottom:10}}>Choose your avatar</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
            {AVATARS.map(av=>{
              const selected=av.id===avatarId;
              return <button key={av.id} onClick={()=>{setAvatarId(av.id);setShowAvatarPicker(false);}} style={{
                padding:"10px 4px",borderRadius:14,border:selected?`2.5px solid ${av.bg}`:"2px solid rgba(255,255,255,.06)",
                background:selected?`${av.bg}18`:"rgba(255,255,255,.02)",cursor:"pointer",transition:"all .2s",
                display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <span style={{fontSize:28}}>{av.emoji}</span>
                <span style={{fontSize:8,fontWeight:700,color:selected?av.bg:"rgba(255,255,255,.3)"}}>{av.name}</span>
              </button>;
            })}
          </div>
        </div>}
      </div>
      {/* Stats grid */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
        {[{l:"Total XP",v:xp.toLocaleString(),i:"💎",c:"#FFC800"},{l:"Level",v:level,i:"⬆️",c:"#1CB0F6"},{l:"Streak",v:streak,i:"🔥",c:"#FF9600"},{l:"Lessons Done",v:Object.keys(done).length,i:"📚",c:"#58CC02"},{l:"Languages",v:LANGS.length,i:"🌍",c:"#CE82FF"},{l:"League",v:getLeague().name,i:getLeague().icon,c:getLeague().color}].map((s,i)=>
          <div key={i} style={{padding:"14px",borderRadius:14,background:"rgba(255,255,255,.02)",border:"1.5px solid rgba(255,255,255,.05)",textAlign:"center",animation:`fadeUp .3s ease ${i*.05}s both`}}>
            <span style={{fontSize:22}}>{s.i}</span>
            <div style={{fontSize:20,fontWeight:900,color:s.c,fontFamily:F,marginTop:4}}>{s.v}</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,.3)",fontWeight:700}}>{s.l}</div>
          </div>)}
      </div>
      {/* Achievements */}
      <h3 style={{fontSize:16,fontWeight:900,fontFamily:F,marginBottom:12}}>🏅 Achievements ({ACHIEVEMENTS.filter(a=>a.id==="jump_pass"?jumpPassed:a.check()).length}/{ACHIEVEMENTS.length})</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {ACHIEVEMENTS.map((a,i)=>{const unlocked=a.id==="jump_pass"?jumpPassed:a.check();
          return <div key={a.id} style={{padding:"12px",borderRadius:14,background:unlocked?"rgba(88,204,2,.04)":"rgba(255,255,255,.02)",border:`1.5px solid ${unlocked?"rgba(88,204,2,.15)":"rgba(255,255,255,.05)"}`,
            opacity:unlocked?1:.4,animation:`fadeUp .2s ease ${i*.03}s both`}}>
            <span style={{fontSize:20}}>{unlocked?a.icon:"🔒"}</span>
            <div style={{fontSize:11,fontWeight:800,color:unlocked?"#fff":"rgba(255,255,255,.3)",fontFamily:F,marginTop:4}}>{a.title}</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,.25)"}}>{a.desc}</div>
          </div>;
        })}
      </div>

      {/* Reset progress */}
      <div style={{marginTop:24,textAlign:"center"}}>
        <button onClick={async()=>{if(confirm("Reset ALL progress? This cannot be undone.")){
          setXp(0);setStreak(0);setLevel(1);setDone({});setLeagueIdx(0);setUnitStars({});
          setDailyDone({});setDailyCount({});setLessonsCompleted(0);setJumpPassed(false);
          setAvatarId(0);setLeagueWeekStart(Date.now());
          try{await window.storage.delete("linguaquest-progress");}catch(e){}
        }}} style={{padding:"10px 24px",borderRadius:12,border:"2px solid rgba(255,75,75,.15)",background:"rgba(255,75,75,.04)",
          color:"rgba(255,75,75,.5)",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all .2s"}}>
          🗑️ Reset All Progress
        </button>
        <p style={{fontSize:10,color:"rgba(255,255,255,.15)",marginTop:6}}>Progress saves automatically</p>
      </div>
    </div>)}

    {/* ══════ PROGRESS SCREEN ══════ */}
    {screen==="path"&&activeTab==="progress"&&lang&&(<div style={{maxWidth:480,margin:"0 auto",padding:"0 20px 90px",position:"relative",zIndex:2}}>
      <div style={{padding:"16px 0",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
        <h2 style={{fontSize:24,fontWeight:900,fontFamily:F,textAlign:"center"}}>📊 Progress</h2>
      </div>
      {/* Course completion */}
      <div style={{margin:"20px 0",padding:"20px",borderRadius:16,background:"rgba(255,255,255,.02)",border:"1.5px solid rgba(255,255,255,.06)",animation:"fadeUp .4s ease"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
          <span style={{fontSize:15,fontWeight:800,fontFamily:F}}>{lang.flag} {lang.name}</span>
          <span style={{fontSize:13,fontWeight:800,color:lang.color,fontFamily:F}}>{Math.round(allLessons.length>0?Object.keys(done).filter(k=>k.startsWith(lang.id+"-")).length/allLessons.length*100:0)}%</span>
        </div>
        <ProgressBar current={Object.keys(done).filter(k=>k.startsWith(lang.id+"-")).length} total={allLessons.length} color={lang.color}/>
        <p style={{fontSize:11,color:"rgba(255,255,255,.3)",marginTop:6}}>{Object.keys(done).filter(k=>k.startsWith(lang.id+"-")).length} of {allLessons.length} lessons complete</p>
      </div>
      {/* Unit-by-unit breakdown */}
      <h3 style={{fontSize:14,fontWeight:800,fontFamily:F,marginBottom:12,color:"rgba(255,255,255,.5)"}}>Unit Progress</h3>
      {units.map((unit,i)=>{
        const unitDone=unit.lessons.filter(l=>done[`${lang.id}-${l.id}`]).length;const total=unit.lessons.length;const pct=Math.round(unitDone/total*100);
        const stars=unitStars[`${lang.id}-${unit.unit}`]||0;
        return <div key={unit.unit} style={{padding:"14px 16px",borderRadius:14,background:"rgba(255,255,255,.02)",border:"1.5px solid rgba(255,255,255,.05)",marginBottom:8,animation:`fadeUp .3s ease ${i*.08}s both`}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
            <span style={{fontSize:18}}>{unit.icon}</span>
            <div style={{flex:1}}>
              <span style={{fontSize:13,fontWeight:800,fontFamily:F}}>Unit {unit.unit}: {unit.title}</span>
              <div style={{fontSize:10,color:"rgba(255,255,255,.3)"}}>{unitDone}/{total} lessons</div>
            </div>
            <span style={{fontSize:13,fontWeight:800,color:unit.sColor,fontFamily:F}}>{pct}%</span>
            {stars>0&&<div style={{display:"flex",gap:1}}>{[1,2,3].map(s=><span key={s} style={{fontSize:10}}>{s<=stars?"⭐":"☆"}</span>)}</div>}
          </div>
          <ProgressBar current={unitDone} total={total} color={unit.sColor} h={5}/>
        </div>;
      })}
      {/* XP History */}
      <h3 style={{fontSize:14,fontWeight:800,fontFamily:F,marginTop:20,marginBottom:12,color:"rgba(255,255,255,.5)"}}>Stats</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
        {[{l:"XP/Lesson",v:Object.keys(done).length>0?Math.round(xp/Object.keys(done).length):0,c:"#FFC800"},{l:"Daily Done",v:dailyCount[lang?.id]||0,c:"#CE82FF"},{l:"Stars",v:Object.values(unitStars).reduce((a,b)=>a+b,0),c:"#FF9600"}].map((s,i)=>
          <div key={i} style={{padding:"12px 8px",borderRadius:12,background:"rgba(255,255,255,.02)",border:"1.5px solid rgba(255,255,255,.05)",textAlign:"center"}}>
            <div style={{fontSize:18,fontWeight:900,color:s.c,fontFamily:F}}>{s.v}</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,.25)",fontWeight:700}}>{s.l}</div>
          </div>)}
      </div>
    </div>)}

    {/* ══════ BOTTOM NAVIGATION BAR ══════ */}
    {screen==="path"&&<div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:50,background:"linear-gradient(180deg,transparent,rgba(13,17,20,.95) 20%,rgba(13,17,20,.99))",paddingTop:20}}>
      <div style={{maxWidth:480,margin:"0 auto",display:"flex",justifyContent:"space-around",padding:"8px 12px 12px",borderTop:"1px solid rgba(255,255,255,.06)"}}>
        {[{id:"learn",icon:"📖",label:"Learn"},{id:"leagues",icon:"🏆",label:"Leagues"},{id:"quests",icon:"⚔️",label:"Quests"},{id:"profile",icon:"👤",label:"Profile"},{id:"progress",icon:"📊",label:"Progress"}].map(tab=>
          <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"6px 12px",borderRadius:12,border:"none",
            background:activeTab===tab.id?"rgba(88,204,2,.1)":"transparent",cursor:"pointer",transition:"all .2s",minWidth:56}}>
            <span style={{fontSize:20,filter:activeTab===tab.id?"none":"grayscale(.6) opacity(.4)",transition:"all .2s"}}>{tab.icon}</span>
            <span style={{fontSize:9,fontWeight:800,color:activeTab===tab.id?"#58CC02":"rgba(255,255,255,.3)",fontFamily:F,letterSpacing:.5}}>{tab.label}</span>
          </button>)}
      </div>
    </div>}

    {/* ══════ LEAGUE PROMOTION/DEMOTION SCREEN — Duolingo style ══════ */}
    {leagueAnim&&<div style={{position:"fixed",inset:0,zIndex:300,display:"flex",flexDirection:"column",alignItems:"center",
      background:leagueAnim.type==="promote"?"#fff":leagueAnim.type==="demote"?"#1a1a2e":"#131f24",padding:"0 24px"}}>

      {leagueAnim.type==="promote"&&<>
        {/* Big trophy with gem on pedestal */}
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
          <div style={{position:"relative",marginBottom:40}}>
            {/* Diamond: aurora background shimmer */}
            {leagueAnim.to.tier===6&&<div style={{position:"fixed",inset:0,
              background:"linear-gradient(135deg,rgba(64,216,240,.03),rgba(144,240,255,.02),rgba(206,130,255,.03),rgba(255,200,0,.01),rgba(64,216,240,.02))",
              backgroundSize:"400% 400%",animation:"aurora 6s ease infinite",pointerEvents:"none"}}/>}

            {/* Sparkle particles — Diamond gets 20 rainbow, others 8 */}
            {[...Array(leagueAnim.to.tier===6?20:8)].map((_,i)=><div key={i} style={{position:"absolute",
              width:leagueAnim.to.tier===6?4+Math.random()*8:4+Math.random()*6,
              height:leagueAnim.to.tier===6?4+Math.random()*8:4+Math.random()*6,
              borderRadius:leagueAnim.to.tier===6&&i%3===0?"2px":"50%",
              background:leagueAnim.to.tier===6?["#fff","#40D8F0","#90F0FF","#CE82FF","#FFC800","#FF6B8A","#58CC02","#1CB0F6"][i%8]:leagueAnim.to.color,
              opacity:.2+Math.random()*.3,
              left:`${-40+Math.random()*280}px`,top:`${-40+Math.random()*320}px`,
              animation:`sparkle ${1.5+Math.random()*2}s ease-in-out ${Math.random()*2}s infinite`,
              transform:leagueAnim.to.tier===6&&i%3===0?`rotate(${Math.random()*360}deg)`:"none",
              boxShadow:leagueAnim.to.tier===6?`0 0 ${8+Math.random()*12}px ${["#40D8F0","#90F0FF","#CE82FF","#fff"][i%4]}44`:`0 0 8px ${leagueAnim.to.color}44`}}/>)}

            {/* Diamond: prismatic ring around trophy */}
            {leagueAnim.to.tier===6&&<div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
              width:260,height:260,borderRadius:"50%",
              border:"2px solid rgba(64,216,240,.15)",
              boxShadow:"0 0 40px rgba(64,216,240,.08),inset 0 0 40px rgba(144,240,255,.05)",
              animation:"pulse 2.5s ease-in-out infinite",pointerEvents:"none"}}/>}
            {leagueAnim.to.tier===6&&<div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
              width:300,height:300,borderRadius:"50%",
              border:"1px solid rgba(206,130,255,.08)",
              animation:"pulse 3s ease-in-out infinite .5s",pointerEvents:"none"}}/>}

            {/* Trophy — uses LeagueShield at large size */}
            <div style={{animation:"leagueShieldIn .8s cubic-bezier(.4,2,.6,1) both",
              filter:leagueAnim.to.tier===6?`drop-shadow(0 8px 40px #40D8F044) drop-shadow(0 0 60px #90F0FF22)`:`drop-shadow(0 8px 30px ${leagueAnim.to.color}33)`}}>
              {leagueAnim.to.tier===6?<div style={{animation:"diamondPulse 3s ease-in-out infinite"}}>
                <LeagueShield color={leagueAnim.to.color} tier={leagueAnim.to.tier} size={200}/>
              </div>:<LeagueShield color={leagueAnim.to.color} tier={leagueAnim.to.tier} size={180}/>}
            </div>
          </div>

          {/* Congratulations text — Diamond gets rainbow gradient */}
          <div style={{textAlign:"center",animation:"leagueTextIn .6s ease .5s both"}}>
            {leagueAnim.to.tier===6?
              <p style={{fontSize:26,fontWeight:900,lineHeight:1.4,fontFamily:F,
                background:"linear-gradient(135deg,#40D8F0,#90F0FF,#CE82FF,#FFC800,#40D8F0)",backgroundSize:"200% 200%",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"gradientShift 4s ease infinite"}}>
                Congratulations! You finished<br/>#1 in the Diamond League.
              </p>
            :<p style={{fontSize:24,fontWeight:800,color:"#3C3C3C",lineHeight:1.4,fontFamily:F}}>
              Congratulations! You finished<br/>#1 in the <span style={{color:leagueAnim.to.color}}>{leagueAnim.to.name} League</span>.
            </p>}
            <p style={{fontSize:15,color:leagueAnim.to.tier===6?"#6EADBE":"#8E8E8E",marginTop:14,fontWeight:700}}>
              Congratulations, this is the end of your league.
            </p>
          </div>
        </div>

        {/* Continue button at bottom */}
        <div style={{width:"100%",maxWidth:400,paddingBottom:40,animation:"leagueTextIn .5s ease .8s both"}}>
          <button onClick={()=>setLeagueAnim(null)} style={{width:"100%",padding:"18px",borderRadius:16,border:"none",
            background:leagueAnim.to.tier===6?"linear-gradient(135deg,#40D8F0,#1CB0F6)":"#1CB0F6",color:"#fff",fontSize:17,fontWeight:800,cursor:"pointer",fontFamily:F,
            boxShadow:leagueAnim.to.tier===6?"0 5px 0 #1890B8,0 0 20px rgba(64,216,240,.2)":"0 5px 0 #0088cc",textTransform:"uppercase",letterSpacing:1.5}}>
            Continue
          </button>
        </div>
      </>}

      {leagueAnim.type==="demote"&&<>
        {/* Demotion — dark moody screen */}
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
          <div style={{animation:"demoteFall .8s ease both",marginBottom:30}}>
            <div style={{animation:"demoteShake .5s ease .8s both",opacity:.6}}>
              <LeagueShield color={leagueAnim.to.color} tier={leagueAnim.to.tier} size={140}/>
            </div>
          </div>

          <div style={{textAlign:"center",animation:"leagueTextIn .6s ease .5s both"}}>
            <p style={{fontSize:22,fontWeight:800,color:"rgba(255,255,255,.8)",lineHeight:1.4,fontFamily:F}}>
              You were demoted to the<br/><span style={{color:leagueAnim.to.color}}>{leagueAnim.to.name} League</span>.
            </p>
            <p style={{fontSize:13,color:"rgba(255,255,255,.35)",marginTop:12}}>Keep learning to climb back up!</p>
          </div>
        </div>

        <div style={{width:"100%",maxWidth:400,paddingBottom:40,animation:"leagueTextIn .5s ease .8s both"}}>
          <button onClick={()=>setLeagueAnim(null)} style={{width:"100%",padding:"18px",borderRadius:16,border:"none",
            background:"#FF4B4B",color:"#fff",fontSize:17,fontWeight:800,cursor:"pointer",fontFamily:F,
            boxShadow:"0 5px 0 #cc3030",textTransform:"uppercase",letterSpacing:1.5}}>
            Continue
          </button>
        </div>
      </>}

      {/* Survived — in demotion zone but already at Bronze */}
      {leagueAnim.type==="survived"&&<>
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
          <div style={{animation:"leagueShieldIn .8s cubic-bezier(.4,2,.6,1) both",marginBottom:30}}>
            <LeagueShield color={leagueAnim.to.color} tier={leagueAnim.to.tier} size={140}/>
          </div>
          <div style={{textAlign:"center",animation:"leagueTextIn .6s ease .5s both"}}>
            <p style={{fontSize:24,fontWeight:800,color:"rgba(255,255,255,.85)",lineHeight:1.4,fontFamily:F}}>
              You survived! 💪
            </p>
            <p style={{fontSize:15,color:"rgba(255,255,255,.5)",marginTop:8,fontWeight:600}}>
              You were in the demotion zone, but<br/><span style={{color:leagueAnim.to.color}}>{leagueAnim.to.name}</span> is the lowest league.
            </p>
            <p style={{fontSize:13,color:"rgba(255,255,255,.3)",marginTop:12}}>
              Earn more XP next week to climb up!
            </p>
          </div>
        </div>
        <div style={{width:"100%",maxWidth:400,paddingBottom:40,animation:"leagueTextIn .5s ease .8s both"}}>
          <button onClick={()=>setLeagueAnim(null)} style={{width:"100%",padding:"18px",borderRadius:16,border:"none",
            background:"#FF9600",color:"#fff",fontSize:17,fontWeight:800,cursor:"pointer",fontFamily:F,
            boxShadow:"0 5px 0 #cc7700",textTransform:"uppercase",letterSpacing:1.5}}>
            Continue
          </button>
        </div>
      </>}

      {/* Stayed — safe zone, no change */}
      {leagueAnim.type==="stayed"&&<>
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
          <div style={{animation:"leagueShieldIn .8s cubic-bezier(.4,2,.6,1) both",marginBottom:30}}>
            <LeagueShield color={leagueAnim.to.color} tier={leagueAnim.to.tier} size={140}/>
          </div>
          <div style={{textAlign:"center",animation:"leagueTextIn .6s ease .5s both"}}>
            <p style={{fontSize:24,fontWeight:800,color:"rgba(255,255,255,.85)",lineHeight:1.4,fontFamily:F}}>
              Week Complete!
            </p>
            <p style={{fontSize:15,color:"rgba(255,255,255,.5)",marginTop:8,fontWeight:600}}>
              You stayed in the <span style={{color:leagueAnim.to.color}}>{leagueAnim.to.name} League</span>.
            </p>
            <p style={{fontSize:13,color:"rgba(255,255,255,.3)",marginTop:12}}>
              Finish in the top 10 next week to promote!
            </p>
          </div>
        </div>
        <div style={{width:"100%",maxWidth:400,paddingBottom:40,animation:"leagueTextIn .5s ease .8s both"}}>
          <button onClick={()=>setLeagueAnim(null)} style={{width:"100%",padding:"18px",borderRadius:16,border:"none",
            background:"#1CB0F6",color:"#fff",fontSize:17,fontWeight:800,cursor:"pointer",fontFamily:F,
            boxShadow:"0 5px 0 #0088cc",textTransform:"uppercase",letterSpacing:1.5}}>
            Continue
          </button>
        </div>
      </>}
    </div>}

  </div>;
}
