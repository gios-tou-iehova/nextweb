'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Eye, Mail, Send, X, User, Scissors, Clock, Calendar } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Appointment { id:number; customer_id:number; customer_name:string; barber_name:string; service_name:string; appointment_date:string; appointment_time:string; status:string; total_price:string; notes:string; }
const SC: Record<string,string> = { confirmed:'#4ade80', pending:'#c9a84c', cancelled:'#c41e3a', completed:'#4ade80' };
const SB: Record<string,string> = { confirmed:'rgba(74,222,128,0.07)', pending:'rgba(201,168,76,0.07)', cancelled:'rgba(196,30,58,0.07)', completed:'rgba(74,222,128,0.07)' };

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Appointment|null>(null);
  const [showMsg, setShowMsg] = useState(false);
  const [msgTarget, setMsgTarget] = useState<{id:number;name:string}|null>(null);
  const [msgText, setMsgText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(()=>{ fetchAll(); },[]);
  const fetchAll = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost/backend/api/admin/appointments',{headers:token?{'Authorization':`Bearer ${token}`}:{} as Record<string,string>});
      const data = await res.json();
      if(data.status==='success') setAppointments(data.data);
    } catch { toast.error('Failed to load'); } finally { setLoading(false); }
  };
  const updateStatus = async (id:number, status:string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost/backend/api/admin/appointments/${id}`,{method:'PUT',headers:{'Content-Type':'application/json',...(token?{'Authorization':`Bearer ${token}`}:{})},body:JSON.stringify({status})});
      const data = await res.json();
      if(data.status==='success'){toast.success(`Marked ${status}`);fetchAll();}else toast.error(data.message||'Failed');
    } catch { toast.error('Error'); }
  };
  const sendMessage = async () => {
    if(!msgTarget||!msgText.trim()) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost/backend/api/notifications/send',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({user_id:msgTarget.id,title:'Message from Admin',message:msgText})});
      const data = await res.json();
      if(data.status==='success'){toast.success(`Sent to ${msgTarget.name}`);setShowMsg(false);setMsgText('');setMsgTarget(null);}else toast.error(data.message||'Failed');
    } catch { toast.error('Error'); }
  };
  const filtered = filterStatus==='all'?appointments:appointments.filter(a=>a.status===filterStatus);
  const MS = {position:'fixed' as const,inset:0,background:'rgba(0,0,0,0.92)',backdropFilter:'blur(8px)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'};
  const MP = {background:'#0a0a0f',border:'1px solid rgba(255,255,255,0.06)',padding:'36px',width:'100%',maxWidth:'480px',position:'relative' as const};
  const iconBtn = (onClick:()=>void, icon:React.ReactNode, color:string, hoverBorder:string) => (
    <button onClick={onClick} style={{width:'28px',height:'28px',background:'transparent',border:'1px solid rgba(255,255,255,0.07)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color,transition:'all 0.2s'}}
      onMouseEnter={e=>{e.currentTarget.style.borderColor=hoverBorder;}} onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.07)';}}>
      {icon}
    </button>
  );

  if(loading) return <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'60vh'}}><div style={{width:'36px',height:'36px',border:'1px solid rgba(196,30,58,0.2)',borderTopColor:'#c41e3a',borderRadius:'50%',animation:'spin 0.9s linear infinite'}}/><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;

  return (
    <div>
      <Toaster position="top-right" toastOptions={{style:{background:'#111118',color:'#f0ece4',border:'1px solid rgba(196,30,58,0.3)',borderRadius:'2px',fontFamily:'Inter,sans-serif',fontSize:'13px'}}}/>
      <div style={{marginBottom:'36px',paddingBottom:'28px',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'10px'}}>
          <div style={{width:'24px',height:'1px',background:'#c41e3a'}}/><span style={{fontFamily:'Montserrat,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'4px',textTransform:'uppercase',color:'#c41e3a'}}>Schedule</span>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:'16px'}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(1.8rem,3vw,2.4rem)',fontWeight:900,letterSpacing:'-0.03em',color:'#f5f0e8'}}>Appointments <span style={{fontStyle:'italic',color:'#c41e3a'}}>Management.</span></h1>
          <div style={{display:'flex',gap:'1px',background:'rgba(255,255,255,0.04)'}}>
            {[{l:'Total',v:appointments.length},{l:'Pending',v:appointments.filter(a=>a.status==='pending').length},{l:'Confirmed',v:appointments.filter(a=>a.status==='confirmed').length}].map((s,i)=>(
              <div key={i} style={{padding:'10px 18px',background:'#0a0a0f',textAlign:'center'}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:900,color:'#f5f0e8'}}>{s.v}</div>
                <div style={{fontFamily:'Montserrat,sans-serif',fontSize:'8px',letterSpacing:'2px',textTransform:'uppercase',color:'rgba(158,155,148,0.45)'}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{display:'flex',gap:0,borderBottom:'1px solid rgba(255,255,255,0.05)',marginBottom:'24px'}}>
        {['all','pending','confirmed','completed','cancelled'].map(s=>(
          <button key={s} onClick={()=>setFilterStatus(s)} style={{padding:'10px 18px',background:'transparent',border:'none',borderBottom:filterStatus===s?'2px solid #c41e3a':'2px solid transparent',marginBottom:'-1px',color:filterStatus===s?'#f5f0e8':'rgba(158,155,148,0.45)',cursor:'pointer',fontFamily:'Montserrat,sans-serif',fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',transition:'color 0.2s'}}>{s}</button>
        ))}
      </div>
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:'750px'}}>
          <thead>
            <tr style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
              {['Customer','Service / Barber','Date & Time','Status','Amount','Actions'].map(h=>(
                <th key={h} style={{padding:'12px 16px',textAlign:'left',fontFamily:'Montserrat,sans-serif',fontSize:'9px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'rgba(158,155,148,0.35)'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((apt,i)=>(
              <motion.tr key={apt.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.03}}
                style={{borderBottom:'1px solid rgba(255,255,255,0.03)',transition:'background 0.2s'}}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.015)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <td style={{padding:'14px 16px',fontFamily:'Inter,sans-serif',fontSize:'13px',fontWeight:600,color:'#f5f0e8'}}>{apt.customer_name}</td>
                <td style={{padding:'14px 16px'}}>
                  <div style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:'#f0ece4'}}>{apt.service_name}</div>
                  <div style={{fontFamily:'Inter,sans-serif',fontSize:'11px',color:'rgba(158,155,148,0.45)',marginTop:'2px'}}>{apt.barber_name}</div>
                </td>
                <td style={{padding:'14px 16px'}}>
                  <div style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:'rgba(158,155,148,0.7)'}}>{new Date(apt.appointment_date).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</div>
                  <div style={{fontFamily:'Montserrat,sans-serif',fontSize:'10px',color:'rgba(158,155,148,0.4)',marginTop:'2px'}}>{apt.appointment_time?.slice(0,5)}</div>
                </td>
                <td style={{padding:'14px 16px'}}>
                  <span style={{padding:'3px 10px',background:SB[apt.status]||'rgba(255,255,255,0.04)',border:`1px solid ${SC[apt.status]||'rgba(255,255,255,0.1)'}30`,fontFamily:'Montserrat,sans-serif',fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:SC[apt.status]||'rgba(158,155,148,0.5)'}}>{apt.status}</span>
                </td>
                <td style={{padding:'14px 16px',fontFamily:"'Playfair Display',serif",fontSize:'15px',fontWeight:700,color:'#c41e3a'}}>₦{parseFloat(apt.total_price).toLocaleString()}</td>
                <td style={{padding:'14px 16px'}}>
                  <div style={{display:'flex',gap:'5px',alignItems:'center'}}>
                    {iconBtn(()=>setSelected(apt),<Eye size={12}/>,'rgba(158,155,148,0.5)','rgba(255,255,255,0.25)')}
                    {iconBtn(()=>{setMsgTarget({id:apt.customer_id,name:apt.customer_name});setShowMsg(true);},<Mail size={12}/>,'rgba(196,30,58,0.5)','rgba(196,30,58,0.5)')}
                    {apt.status==='pending'&&iconBtn(()=>updateStatus(apt.id,'confirmed'),<CheckCircle size={12}/>,'#4ade80','#4ade80')}
                    {apt.status==='confirmed'&&iconBtn(()=>updateStatus(apt.id,'completed'),<CheckCircle size={12}/>,'#4ade80','#4ade80')}
                    {['pending','confirmed'].includes(apt.status)&&iconBtn(()=>updateStatus(apt.id,'cancelled'),<XCircle size={12}/>,'#c41e3a','#c41e3a')}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filtered.length===0&&<div style={{textAlign:'center',padding:'60px',color:'rgba(158,155,148,0.35)',fontFamily:'Inter,sans-serif',fontSize:'13px'}}>No appointments</div>}
      </div>

      {selected&&(
        <div style={MS} onClick={()=>setSelected(null)}>
          <motion.div initial={{scale:0.95,opacity:0}} animate={{scale:1,opacity:1}} style={MP} onClick={e=>e.stopPropagation()}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:'linear-gradient(90deg,#c41e3a,transparent)'}}/>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
              <div><div style={{fontFamily:'Montserrat,sans-serif',fontSize:'9px',letterSpacing:'3px',textTransform:'uppercase',color:'#c41e3a',marginBottom:'4px'}}>Details</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:800,color:'#f5f0e8'}}>Appointment #{selected.id}</h2></div>
              <button onClick={()=>setSelected(null)} style={{background:'transparent',border:'1px solid rgba(255,255,255,0.07)',width:'32px',height:'32px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'rgba(158,155,148,0.5)'}}><X size={14}/></button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'24px'}}>
              {[{label:'Customer',val:selected.customer_name},{label:'Service',val:selected.service_name},{label:'Barber',val:selected.barber_name},{label:'Date',val:new Date(selected.appointment_date).toLocaleDateString('en-GB',{weekday:'long',day:'2-digit',month:'long'})},{label:'Time',val:selected.appointment_time?.slice(0,5)}].map((f,i)=>(
                <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'12px 14px',background:'#111118',border:'1px solid rgba(255,255,255,0.04)'}}>
                  <span style={{fontFamily:'Montserrat,sans-serif',fontSize:'9px',letterSpacing:'2px',textTransform:'uppercase',color:'rgba(158,155,148,0.4)'}}>{f.label}</span>
                  <span style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:'#f0ece4'}}>{f.val}</span>
                </div>
              ))}
              <div style={{display:'flex',justifyContent:'space-between',padding:'14px 16px',background:'#111118',border:'1px solid rgba(255,255,255,0.04)'}}>
                <span style={{fontFamily:'Montserrat,sans-serif',fontSize:'9px',letterSpacing:'2px',textTransform:'uppercase',color:'rgba(158,155,148,0.4)'}}>Amount</span>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:900,color:'#c41e3a'}}>₦{parseFloat(selected.total_price).toLocaleString()}</span>
              </div>
            </div>
            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={()=>{setMsgTarget({id:selected.customer_id,name:selected.customer_name});setSelected(null);setShowMsg(true);}} className="btn-primary" style={{flex:1,padding:'11px',fontSize:'10px',letterSpacing:'2px'}}>Message Client</button>
              <button onClick={()=>setSelected(null)} className="btn-secondary" style={{padding:'11px 20px',fontSize:'10px',letterSpacing:'2px'}}>Close</button>
            </div>
          </motion.div>
        </div>
      )}

      {showMsg&&msgTarget&&(
        <div style={MS} onClick={()=>{setShowMsg(false);setMsgText('');}}>
          <motion.div initial={{scale:0.95,opacity:0}} animate={{scale:1,opacity:1}} style={{...MP,maxWidth:'420px'}} onClick={e=>e.stopPropagation()}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:'linear-gradient(90deg,#c9a84c,transparent)'}}/>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
              <div><div style={{fontFamily:'Montserrat,sans-serif',fontSize:'9px',letterSpacing:'3px',textTransform:'uppercase',color:'#c9a84c',marginBottom:'4px'}}>Send Message</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:800,color:'#f5f0e8'}}>To: {msgTarget.name}</h2></div>
              <button onClick={()=>{setShowMsg(false);setMsgText('');}} style={{background:'transparent',border:'1px solid rgba(255,255,255,0.07)',width:'32px',height:'32px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'rgba(158,155,148,0.5)'}}><X size={14}/></button>
            </div>
            <textarea value={msgText} onChange={e=>setMsgText(e.target.value)} placeholder="Type your message…" rows={5}
              style={{width:'100%',padding:'14px',background:'#111118',border:'1px solid rgba(255,255,255,0.06)',color:'#f0ece4',fontFamily:'Inter,sans-serif',fontSize:'13px',resize:'vertical',outline:'none',marginBottom:'16px',boxSizing:'border-box'}}/>
            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={sendMessage} className="btn-primary" style={{flex:1,padding:'11px',fontSize:'10px',letterSpacing:'2px'}}>Send Message</button>
              <button onClick={()=>{setShowMsg(false);setMsgText('');}} className="btn-secondary" style={{padding:'11px 20px',fontSize:'10px',letterSpacing:'2px'}}>Cancel</button>
            </div>
          </motion.div>
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}