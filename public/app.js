
/* ============ helpers ============ */
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const uid=p=>p+Math.random().toString(36).slice(2,8);
const now=()=>new Date().toISOString();
const fmt=d=>new Date(d).toLocaleString("en-GB",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"});
const fdate=d=>new Date(d).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"});
const COLORS={"Black":"#1a1a1a","Orange":"#F26A1B","White":"#f4f4f0","Navy":"#1d2a4a","Red":"#c0302a","Green":"#1f6b3a","Gold":"#d4a72c","Royal Blue":"#2647b5","Grey":"#8a8a86","Charcoal":"#3a3a38","Yellow":"#f0c419","Pink":"#e48aa8","Burgundy":"#6e1f2e","Khaki":"#b8a77a","Olive":"#5d6332","Brown":"#6b4a2f","Light Blue":"#8fb8e0","Aqua":"#37b3b0","Purple":"#6a3fa0","Graphite":"#4a4a48","Light Grey":"#c8c8c2"};
const col=n=>COLORS[n]||"#888";

/* garment illustrations (placeholder until admin uploads photos) */
function garment(type,c1,c2,view){
  c2=c2||c1; const bg="#E9E8E2", st="rgba(0,0,0,.18)";
  const P={
   jersey:`<path d="M70 40 L95 28 Q110 46 125 28 L150 40 L188 78 L164 104 L150 92 L150 212 L70 212 L70 92 L56 104 L32 78 Z" fill="${c1}" stroke="${st}"/><path d="M32 78 L56 104 L64 96 L42 70Z M188 78 L164 104 L156 96 L178 70Z" fill="${c2}"/><path d="M95 28 Q110 50 125 28 Q110 40 95 28Z" fill="${c2}"/><rect x="70" y="120" width="80" height="10" fill="${c2}" opacity=".9"/>`,
   polo:`<path d="M70 40 L96 30 L110 52 L124 30 L150 40 L184 74 L162 98 L150 88 L150 212 L70 212 L70 88 L58 98 L36 74 Z" fill="${c1}" stroke="${st}"/><path d="M96 30 L110 52 L124 30 L118 26 L110 40 L102 26Z" fill="${c2}"/><line x1="110" y1="52" x2="110" y2="80" stroke="${c2}" stroke-width="3"/><circle cx="110" cy="62" r="2" fill="${c2}"/><circle cx="110" cy="72" r="2" fill="${c2}"/>`,
   hoodie:`<path d="M72 46 Q80 14 110 14 Q140 14 148 46 L176 64 L196 170 L174 174 L156 96 L152 212 L68 212 L64 96 L46 174 L24 170 L44 64 Z" fill="${c1}" stroke="${st}"/><path d="M84 46 Q90 26 110 26 Q130 26 136 46 Q110 60 84 46Z" fill="${c2}"/><rect x="82" y="150" width="56" height="30" rx="4" fill="${c2}" opacity=".7"/><rect x="68" y="200" width="84" height="12" fill="${c2}"/>`,
   jacket:`<path d="M72 36 L96 26 L110 34 L124 26 L148 36 L176 60 L196 170 L174 174 L156 96 L152 212 L68 212 L64 96 L46 174 L24 170 L44 60 Z" fill="${c1}" stroke="${st}"/><line x1="110" y1="34" x2="110" y2="212" stroke="${c2}" stroke-width="4"/><path d="M96 26 L110 34 L124 26 L124 16 L96 16Z" fill="${c2}"/><path d="M44 60 L52 100 L64 96 L56 58Z M176 60 L168 100 L156 96 L164 58Z" fill="${c2}"/>`,
   puffer:`<path d="M70 34 Q110 8 150 34 L178 60 L198 172 L174 176 L156 98 L154 214 L66 214 L64 98 L46 176 L22 172 L42 60 Z" fill="${c1}" stroke="${st}"/>${[70,100,130,160,190].map(y=>`<line x1="66" y1="${y}" x2="154" y2="${y}" stroke="${st}" stroke-width="2"/>`).join("")}<line x1="110" y1="26" x2="110" y2="214" stroke="${c2}" stroke-width="3"/>`,
   vest:`<path d="M78 30 L96 26 Q110 50 124 26 L142 30 L156 70 L154 212 L66 212 L64 70 Z" fill="${c1}" stroke="${st}"/>${[90,120,150,180].map(y=>`<line x1="66" y1="${y}" x2="154" y2="${y}" stroke="${st}" stroke-width="2"/>`).join("")}<line x1="110" y1="44" x2="110" y2="212" stroke="${c2}" stroke-width="3"/>`,
   shorts:`<path d="M56 50 L164 50 L176 182 L120 182 L110 104 L100 182 L44 182 Z" fill="${c1}" stroke="${st}"/><rect x="56" y="50" width="108" height="14" fill="${c2}"/><path d="M44 182 L48 150 L58 150 L56 182Z M176 182 L172 150 L162 150 L164 182Z" fill="${c2}"/>`,
   pants:`<path d="M70 24 L150 24 L158 214 L120 214 L110 78 L100 214 L62 214 Z" fill="${c1}" stroke="${st}"/><rect x="70" y="24" width="80" height="12" fill="${c2}"/><line x1="72" y1="40" x2="66" y2="214" stroke="${c2}" stroke-width="5"/><line x1="148" y1="40" x2="154" y2="214" stroke="${c2}" stroke-width="5"/>`,
   leggings:`<path d="M72 20 L148 20 L150 216 L118 216 L110 74 L102 216 L70 216 Z" fill="${c1}" stroke="${st}"/><rect x="72" y="20" width="76" height="20" fill="${c2}" opacity=".85"/>`,
   tracksuit:`<path d="M74 22 L96 14 L110 20 L124 14 L146 22 L170 40 L184 116 L166 118 L154 66 L152 124 L68 124 L66 66 L54 118 L36 116 L50 40Z" fill="${c1}" stroke="${st}"/><line x1="110" y1="20" x2="110" y2="124" stroke="${c2}" stroke-width="3"/><path d="M50 40 L36 116 L44 116 L58 44Z M170 40 L184 116 L176 116 L162 44Z" fill="${c2}"/><path d="M74 130 L146 130 L150 220 L120 220 L110 160 L100 220 L70 220Z" fill="${c1}" stroke="${st}"/><line x1="76" y1="134" x2="72" y2="220" stroke="${c2}" stroke-width="4"/><line x1="144" y1="134" x2="148" y2="220" stroke="${c2}" stroke-width="4"/>`,
   pack:`<rect x="40" y="70" width="140" height="120" rx="6" fill="${c1}" stroke="${st}"/><path d="M40 70 L70 40 L150 40 L180 70Z" fill="${c2}"/><rect x="92" y="110" width="36" height="22" fill="#fff" opacity=".85"/><rect x="60" y="150" width="100" height="6" fill="#fff" opacity=".4"/><path d="M150 40 L150 20 L170 30Z" fill="${c2}"/>`
  };
  const flip=view==="back"?' transform="translate(220 0) scale(-1 1)"':view==="side"?' transform="translate(30 10) scale(.85 1)"':view==="close"?' transform="translate(-110 -60) scale(2)"':"";
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 230"><rect width="220" height="230" fill="${bg}"/><g${flip}>${P[type]||P.jersey}</g></svg>`;
  return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);
}

/* ============ seed data ============ */
const CAT_HEAD={"sportswear": "Engineered for training, competition and <em>custom team identity.</em>", "teamwear": "One kit program for <em>every squad you run.</em>", "outerwear": "Built for the sideline, <em>the street and the weather.</em>", "casual-wear": "Everyday essentials, <em>finished like merchandise.</em>", "fitness-performance": "Made to move, <em>built to last the session.</em>", "private-label": "Your label on every piece. <em>Our production behind it.</em>"};
const CATS=[
 {id:"sportswear",name:"Sportswear",blurb:"Sport-specific jerseys and uniforms for football, basketball, baseball, American football, cricket, rugby, cycling and golf.",subs:["Football / Soccer","Basketball","Baseball","American Football","Cricket","Rugby","Volleyball","Cycling","Golf"],type:"jersey",c:["Black","Orange"]},
 {id:"teamwear",name:"Teamwear",blurb:"Full club programs: match kits, training kits, tracksuits, warm-ups and coaches wear.",subs:["Team Jerseys","Match Kits","Training Kits","Tracksuits","Warm-Up Sets","Coaches Wear","Club Apparel"],type:"tracksuit",c:["Navy","Orange"]},
 {id:"outerwear",name:"Outerwear",blurb:"Softshells, puffers, windbreakers, fleece and varsity jackets for sideline and street.",subs:["Puffer Jackets","Softshell Jackets","Windbreakers","Fleece Jackets","Varsity Jackets","Gilets"],type:"puffer",c:["Black","Orange"]},
 {id:"casual-wear",name:"Casual Wear",blurb:"Hoodies, sweatshirts, joggers, polos and tees for brands and club merchandise.",subs:["Hoodies","Sweatshirts","Joggers","Polo Shirts","T-Shirts","Tracksuits"],type:"hoodie",c:["Graphite","Orange"]},
 {id:"fitness-performance",name:"Fitness & Performance",blurb:"Compression, leggings, gym shorts and dry-fit training layers.",subs:["Compression Wear","Leggings","Gym Shorts","Training Shirts","Court Jackets"],type:"leggings",c:["Black","Orange"]},
 {id:"private-label",name:"Private Label",blurb:"Starter packs, label kits and full programs produced under your brand.",subs:["Programs","Starter Packs","Trim Kits"],type:"pack",c:["Charcoal","Orange"]}
];
const P=(sku,name,cat,sub,type,colors,desc,gsm,comp,feat)=>({id:sku.toLowerCase(),sku,name,cat,sub,type,colors,desc,gsm,comp,moq:50,sample:"7–10",bulk:"27–30",featured:!!feat,active:true,price:"",images:[],views:Math.floor(40+Math.random()*400),created:now()});
const SEED_PRODUCTS=[
 P("ORRA-SW-FB-001","Football Match Jersey","sportswear","Football / Soccer","jersey",["Black","Orange","Green","Gold"],"Sublimated match jersey with V-neck, raglan sleeves and mesh side panels for airflow.",140,"100% polyester interlock with birdseye mesh",1),
 P("ORRA-SW-BB-001","Basketball Performance Jersey","sportswear","Basketball","jersey",["Black","Orange","Red"],"Sleeveless reversible-ready jersey with bound armholes and double-needle hems.",150,"100% polyester dazzle mesh"),
 P("ORRA-SW-BS-001","Baseball Team Jersey","sportswear","Baseball","polo",["White","Navy","Red"],"Full-button jersey with piping, tackle-twill or sublimated numbers.",180,"100% polyester pro-weave"),
 P("ORRA-SW-AF-001","American Football Team Jersey","sportswear","American Football","jersey",["Black","Orange","White"],"Cut for shoulder pads with stretch shoulders and reinforced numbers.",200,"Polyester mesh body, spandex shoulder yoke"),
 P("ORRA-SW-CR-001","Cricket Playing Shirt","sportswear","Cricket","polo",["White","Royal Blue"],"Long or short sleeve playing shirt with collar and sponsor-ready chest panel.",160,"100% polyester pique"),
 P("ORRA-SW-CY-001","Cycling Performance Set","sportswear","Cycling","jersey",["Navy","Orange"],"Race-cut jersey with three rear pockets and matching bib short.",130,"Polyester/elastane 82/18"),
 P("ORRA-SW-RG-001","Rugby Long Sleeve Jersey","sportswear","Rugby","jacket",["Green","Gold"],"Heavy-duty rugby jersey with grip panels and reinforced seams.",260,"Polyester/elastane 90/10 grip knit"),
 P("ORRA-SW-GF-001","Custom Golf Polo & Shorts Set","sportswear","Golf","polo",["Navy","Khaki"],"Moisture-wicking polo with matching flat-front shorts.",180,"Polyester/elastane 92/8 pique"),
 P("ORRA-TW-JY-001","Performance Team Jersey","teamwear","Team Jerseys","jersey",["Black","Orange","Green"],"Club jersey built around your crest, numbering and sponsor placements.",145,"100% recycled polyester",1),
 P("ORRA-TW-MK-001","Club Match Kit","teamwear","Match Kits","jersey",["Red","White"],"Jersey, short and socks produced as one coordinated kit.",145,"100% polyester"),
 P("ORRA-TW-TS-001","Full-Zip Training Tracksuit","teamwear","Tracksuits","tracksuit",["Black","Orange","Green"],"Full-zip jacket and tapered pant with zip pockets.",240,"Polyester tricot / brushed back"),
 P("ORRA-TW-WU-001","Club Warm-Up Set","teamwear","Warm-Up Sets","tracksuit",["Black","Orange","Red"],"Pre-match warm-up top and pant in club colours.",220,"Polyester/elastane 95/5"),
 P("ORRA-TW-CJ-001","Coaches Rain Jacket","teamwear","Coaches Wear","jacket",["Black","Navy"],"Waterproof, taped-seam sideline jacket with hood.",120,"Polyester taffeta, PU coated 5,000 mm"),
 P("ORRA-TW-PO-001","Team Polo Shirt","teamwear","Club Apparel","polo",["Black","Orange","White","Aqua"],"Staff and travel polo with embroidered crest.",200,"Polyester/cotton 65/35 pique"),
 P("ORRA-OW-WB-001","Windbreaker Jacket","outerwear","Windbreakers","jacket",["Black","Orange","Red"],"Lightweight packable windbreaker with mesh lining.",90,"100% nylon ripstop",1),
 P("ORRA-OW-VJ-001","Varsity Jacket","outerwear","Varsity Jackets","jacket",["Navy","Gold"],"Wool body with contrast sleeves, chenille patches available.",450,"Wool blend body, PU sleeves"),
 P("ORRA-OW-SJ-001","Softshell Jacket","outerwear","Softshell Jackets","jacket",["Black","Green","Brown"],"3-layer softshell with fleece backing and water-repellent finish.",300,"Polyester/elastane bonded to micro-fleece"),
 P("ORRA-OW-PJ-001","Custom Hooded Puffer Jacket","outerwear","Puffer Jackets","puffer",["Black","White","Grey"],"Channel-quilted puffer with synthetic down fill and hood.",280,"Nylon shell, 180 g/m² polyfill"),
 P("ORRA-OW-GV-001","Quilted Gilet Vest","outerwear","Gilets","vest",["Black","Orange","Navy","Olive"],"Lightweight quilted gilet with embroidered branding.",220,"Nylon shell, 120 g/m² polyfill"),
 P("ORRA-OW-FL-001","Full-Zip Fleece Jacket","outerwear","Fleece Jackets","jacket",["Charcoal","Orange"],"Anti-pill polar fleece with zip pockets.",280,"100% polyester polar fleece"),
 P("ORRA-CW-HD-001","Custom Pullover Hoodie","casual-wear","Hoodies","hoodie",["Grey","Graphite","Black"],"Heavyweight hoodie with lined hood and kangaroo pocket.",380,"80/20 cotton/polyester brushed fleece",1),
 P("ORRA-CW-SW-001","Crewneck Sweatshirt","casual-wear","Sweatshirts","hoodie",["Navy","Grey"],"Ribbed crewneck with drop shoulder.",340,"80/20 cotton/polyester fleece"),
 P("ORRA-CW-JG-001","Fleece Jogger Pant","casual-wear","Joggers","pants",["Graphite","Orange"],"Tapered jogger with cuffs and drawcord.",320,"80/20 cotton/polyester fleece"),
 P("ORRA-CW-PO-001","Performance Polo Shirt","casual-wear","Polo Shirts","polo",["Black","Orange","White","Green","Red","Navy"],"Everyday polo with moisture management.",200,"100% polyester pique"),
 P("ORRA-CW-TS-001","Premium Cotton T-Shirt","casual-wear","T-Shirts","jersey",["White","Black"],"Combed ring-spun tee, side-seamed.",180,"100% combed cotton single jersey"),
 P("ORRA-FP-CT-001","Compression Training Top","fitness-performance","Compression Wear","jacket",["Black","Orange"],"Second-skin compression top with flatlock seams.",220,"Polyester/elastane 80/20"),
 P("ORRA-FP-LG-001","Custom High-Waist Leggings","fitness-performance","Leggings","leggings",["Black","Charcoal","Pink","Burgundy"],"Squat-proof high-waist leggings with hidden waistband pocket.",260,"Nylon/elastane 75/25",1),
 P("ORRA-FP-GS-001","Gym Training Short","fitness-performance","Gym Shorts","shorts",["Charcoal","Orange"],"Lightweight 2-in-1 short with liner.",140,"Polyester/elastane 88/12"),
 P("ORRA-FP-DF-001","Dry-Fit Training Shirt","fitness-performance","Training Shirts","jersey",["White","Black"],"Quick-dry training tee.",140,"100% polyester micro-mesh"),
 P("ORRA-PL-SP-001","Private Label Starter Pack","private-label","Starter Packs","pack",["Charcoal","Orange"],"Your first collection: 4 styles, labels and packaging in one program.",0,"Mixed per style"),
 P("ORRA-PL-TK-001","Retail Branding Trim Kit","private-label","Trim Kits","pack",["Black","Orange"],"Woven labels, hangtags, size labels and polybags made to your brand guide.",0,"Woven damask, 400 gsm card"),
 P("ORRA-PL-HD-001","Custom Hoodie Program","private-label","Programs","hoodie",["Charcoal","Orange"],"End-to-end hoodie development under your label.",380,"Cotton/polyester fleece, your choice")
];
const STEPS10=[["Enquiry","Share your brief, quantities and target dates."],["Tech pack","We confirm fabrics, measurements and trims."],["Costing","You receive a line-by-line quotation."],["Material sourcing","Fabric and trims booked and lab-tested."],["Pattern & cutting","Graded patterns, automated cutting."],["Printing / embroidery","Sublimation, screen, heat transfer or embroidery."],["Stitching","Dedicated lines per program."],["Sampling","Pre-production sample in 7–10 working days."],["Bulk production","27–30 working days after approval and deposit."],["Packing & export","Folded, tagged, cartoned and shipped."]];
const QC7=["Fabric inspection","Colour matching","Cutting check","Print & embroidery check","Inline stitching audit","Final measurements","Packing audit"];
const METHODS=[["SB","Sublimation printing","Unlimited colours, dyed into the fabric."],["SP","Screen printing","Crisp spot colours for volume runs."],["HT","Heat transfer","Names, numbers and small runs."],["EM","Embroidery","Flat and 3D crest embroidery."],["WL","Woven & neck labels","Damask labels with your brand."],["HG","Hangtags","Printed tags and swing tickets."],["PT","Rubber & PVC patches","Moulded logos and badges."],["PK","Custom packaging","Printed polybags and boxes."]];
const MARKETS=[["GB","United Kingdom","Europe","Football, rugby, cricket"],["US","United States","North America","Basketball, baseball, American football"],["DE","Germany","Europe","Football, handball, fitness"],["FR","France","Europe","Football, rugby, basketball"],["NL","Netherlands","Europe","Football, field hockey, cycling"],["AE","UAE","Middle East","Football, fitness, academies"],["CA","Canada","North America","Soccer, basketball, school athletics"],["AU","Australia","Oceania","Rugby, cricket, netball"]];
const POSTS=[
 {id:"choose-manufacturer",title:"How to choose a custom sportswear manufacturer",cat:"Buying Guides",mins:7,author:"ORRA Production Team",date:"2026-09-14",body:"Start with what you are making and how many. A good manufacturer will ask about your sport, your quantities per design and your delivery date before talking price.\n\nAsk for a pre-production sample and compare it against your tech pack. Check fabric weight (GSM), stitching density and print sharpness.\n\nConfirm the minimum order per design and colour, sampling time and bulk lead time in writing. At ORRA these are 50 pieces, 7–10 working days and 27–30 working days."},
 {id:"sublimation-vs-embroidery",title:"Sublimation vs embroidery vs screen printing",cat:"Materials & Printing",mins:6,author:"ORRA Production Team",date:"2026-08-22",body:"Sublimation dyes the design into polyester, so there is no limit on colours and nothing cracks or peels.\n\nEmbroidery is stitched thread. It suits crests and logos on polos, jackets and hoodies.\n\nScreen printing lays ink on the surface and is the most economical choice for one or two colours in higher volumes."},
 {id:"moq-sampling-bulk",title:"MOQ, sampling and bulk production explained",cat:"Manufacturing",mins:5,author:"ORRA Production Team",date:"2026-07-30",body:"MOQ is the minimum number of pieces per design and colour. Ours is 50.\n\nSampling takes 7–10 working days once the brief and artwork are confirmed. Bulk starts after sample approval and deposit, and takes 27–30 working days."},
 {id:"fabric-gsm-guide",title:"Fabric GSM guide for clothing",cat:"Materials & Printing",mins:8,author:"ORRA Production Team",date:"2026-06-11",body:"GSM is grams per square metre. Lighter fabrics (120–160) suit jerseys and training tops. Mid weights (180–240) suit polos and tracksuits. Heavier fleeces (300–400) suit hoodies and sweatshirts."},
 {id:"private-label-concept",title:"Private label sportswear: from concept to production",cat:"Private Label",mins:7,author:"ORRA Production Team",date:"2026-05-03",body:"Private label means the product carries your brand only. We develop the garment, labels, hangtags and packaging to your guidelines and ship it ready for retail."},
 {id:"teamwear-buyers-guide",title:"Custom teamwear manufacturing: a buyer's guide",cat:"Teamwear",mins:6,author:"ORRA Production Team",date:"2026-04-18",body:"Plan your full kit together: match jersey, shorts, socks, training top, tracksuit and coaches wear. Producing them as one program keeps colours consistent."}
];
const TESTI=[
 {name:"Daniel R.",role:"Club Secretary, Manchester youth league",text:"Two seasons of match kits, every batch matched the sample. Communication on WhatsApp was quick."},
 {name:"Sophie L.",role:"Founder, activewear label, Amsterdam",text:"They took our leggings from sketch to retail-ready with our own labels and packaging."},
 {name:"Marcus T.",role:"Athletic Director, Ontario",text:"Clear quote, sample on time and bulk shipped inside the window they gave us."}
];
const SEED={
 v:3,
 settings:{company:"ORRA Industries",tagline:"Built for performance",email:"mrabid320@gmail.com",phone:"+92 340 0420528",whatsapp:"+92 340 0420528",address:"Sialkot, Punjab, Pakistan",hours:"",instagram:"https://www.instagram.com/orra_apperal_international",facebook:"",linkedin:"",scci:"",ntn:"",since:"",metaTitle:"Custom Sportswear & Teamwear Manufacturer | ORRA Industries",metaDesc:"ORRA Industries manufactures custom sportswear, teamwear and private-label apparel in Pakistan. MOQ 50 pieces, samples in 7–10 working days.",showPrices:false,maintenance:false},
 content:{heroTitle:"Built for teams. Manufactured for brands.",heroSub:"Custom sportswear, teamwear and private-label apparel made in Sialkot, Pakistan for clubs, academies and brands in 8 export markets.",heroImage:"",heroVideo:"",qcImages:[],banners:{},ticker:"MOQ 50 pieces per design · Samples in 7–10 working days · Bulk in 27–30 working days · Shipping worldwide from Sialkot",aboutText:"ORRA Industries is a manufacturing partner, not a generic supplier. We produce sportswear, teamwear and private-label apparel for clubs, academies, schools and brands across Europe, North America, the Middle East and Oceania.",ctaTitle:"Ready to start your production brief?",statFactory:"",statStaff:"",statCapacity:""},
 categories:CATS,
 products:SEED_PRODUCTS,
 posts:POSTS,
 testimonials:[],
 media:[],
 rfqs:[
  {id:"RFQ-1042",userId:"u1",name:"James Carter",company:"Northside FC",country:"United Kingdom",email:"james@northsidefc.co.uk",phone:"+44 7700 900123",family:"Teamwear",qty:"100–500",exact:"220",methods:["Sublimation printing","Embroidery"],delivery:"1–3 months",notes:"Home and away kits for U12–U16 squads.",items:[{pid:"orra-tw-mk-001",qty:220,size:"YS–XL",color:"Red",note:"Club crest embroidered"}],status:"Quoted",quote:"USD 11.40 / kit",reply:"Sample can ship 14 Nov. Please confirm crest artwork.",created:"2026-10-21T09:12:00Z"},
  {id:"RFQ-1043",userId:"",name:"Lena Fischer",company:"FitForm GmbH",country:"Germany",email:"lena@fitform.de",phone:"+49 151 2345678",family:"Fitness & Performance",qty:"500–1,000",exact:"",methods:["Woven & neck labels","Custom packaging"],delivery:"3–6 months",notes:"Private label leggings and sports bras, 3 colours.",items:[],status:"Reviewing",quote:"",reply:"",created:"2026-10-29T14:40:00Z"},
  {id:"RFQ-1044",userId:"",name:"Omar Khalid",company:"Dubai Elite Academy",country:"UAE",email:"omar@delite.ae",phone:"+971 50 123 4567",family:"Sportswear",qty:"100–500",exact:"300",methods:["Sublimation printing"],delivery:"Within 1 month",notes:"Training tops and shorts.",items:[],status:"New",quote:"",reply:"",created:"2026-11-02T08:05:00Z"},
  {id:"RFQ-1039",userId:"u1",name:"James Carter",company:"Northside FC",country:"United Kingdom",email:"james@northsidefc.co.uk",phone:"+44 7700 900123",family:"Outerwear",qty:"Under 100",exact:"60",methods:["Embroidery"],delivery:"1–3 months",notes:"Coaches rain jackets.",items:[{pid:"orra-tw-cj-001",qty:60,size:"M–XXL",color:"Black",note:""}],status:"Production",quote:"USD 18.90 / pc",reply:"In stitching. Ships week of 24 Nov.",created:"2026-09-30T10:00:00Z"}
 ],
 messages:[
  {id:"m1",name:"Ahmed Raza",email:"ahmed@teamco.pk",company:"TeamCo",message:"Do you supply cricket whites with sponsor logos for a local league?",status:"Unread",reply:"",created:"2026-11-01T11:20:00Z"},
  {id:"m2",name:"Emily Stone",email:"emily@stonegolf.com",company:"Stone Golf",message:"Can I get fabric swatches for your golf polos before ordering samples?",status:"Replied",reply:"Yes, swatch cards ship free by courier. Please share your address.",created:"2026-10-27T16:02:00Z"}
 ],
 users:[{id:"u1",name:"James Carter",email:"buyer@demo.com",pass:"demo123",company:"Northside FC",country:"United Kingdom",phone:"+44 7700 900123",created:"2026-09-01T10:00:00Z",wishlist:["orra-sw-fb-001","orra-tw-ts-001"],active:true}],
 log:[{t:"2026-11-02T08:05:00Z",who:"System",what:"New RFQ RFQ-1044 from Dubai Elite Academy"}],
 cart:[]
};

/* ============ store ============ */
const KEY="asa_site";
let S;
function load(){S=JSON.parse(JSON.stringify(SEED));S.rfqs=[];S.messages=[];S.users=[];S.log=[];S.cart=[];try{S.cart=JSON.parse(localStorage.getItem(KEY+"_cart")||"[]")}catch(e){}}
function save(){try{localStorage.setItem(KEY+"_cart",JSON.stringify(S.cart))}catch(e){}if(LIVE.sb)liveSync()}
function log(what,who){S.log.unshift({t:now(),who:who||"Admin",what});S.log=S.log.slice(0,150)}
let session={admin:false,user:null};
function saveSess(){}
load();

const prod=id=>S.products.find(p=>p.id===id);
const catOf=id=>S.categories.find(c=>c.id===id);
function pimg(p,i=0,color){
  if(p.images&&p.images.length&&!color) return p.images[i%p.images.length];
  const c=color||p.colors[0]; const c2=p.colors.find(x=>x!==c)||c;
  return garment(p.type,col(c),col(c2),["front","back","side","close"][i%4]);
}
function catImg(c){const custom=S.products.find(p=>p.cat===c.id&&p.images.length);return c.image||(custom?custom.images[0]:garment(c.type,col(c.c[0]),col(c.c[1])))}

/* ============ router ============ */
let route="home", ui={shopCat:"all",shopSub:"",shopQ:"",pcolor:null,pimg:0,ptab:"overview",rfqStep:1,rfq:{},adminTab:"dashboard",acctTab:"overview",sel:null,aq:"",af:"all",market:null};
function pathOf(r){if(!r||r==="home")return"/";if(r.startsWith("product-"))return"/product/"+r.slice(8);if(r.startsWith("post-"))return"/blog/"+r.slice(5);if(r.startsWith("cat-"))return"/shop/"+r.slice(4);return"/"+r}
function routeOf(p){p=(p||"/").replace(/\/+$/,"")||"/";if(p==="/")return"home";let m;if(m=p.match(/^\/product\/(.+)/))return"product-"+m[1];if(m=p.match(/^\/blog\/(.+)/))return"post-"+m[1];if(m=p.match(/^\/shop\/(.+)/))return"cat-"+m[1];return p.slice(1)}
function setRoute(r){route=r;ui.pcolor=null;ui.pimg=0;ui.ptab="overview";if(r.startsWith("cat-")){ui.shopCat=r.slice(4);ui.shopSub=""}else if(r==="shop"){ui.shopCat="all"}}
function go(r){const nv=typeof document!=="undefined"&&document.getElementById("nav");if(nv)nv.classList.remove("open");const p=pathOf(r);if(location.pathname!==p)history.pushState({},"",p);setRoute(r);render();window.scrollTo(0,0)}
function linkify(h){return h.replace(/href="#([a-zA-Z0-9-]+)"/g,(m,r)=>'href="'+pathOf(r)+'"')}

function toast(msg){const t=document.createElement("div");t.className="toast";t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2600)}

/* ============ layout ============ */
function header(){
  const n=[["home","Home"],["shop","Shop"],["private-label","Private Label"],["manufacturing","Manufacturing"],["markets","Global Markets"],["about","About"],["blog","Knowledge Center"],["contact","Contact"]];
  const base=route.split("-")[0];
  const on=r=>route===r||(r==="shop"&&(base==="shop"||base==="cat"||route.startsWith("product-")))||(r==="blog"&&route.startsWith("post-"));
  return `${session.admin?`<div class="demo-bar"><div class="wrap"><span><b>Staff mode.</b> ${esc(LIVE.status)}</span><span><a data-go="admin">Admin panel</a> · <a data-act="signout">Sign out</a></span></div></div>`:""}
  <div class="topstrip"><span>${esc(S.content.ticker)} · ${esc(S.content.ticker)} · </span></div>
  <header class="site2">
   <a class="brand" href="#home"><span class="glyph" aria-hidden="true"><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="none" stroke="var(--ink)" stroke-width="7"/><path d="M8 30 L30 9" stroke="var(--accent)" stroke-width="4"/></svg></span><span class="bt"><b>${esc(S.settings.company.toUpperCase())}</b><small>${esc(S.settings.tagline)}</small></span></a>
   <div class="bar">
    <nav class="main" id="nav"><div class="mob-acct mob-only"><a href="#account" class="mob-login"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg> ${session.user?"My account":"Login / Sign up"}</a>${session.admin?`<a href="#admin" class="mob-login alt">Admin panel</a>`:`<a href="#admin" class="mob-login alt">Staff login</a>`}</div>${n.map(([r,l])=>r==="shop"
      ?`<div class="dd"><a href="#shop" class="${on(r)?"act":""}">${l} <span aria-hidden="true">▾</span></a><div class="ddm">${S.categories.map(c=>`<div class="ddc"><a href="#cat-${c.id}">${esc(c.name)} <span aria-hidden="true">›</span></a><div class="dds">${c.subs.slice(0,8).map(s=>`<a href="#cat-${c.id}">${esc(s)}</a>`).join("")}</div></div>`).join("")}<a href="#shop"><b>All products</b></a></div></div>`
      :`<a href="#${r}" class="${on(r)?"act":""}">${l}</a>`).join("")}</nav>
    <div class="hdr-actions">
     <a class="rfq-pill" href="#cart">RFQ <span class="ct">${S.cart.length}</span></a>
     <a class="acct-btn" href="#account" aria-label="${session.user?"My account":"Login"}"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg><span>${session.user?esc((session.user.name||"Account").split(" ")[0]):"Login"}</span></a>
     <a class="rq-btn" href="#rfq">Request quote</a>
     <button class="burger" data-act="burger" aria-label="Open menu">Menu</button>
    </div>
   </div>
  </header>`;
}
function footer(){
  const s=S.settings;
  const types=[...new Set(S.products.filter(p=>p.active).map(p=>p.sub))].slice(0,10);
  const hasCta=route==="shop"||route.startsWith("cat-")||route.startsWith("product-");
  return `${hasCta?"":`<section class="f-cta"><div class="wrap"><h2>From product development to custom labels, packaging and bulk export.</h2><a class="pill-btn" href="#rfq">Request quote →</a></div></section>`}
  <footer class="site"><div class="wrap"><div class="cols f5">
   <div><a class="f-brand" href="#home"><span class="glyph" aria-hidden="true"><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="none" stroke="#fff" stroke-width="7"/><path d="M8 30 L30 9" stroke="var(--accent)" stroke-width="4"/></svg></span><b>${esc(s.company.toUpperCase())}</b></a><p style="margin-top:14px;max-width:280px">${esc(s.company)} is a custom sportswear, teamwear and private-label apparel manufacturer serving international B2B buyers: clubs, academies, schools, brands and distributors.</p><p class="f-tag">Custom apparel manufacturing / ${esc(s.address.split(",")[0])}, Pakistan</p></div>
   <div><h5>Company</h5><a href="#about">About ${esc(s.company.split(" ")[0])}</a><a href="#manufacturing">Manufacturing</a><a href="#private-label">Private Label</a><a href="#markets">Global Markets</a><a href="#blog">Knowledge Center</a><a href="#contact">Contact</a></div>
   <div><h5>Categories</h5>${S.categories.map(c=>`<a href="#cat-${c.id}">${esc(c.name)}</a>`).join("")}</div>
   <div><h5>Product types</h5>${types.map(t=>`<a href="#shop">${esc(t)}</a>`).join("")}</div>
   <div><h5>Production terms</h5><span class="f-line">MOQ 50 pieces</span><span class="f-line">Sampling 7–10 working days</span><span class="f-line">Bulk production 27–30 working days</span><span class="f-line">Private label ready</span><a href="#faq">FAQ</a><a href="#terms">Terms of business</a><a href="#privacy-policy">Privacy policy</a><a href="#account">Buyer login</a><a href="#admin">Staff login</a></div>
  </div>
  <div class="f-contact"><h5>Contact</h5><span style="user-select:all">✉ ${esc(s.email)}</span><span style="user-select:all">☎ ${esc(s.phone)}</span><span>⌖ ${esc(s.address)}</span>${s.hours?`<span>${esc(s.hours)}</span>`:""}</div>
  <div class="bot"><span>© 2026 ${esc(s.company)}. All rights reserved.${s.scci?" · SCCI No. "+esc(s.scci):""}${s.ntn?" · NTN "+esc(s.ntn):""}</span><span class="f-soc">${[["instagram","Instagram"],["facebook","Facebook"],["linkedin","LinkedIn"]].filter(x=>s[x[0]]).map(x=>`<a href="${esc(s[x[0]])}" target="_blank" rel="noopener">${x[1]}</a>`).join("")}<a href="https://wa.me/${waNum(s.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a></span></div></div></footer>
`;
}
const EYEBROW={shop:"Product catalogue — made to order","private-label":"Private label & customisation",manufacturing:"Manufacturing transparency",markets:"Global markets",about:"About the manufacturer",blog:"Knowledge center",contact:"Contact the production team",rfq:"Production brief",cart:"Request for quotation",faq:"Buyer questions","privacy-policy":"Legal",terms:"Legal",account:"Buyer account",admin:"Staff area"};
const BANNER_PAGES=[["shop","Shop / catalogue"],["private-label","Private Label"],["manufacturing","Manufacturing"],["markets","Global Markets"],["about","About"],["blog","Knowledge Center"],["contact","Contact"],["rfq","Production brief"],["faq","FAQ"]];
function bannerImg(){const b=S.content.banners||{};if(route.startsWith("cat-")){const c=catOf(route.slice(4));if(c)return c.banner||c.image||b.shop||""}if(route.startsWith("post-")){const p=S.posts.find(x=>x.id===route.slice(5));return (p&&p.image)||b.blog||""}return b[route]||""}
function phead(title,sub,crumbs){
  const eb=EYEBROW[route]||(route.startsWith("cat-")?"Product family":route.startsWith("post-")?"Buyer guide":"");
  if(["account","admin","cart","privacy-policy","terms"].includes(route)||route.startsWith("product-"))return `<div class="phead"><div class="wrap">${crumbs?`<div class="crumbs">${crumbs}</div>`:""}${eb?`<div class="dot-eyebrow">${eb}</div>`:""}<h1>${title}</h1>${sub?`<p>${sub}</p>`:""}</div></div>`;
  const img=bannerImg();
  const kits=S.products.filter(p=>p.active&&(!route.startsWith("cat-")||p.cat===route.slice(4))).slice(0,4);
  return `<section class="pbanner">${img?`<img class="pb-img" src="${esc(img)}" alt="">`:`<div class="pb-img pb-kits">${kits.map(k=>`<img src="${pimg(k)}" alt="">`).join("")}</div>`}<div class="pb-shade"></div>
   <div class="wrap pb-inner">${crumbs?`<div class="crumbs">${crumbs}</div>`:""}${eb?`<div class="pb-eb">${eb}</div>`:""}<h1>${title}</h1>${sub?`<p>${sub}</p>`:""}</div></section>`;
}

/* ============ public pages ============ */
function prodCard(p){
  const c=catOf(p.cat);
  return `<article class="prod"><a class="img" href="#product-${p.id}"><img src="${pimg(p)}" alt="${esc(p.name)}" loading="lazy"><span class="tag">${esc(c?c.name:"")}</span></a>
  <div class="body"><span class="mono muted">${esc(p.sku)}</span><h3 data-go="product-${p.id}">${esc(p.name)}</h3>
  <ul><li>${p.gsm?p.gsm+" GSM · ":""}${esc(p.comp)}</li><li>Sample ${p.sample} working days</li></ul>
  <div class="row"><span class="dots">${p.colors.slice(0,6).map(x=>`<i style="background:${col(x)}" title="${esc(x)}"></i>`).join("")}</span><span>MOQ ${p.moq} pcs${S.settings.showPrices&&p.price?" · <b style='color:var(--fg)'>"+esc(p.price)+"</b>":""}</span></div>
  <div class="acts"><a class="btn sm" href="#product-${p.id}">View</a><button class="btn sm pri" data-act="addcart" data-id="${p.id}">Add to RFQ</button><button class="btn sm ghost" data-act="wish" data-id="${p.id}" aria-label="Save">${isWished(p.id)?"Saved":"Save"}</button></div></div></article>`;
}
const isWished=id=>{const u=curUser();return u&&u.wishlist.includes(id)};
const curUser=()=>session.user&&S.users.find(u=>u.id===session.user.id);

const QCSTEPS=[["Material Inspection","Fabric, trims and colour direction are reviewed before production moves forward."],["Construction Checks","Panels, seams, structure and build details are checked against the approved brief."],["Stitching Checks","Stitching consistency, alignment and finishing quality are reviewed during production."],["Print / Embroidery Inspection","Decoration placement, colour, density and finish are checked against the artwork."],["Measurement Checks","Sizing and grading are measured against your size specification."],["Final Garment Review","Every finished piece is checked for defects, loose threads and cleanliness."],["Packing Audit","Labels, folding, polybags and carton counts are verified before export."]];
async function signOutNow(){
  /* end the session on the server if it still exists, then always clear it in this browser */
  try{if(LIVE.sb)await Promise.race([LIVE.sb.auth.signOut({scope:"local"}),new Promise(r=>setTimeout(r,2500))])}catch(e){}
  try{Object.keys(localStorage).filter(k=>k.startsWith("sb-")||k.includes("auth-token")).forEach(k=>localStorage.removeItem(k))}catch(e){}
  try{sessionStorage.clear()}catch(e){}
  session={admin:false,user:null};LIVE.uid=null;
  location.replace("/account?signed-out=1");
}
function waNum(n){let d=String(n||"").replace(/\D/g,"");if(d.startsWith("00"))d=d.slice(2);else if(d.startsWith("0"))d="92"+d.slice(1);return d}
const FLAG=cc=>cc.toUpperCase().replace(/./g,ch=>String.fromCodePoint(127397+ch.charCodeAt(0)));
function qcVisual(i){const c=S.content,im=(c.qcImages||[])[i];return im?`<img src="${esc(im)}" alt="">`:`<div class="qc-ph"><img src="${garment(["jersey","jacket","hoodie","polo","vest","tracksuit","pack"][i%7],"#2a2a28","#F26A1B",["front","close","side","front","back","front","front"][i%7])}" alt=""></div>`}
const numWord=n=>["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve"][n]||String(n);
function heroLines(sents){const out=[];sents.forEach((s,i)=>{const w=s.split(" ");if(i>0&&w.length>2){out.push({t:w.slice(0,-1).join(" "),em:i===1});out.push({t:w[w.length-1],em:i===1})}else out.push({t:s,em:i===1})});return out}
function countUp(){if(typeof document==="undefined")return;const els=document.querySelectorAll(".h-stats .cnt");if(!els.length)return;if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;const t0=performance.now(),D=1400;els.forEach(e=>e.textContent="0");(function step(t){const k=Math.min(1,(t-t0)/D),ease=1-Math.pow(1-k,3);els.forEach(e=>{e.textContent=Math.round(+e.dataset.to*ease)});if(k<1)requestAnimationFrame(step)})(t0)}
function pgHome(){
  const c=S.content, s=S.settings, feat=S.products.filter(p=>p.featured&&p.active).slice(0,4);
  const kits=[S.products[0],S.products.find(p=>p.type==="hoodie"),S.products.find(p=>p.type==="puffer")].filter(Boolean);
  const words=c.heroTitle.split(/(?<=\.)\s+/); 
  const media=c.heroVideo
    ?`<video class="hv-media" src="${esc(c.heroVideo)}" ${c.heroImage?`poster="${esc(c.heroImage)}"`:""} autoplay muted loop playsinline preload="metadata"></video><button class="hv-sound" data-act="hvsound" aria-label="Turn sound on">🔇 Sound</button>`
    :c.heroImage?`<img class="hv-media" src="${esc(c.heroImage)}" alt="">`
    :`<div class="hv-media hv-kits">${kits.map(k=>`<img src="${pimg(k)}" alt="">`).join("")}</div>`;
  const tw=S.products.find(p=>p.cat==="teamwear"&&p.active)||S.products[0];
  const qi=ui.qc||0;
  return `<section class="h-video">${media}</section>

  <section class="h-intro"><div class="wrap">
   <div class="dot-eyebrow">Sialkot, Pakistan — International apparel manufacturing</div>
   ${s.since?`<span class="cred-chip"><b>Since ${esc(s.since)}</b> · Manufacturing credentials</span>`:`<span class="cred-chip"><b>Export ready</b> · Manufacturing credentials</span>`}
   <h1 class="h-display">${heroLines(words).map((l,i)=>`<span class="hl ${i%2?"from-r":"from-l"}" style="animation-delay:${.1+i*.18}s">${l.em?`<em>${esc(l.t)}</em>`:esc(l.t)}</span>`).join("")}</h1>
   <div class="h-tag">Sampling 7–10 working days</div>
   <div class="h-stats"><div><span>MOQ</span><b><i class="cnt" data-to="50">50</i><small>pcs</small></b><i>Minimum pieces</i></div><div><span>Sample time</span><b><i class="cnt" data-to="7">7</i>–<i class="cnt" data-to="10">10</i><small>days</small></b><i>Working days</i></div><div><span>Bulk time</span><b><i class="cnt" data-to="27">27</i>–<i class="cnt" data-to="30">30</i><small>days</small></b><i>Working days</i></div></div>
   <p class="h-lead">${esc(c.heroSub)}</p>
   <div class="h-ctas"><a class="pill-btn" href="#rfq">Start your production brief →</a><a class="text-btn" href="#shop">Explore products →</a></div>
  </div></section>

  <section class="h-fam"><div class="wrap"><div class="h-head"><div><div class="dot-eyebrow">Product families</div><h2 class="h-h2">One manufacturer. ${numWord(S.categories.length)} connected apparel ranges.</h2><p class="h-sub">A clean B2B catalogue for buyers building coordinated sportswear, teamwear and private-label collections.</p></div><div class="h-side">Performance product architecture / built around your brand</div></div></div>
   <div class="fam-marquee"><div class="fam-row">${[0,1].map(r=>S.categories.map((k,i)=>`<a class="fam-card" href="#cat-${k.id}" ${r?'aria-hidden="true" tabindex="-1"':""}><img src="${catImg(k)}" alt="" loading="lazy"><div class="fam-body"><h3>${esc(k.name)}</h3><p>${esc(k.blurb)}</p><span>Explore category ↗</span></div></a>`).join("")).join("")}</div></div>
  </section>

  <section class="h-feature"><div class="wrap"><div class="feat-card">
   <div class="feat-img"><img src="${pimg(tw)}" alt="${esc(tw.name)}"></div>
   <div class="feat-copy"><div class="dot-eyebrow">Teamwear</div><h2 class="h-h3">Match-ready kits, built for consistency across every squad.</h2><p>Coordinated jerseys, shorts, tracksuits and coaches wear produced as one program, so colours and fit stay consistent from youth teams to first team.</p>
    <div class="tag-row">${(catOf("teamwear")||{subs:[]}).subs.slice(0,6).map(x=>`<span>${esc(x)}</span>`).join("")}</div>
    <div class="mini-line">One team identity / match / training / travel</div>
    <a class="pill-btn" href="#cat-teamwear">Explore teamwear →</a></div>
  </div></div></section>

  <section class="h-pl"><div class="wrap"><div class="pl-grid"><div><div class="dot-eyebrow light">Private label &amp; customisation</div><h2 class="h-h2">Your brand, developed and manufactured end to end.</h2><p>Garment development, woven labels, hangtags, patches and packaging, made to your brand guide and shipped retail-ready.</p><div class="h-ctas"><a class="pill-btn" href="#private-label">Start your private label project →</a><a class="text-btn light" href="#manufacturing">View the process →</a></div></div>
   <div class="pl-chips">${METHODS.map(m=>`<div><b>${m[0]}</b><span>${m[1]}</span></div>`).join("")}</div></div></div></section>

  <section class="h-qc"><div class="wrap"><div class="qc-grid">
   <div><div class="dot-eyebrow">Quality control</div><h2 class="h-h2 plain">Quality checked at every stage of production.</h2><p class="h-sub">Each checkpoint changes the visual, so buyers can see the complete ${esc(s.company.split(" ")[0])} quality-control flow before packing.</p>
    <div class="qc-list">${QCSTEPS.map((q,i)=>`<button class="qc-item ${i===qi?"on":""}" data-act="qcstep" data-i="${i}"><span class="qn">${String(i+1).padStart(2,"0")}</span><span><b>${q[0]}</b><small>${q[1]}</small></span></button>`).join("")}</div></div>
   <div class="qc-stage"><div class="qc-card">${qcVisual(qi)}<div class="qc-cap"><span class="pin">Pinned checkpoint</span><h3>${QCSTEPS[qi][0]}</h3><p>${QCSTEPS[qi][1]}</p><span class="step">◎ ${esc(s.company.split(" ")[0].toUpperCase())} quality step ${String(qi+1).padStart(2,"0")}</span></div></div></div>
  </div></div></section>

  <section class="h-prods"><div class="wrap"><div class="h-head"><div><div class="dot-eyebrow">Featured products</div><h2 class="h-h2 plain">Studio-clean product slots for serious buyers.</h2><p class="h-sub">Representative catalogue entries with SKU, category, buyer specs and customisation options, built for B2B product discovery.</p></div><a class="text-btn" href="#shop">View full catalogue →</a></div>
   <div class="grid g4">${feat.map(p=>`<article class="slot"><a href="#product-${p.id}" class="slot-img"><img src="${pimg(p)}" alt="${esc(p.name)}" loading="lazy"></a><div class="slot-meta"><span>${esc((catOf(p.cat)||{}).name||"")}</span><span>${esc(p.sku)}</span></div><h3><a href="#product-${p.id}">${esc(p.name)}</a></h3><ul><li>${p.gsm?p.gsm+" GSM":"Custom spec"}</li><li>MOQ ${p.moq} pcs</li><li>Sample ${p.sample} days</li></ul><a class="text-btn sm" href="#product-${p.id}">View product →</a></article>`).join("")}</div></div></section>

  <section class="h-markets"><div class="wrap"><div class="dot-eyebrow light">Global markets</div><h2 class="h-h2">Manufacturing for international buyers, worldwide.</h2><p class="h-sub light">${esc(s.company)} exports to priority markets across Europe, North America, the Middle East and Oceania.</p>
   <div class="mk-grid">${MARKETS.map(m=>`<button class="mk" data-act="market" data-id="${m[0]}"><span class="fl">${FLAG(m[0]==="GB"?"GB":m[0])}</span>${m[1]}</button>`).join("")}</div></div></section>

  ${S.testimonials.length?`<section><div class="wrap"><div class="h-head"><h2 class="h-h2 plain">What buyers say</h2></div><div class="grid g3">${S.testimonials.map(t=>`<blockquote class="quote" style="margin:0"><p>${esc(t.text)}</p><cite><b>${esc(t.name)}</b> · ${esc(t.role)}</cite></blockquote>`).join("")}</div></div></section>`:""}

  ${contactBlock()}
  <section class="h-guides"><div class="wrap"><div class="h-head"><div><div class="dot-eyebrow">Knowledge center</div><h2 class="h-h2 plain">Buyer guides on sourcing, fabrics and production.</h2></div><a class="text-btn" href="#blog">All guides →</a></div>
   <div class="grid g3">${S.posts.slice(0,3).map(postCard).join("")}</div></div></section>`;
}
const postCard=p=>`<article class="guide" data-go="post-${p.id}"><span class="eyebrow">${esc(p.cat)} · ${p.mins} min</span><h3>${esc(p.title)}</h3><span class="muted" style="font-size:13px">${fdate(p.date)} · ${esc(p.author)}</span></article>`;

function pgShop(){
  let list=S.products.filter(p=>p.active);
  if(ui.shopCat!=="all") list=list.filter(p=>p.cat===ui.shopCat);
  if(ui.shopSub) list=list.filter(p=>p.sub===ui.shopSub);
  if(ui.shopQ){const q=ui.shopQ.toLowerCase();list=list.filter(p=>(p.name+p.sku+p.desc).toLowerCase().includes(q))}
  const c=catOf(ui.shopCat), co=S.settings.company.split(" ")[0];
  const subs=c?c.subs.filter(s=>S.products.some(p=>p.cat===c.id&&p.sub===s&&p.active)):[];
  const crumbs=`<a href="#home">Home</a> / <a href="#shop">Shop</a>${c?" / "+esc(c.name):""}`;
  const head=c?phead(c.headline?esc(c.headline):(CAT_HEAD[c.id]||esc(c.name)+" <em>made to your brief.</em>"),"",crumbs)
              :phead("Products built around <em>your program.</em>",`${S.products.filter(p=>p.active).length} products across ${S.categories.length} families. Every item is made to order with your branding.`,crumbs);
  return head+(c?`<section class="dk-sec"><div class="wrap brief-grid"><div><div class="dot-eyebrow">Category briefing</div><p class="brief-text">${esc(c.brief||(co+" manufactures "+c.name.toLowerCase()+" for clubs, academies, schools and brands. "+c.blurb))}</p><p class="brief-text muted">Every piece is developed around your specification, from fabric selection to fit, and produced as a sample first so you can approve it before bulk.</p></div>
   <div><div class="sub-label">Subcategories</div><div class="sub-chips">${c.subs.map(s=>`<button class="dchip" data-act="shopsub" data-id="${esc(s)}">${esc(s)}</button>`).join("")}</div></div></div></section>`:"")+
  `<section class="dk-sec" style="padding-top:${c?"8px":"40px"}"><div class="wrap">
   <div class="dot-eyebrow">Featured products</div><h2 class="dk-h2">${c?esc(c.name)+" products manufactured by "+esc(co)+".":"The full "+esc(co)+" catalogue."}</h2><p class="h-sub">Representative product slots. Filter by ${c?"subcategory":"family"} to browse the range.</p>
   <div class="pill-row">${c?`<button class="dpill ${!ui.shopSub?"on":""}" data-act="shopsub" data-id="">All ${esc(c.name)}</button>${(subs.length?subs:c.subs).map(s=>`<button class="dpill ${ui.shopSub===s?"on":""}" data-act="shopsub" data-id="${esc(s)}">${esc(s)}</button>`).join("")}`
     :`<button class="dpill on" data-act="shopcat" data-id="all">All</button>${S.categories.map(k=>`<button class="dpill" data-act="shopcat" data-id="${k.id}">${esc(k.name)}</button>`).join("")}`}
     <input id="shopq" type="search" placeholder="Search name or SKU" value="${esc(ui.shopQ)}"></div>
   ${list.length?`<div class="grid g4">${list.map(prodCard).join("")}</div>`:`<div class="empty">No products in this ${ui.shopSub?"subcategory":"category"} yet. <a href="#rfq">Send a brief</a> and we will develop it for you.</div>`}
  </div></section>${ctaCard()}`;
}
function ctaCard(){const s=S.settings,co=s.company.split(" ")[0];return `<section class="cta-wrap"><div class="wrap"><div class="cta-card"><div><div class="pb-eb">Request quote / production brief</div><h2>Ready to brief your next ${esc(co)} apparel range?</h2><p>Share product type, quantity, customisation and target delivery. ${esc(co)} replies with the next production step.</p></div><div class="cta-acts"><a class="pill-btn" href="#rfq">Request quote →</a><a class="text-btn light" href="https://wa.me/${waNum(s.whatsapp)}" target="_blank" rel="noopener">WhatsApp →</a></div></div></div></section>`}

function pgProduct(id){
  const p=prod(id); if(!p||!p.active) return phead("Product not found","This product is no longer listed.")+`<section><div class="wrap"><a class="btn" href="#shop">Back to catalogue</a></div></section>`;
  const c=catOf(p.cat); 
  const color=ui.pcolor; const imgs=p.images.length&&!color?p.images.map((_,i)=>pimg(p,i)):[0,1,2,3].map(i=>pimg(p,i,color||p.colors[0]));
  const views=["Front","Back","Side","Close-up"];
  const tabs=[["overview","Overview"],["specs","Specifications"],["custom","Customization"],["size","Size guide"],["packaging","Packaging"],["faq","FAQ"]];
  const pane={
   overview:`<p>${esc(p.desc)}</p><p style="margin-top:10px" class="muted">Produced in Sialkot under ORRA's 7-point quality control. Every order starts with a pre-production sample for your approval.</p>`,
   specs:`<div class="tbl-wrap"><table class="t"><tbody><tr><th>SKU</th><td class="mono">${esc(p.sku)}</td></tr><tr><th>Fabric</th><td>${esc(p.comp)}</td></tr><tr><th>Weight</th><td>${p.gsm?p.gsm+" GSM":"Varies by style"}</td></tr><tr><th>Category</th><td>${esc(c?c.name:"")} · ${esc(p.sub)}</td></tr><tr><th>Fit</th><td>Regular / athletic, graded to your size range</td></tr><tr><th>Colours</th><td>${p.colors.map(esc).join(", ")} or Pantone-matched</td></tr><tr><th>MOQ</th><td>${p.moq} pieces per design / colour</td></tr><tr><th>Lead time</th><td>Sample ${p.sample} working days · Bulk ${p.bulk} working days</td></tr></tbody></table></div>`,
   custom:`<div class="grid g2">${METHODS.slice(0,6).map(m=>`<div class="method"><span class="ic">${m[0]}</span><div><h4>${m[1]}</h4><p>${m[2]}</p></div></div>`).join("")}</div>`,
   size:`<div class="tbl-wrap"><table class="t"><thead><tr><th>Size</th><th>Chest (cm)</th><th>Length (cm)</th><th>Chest (in)</th></tr></thead><tbody>${[["XS",88,66],["S",94,69],["M",100,72],["L",106,74],["XL",112,76],["XXL",118,78]].map(r=>`<tr><td>${r[0]}</td><td class="num">${r[1]}</td><td class="num">${r[2]}</td><td class="num">${(r[1]/2.54).toFixed(1)}</td></tr>`).join("")}</tbody></table></div><p class="muted" style="margin-top:8px;font-size:13px">Youth and women's grading available. Tolerance ±1.5 cm.</p>`,
   packaging:`<p>Folded, individually polybagged with size sticker, packed 25–50 pcs per 5-ply export carton. Custom printed polybags, hangtags and boxes available.</p>`,
   faq:`<details class="faq"><summary>Can I mix sizes within the MOQ?</summary><p>Yes. The 50-piece minimum is per design and colour; sizes can be split freely.</p></details><details class="faq"><summary>Do you charge for samples?</summary><p>Sample cost is quoted with your brief and credited against bulk orders above 300 pieces.</p></details><details class="faq"><summary>Which shipping terms do you offer?</summary><p>EXW, FOB Karachi/Lahore or DDP door delivery by air or sea.</p></details>`
  };
  const rel=S.products.filter(x=>x.cat===p.cat&&x.id!==p.id&&x.active).slice(0,4);
  const n=imgs.length, k=ui.pimg%n;
  return `<div class="wrap"><div class="crumbs" style="color:var(--muted);padding-top:20px"><a href="#home">Home</a> / <a href="#shop">Shop</a> / <a href="#cat-${p.cat}">${esc(c?c.name:"")}</a> / ${esc(p.name)}</div>
  <div class="pd"><div class="gallery"><div class="pc-pills">${p.colors.map(x=>`<button class="${(color||p.colors[0])===x?"on":""}" data-act="pcolor" data-c="${esc(x)}"><i style="background:${col(x)}"></i>${esc(x)}</button>`).join("")}</div>
   <div class="main"><span class="g-cap">${esc(color||p.colors[0])} · ${views[k]||"Photo"} / ${k+1} of ${n}</span><img src="${imgs[k]}" alt="${esc(p.name)}">${n>1?`<button class="g-arr l" data-act="pimg" data-i="${(k-1+n)%n}" aria-label="Previous photo">‹</button><button class="g-arr r" data-act="pimg" data-i="${(k+1)%n}" aria-label="Next photo">›</button>`:""}</div>
   <div class="thumbs">${imgs.map((im,i)=>`<button class="${i===ui.pimg%imgs.length?"on":""}" data-act="pimg" data-i="${i}" aria-label="${views[i]||"Photo "+(i+1)}"><img src="${im}" alt=""></button>`).join("")}</div></div>
   <div><span class="p-meta"><b>${esc(c?c.name:"")}</b> ${esc(p.sku)}</span><h1 style="margin-top:6px">${esc(p.name)}</h1><p style="margin-top:12px">${esc(p.desc)}</p>
   <div class="facts"><div><b>${p.moq} pcs</b><span>MOQ / colour</span></div><div><b>${p.sample}</b><span>Sample days</span></div><div><b>${p.bulk}</b><span>Bulk days</span></div></div>
   ${S.settings.showPrices&&p.price?`<p style="font-family:var(--display);font-size:30px;margin-bottom:10px">${esc(p.price)} <span class="mono muted">indicative</span></p>`:""}
   <span class="mono muted">Colour: ${esc(color||p.colors[0])}</span>
   <div class="swatches">${p.colors.map(x=>`<button class="${(color||p.colors[0])===x?"on":""}" data-act="pcolor" data-c="${esc(x)}"><i style="background:${col(x)}"></i>${esc(x)}</button>`).join("")}</div>
   <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="pill-btn" data-act="quote1" data-id="${p.id}">Request quote →</button><button class="pill-btn alt" data-act="addcart" data-id="${p.id}">+ Add to RFQ</button><button class="btn ghost" data-act="wish" data-id="${p.id}">${isWished(p.id)?"Saved":"Save"}</button></div>
   </div></div>
  <div class="tabs">${tabs.map(t=>`<button class="${ui.ptab===t[0]?"on":""}" data-act="ptab" data-t="${t[0]}">${t[1]}</button>`).join("")}</div>
  <div class="tabpane">${pane[ui.ptab]}</div>
  ${rel.length?`<section style="padding-top:20px"><div class="dot-eyebrow">Related products</div><h2 class="dk-h2">More from ${esc(c?c.name:"this range")}</h2><div class="grid g4" style="margin-top:20px">${rel.map(prodCard).join("")}</div></section>`:""}</div>${ctaCard()}`;
}

function pgPrivate(){
  const st=["Brand brief","Product development","Material selection","Colour development","Printing","Embroidery","Woven labels","Neck labels","Size labels","Hangtags","Rubber / PVC patches","Custom packaging","Sampling","Review","Approval","Bulk production","Quality control","Export"];
  return phead("Your brand. <em>Manufactured by ORRA.</em>","There is no fixed catalogue to choose from. From first sketch to a finished, branded product, ORRA develops and manufactures apparel around your identity.")+
  `<section class="pl-statement"><div class="wrap"><p class="big-line">Your design. Your labels. Your packaging. <em>Our production floor.</em></p><p class="h-sub" style="margin-inline:auto;text-align:center">Every private label program is built from your brief: your fabric, your colours, your trims and your packaging, made on the same lines we use for teamwear and export orders.</p></div></section>
  <section><div class="wrap"><div class="sec-head"><div><div class="dot-eyebrow">The process</div><h2>Eighteen steps from brief to export.</h2></div><a class="pill-btn" href="#rfq">Start your private label project →</a></div>
  <div class="steps" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr))">${st.map((s,i)=>`<div><b>${String(i+1).padStart(2,"0")}</b><h4>${s}</h4></div>`).join("")}</div></div></section>
  <section style="background:var(--sunk)"><div class="wrap"><div class="sec-head"><h2>Private label products</h2></div><div class="grid g4">${S.products.filter(p=>p.cat==="private-label"&&p.active).map(prodCard).join("")}</div></div></section>`;
}
function pgManufacturing(){
  const deps=["Cutting Department","Printing","Embroidery","Stitching Floor","Quality Control","Packing","Warehouse & Export"];
  const c=S.content;
  return phead("Built for buyers who want to <em>see how their product is made.</em>","Full process visibility, structured quality control and production planned around international delivery dates.")+
  `<section><div class="wrap">${statBlock(c)}
  <div class="sec-head" style="margin-top:40px"><div><div class="dot-eyebrow">Production flow</div><h2>Ten stages. One accountable team.</h2></div><a class="pill-btn" href="#rfq">Request quote →</a></div><div class="steps">${STEPS10.map((s,i)=>`<div><b>${String(i+1).padStart(2,"0")}</b><h4>${s[0]}</h4><p>${s[1]}</p></div>`).join("")}</div></div></section>
  <section style="background:var(--sunk)"><div class="wrap"><div class="sec-head"><div><div class="dot-eyebrow">Inside the factory</div><h2>Every department under one roof.</h2></div></div><div class="grid g4">${deps.map((d,i)=>`<div class="cat-card"><div class="img"><img src="${S.media[i]?S.media[i].src:garment(["jersey","hoodie","polo","jacket","shorts","pack","puffer"][i],"#3a3a38","#F26A1B")}" alt="${d}"></div><div class="body"><h3 style="font-size:22px">${d}</h3></div></div>`).join("")}</div></div></section>`;
}
function pgMarkets(){
  const m=ui.market&&MARKETS.find(x=>x[0]===ui.market);
  return phead("Manufacturing for international buyers, <em>worldwide.</em>","From Sialkot to clubs, academies, schools and brands across Europe, North America, the Middle East and Oceania.")+
  `<section><div class="wrap"><div class="grid g4">${MARKETS.map(x=>`<button class="market" data-act="market" data-id="${x[0]}" style="${ui.market===x[0]?"border-color:var(--accent);box-shadow:inset 0 0 0 1px var(--accent)":""}"><span class="cc">${x[0]}</span><b>${x[1]}</b><span class="mono muted">${x[2]}</span><span class="muted" style="font-size:13px">${x[3]}</span></button>`).join("")}</div>
  ${m?`<div class="panel" style="margin-top:20px"><span class="eyebrow">${m[2]}</span><h2 style="font-size:44px;margin:8px 0 12px">${m[1]} market briefing</h2><dl class="kv"><dt>Sports focus</dt><dd>${m[3]}</dd><dt>Buyers</dt><dd>Clubs, academies, schools, retailers and private-label brands</dd><dt>Shipping</dt><dd>Air or sea freight from Pakistan · EXW, FOB or DDP</dd><dt>Popular</dt><dd>${S.products.filter(p=>m[3].toLowerCase().includes((p.sub||"").split(" ")[0].toLowerCase())).slice(0,3).map(p=>`<a href="#product-${p.id}">${esc(p.name)}</a>`).join(", ")||"Teamwear programs"}</dd></dl><div style="margin-top:16px"><a class="btn pri" href="#rfq">Request quote for ${m[1]}</a></div></div>`:`<p class="muted" style="margin-top:16px">Select a market to see its briefing.</p>`}</div></section>`;
}
function statBlock(c,since){const it=[since&&["Established",since],c.statFactory&&["Facility",c.statFactory],c.statStaff&&["Team",c.statStaff],c.statCapacity&&["Capacity",c.statCapacity]].filter(Boolean);if(!it.length)return"";return `<div class="stats ${it.length===3?"stats3":""}">${it.map(x=>`<div class="stat"><span>${x[0]}</span><b>${esc(x[1])}</b></div>`).join("")}</div>`}
function pgAbout(){
  const s=S.settings,c=S.content;
  return phead("A manufacturing partner, <em>not a generic supplier.</em>",esc(c.aboutText))+
  `<section><div class="wrap">${statBlock(c,s.since)}
  <div class="sec-head" style="margin-top:40px"><h2>Business credentials</h2></div>
  <div class="grid g3">${s.scci?`<div class="cert"><span class="seal">SCCI</span><h4 style="font-size:22px">Sialkot Chamber of Commerce</h4><p class="muted">Membership No. ${esc(s.scci)}</p></div>`:""}
  ${s.ntn?`<div class="cert"><span class="seal">NTN</span><h4 style="font-size:22px">National Tax Number</h4><p class="muted">${esc(s.ntn)}</p></div>`:""}
  <div class="cert"><span class="seal">QC</span><h4 style="font-size:22px">7-point quality control</h4><p class="muted">Structured checks from fabric to packing</p></div></div>
  <div class="sec-head" style="margin-top:48px"><h2>Who we work with</h2></div>
  <div style="display:flex;gap:8px;flex-wrap:wrap">${["Football clubs","Academies","Schools & universities","Sports retailers","Apparel brands","Corporate teams","Event organisers","Distributors","Startups"].map(b=>`<span class="chip">${b}</span>`).join("")}</div></div></section>`;
}
function pgBlog(){
  const cats=["All",...new Set(S.posts.map(p=>p.cat))]; const f=ui.blogCat||"All";
  const list=S.posts.filter(p=>f==="All"||p.cat===f);
  return phead("Buyer guides on sourcing, <em>fabrics and production.</em>","Practical answers for buyers planning custom sportswear, teamwear and private-label orders.")+
  `<section><div class="wrap"><div class="toolbar">${cats.map(c=>`<button class="chip ${f===c?"on":""}" data-act="blogcat" data-id="${esc(c)}">${esc(c)}</button>`).join("")}</div><div class="grid g3" style="row-gap:32px">${list.map(postCard).join("")}</div></div></section>`;
}
function pgPost(id){
  const p=S.posts.find(x=>x.id===id); if(!p) return phead("Guide not found","");
  return phead(esc(p.title),`${esc(p.cat)} · ${p.mins} min read · ${fdate(p.date)} · ${esc(p.author)}`,`<a href="#home">Home</a> / <a href="#blog">Knowledge Center</a>`)+
  `<section><div class="wrap"><div class="prose">${p.body.split("\n\n").map(x=>`<p>${esc(x)}</p>`).join("")}<div style="margin-top:28px;display:flex;gap:10px;flex-wrap:wrap"><a class="btn pri" href="#rfq">Start a production brief</a><a class="btn" href="#blog">More guides</a></div></div></div></section>`;
}
const IC={
 mail:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
 wa:'<svg viewBox="0 0 32 32" width="20" height="20"><path fill="currentColor" d="M16 3.5A12.4 12.4 0 0 0 5.3 22.2L3.6 28.4l6.4-1.7A12.4 12.4 0 1 0 16 3.5zm5.6 14.9c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.3 8.3 0 0 1-2.4-1.5 9.1 9.1 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6.3-.5a.6.6 0 0 0 0-.5l-.9-2.3c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.3 6.3 0 0 0 1.3 3.3 14.3 14.3 0 0 0 5.5 4.8c2 .9 2.8.9 3.8.8a3.2 3.2 0 0 0 2.1-1.5 2.6 2.6 0 0 0 .2-1.5c-.1-.2-.3-.3-.6-.4z"/></svg>',
 phone:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
 pin:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
 ig:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
 fb:'<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v7h4v-7h3l1-4h-4V8.5c0-.3.2-.5.5-.5z"/></svg>',
 li:'<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4 9h4v11H4zM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4 6h4v1.6c.6-1 1.9-1.9 3.7-1.9C20 8.7 21 10.3 21 13v7h-4v-6c0-1.5-.5-2.4-1.8-2.4S13 12.6 13 14v6h-3z"/></svg>'
};
function contactBlock(){
  const s=S.settings, wa="https://wa.me/"+waNum(s.whatsapp), tel="tel:"+String(s.phone).replace(/[^\d+]/g,"");
  const card=(ic,label,val,href,ext)=>`<a class="cd-card" href="${esc(href)}" ${ext?'target="_blank" rel="noopener"':""}><span class="cd-ic">${ic}</span><span class="cd-l">${label}</span><span class="cd-v">${esc(val)}</span></a>`;
  const soc=[[wa,IC.wa,"WhatsApp",1],s.instagram&&[s.instagram,IC.ig,"Instagram",1],s.facebook&&[s.facebook,IC.fb,"Facebook",1],s.linkedin&&[s.linkedin,IC.li,"LinkedIn",1],["mailto:"+s.email,IC.mail,"Email",0]].filter(Boolean);
  return `<section class="cd-sec"><div class="wrap"><div class="dot-eyebrow">Contact details</div><h2 class="cd-h">Reach us directly.</h2>
   <div class="cd-grid">${card(IC.mail,"Email",s.email,"mailto:"+s.email)}${card(IC.wa,"WhatsApp",s.whatsapp,wa,1)}${card(IC.phone,"Phone",s.phone,tel)}${card(IC.pin,"Manufacturing location",s.address.replace(/,\s*Punjab/i,""),"https://maps.google.com/?q="+encodeURIComponent(s.company+" "+s.address),1)}</div>
   <div class="cd-soc">${soc.map(x=>`<a href="${esc(x[0])}" ${x[3]?'target="_blank" rel="noopener"':""} aria-label="${x[2]}" title="${x[2]}">${x[1]}</a>`).join("")}</div>
  </div></section>`;
}
function pgContact(){
  const s=S.settings;
  return phead("Talk to the team that <em>makes your product.</em>","Share your sport, quantities and delivery date. A production specialist replies within one working day.")+contactBlock()+
  `<section><div class="wrap"><div class="grid g2" style="gap:32px">
   <div class="panel"><h3 style="font-size:30px;margin-bottom:16px">Send us a message</h3><form class="form" id="contactForm" novalidate>
    <div class="f2"><div class="field"><label for="c_name">Full name *</label><input id="c_name" required value="${esc(session.user?session.user.name:"")}"></div><div class="field"><label for="c_email">Email *</label><input id="c_email" type="email" required value="${esc(session.user?session.user.email:"")}"></div></div>
    <div class="field"><label for="c_company">Company</label><input id="c_company"></div>
    <div class="field"><label for="c_msg">Message *</label><textarea id="c_msg" required></textarea></div>
    <label class="switch"><input type="checkbox" id="c_consent"> I agree to the <a href="#privacy-policy">privacy policy</a></label>
    <p class="err" id="c_err"></p><button class="btn pri" type="submit">Send message</button></form></div>
   <div style="display:flex;flex-direction:column;gap:16px"><dl class="kv"><dt>Email</dt><dd style="user-select:all">${esc(s.email)}</dd><dt>WhatsApp</dt><dd style="user-select:all">${esc(s.whatsapp)}</dd><dt>Phone</dt><dd style="user-select:all">${esc(s.phone)}</dd><dt>Address</dt><dd>${esc(s.address)}</dd>${s.hours?`<dt>Hours</dt><dd>${esc(s.hours)}</dd>`:""}</dl>
   <div class="map"><b>ORRA Industries · Sialkot</b></div><a class="btn" href="https://maps.google.com/?q=${encodeURIComponent(s.company+" "+s.address)}" target="_blank" rel="noopener">Open in Google Maps</a></div>
  </div></div></section>`;
}
const FAMILIES=["Sportswear","Teamwear","Outerwear","Casual Wear","Fitness & Performance","Private Label"];
const QTY=["Under 100","100–500","500–1,000","1,000–5,000","5,000+","Not sure yet"];
const DELIV=["Within 1 month","1–3 months","3–6 months","6+ months","Ongoing","Not sure yet"];
function pgRfq(){
  const r=ui.rfq, st=ui.rfqStep, u=session.user;
  const opts=(arr,key,multi)=>`<div class="opt-grid">${arr.map(x=>{const on=multi?(r[key]||[]).includes(x):r[key]===x;return `<button type="button" class="opt ${on?"on":""}" data-act="rfqopt" data-k="${key}" data-v="${esc(x)}" data-m="${multi?1:""}"><b>${esc(x)}</b></button>`}).join("")}</div>`;
  let body="";
  if(st===1) body=`<h3>What are you making?</h3><p class="muted" style="margin:6px 0 16px">Pick one product family.</p>${opts(FAMILIES,"family")}`;
  if(st===2) body=`<h3>Approximate quantity</h3><p class="muted" style="margin:6px 0 16px">Total pieces across all sizes.</p>${opts(QTY,"qty")}<div class="field" style="margin-top:14px;max-width:260px"><label for="r_exact">Exact quantity (optional)</label><input id="r_exact" type="number" min="1" value="${esc(r.exact||"")}"></div>`;
  if(st===3) body=`<h3>Customization methods</h3><p class="muted" style="margin:6px 0 16px">Select all that apply (optional).</p>${opts(METHODS.map(m=>m[1]),"methods",true)}`;
  if(st===4) body=`<h3>Upload artwork or tech pack</h3><p class="muted" style="margin:6px 0 16px">Up to 5 files, 3 MB each. JPG, PNG, WebP, GIF or PDF.</p><input type="file" id="r_files" multiple accept=".jpg,.jpeg,.png,.webp,.gif,.pdf"><div style="margin-top:12px">${(r.files||[]).map(f=>`<span class="chip">${esc(f)}</span>`).join(" ")||'<span class="muted">No files yet.</span>'}</div>`;
  if(st===5) body=`<h3>Target delivery</h3><p class="muted" style="margin:6px 0 16px">When do you need goods delivered?</p>${opts(DELIV,"delivery")}<div class="field" style="margin-top:14px"><label for="r_notes">Additional notes</label><textarea id="r_notes">${esc(r.notes||"")}</textarea></div>`;
  if(st===6) body=`<h3>Your details</h3><p class="muted" style="margin:6px 0 16px">We reply within one working day.</p><div class="form"><div class="f2"><div class="field"><label for="r_name">Full name *</label><input id="r_name" value="${esc(r.name||u?.name||"")}"></div><div class="field"><label for="r_company">Company *</label><input id="r_company" value="${esc(r.company||u?.company||"")}"></div></div><div class="f2"><div class="field"><label for="r_country">Country *</label><input id="r_country" value="${esc(r.country||u?.country||"")}"></div><div class="field"><label for="r_email">Email *</label><input id="r_email" type="email" value="${esc(r.email||u?.email||"")}"></div></div><div class="field"><label for="r_phone">WhatsApp / phone *</label><input id="r_phone" value="${esc(r.phone||u?.phone||"")}"></div><label class="switch"><input type="checkbox" id="r_consent"> I agree to the <a href="#privacy-policy">privacy policy</a> and <a href="#terms">terms</a></label></div>`;
  if(st===7) return phead("Brief received","")+`<section><div class="wrap"><div class="panel" style="max-width:620px"><span class="eyebrow">Reference</span><h2 style="font-size:56px;margin:6px 0 12px">${esc(r.done)}</h2><p>Thank you. Our production team will reply within one working day with questions or a quotation.</p><p class="muted" style="margin-top:8px">${session.user?"Track this brief in your buyer panel.":"Create a buyer account with the same email to track status online."}</p><div style="display:flex;gap:10px;margin-top:18px;flex-wrap:wrap"><a class="btn pri" href="#account">Go to buyer panel</a><button class="btn" data-act="rfqnew">Start another brief</button></div></div></div></section>`;
  return phead("Start your <em>production brief.</em>","Six quick steps. No account needed. About three minutes.")+
  `<section><div class="wrap"><div class="panel" style="max-width:820px"><div class="progress">${[1,2,3,4,5,6].map(i=>`<i class="${i<=st?"on":""}"></i>`).join("")}</div><span class="mono muted">Step ${st} of 6</span><div style="margin-top:8px">${body}</div><p class="err" id="r_err" style="margin-top:10px"></p>
  <div style="display:flex;justify-content:space-between;margin-top:20px;gap:10px">${st>1?`<button class="btn" data-act="rfqback">Back</button>`:"<span></span>"}<button class="btn pri" data-act="rfqnext">${st===6?"Submit production brief":"Continue"}</button></div></div>
  ${S.cart.length?`<p class="muted" style="margin-top:12px">${S.cart.length} item(s) from your RFQ cart will be attached.</p>`:""}</div></section>`;
}
function pgCart(){
  return phead("Your <em>RFQ cart.</em>","Collect products, set quantities and send them as one production brief.")+
  `<section><div class="wrap">${S.cart.length?`<div class="tbl-wrap"><table class="t"><thead><tr><th></th><th>Product</th><th>Qty</th><th>Sizes</th><th>Colour</th><th>Notes</th><th></th></tr></thead><tbody>${S.cart.map((it,i)=>{const p=prod(it.pid);if(!p)return"";return `<tr><td><img class="thumb" src="${pimg(p)}" alt=""></td><td><b>${esc(p.name)}</b><br><span class="mono muted">${esc(p.sku)}</span></td><td><input data-cart="${i}" data-f="qty" type="number" min="${p.moq}" value="${it.qty}" style="width:80px;padding:6px;border:1px solid var(--line);border-radius:4px;background:var(--surface)"></td><td><input data-cart="${i}" data-f="size" value="${esc(it.size)}" style="width:100px;padding:6px;border:1px solid var(--line);border-radius:4px;background:var(--surface)"></td><td><select data-cart="${i}" data-f="color" style="padding:6px;border:1px solid var(--line);border-radius:4px;background:var(--surface)">${p.colors.map(c=>`<option ${c===it.color?"selected":""}>${esc(c)}</option>`).join("")}</select></td><td><input data-cart="${i}" data-f="note" value="${esc(it.note)}" placeholder="Logo, names…" style="width:150px;padding:6px;border:1px solid var(--line);border-radius:4px;background:var(--surface)"></td><td><button class="btn sm danger" data-act="cartrm" data-i="${i}">Remove</button></td></tr>`}).join("")}</tbody></table></div>
   <p class="mono muted" style="margin-top:10px">Total ${S.cart.reduce((a,b)=>a+ +b.qty,0)} pcs · MOQ ${50} per design / colour</p>
   <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap"><button class="btn pri" data-act="cartsubmit">Submit as production brief</button><a class="btn" href="https://wa.me/${waNum(S.settings.whatsapp)}?text=${encodeURIComponent("RFQ: "+S.cart.map(it=>(prod(it.pid)||{}).sku+" x"+it.qty).join(", "))}" target="_blank" rel="noopener">Send on WhatsApp</a><a class="btn ghost" href="#shop">Add more products</a></div>`
   :`<div class="empty"><h3 style="font-size:32px;margin-bottom:8px">Your RFQ cart is empty</h3><p>Add products from the catalogue to request one combined quote.</p><a class="btn pri" href="#shop" style="margin-top:16px">Explore products</a></div>`}</div></section>`;
}
function pgLegal(kind){
  const s=S.settings;
  const docs={
   "privacy-policy":["Privacy policy",[["What we collect","Name, company, country, email, phone and files you upload when you send a message or production brief."],["Why we collect it","To prepare quotations, produce samples and orders, and contact you about your enquiry."],["How long we keep it","Enquiry data for 3 years; order records for 7 years for tax purposes."],["Sharing","We do not sell your data. Couriers and payment providers receive only what they need to deliver your order."],["Your rights","Email "+s.email+" to access, correct or delete your data."]]],
   "terms":["Terms of business",[["Quotations","Valid for 30 days. Prices depend on fabric, decoration and quantity."],["Minimum order","50 pieces per design and colour."],["Sampling","7–10 working days after artwork approval. Sample fees are credited on bulk orders above 300 pieces."],["Payment","50% deposit to start bulk, 50% before shipment, by bank transfer (T/T)."],["Lead time","Bulk production 27–30 working days after sample approval and deposit."],["Defects & returns","Report defects within 14 days of delivery with photos. Confirmed manufacturing defects are remade or credited."],["Shipping","EXW, FOB or DDP. Risk passes according to the agreed Incoterm."]]],
   "faq":["Frequently asked questions",[["What is your minimum order?","50 pieces per design and colour; sizes can be mixed."],["How long do samples take?","7–10 working days after artwork approval."],["How long does bulk take?","27–30 working days after sample approval and deposit."],["Do you ship worldwide?","Yes, by air or sea, with door-to-door DDP available."],["Can you work from my tech pack?","Yes. Upload it in the production brief or send it by email."],["Do you show prices?","Every order is custom, so we quote per program after reviewing your brief."]]]
  }[kind];
  return phead(docs[0],kind==="faq"?"":"Last updated 3 November 2026")+`<section><div class="wrap"><div class="prose">${kind==="faq"?docs[1].map(q=>`<details class="faq"><summary>${esc(q[0])}</summary><p>${esc(q[1])}</p></details>`).join(""):docs[1].map(q=>`<h2>${esc(q[0])}</h2><p>${esc(q[1])}</p>`).join("")}</div></div></section>`;
}

/* ============ buyer panel ============ */
const FLOW=["New","Reviewing","Quoted","Sample","Production","Shipped","Closed"];
function accountNotice(){
  if(typeof location==="undefined")return "";
  const q=new URLSearchParams(location.search);
  if(q.get("check-email"))return `<div class="notice ok"><b>Account created.</b> We sent a confirmation link to <b>${esc(q.get("check-email"))}</b>. Open your email, click the link, and you will come back here to log in. Check the spam folder if it does not arrive in a few minutes.</div>`;
  if(q.get("confirmed"))return `<div class="notice ok"><b>Email confirmed.</b> Your account is ready. Log in below with your email and password.</div>`;
  if(q.get("signed-out"))return `<div class="notice">You have been logged out.</div>`;
  if(q.get("error_description")||(location.hash||"").includes("error"))return `<div class="notice bad"><b>This confirmation link has expired or was already used.</b> Try logging in. If that fails, create the account again to get a new link.</div>`;
  return "";
}
function pgAccount(){
  const u=curUser();
  if(LIVE.uid&&!u) return phead("Buyer panel","Loading your account…")+`<section><div class="wrap"><div class="empty">Loading.</div></div></section>`;
  if(!u) return phead("Buyer panel","Track your quotes, manage your RFQ cart and saved products.")+
  `<section><div class="wrap">${accountNotice()}<div class="grid g2" style="gap:24px">
   <div class="panel" id="loginPanel"><h3 style="font-size:30px;margin-bottom:6px">Log in</h3><p class="muted" style="margin-bottom:14px">Track quotes and messages from ORRA.</p><form class="form" id="loginForm"><div class="field"><label for="l_email">Email</label><input id="l_email" type="email" value=""></div><div class="field"><label for="l_pass">Password</label><input id="l_pass" type="password"></div><p class="err" id="l_err"></p><button class="btn pri" type="submit">Log in</button></form></div>
   <div class="panel"><h3 style="font-size:30px;margin-bottom:14px">Create account</h3><form class="form" id="regForm"><div class="f2"><div class="field"><label for="g_name">Full name</label><input id="g_name" required></div><div class="field"><label for="g_company">Company</label><input id="g_company"></div></div><div class="f2"><div class="field"><label for="g_email">Email</label><input id="g_email" type="email" required></div><div class="field"><label for="g_country">Country</label><input id="g_country"></div></div><div class="field"><label for="g_pass">Password (6+ characters)</label><input id="g_pass" type="password" required></div><p class="err" id="g_err"></p><button class="btn" type="submit">Create account</button></form></div>
  </div></div></section>`;
  const mine=S.rfqs.filter(r=>r.userId===u.id||(!LIVE.on&&r.email.toLowerCase()===(u.email||"").toLowerCase()));
  const msgs=S.messages.filter(m=>m.userId===u.id||(m.email||"").toLowerCase()===(u.email||"").toLowerCase());
  const t=ui.acctTab;
  const tabs=[["overview","Overview"],["quotes","My quotes",mine.length],["cart","RFQ cart",S.cart.length],["saved","Saved products",u.wishlist.length],["messages","Messages",msgs.length],["profile","Profile"]];
  let main="";
  if(t==="overview") main=`<h2>Welcome, ${esc(u.name.split(" ")[0])}</h2><p class="muted">${esc(u.company)} · ${esc(u.country)}</p>
   <div class="stats"><div class="stat"><span>Open quotes</span><b>${mine.filter(r=>!["Shipped","Closed"].includes(r.status)).length}</b></div><div class="stat"><span>In production</span><b>${mine.filter(r=>r.status==="Production").length}</b></div><div class="stat"><span>Saved</span><b>${u.wishlist.length}</b></div><div class="stat"><span>Cart items</span><b>${S.cart.length}</b></div></div>
   <h3 style="font-size:26px;margin:20px 0 10px">Latest activity</h3>${mine.slice(0,3).map(quoteCard).join("")||'<div class="empty">No briefs yet. <a href="#rfq">Start one</a>.</div>'}`;
  if(t==="quotes") main=`<h2>My quotes</h2><div class="toolbar"><a class="btn pri sm" href="#rfq">New production brief</a></div>${mine.map(quoteCard).join("")||'<div class="empty">No briefs yet.</div>'}`;
  if(t==="cart") main=`<h2>RFQ cart</h2><p class="muted" style="margin:10px 0">${S.cart.length} item(s).</p><a class="btn pri" href="#cart">Open RFQ cart</a>`;
  if(t==="saved") main=`<h2>Saved products</h2><div class="grid g3" style="margin-top:16px">${u.wishlist.map(prod).filter(Boolean).map(prodCard).join("")||'<div class="empty">Nothing saved yet.</div>'}</div>`;
  if(t==="messages") main=`<h2>Messages</h2><div style="margin-top:16px;display:flex;flex-direction:column;gap:12px">${msgs.map(m=>`<div class="panel"><span class="mono muted">${fmt(m.created)}</span><p style="margin-top:6px">${esc(m.message)}</p>${m.reply?`<div class="quote" style="margin-top:12px"><p>${esc(m.reply)}</p><cite>ORRA Industries</cite></div>`:`<p class="mono muted" style="margin-top:8px">Awaiting reply</p>`}</div>`).join("")||'<div class="empty">No messages. Use the <a href="#contact">contact form</a>.</div>'}</div>`;
  if(t==="profile") main=`<h2>Profile</h2><form class="form panel" id="profForm" style="max-width:560px;margin-top:16px"><div class="f2"><div class="field"><label for="p_name">Name</label><input id="p_name" value="${esc(u.name)}"></div><div class="field"><label for="p_company">Company</label><input id="p_company" value="${esc(u.company)}"></div></div><div class="f2"><div class="field"><label for="p_country">Country</label><input id="p_country" value="${esc(u.country)}"></div><div class="field"><label for="p_phone">Phone</label><input id="p_phone" value="${esc(u.phone||"")}"></div></div><div class="field"><label for="p_email">Email</label><input id="p_email" type="email" value="${esc(u.email||"")}"></div>${LIVE.on?"":`<div class="field"><label for="p_pass">New password (leave blank to keep)</label><input id="p_pass" type="password"></div>`}<button class="btn pri" type="submit">Save profile</button></form>`;
  return `<div class="app"><aside class="side"><div class="who"><b style="font-family:var(--display);font-size:22px;text-transform:uppercase">${esc(u.name)}</b><div class="mono" style="color:#A9A89F">Buyer account</div></div>${tabs.map(x=>`<button class="${t===x[0]?"on":""}" data-act="acct" data-t="${x[0]}">${x[1]}${x[2]!=null?`<span class="ct">${x[2]}</span>`:""}</button>`).join("")}<button data-act="signout" style="margin-top:auto">Log out</button></aside><div class="main">${main}</div></div>`;
}
function quoteCard(r){
  const idx=FLOW.indexOf(r.status);
  return `<div class="panel" style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><div><b style="font-family:var(--display);font-size:24px">${esc(r.id)}</b> <span class="muted">· ${esc(r.family)} · ${esc(r.qty)} pcs</span></div><span class="pill s-${r.status.toLowerCase()}">${esc(r.status)}</span></div>
  <div class="timeline">${FLOW.slice(0,6).map((f,i)=>`<span class="${i<=idx?"on":""}">${f}</span>`).join("")}</div>
  ${r.quote?`<p><b>Quotation:</b> ${esc(r.quote)}</p>`:""}${r.reply?`<p class="muted" style="margin-top:4px">${esc(r.reply)}</p>`:""}<p class="mono muted" style="margin-top:6px">Submitted ${fmt(r.created)}</p></div>`;
}

/* ============ admin panel ============ */
function pgAdmin(){
  if(LIVE.uid&&!session.admin) return phead("Admin panel","This account does not have staff access.")+`<section><div class="wrap"><button class="btn" data-act="signout">Sign out</button></div></section>`;
  if(!session.admin) return phead("Admin panel","Restricted area for ORRA staff.")+`<section><div class="wrap"><div class="panel" style="max-width:420px"><h3 style="font-size:30px;margin-bottom:6px">Admin login</h3><p class="muted" style="margin-bottom:14px">Sign in with your staff email.</p><form class="form" id="adminLogin"><div class="field"><label for="a_user">Email</label><input id="a_user" type="email" autocomplete="username"></div><div class="field"><label for="a_pass">Password</label><input id="a_pass" type="password" autocomplete="current-password"></div><p class="err" id="a_err"></p><button class="btn pri" type="submit">Log in</button></form></div></div></section>`;
  const t=ui.adminTab; const unread=S.messages.filter(m=>m.status==="Unread").length; const newR=S.rfqs.filter(r=>r.status==="New").length;
  const nav=[["sep","Overview"],["dashboard","Dashboard"],["sep","Sales"],["rfqs","Quotes & RFQs",newR],["messages","Messages",unread],["buyers","Buyers",S.users.length],["sep","Catalogue"],["products","Products",S.products.length],["categories","Categories",S.categories.length],["media","Media library",S.media.length],["sep","Content"],["content","Homepage & pages"],["blog","Knowledge Center",S.posts.length],["testimonials","Testimonials",S.testimonials.length],["sep","System"],["settings","Settings & SEO"],["activity","Activity log"]];
  return `<div class="app"><aside class="side"><div class="who"><b style="font-family:var(--display);font-size:22px;text-transform:uppercase">ORRA Admin</b><div class="mono" style="color:#A9A89F">Signed in as admin</div></div>${nav.map(n=>n[0]==="sep"?`<div class="sep">${n[1]}</div>`:`<button class="${t===n[0]?"on":""}" data-act="atab" data-t="${n[0]}">${n[1]}${n[2]?`<span class="ct">${n[2]}</span>`:""}</button>`).join("")}<button data-act="signout" style="margin-top:18px">Log out</button></aside><div class="main">${(A[t]||A.dashboard)()}</div></div>`;
}
const A={
 dashboard(){
  const by=FLOW.map(f=>[f,S.rfqs.filter(r=>r.status===f).length]); const mx=Math.max(1,...by.map(b=>b[1]));
  const top=[...S.products].sort((a,b)=>b.views-a.views).slice(0,5);
  return `<h2>Dashboard</h2><p class="muted">${fdate(now())}</p>
  <div class="stats"><div class="stat"><span>New RFQs</span><b>${S.rfqs.filter(r=>r.status==="New").length}</b><small>${S.rfqs.length} total briefs</small></div><div class="stat"><span>Unread messages</span><b>${S.messages.filter(m=>m.status==="Unread").length}</b><small>${S.messages.length} total</small></div><div class="stat"><span>Active products</span><b>${S.products.filter(p=>p.active).length}</b><small>${S.products.filter(p=>p.featured).length} featured</small></div><div class="stat"><span>Buyers</span><b>${S.users.length}</b><small>registered accounts</small></div></div>
  <div class="grid g2" style="gap:16px"><div class="panel"><h3 style="font-size:24px;margin-bottom:14px">RFQs by stage</h3><div class="bars">${by.map(b=>`<div class="r"><span>${b[0]}</span><div class="tr"><div class="fl" style="width:${b[1]/mx*100}%"></div></div><b class="mono">${b[1]}</b></div>`).join("")}</div></div>
  <div class="panel"><h3 style="font-size:24px;margin-bottom:14px">Most viewed products</h3><table class="t"><tbody>${top.map(p=>`<tr><td><img class="thumb" src="${pimg(p)}" alt=""></td><td>${esc(p.name)}<br><span class="mono muted">${esc(p.sku)}</span></td><td class="num">${p.views}</td></tr>`).join("")}</tbody></table></div></div>
  <div class="panel" style="margin-top:16px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><h3 style="font-size:24px">Latest RFQs</h3><button class="btn sm" data-act="atab" data-t="rfqs">Open all</button></div><div class="tbl-wrap"><table class="t"><thead><tr><th>Ref</th><th>Buyer</th><th>Family</th><th>Qty</th><th>Status</th><th>Date</th></tr></thead><tbody>${S.rfqs.slice(0,5).map(r=>`<tr style="cursor:pointer" data-act="rfqopen" data-id="${r.id}"><td class="mono">${r.id}</td><td>${esc(r.company)}<br><span class="muted">${esc(r.country)}</span></td><td>${esc(r.family)}</td><td>${esc(r.qty)}</td><td><span class="pill s-${r.status.toLowerCase()}">${r.status}</span></td><td class="mono">${fmt(r.created)}</td></tr>`).join("")}</tbody></table></div></div>`;
 },
 products(){
  let l=S.products; if(ui.aq){const q=ui.aq.toLowerCase();l=l.filter(p=>(p.name+p.sku).toLowerCase().includes(q))} if(ui.af!=="all")l=l.filter(p=>p.cat===ui.af);
  return `<h2>Products</h2><div class="toolbar"><input id="aq" type="search" placeholder="Search name or SKU" value="${esc(ui.aq)}"><select id="af"><option value="all">All categories</option>${S.categories.map(c=>`<option value="${c.id}" ${ui.af===c.id?"selected":""}>${esc(c.name)}</option>`).join("")}</select><button class="btn pri sm" data-act="pedit" data-id="" style="margin-left:auto">Add product</button></div>
  <div class="tbl-wrap"><table class="t"><thead><tr><th>Image</th><th>Product</th><th>Category</th><th>GSM</th><th>Status</th><th>Featured</th><th>Views</th><th></th></tr></thead><tbody>${l.map(p=>`<tr><td><img class="thumb" src="${pimg(p)}" alt=""></td><td><b>${esc(p.name)}</b><br><span class="mono muted">${esc(p.sku)}</span></td><td>${esc((catOf(p.cat)||{}).name)}<br><span class="muted">${esc(p.sub)}</span></td><td class="num">${p.gsm||"–"}</td><td><button class="pill ${p.active?"s-shipped":"s-closed"}" data-act="ptoggle" data-id="${p.id}" style="background:none;cursor:pointer">${p.active?"Live":"Hidden"}</button></td><td><input type="checkbox" data-act="pfeat" data-id="${p.id}" ${p.featured?"checked":""} aria-label="Featured"></td><td class="num">${p.views}</td><td style="white-space:nowrap"><button class="btn sm" data-act="pedit" data-id="${p.id}">Edit</button> <button class="btn sm danger" data-act="pdel" data-id="${p.id}">Delete</button></td></tr>`).join("")}</tbody></table></div>`;
 },
 categories(){
  return `<h2>Categories</h2><p class="muted">Add, edit, reorder or remove the product families shown in the shop menu and the homepage carousel.</p><div class="toolbar"><button class="btn pri sm" data-act="cedit" data-id="">Add category</button><span class="mono muted">${S.categories.length} categories</span></div><div class="grid g3" style="margin-top:16px">${S.categories.map((c,ci)=>`<div class="cat-card"><div class="img"><img src="${catImg(c)}" alt=""></div><div class="body"><h3 style="font-size:24px">${esc(c.name)}</h3><p class="muted" style="font-size:13px">${c.subs.length} sub-categories · ${S.products.filter(p=>p.cat===c.id).length} products</p><div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px"><button class="btn sm" data-act="cedit" data-id="${c.id}">Edit</button><button class="btn sm ghost" data-act="cmove" data-id="${c.id}" data-d="-1" ${ci===0?"disabled":""} aria-label="Move earlier">←</button><button class="btn sm ghost" data-act="cmove" data-id="${c.id}" data-d="1" ${ci===S.categories.length-1?"disabled":""} aria-label="Move later">→</button><button class="btn sm danger" data-act="cdel" data-id="${c.id}">Delete</button></div></div></div>`).join("")}</div>`;
 },
 rfqs(){
  let l=S.rfqs; if(ui.af!=="all"&&FLOW.includes(ui.af)) l=l.filter(r=>r.status===ui.af);
  return `<h2>Quotes & RFQs</h2><div class="toolbar"><button class="chip ${!FLOW.includes(ui.af)?"on":""}" data-act="rf" data-id="all">All</button>${FLOW.map(f=>`<button class="chip ${ui.af===f?"on":""}" data-act="rf" data-id="${f}">${f} (${S.rfqs.filter(r=>r.status===f).length})</button>`).join("")}</div>
  <div class="tbl-wrap"><table class="t"><thead><tr><th>Ref</th><th>Buyer</th><th>Family</th><th>Qty</th><th>Delivery</th><th>Status</th><th>Received</th><th></th></tr></thead><tbody>${l.map(r=>`<tr><td class="mono">${r.id}</td><td><b>${esc(r.company)}</b><br><span class="muted">${esc(r.name)} · ${esc(r.country)}</span></td><td>${esc(r.family)}${r.items.length?`<br><span class="muted">${r.items.length} cart item(s)</span>`:""}</td><td>${esc(r.qty)}</td><td>${esc(r.delivery)}</td><td><span class="pill s-${r.status.toLowerCase()}">${r.status}</span></td><td class="mono">${fmt(r.created)}</td><td><button class="btn sm" data-act="rfqopen" data-id="${r.id}">Open</button></td></tr>`).join("")||`<tr><td colspan="8"><div class="empty">No RFQs in this stage.</div></td></tr>`}</tbody></table></div>`;
 },
 messages(){
  return `<h2>Messages</h2><div style="display:flex;flex-direction:column;gap:12px;margin-top:16px">${S.messages.map(m=>`<div class="panel"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><div><b>${esc(m.name)}</b> <span class="muted">· ${esc(m.company||"")} · ${esc(m.email)}</span></div><span class="pill s-${m.status.toLowerCase()}">${m.status}</span></div><p style="margin-top:8px">${esc(m.message)}</p><p class="mono muted" style="margin-top:4px">${fmt(m.created)}</p>${m.reply?`<div class="quote" style="margin-top:10px"><p>${esc(m.reply)}</p><cite>Your reply</cite></div>`:""}<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap"><input id="rep_${m.id}" placeholder="Write a reply…" style="flex:1 1 220px;padding:8px 10px;border:1px solid var(--line);border-radius:6px;background:var(--surface)"><button class="btn sm pri" data-act="mreply" data-id="${m.id}">Reply</button><button class="btn sm danger" data-act="mdel" data-id="${m.id}">Delete</button></div></div>`).join("")||'<div class="empty">Inbox is empty.</div>'}</div>`;
 },
 buyers(){
  return `<h2>Buyers</h2><div class="tbl-wrap" style="margin-top:16px"><table class="t"><thead><tr><th>Name</th><th>Company</th><th>Email</th><th>Country</th><th>RFQs</th><th>Joined</th><th>Status</th></tr></thead><tbody>${S.users.map(u=>`<tr><td><b>${esc(u.name)}</b></td><td>${esc(u.company)}</td><td>${esc(u.email)}</td><td>${esc(u.country)}</td><td class="num">${S.rfqs.filter(r=>r.userId===u.id||r.email===u.email).length}</td><td class="mono">${fdate(u.created)}</td><td><button class="pill ${u.active?"s-shipped":"s-closed"}" data-act="utoggle" data-id="${u.id}" style="background:none;cursor:pointer">${u.active?"Active":"Blocked"}</button></td></tr>`).join("")}</tbody></table></div>
  <h3 style="font-size:26px;margin:28px 0 10px">Leads from RFQs (no account)</h3><div class="tbl-wrap"><table class="t"><thead><tr><th>Name</th><th>Company</th><th>Email</th><th>Phone</th><th>Country</th></tr></thead><tbody>${S.rfqs.filter(r=>!r.userId).map(r=>`<tr><td>${esc(r.name)}</td><td>${esc(r.company)}</td><td>${esc(r.email)}</td><td>${esc(r.phone)}</td><td>${esc(r.country)}</td></tr>`).join("")}</tbody></table></div>`;
 },
 media(){
  return `<h2>Media library</h2><p class="muted">Upload factory photos, banners and product shots. The first 7 images appear as department photos on the Manufacturing page.</p><div class="toolbar"><label class="btn pri sm" for="mediaUp">Upload images</label><input id="mediaUp" type="file" accept="image/*" multiple hidden></div>
  ${S.media.length?`<div class="media-grid">${S.media.map((m,i)=>`<figure><img src="${m.src}" alt="${esc(m.name)}"><figcaption><span>${esc(m.name)}</span><button data-act="mmdel" data-i="${i}" style="border:0;background:none;color:var(--bad);cursor:pointer">✕</button></figcaption></figure>`).join("")}</div>`:'<div class="empty">No uploads yet. Images are resized before saving.</div>'}`;
 },
 content(){
  const c=S.content;
  const f=(k,l,ta)=>`<div class="field"><label for="ct_${k}">${l}</label>${ta?`<textarea id="ct_${k}" data-ct="${k}">${esc(c[k])}</textarea>`:`<input id="ct_${k}" data-ct="${k}" value="${esc(c[k])}">`}</div>`;
  return `<h2>Homepage & pages</h2><form class="form" id="contentForm" style="margin-top:16px">
  <div class="panel form"><h3 style="font-size:24px">Hero</h3>${f("heroTitle","Hero headline")}${f("heroSub","Hero text",1)}
   <div class="field"><label>Hero image</label><div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">${c.heroImage?`<img src="${c.heroImage}" style="width:160px;border-radius:6px" alt="">`:'<span class="muted">Using product artwork collage</span>'}<label class="btn sm" for="heroUp">Change image</label><input id="heroUp" type="file" accept="image/*" hidden>${c.heroImage?`<button type="button" class="btn sm danger" data-act="herorm">Remove</button>`:""}</div><p class="muted" style="font-size:12px;margin-top:4px">Shown while the video loads, and on its own when there is no video.</p></div>
   <div class="field"><label>Hero video</label><div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">${c.heroVideo?`<video src="${esc(c.heroVideo)}" muted loop autoplay playsinline style="width:200px;border-radius:6px"></video>`:'<span class="muted">No video</span>'}<label class="btn sm" for="heroVid">${c.heroVideo?"Change video":"Upload video"}</label><input id="heroVid" type="file" accept="video/mp4,video/webm" hidden>${c.heroVideo?`<button type="button" class="btn sm danger" data-act="hvrm">Remove</button>`:""}</div><p class="muted" style="font-size:12px;margin-top:4px">MP4 or WebM, up to 45 MB. A short 10–20 second loop without sound works best. It plays muted.</p><p class="err" id="hv_err"></p></div></div>
  <div class="panel form"><h3 style="font-size:24px">Page banners</h3><p class="muted" style="font-size:13px">The large photo at the top of each page. Category pages use the category's own banner (Categories → Edit).</p><div class="media-grid">${BANNER_PAGES.map(([k,l])=>{const im=(c.banners||{})[k];return `<figure>${im?`<img src="${esc(im)}" alt="">`:`<div style="aspect-ratio:1;background:var(--sunk)"></div>`}<figcaption><span>${l}</span></figcaption><div style="display:flex;gap:4px;padding:0 6px 6px"><label class="btn sm" for="bnUp_${k}">Upload</label><input id="bnUp_${k}" data-bn="${k}" type="file" accept="image/*" hidden>${im?`<button type="button" class="btn sm danger" data-act="bnrm" data-k="${k}">✕</button>`:""}</div></figure>`}).join("")}</div></div>
  <div class="panel form"><h3 style="font-size:24px">Quality control photos</h3><p class="muted" style="font-size:13px">One photo per checkpoint on the homepage. Empty slots show product artwork.</p><div class="media-grid">${QCSTEPS.map((q,i)=>`<figure>${(c.qcImages||[])[i]?`<img src="${esc(c.qcImages[i])}" alt="">`:`<div style="aspect-ratio:1;background:var(--sunk)"></div>`}<figcaption><span>${String(i+1).padStart(2,"0")} ${esc(q[0])}</span></figcaption><div style="display:flex;gap:4px;padding:0 6px 6px"><label class="btn sm" for="qcUp${i}">Upload</label><input id="qcUp${i}" data-qc="${i}" type="file" accept="image/*" hidden>${(c.qcImages||[])[i]?`<button type="button" class="btn sm danger" data-act="qcrm" data-i="${i}">✕</button>`:""}</div></figure>`).join("")}</div></div>
  <div class="panel form"><h3 style="font-size:24px">Ticker & call to action</h3>${f("ticker","Ticker text")}${f("ctaTitle","Closing call-to-action headline")}</div>
  <div class="panel form"><h3 style="font-size:24px">About & factory numbers</h3>${f("aboutText","About text",1)}<div class="f2">${f("statFactory","Facility size")}${f("statStaff","Team size")}</div>${f("statCapacity","Monthly capacity")}</div>
  <div><button class="btn pri" type="submit">Save changes</button> <a class="btn ghost" href="#home">View homepage</a></div></form>`;
 },
 blog(){
  return `<h2>Knowledge Center</h2><div class="toolbar"><button class="btn pri sm" data-act="bedit" data-id="">New guide</button></div><div class="tbl-wrap"><table class="t"><thead><tr><th>Title</th><th>Category</th><th>Author</th><th>Date</th><th></th></tr></thead><tbody>${S.posts.map(p=>`<tr><td><b>${esc(p.title)}</b></td><td>${esc(p.cat)}</td><td>${esc(p.author)}</td><td class="mono">${fdate(p.date)}</td><td style="white-space:nowrap"><button class="btn sm" data-act="bedit" data-id="${p.id}">Edit</button> <button class="btn sm danger" data-act="bdel" data-id="${p.id}">Delete</button></td></tr>`).join("")}</tbody></table></div>`;
 },
 testimonials(){
  return `<h2>Testimonials</h2><div class="toolbar"><button class="btn pri sm" data-act="tadd">Add testimonial</button></div><div style="display:flex;flex-direction:column;gap:12px">${S.testimonials.map((t,i)=>`<div class="panel form"><div class="f2"><div class="field"><label>Name</label><input data-tm="${i}" data-f="name" value="${esc(t.name)}"></div><div class="field"><label>Role & company</label><input data-tm="${i}" data-f="role" value="${esc(t.role)}"></div></div><div class="field"><label>Quote</label><textarea data-tm="${i}" data-f="text">${esc(t.text)}</textarea></div><div><button class="btn sm danger" data-act="tdel" data-i="${i}">Delete</button></div></div>`).join("")}</div><p class="mono muted" style="margin-top:10px">Edits save automatically.</p>`;
 },
 settings(){
  const s=S.settings;
  const f=(k,l)=>`<div class="field"><label for="st_${k}">${l}</label><input id="st_${k}" data-st="${k}" value="${esc(s[k])}"></div>`;
  return `<h2>Settings & SEO</h2><form class="form" id="settingsForm" style="margin-top:16px">
  <div class="panel form"><h3 style="font-size:24px">Company</h3><div class="f2">${f("company","Company name")}${f("tagline","Tagline")}</div><div class="f2">${f("since","Established year")}${f("scci","SCCI number")}</div>${f("ntn","NTN")}</div>
  <div class="panel form"><h3 style="font-size:24px">Contact</h3><div class="f2">${f("email","Email")}${f("phone","Phone")}</div><div class="f2">${f("whatsapp","WhatsApp")}${f("hours","Business hours")}</div>${f("address","Address")}</div>
  <div class="panel form"><h3 style="font-size:24px">Social links</h3>${f("instagram","Instagram")}${f("facebook","Facebook page")}${f("linkedin","LinkedIn")}</div>
  <div class="panel form"><h3 style="font-size:24px">SEO</h3>${f("metaTitle","Homepage title (≤ 60 characters)")}<div class="field"><label for="st_metaDesc">Meta description</label><textarea id="st_metaDesc" data-st="metaDesc">${esc(s.metaDesc)}</textarea></div><p class="mono muted" id="seoHint">${s.metaTitle.length} / 60 characters in title</p></div>
  <div class="panel form"><h3 style="font-size:24px">Store options</h3><label class="switch"><input type="checkbox" id="st_showPrices" ${s.showPrices?"checked":""}> Show indicative prices on product pages</label></div>
  <div><button class="btn pri" type="submit">Save settings</button></div></form>`;
 },
 activity(){
  return `<h2>Activity log</h2><div class="log" style="margin-top:16px">${S.log.map(l=>`<div><time>${fmt(l.t)}</time><span><b>${esc(l.who)}</b> · ${esc(l.what)}</span></div>`).join("")||'<div class="empty">No activity yet.</div>'}</div>`;
 }
};

/* ============ modals ============ */
function modal(html){$("#modal-root").innerHTML=`<div class="modal-bg" data-act="mclose"><div class="modal" role="dialog" aria-modal="true">${html}</div></div>`}
function closeModal(){$("#modal-root").innerHTML=""}
function productModal(id){
  const p=id?prod(id):{id:"",sku:"",name:"",cat:"sportswear",sub:"",type:"jersey",colors:["Black","Orange"],desc:"",gsm:150,comp:"",moq:50,sample:"7–10",bulk:"27–30",featured:false,active:true,price:"",images:[],views:0};
  ui.editImgs=[...p.images];
  modal(`<h3>${id?"Edit product":"Add product"}</h3><form class="form" id="prodForm" data-id="${p.id}">
   <div class="f2"><div class="field"><label for="pf_name">Name *</label><input id="pf_name" value="${esc(p.name)}" required></div><div class="field"><label for="pf_sku">SKU * (unique)</label><input id="pf_sku" value="${esc(p.sku)}" required style="font-family:var(--mono)"></div></div>
   <div class="f2"><div class="field"><label for="pf_cat">Category</label><select id="pf_cat">${S.categories.map(c=>`<option value="${c.id}" ${p.cat===c.id?"selected":""}>${esc(c.name)}</option>`).join("")}</select></div><div class="field"><label for="pf_sub">Sub-category</label><input id="pf_sub" value="${esc(p.sub)}" list="subs"><datalist id="subs">${S.categories.flatMap(c=>c.subs).map(s=>`<option value="${esc(s)}">`).join("")}</datalist></div></div>
   <div class="field"><label for="pf_desc">Description</label><textarea id="pf_desc">${esc(p.desc)}</textarea></div>
   <div class="f2"><div class="field"><label for="pf_comp">Fabric composition</label><input id="pf_comp" value="${esc(p.comp)}"></div><div class="field"><label for="pf_gsm">GSM</label><input id="pf_gsm" type="number" value="${p.gsm}"></div></div>
   <div class="f2"><div class="field"><label for="pf_colors">Colours (comma separated)</label><input id="pf_colors" value="${esc(p.colors.join(", "))}"></div><div class="field"><label for="pf_type">Placeholder art</label><select id="pf_type">${["jersey","polo","hoodie","jacket","puffer","vest","shorts","pants","leggings","tracksuit","pack"].map(t=>`<option ${p.type===t?"selected":""}>${t}</option>`).join("")}</select></div></div>
   <div class="f2"><div class="field"><label for="pf_moq">MOQ</label><input id="pf_moq" type="number" value="${p.moq}"></div><div class="field"><label for="pf_price">Indicative price (optional)</label><input id="pf_price" value="${esc(p.price)}" placeholder="e.g. USD 12.50 / pc"></div></div>
   <div class="f2"><div class="field"><label for="pf_sample">Sample days</label><input id="pf_sample" value="${esc(p.sample)}"></div><div class="field"><label for="pf_bulk">Bulk days</label><input id="pf_bulk" value="${esc(p.bulk)}"></div></div>
   <div class="field"><label>Photos</label><div id="pfImgs" class="thumbs"></div><div style="margin-top:8px"><label class="btn sm" for="pf_up">Upload photos</label><input id="pf_up" type="file" accept="image/*" multiple hidden></div></div>
   <div style="display:flex;gap:18px;flex-wrap:wrap"><label class="switch"><input type="checkbox" id="pf_active" ${p.active?"checked":""}> Live on website</label><label class="switch"><input type="checkbox" id="pf_feat" ${p.featured?"checked":""}> Featured on homepage</label></div>
   <p class="err" id="pf_err"></p><div class="foot"><button type="button" class="btn ghost" data-act="mclosebtn">Cancel</button><button class="btn pri" type="submit">Save product</button></div></form>`);
  drawEditImgs();
}
function drawEditImgs(){const el=$("#pfImgs");if(!el)return;el.innerHTML=ui.editImgs.map((s,i)=>`<button type="button" data-act="pfimgdel" data-i="${i}" title="Remove"><img src="${s}" alt=""></button>`).join("")||'<span class="muted" style="font-size:13px">No photos. Placeholder artwork is shown.</span>'}
function rfqModal(id){
  const r=S.rfqs.find(x=>x.id===id); if(!r)return;
  modal(`<h3>${r.id}</h3><span class="pill s-${r.status.toLowerCase()}">${r.status}</span>
  <dl class="kv" style="margin-top:16px"><dt>Buyer</dt><dd>${esc(r.name)} · ${esc(r.company)}</dd><dt>Contact</dt><dd>${esc(r.email)} · ${esc(r.phone)}</dd><dt>Country</dt><dd>${esc(r.country)}</dd><dt>Family</dt><dd>${esc(r.family)}</dd><dt>Quantity</dt><dd>${esc(r.qty)}${r.exact?" ("+esc(r.exact)+" pcs)":""}</dd><dt>Methods</dt><dd>${(r.methods||[]).map(esc).join(", ")||"–"}</dd><dt>Delivery</dt><dd>${esc(r.delivery)}</dd><dt>Files</dt><dd>${(r.files||[]).map(esc).join(", ")||"–"}</dd><dt>Notes</dt><dd>${esc(r.notes)||"–"}</dd></dl>
  ${r.items.length?`<div class="tbl-wrap" style="margin-top:14px"><table class="t"><thead><tr><th>Product</th><th>Qty</th><th>Sizes</th><th>Colour</th><th>Note</th></tr></thead><tbody>${r.items.map(it=>{const p=prod(it.pid)||{name:it.pid,sku:""};return `<tr><td>${esc(p.name)}<br><span class="mono muted">${esc(p.sku)}</span></td><td class="num">${it.qty}</td><td>${esc(it.size)}</td><td>${esc(it.color)}</td><td>${esc(it.note)}</td></tr>`}).join("")}</tbody></table></div>`:""}
  <form class="form" id="rfqForm" data-id="${r.id}" style="margin-top:18px"><div class="f2"><div class="field"><label for="rq_status">Stage</label><select id="rq_status">${FLOW.map(f=>`<option ${r.status===f?"selected":""}>${f}</option>`).join("")}</select></div><div class="field"><label for="rq_quote">Quotation</label><input id="rq_quote" value="${esc(r.quote)}" placeholder="e.g. USD 11.40 / pc"></div></div><div class="field"><label for="rq_reply">Message to buyer (shown in buyer panel)</label><textarea id="rq_reply">${esc(r.reply)}</textarea></div>
  <div class="foot"><button type="button" class="btn danger" data-act="rfqdel" data-id="${r.id}">Delete</button><button type="button" class="btn ghost" data-act="mclosebtn">Close</button><button class="btn pri" type="submit">Save</button></div></form>`);
}
function catModal(id){
  const c=id?catOf(id):{id:"",name:"",blurb:"",subs:[],type:"jersey",c:["Black","Orange"]};
  ui.catImg=null;
  modal(`<h3>${id?"Edit category":"Add category"}</h3><form class="form" id="catForm" data-id="${c.id}"><div class="field"><label for="cf_name">Name</label><input id="cf_name" value="${esc(c.name)}"></div><div class="field"><label for="cf_head">Banner headline</label><input id="cf_head" value="${esc(c.headline||"")}" placeholder="${esc((CAT_HEAD[c.id]||"").replace(/<\/?em>/g,""))}"></div><div class="field"><label for="cf_blurb">Short description (cards and menu)</label><textarea id="cf_blurb">${esc(c.blurb)}</textarea></div><div class="field"><label for="cf_brief">Category briefing (longer text on the category page)</label><textarea id="cf_brief">${esc(c.brief||"")}</textarea></div><div class="field"><label>Banner photo (wide)</label><div style="display:flex;gap:10px;align-items:center">${c.banner?`<img src="${esc(c.banner)}" class="thumb" style="width:110px;height:56px" id="cf_bprev" alt="">`:`<span class="muted" id="cf_bprev">Uses the cover image</span>`}<label class="btn sm" for="cf_bup">Upload</label><input id="cf_bup" type="file" accept="image/*" hidden></div></div><div class="field"><label for="cf_subs">Sub-categories (one per line)</label><textarea id="cf_subs" style="min-height:140px">${esc(c.subs.join("\n"))}</textarea></div><div class="field"><label>Cover image</label><div style="display:flex;gap:10px;align-items:center"><img src="${catImg(c)}" class="thumb" style="width:64px;height:64px" id="cf_prev" alt=""><label class="btn sm" for="cf_up">Change</label><input id="cf_up" type="file" accept="image/*" hidden></div></div><div class="foot"><button type="button" class="btn ghost" data-act="mclosebtn">Cancel</button><button class="btn pri" type="submit">Save</button></div></form>`);
}
function blogModal(id){
  const p=id?S.posts.find(x=>x.id===id):{id:"",title:"",cat:"Buying Guides",mins:5,author:"ORRA Production Team",date:now().slice(0,10),body:""};
  modal(`<h3>${id?"Edit guide":"New guide"}</h3><form class="form" id="blogForm" data-id="${p.id}"><div class="field"><label for="bf_title">Title</label><input id="bf_title" value="${esc(p.title)}" required></div><div class="f2"><div class="field"><label for="bf_cat">Category</label><input id="bf_cat" value="${esc(p.cat)}"></div><div class="field"><label for="bf_author">Author</label><input id="bf_author" value="${esc(p.author)}"></div></div><div class="f2"><div class="field"><label for="bf_date">Publish date</label><input id="bf_date" type="date" value="${esc(p.date)}"></div><div class="field"><label for="bf_mins">Read time (min)</label><input id="bf_mins" type="number" value="${p.mins}"></div></div><div class="field"><label for="bf_body">Body (blank line = new paragraph)</label><textarea id="bf_body" style="min-height:200px">${esc(p.body)}</textarea></div><div class="foot"><button type="button" class="btn ghost" data-act="mclosebtn">Cancel</button><button class="btn pri" type="submit">Publish</button></div></form>`);
}
function confirmModal(text,fn){ui.confirmFn=fn;modal(`<h3>Are you sure?</h3><p>${text}</p><div class="foot"><button class="btn ghost" data-act="mclosebtn">Cancel</button><button class="btn danger" data-act="confirmyes">Delete</button></div>`)}

/* image resize to keep storage small */
function readImg(file,max=900){return new Promise((res,rej)=>{if(!file.type.startsWith("image/"))return rej();const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,max/Math.max(im.width,im.height));const cv=document.createElement("canvas");cv.width=im.width*k;cv.height=im.height*k;cv.getContext("2d").drawImage(im,0,0,cv.width,cv.height);res(cv.toDataURL("image/jpeg",.78))};im.onerror=rej;im.src=fr.result};fr.onerror=rej;fr.readAsDataURL(file)})}

/* ============ render ============ */
function pageHTML(){
  let body;
  const r=route;
  if(r==="home")body=pgHome();
  else if(r==="shop"||r.startsWith("cat-"))body=pgShop();
  else if(r.startsWith("product-"))body=pgProduct(r.slice(8));
  else if(r==="private-label")body=pgPrivate();
  else if(r==="manufacturing")body=pgManufacturing();
  else if(r==="markets")body=pgMarkets();
  else if(r==="about")body=pgAbout();
  else if(r==="blog")body=pgBlog();
  else if(r.startsWith("post-"))body=pgPost(r.slice(5));
  else if(r==="contact")body=pgContact();
  else if(r==="rfq")body=pgRfq();
  else if(r==="cart")body=pgCart();
  else if(["privacy-policy","terms","faq"].includes(r))body=pgLegal(r);
  else if(r==="account")body=pgAccount();
  else if(r==="admin")body=pgAdmin();
  else body=phead("Page not found","This page could not be found.")+`<section><div class="wrap"><a class="btn pri" href="#home">Back to home</a></div></section>`;
  const panel=r==="admin"&&session.admin||r==="account"&&curUser();
  return linkify(header()+`<main class="${r==="shop"||r.startsWith("cat-")||r.startsWith("product-")?"dk":""}">${body}</main>`+(panel?"":footer()));
}
const EYE='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',EYE_OFF='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.3 4.2M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a10 10 0 0 0 4.4-1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>';
function addPwToggles(){document.querySelectorAll('input[type="password"]:not([data-pw])').forEach(inp=>{inp.dataset.pw="1";const w=document.createElement("span");w.className="pw-wrap";inp.parentNode.insertBefore(w,inp);w.appendChild(inp);const b=document.createElement("button");b.type="button";b.className="pw-eye";b.dataset.act="pwtoggle";b.setAttribute("aria-label","Show password");b.innerHTML=EYE;w.appendChild(b)})}
function render(){$("#app").innerHTML=pageHTML();addPwToggles();drawChat();if(route==="home")countUp();document.title=titleOf(route);save()}
function titleOf(r){const s=S.settings;if(r==="home")return s.metaTitle;if(r.startsWith("product-")){const p=prod(r.slice(8));return p?p.name+" | "+s.company:s.company}if(r.startsWith("post-")){const p=S.posts.find(x=>x.id===r.slice(5));return p?p.title+" | "+s.company:s.company}if(r.startsWith("cat-")){const c=catOf(r.slice(4));return c?"Custom "+c.name+" Manufacturer | "+s.company:s.company}const t={shop:"Product Catalogue","private-label":"Private Label Clothing Manufacturer",manufacturing:"Manufacturing Process",markets:"Export Markets",about:"About Us",blog:"Knowledge Center",contact:"Contact",rfq:"Request a Quote",cart:"RFQ Cart","privacy-policy":"Privacy Policy",terms:"Terms of Business",faq:"FAQ",account:"Buyer Account",admin:"Admin"}[r];return (t||"Page not found")+" | "+s.company}
function descOf(r){const s=S.settings;if(r.startsWith("product-")){const p=prod(r.slice(8));if(p)return p.desc+" MOQ "+p.moq+" pcs, sample in "+p.sample+" working days. Made in Sialkot by "+s.company+"."}if(r.startsWith("post-")){const p=S.posts.find(x=>x.id===r.slice(5));if(p)return p.body.split("\n")[0].slice(0,155)}if(r.startsWith("cat-")){const c=catOf(r.slice(4));if(c)return c.blurb+" MOQ 50 pieces. Made in Sialkot, Pakistan."}return s.metaDesc}

if(typeof document!=='undefined'){
/* ============ events ============ */
document.addEventListener("click",e=>{
  const g=e.target.closest("[data-go]"); if(g&&!e.target.closest("[data-act]")){e.preventDefault();go(g.dataset.go);return}
  const el=e.target.closest("[data-act]"); if(!el)return;
  const a=el.dataset.act, id=el.dataset.id;
  if(a==="mclose"&&e.target!==el)return;
  switch(a){
   case"pwtoggle":{const i=el.parentNode.querySelector("input");const show=i.type==="password";i.type=show?"text":"password";el.innerHTML=show?EYE_OFF:EYE;el.setAttribute("aria-label",show?"Hide password":"Show password");i.focus();break}
   case"burger":$("#nav").classList.toggle("open");break;
   case"signout":signOutNow();break;
   case"xreset":confirmModal("This restores the original demo products, quotes and settings.",()=>{try{localStorage.removeItem(KEY)}catch(x){}load();session={admin:false,user:null};saveSess();toast("Demo data reset");go("home")});break;
   case"shopcat":e.preventDefault();go(id==="all"?"shop":"cat-"+id);break;
   case"shopsub":ui.shopSub=id;render();break;
   case"blogcat":ui.blogCat=id;render();break;
   case"market":ui.market=id;if(route!=="markets")go("markets");else render();break;
   case"pimg":ui.pimg=+el.dataset.i;render();break;
   case"pcolor":ui.pcolor=el.dataset.c;ui.pimg=0;render();break;
   case"ptab":ui.ptab=el.dataset.t;render();break;
   case"addcart":{const p=prod(id);if(S.cart.some(c=>c.pid===id)){toast("Already in your RFQ cart")}else{S.cart.push({pid:id,qty:p.moq,size:"S–XL",color:ui.pcolor||p.colors[0],note:""});toast(p.name+" added to RFQ cart")}render();break}
   case"quote1":{const p=prod(id);if(!S.cart.some(c=>c.pid===id))S.cart.push({pid:id,qty:p.moq,size:"S–XL",color:ui.pcolor||p.colors[0],note:""});ui.rfq={family:(catOf(p.cat)||{}).name};ui.rfqStep=2;go("rfq");break}
   case"wish":{const u=curUser();if(!u){toast("Log in to save products");go("account");break}delete u._new;u.wishlist=u.wishlist.includes(id)?u.wishlist.filter(x=>x!==id):[...u.wishlist,id];toast(u.wishlist.includes(id)?"Saved":"Removed from saved");render();break}
   case"cartrm":S.cart.splice(+el.dataset.i,1);render();break;
   case"cartsubmit":ui.rfq={family:(catOf((prod(S.cart[0].pid)||{}).cat)||{}).name||"Sportswear",qty:QTY[1]};ui.rfqStep=6;go("rfq");break;
   case"rfqopt":{captureRfq();const k=el.dataset.k,v=el.dataset.v;if(el.dataset.m){const l=ui.rfq[k]||[];ui.rfq[k]=l.includes(v)?l.filter(x=>x!==v):[...l,v]}else ui.rfq[k]=v;render();break}
   case"rfqback":captureRfq();ui.rfqStep--;render();break;
   case"rfqnext":rfqNext();break;
   case"rfqnew":ui.rfq={};ui.rfqStep=1;render();break;
   case"acct":ui.acctTab=el.dataset.t;render();break;
   case"logout":session.user=null;saveSess();toast("Logged out");go("home");break;
   case"atab":ui.adminTab=el.dataset.t;ui.aq="";ui.af="all";render();break;
   case"alogout":session.admin=false;saveSess();toast("Logged out of admin");go("home");break;
   case"rf":ui.af=id;render();break;
   case"rfqopen":rfqModal(id);break;
   case"rfqdel":confirmModal("Delete brief "+id+"?",()=>{S.rfqs=S.rfqs.filter(r=>r.id!==id);log("Deleted RFQ "+id);render()});break;
   case"pedit":productModal(id);break;
   case"pdel":confirmModal("Delete "+esc(prod(id).name)+" from the catalogue?",()=>{log("Deleted product "+prod(id).sku);S.products=S.products.filter(p=>p.id!==id);render()});break;
   case"ptoggle":{const p=prod(id);p.active=!p.active;log((p.active?"Published ":"Hid ")+p.sku);render();break}
   case"pfimgdel":ui.editImgs.splice(+el.dataset.i,1);drawEditImgs();break;
   case"cedit":catModal(id);break;
   case"cmove":{const i=S.categories.findIndex(c=>c.id===id),j=i+ +el.dataset.d;if(j<0||j>=S.categories.length)break;const a=S.categories;[a[i],a[j]]=[a[j],a[i]];log("Reordered categories");render();break}
   case"cdel":{const c=catOf(id),n=S.products.filter(p=>p.cat===id).length;if(n){modal(`<h3>Can't delete yet</h3><p>${esc(c.name)} still has ${n} product(s). Move them to another category or delete them first, then delete this category.</p><div class="foot"><button class="btn pri" data-act="mclosebtn">OK</button></div>`);break}confirmModal("Delete the category "+esc(c.name)+"?",()=>{S.categories=S.categories.filter(x=>x.id!==id);log("Deleted category "+c.name);render()});break}
   case"utoggle":{const u=S.users.find(x=>x.id===id);u.active=!u.active;log((u.active?"Unblocked ":"Blocked ")+u.email);render();break}
   case"mreply":{const m=S.messages.find(x=>x.id===id);const v=$("#rep_"+id).value.trim();if(!v){toast("Write a reply first");break}m.reply=v;m.status="Replied";log("Replied to "+m.email);toast("Reply saved. The buyer sees it in their panel.");render();break}
   case"mdel":confirmModal("Delete this message?",()=>{S.messages=S.messages.filter(m=>m.id!==id);log("Deleted a message");render()});break;
   case"mmdel":S.media.splice(+el.dataset.i,1);log("Removed a media file");render();break;
   case"qcstep":ui.qc=+el.dataset.i;{const y=window.scrollY;render();window.scrollTo(0,y)}break;
   case"hvsound":{const v=document.querySelector(".hv-media");if(v&&v.tagName==="VIDEO"){v.muted=!v.muted;if(!v.muted)v.play();el.textContent=v.muted?"🔇 Sound":"🔊 Sound";el.setAttribute("aria-label",v.muted?"Turn sound on":"Turn sound off")}break}
   case"qcrm":{const a=S.content.qcImages||[];a[+el.dataset.i]="";S.content.qcImages=a;log("Removed QC photo");render();break}
   case"bnrm":{const b=S.content.banners||{};delete b[el.dataset.k];S.content.banners={...b};log("Removed banner "+el.dataset.k);render();break}
   case"hvrm":S.content.heroVideo="";log("Removed hero video");render();break;
   case"hvmute":{const v=document.querySelector(".hv-media");if(v&&v.tagName==="VIDEO"){if(v.paused){v.play();el.textContent="Pause"}else{v.pause();el.textContent="Play"}}break}
   case"herorm":S.content.heroImage="";log("Removed hero image");render();break;
   case"bedit":blogModal(id);break;
   case"bdel":confirmModal("Delete this guide?",()=>{S.posts=S.posts.filter(p=>p.id!==id);log("Deleted guide");render()});break;
   case"tadd":S.testimonials.push({name:"New buyer",role:"Company",text:"Quote text"});log("Added testimonial");render();break;
   case"tdel":S.testimonials.splice(+el.dataset.i,1);log("Deleted testimonial");render();break;
   case"mclose":case"mclosebtn":closeModal();break;
   case"confirmyes":{const f=ui.confirmFn;closeModal();f&&f();save();break}
  }
});
document.addEventListener("change",async e=>{
  const t=e.target;
  if(t.dataset.cart!=null){S.cart[+t.dataset.cart][t.dataset.f]=t.dataset.f==="qty"?Math.max(1,+t.value):t.value;save();if(t.dataset.f==="qty")render();return}
  if(t.dataset.act==="pfeat"){const p=prod(t.dataset.id);p.featured=t.checked;log((p.featured?"Featured ":"Unfeatured ")+p.sku);save();return}
  if(t.id==="af"){ui.af=t.value;render();return}
  if(t.dataset.tm!=null){S.testimonials[+t.dataset.tm][t.dataset.f]=t.value;log("Edited testimonial");save();return}
  if(t.id==="r_files"){const fs=[...t.files].slice(0,5);const bad=fs.find(f=>f.size>3*1024*1024);if(bad){$("#r_err").textContent=bad.name+" is over 3 MB.";return}ui.rfq.files=fs.map(f=>f.name);render();return}
  if(t.type==="file"&&t.files.length){
   try{
    if(t.id==="pf_up"){for(const f of [...t.files].slice(0,6))ui.editImgs.push(await upImg(f));drawEditImgs()}
    if(t.id==="mediaUp"){for(const f of t.files)S.media.push({name:f.name,src:await upImg(f,1000)});log("Uploaded "+t.files.length+" media file(s)");render();toast("Uploaded")}
    if(t.dataset.bn!=null){const k=t.dataset.bn;const u=await upImg(t.files[0],1800);S.content.banners={...(S.content.banners||{}),[k]:u};log("Changed banner "+k);render();toast("Banner updated");return}
    if(t.dataset.qc!=null){const i=+t.dataset.qc;const a=S.content.qcImages||[];a[i]=await upImg(t.files[0],1200);S.content.qcImages=[...a].map(x=>x||"");log("Changed QC photo "+(i+1));render();toast("Photo updated");return}
    if(t.id==="heroVid"){const f=t.files[0];const er=document.getElementById("hv_err");if(f.size>45*1024*1024){er.textContent="This video is "+(f.size/1048576).toFixed(0)+" MB. Use one under 45 MB.";return}if(!LIVE.sb){er.textContent="Video upload needs the live database.";return}er.style.color="var(--muted)";er.textContent="Uploading "+(f.size/1048576).toFixed(1)+" MB…";const name="v/"+Date.now().toString(36)+(f.type==="video/webm"?".webm":".mp4");const {error}=await LIVE.sb.storage.from("media").upload(name,f,{contentType:f.type||"video/mp4"});if(error){er.style.color="";er.textContent="Upload failed: "+error.message;return}S.content.heroVideo=LIVE.sb.storage.from("media").getPublicUrl(name).data.publicUrl;log("Changed hero video");render();toast("Hero video updated");return}
    if(t.id==="heroUp"){S.content.heroImage=await upImg(t.files[0],1400);log("Changed hero image");render();toast("Hero image updated")}
    if(t.id==="cf_bup"){ui.catBanner=await upImg(t.files[0],1800);const pv=$("#cf_bprev");if(pv)pv.outerHTML=`<img src="${ui.catBanner}" class="thumb" style="width:110px;height:56px" id="cf_bprev" alt="">`;return}
    if(t.id==="cf_up"){ui.catImg=await upImg(t.files[0]);$("#cf_prev").src=ui.catImg}
   }catch(x){toast("That file could not be read as an image.")}
  }
});
let qT;
document.addEventListener("input",e=>{
  const t=e.target;
  if(t.id==="shopq"){clearTimeout(qT);qT=setTimeout(()=>{ui.shopQ=t.value;render();const n=$("#shopq");n.focus();n.setSelectionRange(n.value.length,n.value.length)},250)}
  if(t.id==="aq"){clearTimeout(qT);qT=setTimeout(()=>{ui.aq=t.value;render();const n=$("#aq");n.focus();n.setSelectionRange(n.value.length,n.value.length)},250)}
  if(t.id==="st_metaTitle"){const h=$("#seoHint");h.textContent=t.value.length+" / 60 characters in title";h.style.color=t.value.length>60?"var(--bad)":""}
});
document.addEventListener("submit",e=>{
  e.preventDefault(); const f=e.target, v=id=>{const x=f.querySelector("#"+id);return x?x.value.trim():""};
  if(f.id==="contactForm"){if(!v("c_name")||!/^\S+@\S+\.\S+$/.test(v("c_email"))||!v("c_msg")){$("#c_err").textContent="Enter your name, a valid email and a message.";return}if(!$("#c_consent").checked){$("#c_err").textContent="Please accept the privacy policy.";return}
   touchMe({name:v("c_name"),email:v("c_email"),company:v("c_company")});S.messages.unshift({id:uid("m"),userId:session.user?session.user.id:"",name:v("c_name"),email:v("c_email"),company:v("c_company"),message:v("c_msg"),status:"Unread",reply:"",created:now()});if(!S.messages[0].userId)S.messages[0].leadId="leads/"+S.messages[0].id;log("New message from "+v("c_email"),"Website");toast("Message sent. We reply within one working day.");render();return}
  if(f.id==="loginForm"){if(!LIVE.sb){$("#l_err").textContent="Login is not configured yet.";return}$("#l_err").textContent="Signing in…";LIVE.sb.auth.signInWithPassword({email:v("l_email"),password:$("#l_pass").value}).then(({error})=>{if(error){$("#l_err").textContent=error.message;return}location.reload()});return}
  if(f.id==="regForm"){if(!v("g_name")||!/^\S+@\S+\.\S+$/.test(v("g_email"))||$("#g_pass").value.length<6){$("#g_err").textContent="Enter a name, a valid email and a 6+ character password.";return}if(!LIVE.sb){$("#g_err").textContent="Sign-up is not configured yet.";return}
   $("#g_err").textContent="Creating account…";const prof={name:v("g_name"),company:v("g_company"),country:v("g_country"),email:v("g_email")};
   LIVE.sb.auth.signUp({email:v("g_email"),password:$("#g_pass").value,options:{data:prof,emailRedirectTo:location.origin+"/account?confirmed=1"}}).then(async({data,error})=>{if(error){$("#g_err").textContent=error.message;return}if(data.session){try{await LIVE.sb.auth.signOut({scope:"local"})}catch(e){}}location.replace("/account?check-email="+encodeURIComponent(prof.email))});return}
  if(f.id==="profForm"){const u=curUser();delete u._new;u.email=v("p_email")||u.email;u.name=v("p_name");u.company=v("p_company");u.country=v("p_country");u.phone=v("p_phone");if($("#p_pass")&&$("#p_pass").value)u.pass=$("#p_pass").value;session.user.name=u.name;saveSess();toast("Profile saved");render();return}
  if(f.id==="adminLogin"){if(!LIVE.sb){$("#a_err").textContent="Database is not configured yet.";return}LIVE.sb.auth.signInWithPassword({email:v("a_user"),password:$("#a_pass").value}).then(({error})=>{if(error){$("#a_err").textContent=error.message;return}location.reload()});return}
  if(f.id==="prodForm"){
   const id=f.dataset.id, sku=v("pf_sku").toUpperCase();
   if(!v("pf_name")||!sku){$("#pf_err").textContent="Name and SKU are required.";return}
   if(S.products.some(p=>p.sku===sku&&p.id!==id)){$("#pf_err").textContent="SKU "+sku+" is already used by another product. Every SKU must be unique.";return}
   const data={sku,name:v("pf_name"),cat:v("pf_cat"),sub:v("pf_sub"),desc:v("pf_desc"),comp:v("pf_comp"),gsm:+v("pf_gsm")||0,colors:v("pf_colors").split(",").map(s=>s.trim()).filter(Boolean),type:v("pf_type"),moq:+v("pf_moq")||50,price:v("pf_price"),sample:v("pf_sample"),bulk:v("pf_bulk"),images:ui.editImgs,active:$("#pf_active").checked,featured:$("#pf_feat").checked};
   if(!data.colors.length)data.colors=["Black"];
   if(id){Object.assign(prod(id),data);log("Updated product "+sku)}else{S.products.unshift({...data,id:sku.toLowerCase().replace(/[^a-z0-9]+/g,"-"),views:0,created:now()});log("Added product "+sku)}
   closeModal();toast("Product saved");render();return}
  if(f.id==="rfqForm"){const r=S.rfqs.find(x=>x.id===f.dataset.id);const old=r.status;r.status=v("rq_status");r.quote=v("rq_quote");r.reply=v("rq_reply");log(`Updated ${r.id}${old!==r.status?": "+old+" → "+r.status:""}`);closeModal();toast("Saved. The buyer sees the update.");render();return}
  if(f.id==="catForm"){if(!v("cf_name")){toast("Enter a category name.");return}let c=f.dataset.id?catOf(f.dataset.id):null;if(!c){let base=v("cf_name").toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"category",nid=base,n=2;while(catOf(nid))nid=base+"-"+(n++);c={id:nid,name:"",blurb:"",subs:[],type:"jersey",c:["Black","Orange"]};S.categories.push(c);log("Added category "+v("cf_name"))}c.name=v("cf_name");c.headline=v("cf_head");c.brief=$("#cf_brief").value.trim();if(ui.catBanner){c.banner=ui.catBanner;ui.catBanner=null}c.blurb=v("cf_blurb");c.subs=v("cf_subs").split("\n").map(s=>s.trim()).filter(Boolean);if(ui.catImg){c.image=ui.catImg;ui.catImg=null}log("Updated category "+c.name);closeModal();toast("Category saved");render();return}
  if(f.id==="blogForm"){const id=f.dataset.id;const d={title:v("bf_title"),cat:v("bf_cat"),author:v("bf_author"),date:v("bf_date"),mins:+v("bf_mins")||5,body:$("#bf_body").value};if(!d.title)return;if(id){Object.assign(S.posts.find(p=>p.id===id),d);log("Edited guide "+d.title)}else{S.posts.unshift({...d,id:d.title.toLowerCase().replace(/[^a-z0-9]+/g,"-").slice(0,50)});log("Published guide "+d.title)}closeModal();toast("Guide published");render();return}
  if(f.id==="contentForm"){f.querySelectorAll("[data-ct]").forEach(i=>S.content[i.dataset.ct]=i.value);log("Edited homepage content");toast("Content saved");render();return}
  if(f.id==="settingsForm"){f.querySelectorAll("[data-st]").forEach(i=>S.settings[i.dataset.st]=i.value);S.settings.showPrices=$("#st_showPrices").checked;log("Updated settings");toast("Settings saved");render();return}
});
function captureRfq(){const r=ui.rfq,v=id=>{const x=$("#"+id);return x?x.value.trim():undefined};[["r_exact","exact"],["r_notes","notes"],["r_name","name"],["r_company","company"],["r_country","country"],["r_email","email"],["r_phone","phone"]].forEach(([i,k])=>{const x=v(i);if(x!==undefined)r[k]=x})}
function rfqNext(){
  captureRfq(); const r=ui.rfq, st=ui.rfqStep, err=m=>{$("#r_err").textContent=m};
  if(st===1&&!r.family)return err("Choose a product family.");
  if(st===2&&!r.qty)return err("Choose an approximate quantity.");
  if(st===5&&!r.delivery)return err("Choose a target delivery window.");
  if(st===6){
   if(!r.name||!r.company||!r.country||!/^\S+@\S+\.\S+$/.test(r.email||"")||!r.phone)return err("Fill in all fields with a valid email.");
   if(!$("#r_consent").checked)return err("Please accept the privacy policy and terms.");
   touchMe(r); const ref=LIVE.on?"RFQ-"+Date.now().toString(36).toUpperCase().slice(-6):"RFQ-"+(Math.max(1044,...S.rfqs.map(x=>+x.id.split("-")[1]||0))+1);
   S.rfqs.unshift({id:ref,userId:session.user?session.user.id:"",name:r.name,company:r.company,country:r.country,email:r.email,phone:r.phone,family:r.family,qty:r.qty,exact:r.exact||"",methods:r.methods||[],files:r.files||[],delivery:r.delivery,notes:r.notes||"",items:[...S.cart],status:"New",quote:"",reply:"",created:now()});
   if(!S.rfqs[0].userId)S.rfqs[0].leadId="leads/"+ref;S.cart=[]; log(`New RFQ ${ref} from ${r.company}`,"Website"); ui.rfq={done:ref}; ui.rfqStep=7; render(); window.scrollTo(0,0); return;
  }
  ui.rfqStep++; render();
}

}

/* ============ backend: Supabase (table "docs") ============ */
var LIVE={on:true,sb:null,uid:null,status:"",base:{},q:Promise.resolve()};
function stable(v){if(Array.isArray(v))return"["+v.map(stable).join(",")+"]";if(v&&typeof v==="object")return"{"+Object.keys(v).sort().filter(k=>v[k]!==undefined&&!k.startsWith("_")).map(k=>JSON.stringify(k)+":"+stable(v[k])).join(",")+"}";return JSON.stringify(v)}
/* apply rows [{path,data}] to state; used by server and browser */
function applyDocs(rows){
  const prods=[],posts=[];
  for(const r of rows||[]){
    const [col,id]=r.path.split("/"), d=r.data||{};
    if(r.path==="site/config"){if(d.settings)S.settings={...S.settings,...d.settings};if(d.content)S.content={...S.content,...d.content};if(d.categories)S.categories=d.categories;if(d.testimonials)S.testimonials=d.testimonials;if(d.media)S.media=d.media}
    else if(col==="products")prods.push({...d,id});
    else if(col==="posts")posts.push({...d,id});
    else if(r.path==="admin/log")S.log=d.items||[];
    else if(col==="buyers")applyBuyer(id,d);
    else if(col==="leads"){if(d.rfq&&!S.rfqs.some(x=>x.id===d.rfq.id))S.rfqs.push({...d.rfq,leadId:r.path});if(d.message&&!S.messages.some(x=>x.id===d.message.id))S.messages.push({...d.message,leadId:r.path})}
  }
  if(prods.length)S.products=prods.sort((a,b)=>(a.pos??999)-(b.pos??999)||String(b.created).localeCompare(String(a.created)));
  if(posts.length)S.posts=posts.sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  S.rfqs.sort((a,b)=>b.created.localeCompare(a.created));S.messages.sort((a,b)=>b.created.localeCompare(a.created));
}
function applyBuyer(id,data){
  const p=data.profile||{};
  const u={id,name:p.name||"",email:p.email||"",company:p.company||"",country:p.country||"",phone:p.phone||"",created:p.created||now(),active:p.active!==false,wishlist:p.wishlist||[]};
  S.users=S.users.filter(x=>x.id!==id);S.users.push(u);
  S.rfqs=S.rfqs.filter(r=>r.userId!==id).concat(data.rfqs||[]);
  S.messages=S.messages.filter(m=>m.userId!==id).concat(data.messages||[]);
}
function liveDocs(){
  const d={};
  if(session.admin){
    d["site/config"]={settings:S.settings,content:S.content,categories:S.categories,testimonials:S.testimonials,media:S.media};
    S.products.forEach(p=>d["products/"+p.id]=p);
    S.posts.forEach(p=>d["posts/"+p.id]=p);
    d["admin/log"]={items:S.log.slice(0,150)};
  }
  S.users.forEach(u=>{
    if(u._new)return; if(!session.admin&&u.id!==LIVE.uid)return;
    d["buyers/"+u.id]={profile:{name:u.name,email:u.email||"",company:u.company||"",country:u.country||"",phone:u.phone||"",created:u.created,active:u.active!==false,wishlist:u.wishlist||[]},
      rfqs:S.rfqs.filter(r=>r.userId===u.id),messages:S.messages.filter(m=>m.userId===u.id)};
  });
  S.rfqs.forEach(r=>{if(r.leadId)d[r.leadId]={rfq:r}});
  S.messages.forEach(m=>{if(m.leadId)d[m.leadId]={message:m}});
  return d;
}
function liveBaseline(){const d=liveDocs();for(const k in d)LIVE.base[k]=stable(d[k])}
function liveSync(){
  const d=liveDocs(), sb=LIVE.sb;
  for(const k in d){const j=stable(d[k]);if(LIVE.base[k]!==j){const isNew=!(k in LIVE.base);LIVE.base[k]=j;const data=JSON.parse(j),col=k.split("/")[0];
    LIVE.q=LIVE.q.then(async()=>{const row={path:k,collection:col,data,owner:col==="buyers"?k.split("/")[1]:null};
      const {error}=(col==="leads"&&!session.admin&&isNew)?await sb.from("docs").insert(row):await sb.from("docs").upsert(row);
      if(error)toast("Could not save: "+error.message)})}}
  if(session.admin)for(const k in LIVE.base){if(/^(products|posts|buyers|leads)\//.test(k)&&!(k in d)){delete LIVE.base[k];LIVE.q=LIVE.q.then(()=>sb.from("docs").delete().eq("path",k))}}
}
function touchMe(r){const u=curUser();if(u){delete u._new;if(r){u.name=u.name||r.name;u.company=u.company||r.company;u.country=u.country||r.country;u.phone=u.phone||r.phone;u.email=u.email||r.email}}}
async function upImg(file,max=900){const d=await readImg(file,max);if(!LIVE.sb)return d;try{const blob=await (await fetch(d)).blob();const name="u/"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)+".jpg";const {error}=await LIVE.sb.storage.from("media").upload(name,blob,{contentType:"image/jpeg"});if(error)throw error;return LIVE.sb.storage.from("media").getPublicUrl(name).data.publicUrl}catch(e){toast("Upload failed: "+(e.message||"error"));throw e}}

if(typeof document!=="undefined"){
  window.addEventListener("popstate",()=>{setRoute(routeOf(location.pathname));render()});
  document.addEventListener("click",e=>{const a=e.target.closest("a[href^='/']");if(!a||a.target||e.metaKey||e.ctrlKey||e.target.closest("[data-act]"))return;e.preventDefault();go(routeOf(a.getAttribute("href")))},true);
  setTimeout(async function boot(){
    const B=window.__BOOT__||{};
    if(B.rows)applyDocs(B.rows);
    setRoute(routeOf(location.pathname));
    if(B.url&&B.key&&window.supabase){
      LIVE.sb=window.supabase.createClient(B.url,B.key);
      let {data:{session:ss}}=await LIVE.sb.auth.getSession();
      if(/[?&]confirmed=1/.test(location.search)){if(ss){try{await LIVE.sb.auth.signOut({scope:"local"})}catch(e){}}ss=null;if(location.hash)history.replaceState({},"",location.pathname+location.search)}
      if(ss){
        LIVE.uid=ss.user.id;
        const {data:adm}=await LIVE.sb.from("admins").select("user_id").eq("user_id",ss.user.id).maybeSingle();
        session.admin=!!adm;
        const md=ss.user.user_metadata||{};
        S.users=[{id:LIVE.uid,name:md.name||"",email:ss.user.email||"",company:md.company||"",country:md.country||"",phone:"",created:now(),active:true,wishlist:[],_new:true}];
        const {data:rows,error}=await LIVE.sb.from("docs").select("path,data");
        if(error)toast("Could not load data: "+error.message);else{S.users=S.users.filter(u=>!rows.some(r=>r.path==="buyers/"+u.id));applyDocs(rows)}
        const me=curUser();session.user={id:LIVE.uid,name:(me&&me.name)||ss.user.email};
        LIVE.status="Edits you make here go live for every visitor.";
      }
      liveBaseline();
    }
    render();
  },0);
}
if(typeof module!=="undefined"){module.exports={
  knowledge(rows){load();applyDocs(rows);const s=S.settings;return [
   `Company: ${s.company}, custom sportswear, teamwear and private-label apparel manufacturer in ${s.address}. Exports to UK, USA, Germany, France, Netherlands, UAE, Canada, Australia.`,
   `Contact: email ${s.email}, WhatsApp/phone ${s.whatsapp}. Website pages: /shop, /private-label, /manufacturing, /markets, /about, /blog, /contact, /rfq (production brief / quote form), /faq.`,
   `Terms: MOQ 50 pieces per design and colour (sizes can be mixed). Sampling 7–10 working days after artwork approval. Bulk 27–30 working days after sample approval and deposit. Shipping EXW, FOB or DDP by air or sea. Prices are quoted per program; never invent prices.`,
   `Customisation: ${METHODS.map(m=>m[1]).join(", ")}.`,
   `Quality control steps: ${QCSTEPS.map(q=>q[0]).join(", ")}.`,
   `Categories: ${S.categories.map(c=>`${c.name} (/shop/${c.id}): ${c.blurb} Subcategories: ${c.subs.join(", ")}`).join(" | ")}`,
   `Products: ${S.products.filter(p=>p.active).map(p=>`${p.name} [${p.sku}] /product/${p.id} — ${p.sub}, ${p.gsm?p.gsm+" GSM, ":""}${p.comp}, colours ${p.colors.join("/")}`).join(" | ")}`
  ].join("\n")},
  seedDocs(){const o={};o["site/config"]={settings:SEED.settings,content:SEED.content,categories:SEED.categories,testimonials:[],media:[]};SEED.products.forEach((p,i)=>o["products/"+p.id]={...p,pos:i,views:0});SEED.posts.forEach(p=>o["posts/"+p.id]=p);return o},
  renderRoute(path,rows,query){load();session={admin:false,user:null};Object.assign(ui,{shopSub:"",shopQ:"",blogCat:null,market:null,rfqStep:1,rfq:{}});applyDocs(rows);setRoute(routeOf(path));if(query&&query.q)ui.shopQ=String(query.q);return pageHTML()},
  meta(path,rows){load();applyDocs(rows);const r=routeOf(path);setRoute(r);let img=null;if(r.startsWith("product-")){const p=prod(r.slice(8));if(p&&p.images&&p.images[0]&&/^https?:/.test(p.images[0]))img=p.images[0]}
    const exists=r==="home"||r==="shop"||["private-label","manufacturing","markets","about","blog","contact","rfq","cart","privacy-policy","terms","faq","account","admin"].includes(r)||(r.startsWith("product-")&&!!prod(r.slice(8)))||(r.startsWith("post-")&&S.posts.some(x=>x.id===r.slice(5)))||(r.startsWith("cat-")&&!!catOf(r.slice(4)));
    return {title:titleOf(r),description:descOf(r),image:img,noindex:["cart","account","admin","rfq"].includes(r),exists,route:r}},
  urls(rows){load();applyDocs(rows);return [...["","shop","private-label","manufacturing","markets","about","blog","contact","rfq","faq","privacy-policy","terms"].map(x=>"/"+x),...S.categories.map(c=>"/shop/"+c.id),...S.products.filter(p=>p.active).map(p=>"/product/"+p.id),...S.posts.map(p=>"/blog/"+p.id)]},
  org(rows){load();applyDocs(rows);const s=S.settings;return {"@context":"https://schema.org","@type":"Organization",name:s.company,email:s.email,telephone:s.phone,foundingDate:s.since,address:{"@type":"PostalAddress",addressLocality:"Sialkot",addressCountry:"PK"},sameAs:[s.instagram,s.facebook,s.linkedin].filter(Boolean)}},
  product(path,rows){load();applyDocs(rows);const r=routeOf(path);if(!r.startsWith("product-"))return null;const p=prod(r.slice(8));if(!p)return null;return {"@context":"https://schema.org","@type":"Product",name:p.name,sku:p.sku,description:p.desc,brand:{"@type":"Brand",name:S.settings.company},material:p.comp,color:p.colors.join(", ")}}
}}


/* ============ WhatsApp + AI assistant ============ */
const WA_SVG='<svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true"><path fill="#fff" d="M16 3.5A12.4 12.4 0 0 0 5.3 22.2L3.6 28.4l6.4-1.7A12.4 12.4 0 1 0 16 3.5zm0 22.6a10.2 10.2 0 0 1-5.2-1.4l-.4-.2-3.8 1 1-3.7-.2-.4A10.2 10.2 0 1 1 16 26.1z"/><path fill="#fff" d="M21.6 18.4c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.3 8.3 0 0 1-2.4-1.5 9.1 9.1 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6.3-.5a.6.6 0 0 0 0-.5l-.9-2.3c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.3 6.3 0 0 0 1.3 3.3 14.3 14.3 0 0 0 5.5 4.8c2 .9 2.8.9 3.8.8a3.2 3.2 0 0 0 2.1-1.5 2.6 2.6 0 0 0 .2-1.5c-.1-.2-.3-.3-.6-.4z"/></svg>';
const BOT_SVG='<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#fff" stroke-width="1.8" aria-hidden="true"><rect x="4" y="7" width="16" height="12" rx="4"/><path d="M12 3v4M8.5 12.5h.01M15.5 12.5h.01M9 16h6"/><circle cx="12" cy="3" r="1" fill="#fff"/></svg>';
var CHAT={open:false,busy:false,msgs:[]};
function chatWelcome(){const co=S.settings.company;return `Hi, I'm the ${co} assistant. I can help with products, MOQ, sampling time, customisation and how to send a quote request. What are you planning to make?`}
function chatUI(){
  const s=S.settings, wa="https://wa.me/"+waNum(s.whatsapp);
  const msgs=CHAT.msgs.length?CHAT.msgs:[{role:"assistant",content:chatWelcome()}];
  const fmt=t=>esc(t).replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g,'<a href="$2">$1</a>').replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/\n/g,"<br>");
  return `<div class="fab-col">
   ${CHAT.open?`<div class="chat-panel" role="dialog" aria-label="${esc(s.company)} assistant">
    <div class="chat-top"><span class="chat-av">${BOT_SVG}</span><div><b>${esc(s.company)} Assistant</b><small>${CHAT.busy?"Typing…":"Replies instantly · AI"}</small></div><button class="chat-x" data-act="chatclose" aria-label="Close chat">✕</button></div>
    <div class="chat-body" id="chatBody">${msgs.map(m=>`<div class="cm ${m.role==="user"?"u":"a"}">${fmt(m.content)}</div>`).join("")}${CHAT.busy?'<div class="cm a typing"><i></i><i></i><i></i></div>':""}</div>
    ${CHAT.msgs.length<2?`<div class="chat-sugg">${["What is your MOQ?","How long does sampling take?","Do you make private label?","How do I get a quote?"].map(q=>`<button data-act="chatq" data-q="${esc(q)}">${esc(q)}</button>`).join("")}</div>`:""}
    <form class="chat-form" id="chatForm"><input id="chatIn" autocomplete="off" placeholder="Ask about products, MOQ, delivery…" maxlength="500" ${CHAT.busy?"disabled":""}><button ${CHAT.busy?"disabled":""} aria-label="Send">➤</button></form>
    <div class="chat-foot"><a href="${wa}" target="_blank" rel="noopener">Talk to a person on WhatsApp</a> · <a href="/rfq">Send a brief</a></div>
   </div>`:""}
   <button class="fab fab-ai" data-act="chattoggle" aria-label="${CHAT.open?"Close":"Open"} AI assistant">${CHAT.open?'<span style="font-size:22px;color:#fff">✕</span>':BOT_SVG}<span class="fab-tip">Ask AI</span></button>
   <a class="fab fab-wa" href="${wa}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${WA_SVG}<span class="fab-tip">WhatsApp</span></a>
  </div>`;
}
function drawChat(){if(typeof document==="undefined")return;let r=document.getElementById("chat-root");if(!r){r=document.createElement("div");r.id="chat-root";document.body.appendChild(r)}if(route==="admin"&&session.admin){r.innerHTML="";return}const had=document.activeElement&&document.activeElement.id==="chatIn";r.innerHTML=chatUI();const b=document.getElementById("chatBody");if(b)b.scrollTop=b.scrollHeight;if(CHAT.open&&!CHAT.busy){const i=document.getElementById("chatIn");if(i&&(had||CHAT.focus)){i.focus();CHAT.focus=false}}}
/* answers without the AI server, from the site's own data */
function localAnswer(q){
  const t=q.toLowerCase(), s=S.settings, co=s.company;
  const has=(...w)=>w.some(x=>t.includes(x));
  if(has("moq","minimum","kam se kam","kitne piece","how many")) return `Our MOQ is **50 pieces per design and colour**. You can mix sizes freely inside that quantity.`;
  if(has("sample","sampling","namuna")) return `Samples take **7–10 working days** after your artwork and brief are confirmed. Sample cost is quoted with your brief.`;
  if(has("bulk","production time","lead time","delivery","kitne din","how long","time")) return `Bulk production takes **27–30 working days** after sample approval and deposit. Shipping is by air or sea, EXW, FOB or DDP.`;
  if(has("price","cost","rate","qeemat","kitne ka","quote","quotation")) return `Every order is custom, so prices depend on fabric, decoration and quantity. Send a [production brief](/rfq) (about 3 minutes) and the team replies within one working day.`;
  if(has("private label","own brand","my brand","label","brand")) return `Yes. ${co} develops apparel under your brand: woven labels, hangtags, patches and custom packaging. See [Private Label](/private-label) or [start a brief](/rfq).`;
  if(has("ship","country","export","uk","usa","europe","dubai","australia","canada")) return `${co} ships worldwide by air or sea. Main markets are the UK, USA, Germany, France, Netherlands, UAE, Canada and Australia.`;
  if(has("print","sublimation","embroider","logo","custom")) return `Customisation options: sublimation, screen printing, heat transfer, embroidery, woven labels, hangtags, rubber/PVC patches and custom packaging.`;
  if(has("contact","phone","email","whatsapp","number","call")) return `Email **${s.email}**, WhatsApp **${s.whatsapp}**. You can also use the [contact form](/contact).`;
  if(has("size","sizing","chart")) return `Every product page has a size guide. Youth and women's grading are available, made to your size specification.`;
  const words=t.split(/[^a-z0-9]+/).filter(w=>w.length>2);
  const hits=S.products.filter(p=>p.active).map(p=>({p,sc:words.filter(w=>(p.name+" "+p.sub+" "+p.cat).toLowerCase().includes(w)).length})).filter(x=>x.sc).sort((a,b)=>b.sc-a.sc).slice(0,3);
  const cat=S.categories.find(c=>words.some(w=>c.name.toLowerCase().includes(w)));
  if(hits.length) return `Here are matching products:\n${hits.map(h=>`• [${h.p.name}](/product/${h.p.id}): ${h.p.gsm?h.p.gsm+" GSM, ":""}MOQ ${h.p.moq} pcs`).join("\n")}\nAdd them to your RFQ cart or [send a brief](/rfq).`;
  if(cat) return `${cat.name}: ${cat.blurb} [Browse ${cat.name}](/shop/${cat.id}).`;
  return `I can help with products, MOQ (50 pcs), sampling (7–10 days), bulk (27–30 days), customisation and shipping. For anything specific, [send a brief](/rfq) or message the team on WhatsApp.`;
}
async function chatSend(q){
  q=String(q||"").trim(); if(!q||CHAT.busy)return;
  CHAT.msgs.push({role:"user",content:q}); CHAT.busy=true; drawChat();
  let a="";
  try{
    const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:CHAT.msgs.slice(-12)})});
    const d=await r.json().catch(()=>({}));
    a=(r.ok&&d.reply)?d.reply:"";
  }catch(e){}
  if(!a)a=localAnswer(q);
  CHAT.msgs.push({role:"assistant",content:a}); CHAT.busy=false; CHAT.focus=true; drawChat();
}
if(typeof document!=="undefined"){
  document.addEventListener("click",e=>{const el=e.target.closest("#chat-root [data-act]");if(!el)return;const a=el.dataset.act;
    if(a==="chattoggle"){CHAT.open=!CHAT.open;CHAT.focus=CHAT.open;drawChat()}
    if(a==="chatclose"){CHAT.open=false;drawChat()}
    if(a==="chatq")chatSend(el.dataset.q);
  });
  document.addEventListener("submit",e=>{if(e.target.id!=="chatForm")return;e.preventDefault();e.stopPropagation();const i=document.getElementById("chatIn");chatSend(i.value)},true);
  document.addEventListener("click",e=>{const a=e.target.closest("#chat-root a[href^='/']");if(a&&!e.metaKey&&!e.ctrlKey){e.preventDefault();e.stopPropagation();go(routeOf(a.getAttribute("href")))}},true);
}
