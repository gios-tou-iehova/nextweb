'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Clock, Scissors, User, LogOut, CheckCircle, XCircle, Star, Phone, Mail, Edit2, Save, X, Camera, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Appointment { id:number; barber_name:string; service_name:string; appointment_date:string; appointment_time:string; status:string; total_price:string; duration_minutes:number; }
interface UserData { id:number; name:string; email:string; phone:string; role:string; loyalty_points:number; avatar?:string; }

const STATUS_COLORS: Record<string,string> = { confirmed:'#4ade80', completed:'#4ade80', pending:'#c9a84c', scheduled:'#c9a84c', cancelled:'#c41e3a' };
const STATUS_BG: Record<string,string> = { confirmed:'rgba(74,222,128,0.08)', completed:'rgba(74,222,128,0.08)', pending:'rgba(201,168,76,0.08)', scheduled:'rgba(201,168,76,0.08)', cancelled:'rgba(196,30,58,0.08)' };

export default function Dashboard() {
  const [user, setUser] = useState<UserData|null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming'|'past'|'profile'>('upcoming');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name:'', email:'', phone:'' });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => { init(); }, []);

  const init = async () => {
    const token = localStorage.getItem('token');
    const stored = localStorage.getItem('user');
    if (!token || !stored) { router.push('/auth/login'); return; }
    const userData = JSON.parse(stored);
    const saved = localStorage.getItem(`avatar_${userData.id}`);
    if (saved) userData.avatar = saved;
    setUser(userData);
    setEditForm({ name: userData.name||'', email: userData.email||'', phone: userData.phone||'' });
    await fetchAppointments(token);
    setLoading(false);
  };

  const fetchAppointments = async (token:string) => {
    try {
      const res = await fetch(`${'/api/proxy'}/appointments`, { headers: { 'Authorization':`Bearer ${token}` }});
      const data = await res.json();
      if (data.status === 'success') setAppointments(data.data || []);
    } catch {}
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); localStorage.removeItem('user');
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push('/');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    if (file.size > 2*1024*1024) { toast.error('Max 2MB'); return; }
    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const b64 = reader.result as string;
      if (user) { localStorage.setItem(`avatar_${user.id}`, b64); setUser({...user, avatar:b64}); toast.success('Photo updated'); }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    if (!user) return;
    const updated = {...user, ...editForm};
    setUser(updated); localStorage.setItem('user', JSON.stringify(updated));
    toast.success('Profile saved'); setIsEditing(false);
  };

  const cancelAppointment = async (id:number) => {
    const token = localStorage.getItem('token'); if (!token) return;
    try {
      const res = await fetch(`${'/api/proxy'}/appointments/${id}`, { method:'DELETE', headers:{'Authorization':`Bearer ${token}`}});
      const data = await res.json();
      if (data.status === 'success') { toast.success('Cancelled'); fetchAppointments(token); }
      else toast.error('Could not cancel');
    } catch { toast.error('Error'); }
  };

  const upcoming = appointments.filter(a => ['pending','scheduled','confirmed'].includes(a.status));
  const past = appointments.filter(a => ['completed','cancelled'].includes(a.status));
  const current = activeTab === 'upcoming' ? upcoming : past;

  const tabs = [
    { id:'upcoming' as const, label:'Upcoming', count: upcoming.length },
    { id:'past' as const, label:'History', count: past.length },
    { id:'profile' as const, label:'Profile', count: null },
  ];

  if (loading) return (
    <div style={{minHeight:'100vh',background:'#050505',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'20px'}}>
      <div style={{width:'40px',height:'40px',border:'1px solid rgba(196,30,58,0.2)',borderTopColor:'#c41e3a',borderRadius:'50%',animation:'spin 0.9s linear infinite'}}/>
      <div style={{fontFamily:'Montserrat,sans-serif',fontSize:'10px',letterSpacing:'4px',color:'rgba(158,155,148,0.4)',textTransform:'uppercase'}}>Loading</div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div style={{minHeight:'100vh',background:'#050505'}}>
      <Toaster position="top-right" toastOptions={{style:{background:'#111118',color:'#f0ece4',border:'1px solid rgba(196,30,58,0.3)',borderRadius:'2px',fontFamily:'Inter,sans-serif',fontSize:'13px'}}}/>

      {/* ── TOP BAR ─────────────────────────────────────── */}
      <div style={{background:'#0a0a0f',borderBottom:'1px solid rgba(255,255,255,0.04)',position:'sticky',top:0,zIndex:100}}>
        <div style={{height:'2px',background:'linear-gradient(90deg,#c41e3a 0%,rgba(196,30,58,0.2) 100%)'}}/>
        <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center',height:'68px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
            <div style={{width:'30px',height:'30px',border:'1px solid rgba(196,30,58,0.4)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Scissors size={13} color="#c41e3a"/>
            </div>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'14px',fontWeight:800,letterSpacing:'1px',color:'#f5f0e8'}}>
                ELITE <span style={{color:'#c41e3a'}}>BARBER</span>
              </div>
              <div style={{fontFamily:'Montserrat,sans-serif',fontSize:'8px',letterSpacing:'3px',textTransform:'uppercase',color:'rgba(158,155,148,0.4)'}}>Member Dashboard</div>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <div style={{width:'28px',height:'28px',background:'#c41e3a',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Playfair Display',serif",fontSize:'12px',fontWeight:700,color:'white'}}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span style={{fontFamily:'Montserrat,sans-serif',fontSize:'10px',fontWeight:600,letterSpacing:'1px',color:'rgba(158,155,148,0.7)',textTransform:'uppercase'}}>{user?.name?.split(' ')[0]}</span>
            </div>
            <button onClick={handleLogout} style={{display:'flex',alignItems:'center',gap:'6px',background:'transparent',border:'none',color:'rgba(158,155,148,0.4)',cursor:'pointer',fontFamily:'Montserrat,sans-serif',fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',transition:'color 0.2s',padding:0}}
              onMouseEnter={e=>e.currentTarget.style.color='#c41e3a'} onMouseLeave={e=>e.currentTarget.style.color='rgba(158,155,148,0.4)'}>
              <LogOut size={14}/> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{padding:'clamp(32px,4vw,60px) 1.5rem'}}>

        {/* ── STATS ROW ─────────────────────────────────── */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'1px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.04)',marginBottom:'48px'}}>
          {[
            {label:'Upcoming',value:upcoming.length,color:'#c9a84c'},
            {label:'Completed',value:past.filter(a=>a.status==='completed').length,color:'#4ade80'},
            {label:'Cancelled',value:past.filter(a=>a.status==='cancelled').length,color:'#c41e3a'},
            {label:'Loyalty Pts',value:user?.loyalty_points||0,color:'#7c6af7'},
          ].map((s,i)=>(
            <motion.div key={i} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
              style={{padding:'28px 24px',background:'#0a0a0f',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:`linear-gradient(90deg,${s.color},transparent)`}}/>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(1.6rem,3vw,2.2rem)',fontWeight:900,letterSpacing:'-0.02em',color:'#f5f0e8',lineHeight:1,marginBottom:'6px'}}>{s.value}</div>
              <div style={{fontFamily:'Montserrat,sans-serif',fontSize:'9px',letterSpacing:'2.5px',textTransform:'uppercase',color:'rgba(158,155,148,0.45)'}}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* ── TAB NAVIGATION ────────────────────────────── */}
        <div style={{display:'flex',gap:0,borderBottom:'1px solid rgba(255,255,255,0.06)',marginBottom:'40px'}}>
          {tabs.map(tab=>(
            <button key={tab.id} onClick={()=>setActiveTab(tab.id)}
              style={{display:'flex',alignItems:'center',gap:'8px',padding:'13px 24px',background:'transparent',border:'none',borderBottom:activeTab===tab.id?'2px solid #c41e3a':'2px solid transparent',marginBottom:'-1px',color:activeTab===tab.id?'#f5f0e8':'rgba(158,155,148,0.5)',cursor:'pointer',fontFamily:'Montserrat,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',transition:'color 0.2s'}}>
              {tab.label}
              {tab.count!==null && <span style={{minWidth:'18px',height:'18px',background:activeTab===tab.id?'#c41e3a':'rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Montserrat,sans-serif',fontSize:'8px',fontWeight:700,color:activeTab===tab.id?'white':'rgba(158,155,148,0.5)',padding:'0 4px'}}>{tab.count}</span>}
            </button>
          ))}
          <div style={{marginLeft:'auto',alignSelf:'center',paddingBottom:'2px'}}>
            <button onClick={()=>router.push('/booking')} className="btn-primary" style={{padding:'8px 20px',fontSize:'9px',letterSpacing:'2.5px'}}>+ Book Now</button>
          </div>
        </div>

        {/* ── APPOINTMENTS TABS ─────────────────────────── */}
        {(activeTab==='upcoming'||activeTab==='past') && (
          <div>
            {current.length===0 ? (
              <div style={{textAlign:'center',padding:'80px 0',border:'1px solid rgba(255,255,255,0.04)',background:'#0a0a0f'}}>
                <Calendar size={32} color="rgba(158,155,148,0.2)" style={{margin:'0 auto 16px'}}/>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',color:'rgba(245,240,232,0.5)',marginBottom:'8px'}}>No {activeTab} appointments</div>
                <div style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:'rgba(158,155,148,0.3)',marginBottom:'24px'}}>
                  {activeTab==='upcoming'?'Ready for your next grooming session?':'Your appointment history will appear here.'}
                </div>
                {activeTab==='upcoming'&&<button className="btn-primary" onClick={()=>router.push('/booking')} style={{padding:'12px 28px',fontSize:'10px',letterSpacing:'2.5px'}}>Book Appointment</button>}
              </div>
            ) : (
              <div style={{display:'flex',flexDirection:'column',gap:'1px',background:'rgba(255,255,255,0.04)'}}>
                {current.map((apt,i)=>(
                  <motion.div key={apt.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
                    style={{background:'#0a0a0f',padding:'24px 28px',display:'flex',alignItems:'center',gap:'20px',flexWrap:'wrap'}}>
                    {/* Date block */}
                    <div style={{flexShrink:0,width:'52px',textAlign:'center',padding:'10px 0',background:'#111118',border:'1px solid rgba(255,255,255,0.05)'}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:900,color:'#c41e3a',lineHeight:1}}>
                        {new Date(apt.appointment_date).getDate()}
                      </div>
                      <div style={{fontFamily:'Montserrat,sans-serif',fontSize:'8px',letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(158,155,148,0.5)',marginTop:'3px'}}>
                        {new Date(apt.appointment_date).toLocaleString('en',{month:'short'})}
                      </div>
                    </div>
                    {/* Info */}
                    <div style={{flex:1,minWidth:'160px'}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:'16px',fontWeight:700,color:'#f5f0e8',marginBottom:'4px'}}>{apt.service_name}</div>
                      <div style={{display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
                        <span style={{display:'flex',alignItems:'center',gap:'5px',fontFamily:'Inter,sans-serif',fontSize:'11px',color:'rgba(158,155,148,0.5)'}}>
                          <User size={11}/>{apt.barber_name}
                        </span>
                        <span style={{display:'flex',alignItems:'center',gap:'5px',fontFamily:'Inter,sans-serif',fontSize:'11px',color:'rgba(158,155,148,0.5)'}}>
                          <Clock size={11}/>{apt.appointment_time?.slice(0,5)}
                        </span>
                        {apt.duration_minutes&&<span style={{fontFamily:'Inter,sans-serif',fontSize:'11px',color:'rgba(158,155,148,0.4)'}}>{apt.duration_minutes}min</span>}
                      </div>
                    </div>
                    {/* Price + status */}
                    <div style={{display:'flex',alignItems:'center',gap:'16px',flexShrink:0}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:800,color:'#f5f0e8'}}>
                        ₦{parseInt(apt.total_price).toLocaleString()}
                      </div>
                      <div style={{padding:'4px 12px',background:STATUS_BG[apt.status]||'rgba(255,255,255,0.05)',border:`1px solid ${STATUS_COLORS[apt.status]||'rgba(255,255,255,0.1)'}20`,fontFamily:'Montserrat,sans-serif',fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:STATUS_COLORS[apt.status]||'rgba(158,155,148,0.5)'}}>
                        {apt.status}
                      </div>
                      {['pending','scheduled','confirmed'].includes(apt.status)&&(
                        <button onClick={()=>cancelAppointment(apt.id)}
                          style={{background:'transparent',border:'1px solid rgba(196,30,58,0.2)',color:'rgba(196,30,58,0.5)',cursor:'pointer',padding:'4px 12px',fontFamily:'Montserrat,sans-serif',fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',transition:'all 0.2s'}}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor='#c41e3a';e.currentTarget.style.color='#c41e3a';}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(196,30,58,0.2)';e.currentTarget.style.color='rgba(196,30,58,0.5)';}}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── PROFILE TAB ───────────────────────────────── */}
        {activeTab==='profile'&&user&&(
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:'24px'}}>
            {/* Avatar + info */}
            <div style={{background:'#0a0a0f',border:'1px solid rgba(255,255,255,0.05)',padding:'36px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'20px',marginBottom:'32px'}}>
                <div style={{position:'relative',flexShrink:0}}>
                  {user.avatar?(
                    <img src={user.avatar} alt="avatar" style={{width:'72px',height:'72px',objectFit:'cover',border:'1px solid rgba(196,30,58,0.3)'}}/>
                  ):(
                    <div style={{width:'72px',height:'72px',background:'#c41e3a',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Playfair Display',serif",fontSize:'28px',fontWeight:900,color:'white'}}>
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <button onClick={()=>fileInputRef.current?.click()} disabled={uploading}
                    style={{position:'absolute',bottom:'-6px',right:'-6px',width:'24px',height:'24px',background:'#111118',border:'1px solid rgba(196,30,58,0.4)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
                    {uploading?<Loader2 size={11} color="#c41e3a" style={{animation:'spin 1s linear infinite'}}/>:<Camera size={11} color="#c41e3a"/>}
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{display:'none'}}/>
                </div>
                <div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:700,color:'#f5f0e8',marginBottom:'4px'}}>{user.name}</div>
                  <div style={{fontFamily:'Montserrat,sans-serif',fontSize:'9px',letterSpacing:'2.5px',textTransform:'uppercase',color:'#c41e3a'}}>{user.role}</div>
                </div>
              </div>

              {isEditing?(
                <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                  {[{label:'Name',key:'name',type:'text'},{label:'Email',key:'email',type:'email'},{label:'Phone',key:'phone',type:'tel'}].map(f=>(
                    <div key={f.key}>
                      <label className="form-label">{f.label}</label>
                      <input className="form-input" type={f.type} value={editForm[f.key as keyof typeof editForm]}
                        onChange={e=>setEditForm({...editForm,[f.key]:e.target.value})}/>
                    </div>
                  ))}
                  <div style={{display:'flex',gap:'10px',marginTop:'8px'}}>
                    <button className="btn-primary" onClick={saveProfile} style={{flex:1,padding:'12px',fontSize:'10px',letterSpacing:'2px'}}>
                      <Save size={13} style={{marginRight:'6px'}}/>Save
                    </button>
                    <button className="btn-secondary" onClick={()=>setIsEditing(false)} style={{padding:'12px 20px',fontSize:'10px',letterSpacing:'2px'}}>
                      <X size={13}/>
                    </button>
                  </div>
                </div>
              ):(
                <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                  {[{icon:User,label:'Name',val:user.name},{icon:Mail,label:'Email',val:user.email},{icon:Phone,label:'Phone',val:user.phone||'Not set'}].map((f,i)=>(
                    <div key={i} style={{display:'flex',alignItems:'center',gap:'12px',padding:'14px 16px',background:'#111118',border:'1px solid rgba(255,255,255,0.04)'}}>
                      <f.icon size={14} color="rgba(196,30,58,0.6)"/>
                      <div>
                        <div style={{fontFamily:'Montserrat,sans-serif',fontSize:'8px',letterSpacing:'2px',textTransform:'uppercase',color:'rgba(158,155,148,0.4)',marginBottom:'3px'}}>{f.label}</div>
                        <div style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:'#f0ece4'}}>{f.val}</div>
                      </div>
                    </div>
                  ))}
                  <button className="btn-secondary" onClick={()=>setIsEditing(true)} style={{width:'100%',padding:'12px',fontSize:'10px',letterSpacing:'2px',marginTop:'4px'}}>
                    <Edit2 size={13} style={{marginRight:'6px'}}/>Edit Profile
                  </button>
                </div>
              )}
            </div>

            {/* Loyalty / quick stats */}
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <div style={{background:'#0a0a0f',border:'1px solid rgba(255,255,255,0.05)',padding:'36px',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,#c9a84c,transparent)'}}/>
                <div style={{fontFamily:'Montserrat,sans-serif',fontSize:'9px',letterSpacing:'3px',textTransform:'uppercase',color:'#c9a84c',marginBottom:'12px'}}>Loyalty Points</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2rem,5vw,3.5rem)',fontWeight:900,letterSpacing:'-0.03em',color:'#f5f0e8',lineHeight:1,marginBottom:'8px'}}>
                  {user.loyalty_points||0}
                </div>
                <div style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:'rgba(158,155,148,0.4)'}}>Points earned from completed appointments</div>
              </div>
              <div style={{background:'#0a0a0f',border:'1px solid rgba(255,255,255,0.05)',padding:'28px'}}>
                <div style={{fontFamily:'Montserrat,sans-serif',fontSize:'9px',letterSpacing:'3px',textTransform:'uppercase',color:'rgba(158,155,148,0.4)',marginBottom:'20px'}}>Quick Actions</div>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  <button className="btn-primary" onClick={()=>router.push('/booking')} style={{width:'100%',padding:'13px',fontSize:'10px',letterSpacing:'2px'}}>Book Appointment →</button>
                  <button className="btn-secondary" onClick={()=>router.push('/services')} style={{width:'100%',padding:'13px',fontSize:'10px',letterSpacing:'2px'}}>View Services</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}