'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Mail, Phone, Star, Calendar } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface User { id:number; name:string; email:string; phone:string; role:string; loyalty_points:number; avatar_url:string|null; created_at:string; }

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${'/api/proxy'}/admin/users`, { headers: token ? { 'Authorization': `Bearer ${token}` } : {} as Record<string,string> });
      const data = await res.json();
      if (data.status === 'success') setUsers(data.data);
    } catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this user permanently?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${'/api/proxy'}/admin/users/${id}`, { method:'DELETE', headers: token ? { 'Authorization': `Bearer ${token}` } : {} as Record<string,string> });
      const data = await res.json();
      if (data.status === 'success') { toast.success('User removed'); fetchUsers(); }
      else toast.error(data.message||'Delete failed');
    } catch { toast.error('Error'); }
  };

  const customers = users.filter(u => u.role !== 'admin');

  if (loading) return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'60vh',flexDirection:'column',gap:'20px'}}>
      <div style={{width:'36px',height:'36px',border:'1px solid rgba(196,30,58,0.2)',borderTopColor:'#c41e3a',borderRadius:'50%',animation:'spin 0.9s linear infinite'}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div>
      <Toaster position="top-right" toastOptions={{style:{background:'#111118',color:'#f0ece4',border:'1px solid rgba(196,30,58,0.3)',borderRadius:'2px',fontFamily:'Inter,sans-serif',fontSize:'13px'}}}/>

      {/* Page Header */}
      <div style={{marginBottom:'40px',paddingBottom:'32px',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px'}}>
          <div style={{width:'24px',height:'1px',background:'#c41e3a'}}/>
          <span style={{fontFamily:'Montserrat,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'4px',textTransform:'uppercase',color:'#c41e3a'}}>Registry</span>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:'16px'}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(1.8rem,3vw,2.4rem)',fontWeight:900,letterSpacing:'-0.03em',color:'#f5f0e8'}}>
            User <span style={{fontStyle:'italic',color:'#c41e3a'}}>Management.</span>
          </h1>
          <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px 16px',background:'#111118',border:'1px solid rgba(255,255,255,0.05)'}}>
            <span style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:800,color:'#f5f0e8'}}>{customers.length}</span>
            <span style={{fontFamily:'Montserrat,sans-serif',fontSize:'9px',letterSpacing:'2px',textTransform:'uppercase',color:'rgba(158,155,148,0.45)'}}>Registered Clients</span>
          </div>
        </div>
      </div>

      {/* Table header */}
      <div style={{display:'grid',gridTemplateColumns:'2fr 1.5fr 1fr 1fr auto',gap:'16px',padding:'12px 20px',background:'transparent',borderBottom:'1px solid rgba(255,255,255,0.05)',marginBottom:'4px'}}>
        {['Client','Contact','Points','Joined',''].map((h,i)=>(
          <div key={i} style={{fontFamily:'Montserrat,sans-serif',fontSize:'9px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'rgba(158,155,148,0.35)'}}>{h}</div>
        ))}
      </div>

      {/* Rows */}
      <div style={{display:'flex',flexDirection:'column',gap:'1px',background:'rgba(255,255,255,0.03)'}}>
        {customers.length === 0 ? (
          <div style={{padding:'60px',textAlign:'center',background:'#0a0a0f',color:'rgba(158,155,148,0.4)',fontFamily:'Inter,sans-serif',fontSize:'13px'}}>No users found</div>
        ) : customers.map((user, i) => (
          <motion.div key={user.id}
            initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:i*0.04}}
            style={{display:'grid',gridTemplateColumns:'2fr 1.5fr 1fr 1fr auto',gap:'16px',alignItems:'center',padding:'18px 20px',background:'#0a0a0f',transition:'background 0.2s'}}
            onMouseEnter={e=>e.currentTarget.style.background='#111118'}
            onMouseLeave={e=>e.currentTarget.style.background='#0a0a0f'}
          >
            {/* Name + avatar */}
            <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
              <div style={{width:'36px',height:'36px',background:user.avatar_url?'transparent':'#c41e3a',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Playfair Display',serif",fontSize:'15px',fontWeight:800,color:'white',flexShrink:0}}>
                {user.avatar_url ? <img src={user.avatar_url} alt={user.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/> : user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{fontFamily:'Inter,sans-serif',fontSize:'13px',fontWeight:600,color:'#f5f0e8'}}>{user.name}</div>
                <div style={{fontFamily:'Montserrat,sans-serif',fontSize:'8px',letterSpacing:'2px',textTransform:'uppercase',color:'rgba(158,155,148,0.4)',marginTop:'2px'}}>{user.role}</div>
              </div>
            </div>

            {/* Contact */}
            <div style={{display:'flex',flexDirection:'column',gap:'4px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'6px',fontFamily:'Inter,sans-serif',fontSize:'11px',color:'rgba(158,155,148,0.55)'}}>
                <Mail size={10}/>{user.email}
              </div>
              {user.phone && <div style={{display:'flex',alignItems:'center',gap:'6px',fontFamily:'Inter,sans-serif',fontSize:'11px',color:'rgba(158,155,148,0.4)'}}>
                <Phone size={10}/>{user.phone}
              </div>}
            </div>

            {/* Points */}
            <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
              <Star size={11} color="#c9a84c"/>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:'15px',fontWeight:700,color:'#c9a84c'}}>{user.loyalty_points||0}</span>
            </div>

            {/* Joined */}
            <div style={{fontFamily:'Inter,sans-serif',fontSize:'11px',color:'rgba(158,155,148,0.4)'}}>
              {new Date(user.created_at).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}
            </div>

            {/* Delete */}
            <button onClick={()=>handleDelete(user.id)}
              style={{width:'32px',height:'32px',border:'1px solid rgba(196,30,58,0.15)',background:'transparent',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'rgba(196,30,58,0.4)',transition:'all 0.2s'}}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(196,30,58,0.1)';e.currentTarget.style.color='#c41e3a';e.currentTarget.style.borderColor='rgba(196,30,58,0.4)';}}
              onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='rgba(196,30,58,0.4)';e.currentTarget.style.borderColor='rgba(196,30,58,0.15)';}}>
              <Trash2 size={13}/>
            </button>
          </motion.div>
        ))}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}