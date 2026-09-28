// ============================================================
// SHARED DATA
// ============================================================
var creators = [
  {id:1,name:"Nadya Putri",handle:"@nadyaputri",niche:"Beauty & Skincare",followers:"48.2K",followersRaw:48200,rate:"Rp 1.1M–1.6M",rateRaw:1100000,rating:4.9,match:94,img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop&crop=face"},
  {id:2,name:"Raka Pradana",handle:"@rakapradana",niche:"Food & Lifestyle",followers:"36.8K",followersRaw:36800,rate:"Rp 800K–1.2M",rateRaw:800000,rating:4.8,match:91,img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face"},
  {id:3,name:"Alika Senja",handle:"@alikasenja",niche:"Fashion & Travel",followers:"72.4K",followersRaw:72400,rate:"Rp 1.4M–2M",rateRaw:1400000,rating:4.9,match:88,img:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face"},
  {id:4,name:"Dimas Surya",handle:"@dimassurya",niche:"Tech & Productivity",followers:"29.1K",followersRaw:29100,rate:"Rp 700K–1M",rateRaw:700000,rating:4.7,match:85,img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face"},
  {id:5,name:"Citra Ayu",handle:"@citraayu",niche:"Wellness & Fitness",followers:"55.6K",followersRaw:55600,rate:"Rp 1.2M–1.8M",rateRaw:1200000,rating:4.8,match:82,img:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=400&fit=crop&crop=face"},
  {id:6,name:"Kevin Wijaya",handle:"@kevinwijaya",niche:"Gaming & Tech",followers:"91.3K",followersRaw:91300,rate:"Rp 1.8M–2.5M",rateRaw:1800000,rating:4.6,match:78,img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face"}
];

var brands = [
  {name:"Lumera Beauty",letter:"L",color:"#FECACA",textColor:"#DC2626",niche:"Skincare & Beauty",rating:4.8,campaigns:24,rateRange:"Rp 800K – 2M",desc:"A local beauty brand focused on clean skincare formulations.",active:true},
  {name:"Hutan Kopi",letter:"H",color:"#FEF3C7",textColor:"#D97706",niche:"F&B / Coffee",rating:4.7,campaigns:12,rateRange:"Rp 500K – 1.2M",desc:"Specialty coffee sourced directly from local Indonesian farmers.",active:true},
  {name:"Arkai Studio",letter:"A",color:"#EDE9FE",textColor:"#7C3AED",niche:"Fashion & Lifestyle",rating:4.6,campaigns:8,rateRange:"Rp 1M – 3M",desc:"Slow fashion brand with artisanal ready-to-wear collections.",active:false},
  {name:"Verdana Sport",letter:"V",color:"#D1FAE5",textColor:"#059669",niche:"Wellness & Fitness",rating:4.9,campaigns:18,rateRange:"Rp 1.2M – 2.8M",desc:"Sports gear and apparel for an active lifestyle.",active:true},
  {name:"Nauri Organics",letter:"N",color:"#FEE2E2",textColor:"#DC2626",niche:"Beauty & Skincare",rating:4.5,campaigns:6,rateRange:"Rp 600K – 1.5M",desc:"Organic skincare made with carefully selected natural ingredients.",active:false},
  {name:"Bytedash",letter:"B",color:"#DBEAFE",textColor:"#2563EB",niche:"Tech & Productivity",rating:4.7,campaigns:10,rateRange:"Rp 1.5M – 4M",desc:"A productivity app built for the modern young professional.",active:true}
];

var campaigns = [
  {name:"Glow Up Ramadan",category:"UGC Skincare",status:"Active",creators:12,sent:8,approved:6,budget:"Rp 14.4M",progress:68},
  {name:"Summer Refresh",category:"Product Review",status:"Active",creators:8,sent:3,approved:3,budget:"Rp 8M",progress:45},
  {name:"Morning Rituals",category:"Lifestyle Vlog",status:"Active",creators:6,sent:6,approved:5,budget:"Rp 5.4M",progress:90},
  {name:"Winter Glow",category:"Skincare Tutorial",status:"Completed",creators:5,sent:5,approved:5,budget:"Rp 6.2M",progress:100}
];

var opportunities = [
  {brand:"Avoskin",letter:"A",color:"#D1FAE5",textColor:"#059669",title:"Daily Skincare Routine",type:"1× TikTok Video",deadline:"Apply before May 18",budget:"Rp 1.4M",match:96},
  {brand:"Buttonscarves",letter:"B",color:"#DBEAFE",textColor:"#2563EB",title:"Eid Styling Inspiration",type:"1× Reels + Story",deadline:"Apply before May 20",budget:"Rp 1.8M",match:91},
  {brand:"Sensatia",letter:"S",color:"#FEF3C7",textColor:"#D97706",title:"Body Care Campaign",type:"2× UGC Video",deadline:"Apply before May 25",budget:"Rp 2.2M",match:87}
];

var connectedCreators = [
  {name:"Nadya Putri",niche:"Beauty & Skincare",rating:4.9,img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face"},
  {name:"Raka Pradana",niche:"Food & Lifestyle",rating:4.8,img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"},
  {name:"Alika Senja",niche:"Fashion & Travel",rating:4.9,img:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face"},
  {name:"Dimas Surya",niche:"Tech & Productivity",rating:4.7,img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face"},
  {name:"Citra Ayu",niche:"Wellness & Fitness",rating:4.8,img:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop&crop=face"},
  {name:"Kevin Wijaya",niche:"Gaming & Tech",rating:4.6,img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face"}
];

// ============================================================
// UTILITIES
// ============================================================
function shortNum(n) {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K' : String(n);
}
function shortRp(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  return Math.round(n / 1000) + 'K';
}

// ============================================================
// MODAL HELPERS
// ============================================================
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(function(m) {
        m.classList.remove('open');
      });
      document.body.style.overflow = '';
    }
  });
});

// ============================================================
// BACKEND LOADER
// ============================================================
async function loadCreatorsFromAPI() {
  try {
    var res = await fetch('/creators');
    var data = await res.json();
    creators = data.map(function(c) {
      return {
        id: c.id,
        name: c.name,
        handle: c.handle,
        niche: c.category[0],
        followers: shortNum(c.followers),
        followersRaw: c.followers,
        rate: 'Rp ' + shortRp(c.suggestedRateMin) + '–' + shortRp(c.suggestedRateMax),
        rateRaw: c.suggestedRateMin,
        rating: c.rating,
        match: 0,
        img: 'https://i.pravatar.cc/300?u=' + c.id
      };
    });
  } catch(e) {
    console.warn('API unreachable, using mock data.');
  }
}

async function submitCreatorToAPI(body) {
  var res = await fetch('/creators', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    var err = await res.json();
    throw new Error(Array.isArray(err.message) ? err.message.join(', ') : err.message);
  }
  return res.json();
}

// ============================================================
// NAV LOGO SNIPPET (used across pages)
// ============================================================
var NAV_LOGO_SVG = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="white" fill-opacity="0.2"/><path d="M8 12C8 9.79 9.79 8 12 8s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" fill="white"/><circle cx="17" cy="7" r="2" fill="#00C896"/></svg>';
