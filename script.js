 // ─── TAB SWITCH ───
function switchTab(name, btn) {
  document.querySelectorAll('.treat-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.ttab').forEach(t => t.classList.remove('active'));
  document.getElementById('tp-' + name).classList.add('active');
  btn.classList.add('active');
}

// ─── SCROLL REVEAL ───
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0.1 });
document.querySelectorAll('.rv').forEach(el => obs.observe(el));

// ─── CHATBOT ───
let chatIsOpen = false;

function toggleChat() {
  chatIsOpen = !chatIsOpen;
  document.getElementById('chatWin').classList.toggle('open', chatIsOpen);
  if (chatIsOpen) {
    document.getElementById('chatNotif').style.display = 'none';
    setTimeout(() => document.getElementById('chatInp').focus(), 300);
  }
}

const KB = {
  treatments: "We offer 3 categories of elite treatments:\n\n✦ Skin: HydraFacial MD, Chemical Peels, Botox & Fillers, Microneedling RF, Acne Protocol, Skin Brightening\n\n✦ Hair: PRP Therapy, GFC Treatment, Mesotherapy, LLLT, Scalp Trichoscopy\n\n✦ Laser & Tech: Q-Switch Nd:YAG, CO₂ Fractional, HIFU Lift, Laser Hair Removal, RF Tightening\n\nEvery treatment is doctor-supervised. Would you like details on any specific one?",
  price: "Our pricing is transparent:\n\n• Consultation: from ₹500 (includes free skin analysis)\n• Acne Protocol: from ₹2,500\n• HydraFacial MD: from ₹4,500\n• PRP Hair Therapy: from ₹7,000\n• Botox & Fillers: from ₹8,000\n• HIFU Lift: from ₹15,000\n\nAll procedures are doctor-performed. Call +91 90000 00000 for a personalised quote.",
  booking: "Booking is easy:\n\n1. Use the Booking Form on this page (scroll up)\n2. Call us: +91 90000 00000\n3. Email: info@doctorscosmeticclinic.in\n\nWe're open Mon–Sat, 9AM–7PM. Your first visit includes a complimentary skin analysis! ✨",
  hair: "For hair concerns, our trichologists offer:\n\n✦ PRP Therapy — stimulates follicle regrowth\n✦ GFC Treatment — advanced growth factor therapy\n✦ Hair Mesotherapy — nutrient infusion\n✦ LLLT — FDA-cleared laser treatment\n✦ Scalp Trichoscopy — digital root cause analysis\n\nDr. Aravind personally designs every hair restoration plan. Shall I help you book a consultation?",
  skin: "For skin, we offer:\n\n✦ Pigmentation & Melasma treatment\n✦ Acne & Scar management\n✦ Anti-ageing (Botox, Fillers, HIFU)\n✦ Brightening & Hydration protocols\n✦ Chemical Peels & Laser resurfacing\n\nEvery plan is doctor-designed and tailored to your skin type. ✨",
  doctor: "Our lead specialist is Dr. Aravind Kumar — MBBS, MD Dermatology, DNB, 15+ years experience. He trained at JIPMER and holds a fellowship from the American Academy of Dermatology. He personally supervises all treatments at Doctors Cosmetic Clinic Chennai. 👨‍⚕️",
  location: "We're located in Chennai, Tamil Nadu. Open Monday–Saturday, 9AM–7PM.\n\nContact us:\n📞 +91 90000 00000\n✉ info@doctorscosmeticclinic.in",
  elite: "What makes us different is simple: every treatment at DCC is Doctor-Led. No technicians administering your procedures — only board-certified specialists. Elite care, proven results. ✦",
  valet: "Yes! We offer complimentary valet parking for all patients at Doctors Cosmetic Clinic Chennai:\n\n🚗 Free for all patients & companions\n🔒 CCTV-monitored secured facility\n⏱ Vehicle retrieved at your convenience\n♿ Priority access for elderly & mobility-impaired patients\n\nSimply drive in, hand your keys to our uniformed valet, and walk straight into your consultation. No stress, no parking hassle. 😊",
  fallback: ["Great question! For detailed personalised advice, please call us at +91 90000 00000 or email info@doctorscosmeticclinic.in.", "For the most accurate answer, our team is available Mon–Sat 9AM–7PM at +91 90000 00000. We're happy to help!", "That's best answered by our doctors directly. Book a consultation — your first visit includes a free skin analysis! Shall I help you set that up?"]
};

function getBotReply(msg) {
  const m = msg.toLowerCase();
  if (m.match(/valet|park|car|parking|drive|vehicle/)) return KB.valet;
  if (m.match(/hi|hello|hey|namaste/)) return KB.greet[Math.random() > 0.5 ? 1 : 0];
  if (m.match(/treat|offer|service|what do/)) return KB.treatments;
  if (m.match(/pric|cost|fee|charg|how much|rate|₹/)) return KB.price;
  if (m.match(/book|appoint|schedul|visit/)) return KB.booking;
  if (m.match(/hair|alopecia|bald|thin|dandruff|scalp/)) return KB.hair;
  if (m.match(/skin|acne|pigment|melasma|wrinkle|age|bright|glow|peel/)) return KB.skin;
  if (m.match(/doctor|dr|specialist|who|aravind/)) return KB.doctor;
  if (m.match(/where|locat|address|direction|chennai/)) return KB.location;
  if (m.match(/elite|differ|unique|why|best|special/)) return KB.elite;
  return KB.fallback[Math.floor(Math.random() * 3)];
}

function addChatMsg(text, isUser) {
  const msgs = document.getElementById('chatMsgs');
  const d = document.createElement('div');
  d.className = 'cmsg' + (isUser ? ' u' : '');
  d.innerHTML = `
    <div class="cmsg-av">${isUser ? 'You' : 'NS'}</div>
    <div class="cmsg-bub">${text.replace(/\n/g, '<br>')}</div>
  `;
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = document.getElementById('chatMsgs');
  const d = document.createElement('div');
  d.className = 'typing-row'; d.id = 'typRow';
  d.innerHTML = `
    <div class="cmsg-av" style="font-size:0.5rem;font-weight:700;">NS</div>
    <div class="typing-bub">
      <span class="td"></span><span class="td"></span><span class="td"></span>
    </div>
  `;
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typRow');
  if (t) t.remove();
}

function sendChat() {
  const inp = document.getElementById('chatInp');
  const text = inp.value.trim();
  if (!text) return;
  inp.value = '';
  document.getElementById('chatQR').style.display = 'none';
  addChatMsg(text, true);
  showTyping();
  setTimeout(() => {
    removeTyping();
    addChatMsg(getBotReply(text), false);
  }, 800 + Math.random() * 700);
}

function qAsk(text) {
  document.getElementById('chatInp').value = text;
  sendChat();
}

function handleChatKey(e) { if (e.key === 'Enter') sendChat(); }
