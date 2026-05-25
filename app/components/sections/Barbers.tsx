'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Scissors, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Barber { id:number; user_id:number; name:string; email:string; phone:string; bio:string; specialties:string; rating:string; total_bookings:number; is_active:number; }

const PHOTOS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=720&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=720&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=600&h=720&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=720&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&h=720&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=600&h=720&fit=crop&crop=face",
];

const Barbers = () => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<number|null>(null);

  useEffect(() => { fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://elitebarber.atwebpages.com/php-backend/api'}/barbers`).then(r=>r.json()).then(d=>{ if(d.status==='success') setBarbers(d.data); }).catch(()=>{}).finally(()=>setLoading(false)); }, []);

  if (loading) return (
    <section style={{padding:'100px 0',background:'#050505',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'20px'}}>
      <div style={{width:'40px',height:'40px',border:'1px solid rgba(196,30,58,0.2)',borderTopColor:'#c41e3a',borderRadius:'50%',animation:'spin 0.9s linear infinite'}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </section>
  );

  return (
    <section style={{ padding: 'clamp(80px,10vh,120px) 0', background: '#050505', position: 'relative' }}>
      {/* Diagonal lines BG */}
      <div style={{ position:'absolute',inset:0,pointerEvents:'none', backgroundImage:`repeating-linear-gradient(-45deg,rgba(255,255,255,0.012) 0px,rgba(255,255,255,0.012) 1px,transparent 1px,transparent 60px)` }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} style={{marginBottom:'64px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
            <div style={{width:'40px',height:'1px',background:'#c41e3a'}}/>
            <span style={{fontFamily:'Montserrat,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'4px',textTransform:'uppercase',color:'#c41e3a'}}>Meet The Team</span>
          </div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2rem,5vw,3.5rem)',fontWeight:900,letterSpacing:'-0.03em',color:'#f5f0e8',marginBottom:'16px'}}>
            Master <span style={{fontStyle:'italic',color:'#c41e3a'}}>Barbers.</span>
          </h2>
          <p style={{color:'rgba(158,155,148,0.6)',maxWidth:'520px',fontSize:'14px',lineHeight:1.7}}>
            Our team of expert craftsmen brings years of experience and passion. Each artist dedicated to delivering exceptional grooming experiences.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'1px', background:'rgba(255,255,255,0.04)' }}>
          {barbers.map((barber, i) => (
            <motion.div key={barber.id}
              initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}}
              onMouseEnter={()=>setHoveredId(barber.id)} onMouseLeave={()=>setHoveredId(null)}
              style={{ background:'#050505', overflow:'hidden', transition:'background 0.25s', cursor:'default' }}
            >
              {/* Photo */}
              <div style={{position:'relative',height:'320px',overflow:'hidden'}}>
                <img src={PHOTOS[i % PHOTOS.length]} alt={barber.name}
                  style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.6s',transform:hoveredId===barber.id?'scale(1.06)':'scale(1)',display:'block'}}/>
                <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,transparent 40%,rgba(5,5,5,0.85) 100%)'}}/>
                {/* Rating */}
                <div style={{position:'absolute',top:'16px',right:'16px',display:'flex',alignItems:'center',gap:'5px',background:'rgba(5,5,5,0.75)',backdropFilter:'blur(8px)',padding:'4px 12px'}}>
                  <Star size={11} color="#c9a84c" fill="#c9a84c"/>
                  <span style={{fontFamily:'Montserrat,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'1px',color:'#c9a84c'}}>{barber.rating||'4.9'}</span>
                </div>
                {/* Number */}
                <div style={{position:'absolute',bottom:'16px',left:'16px',fontFamily:"'Playfair Display',serif",fontSize:'48px',fontWeight:900,color:'rgba(245,240,232,0.06)',lineHeight:1,userSelect:'none'}}>
                  {String(i+1).padStart(2,'0')}
                </div>
              </div>

              {/* Content */}
              <div style={{padding:'24px 28px 28px'}}>
                <div style={{fontFamily:'Montserrat,sans-serif',fontSize:'9px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'#c41e3a',marginBottom:'8px'}}>Master Barber</div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:700,letterSpacing:'-0.01em',color:'#f5f0e8',marginBottom:'10px'}}>{barber.name}</h3>
                <p style={{color:'rgba(158,155,148,0.55)',fontSize:'12px',lineHeight:1.65,marginBottom:'16px'}}>
                  {barber.bio?.slice(0,90)||'Expert barber specializing in modern cuts, fades, and classic styles with meticulous attention to detail.'}
                </p>

                {/* Specialties */}
                {barber.specialties && (
                  <div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginBottom:'20px'}}>
                    {barber.specialties.split(',').slice(0,3).map((s,idx)=>(
                      <span key={idx} style={{fontFamily:'Montserrat,sans-serif',fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',padding:'3px 10px',border:'1px solid rgba(196,30,58,0.2)',color:'rgba(196,30,58,0.7)'}}>
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'16px',borderTop:'1px solid rgba(255,255,255,0.05)'}}>
                  <div style={{display:'flex',gap:'16px'}}>
                    <span style={{display:'flex',alignItems:'center',gap:'5px',fontFamily:'Inter,sans-serif',fontSize:'11px',color:'rgba(158,155,148,0.45)'}}>
                      <Scissors size={11}/>{barber.total_bookings||0} cuts
                    </span>
                    <span style={{display:'flex',alignItems:'center',gap:'5px',fontFamily:'Inter,sans-serif',fontSize:'11px',color:'rgba(158,155,148,0.45)'}}>
                      <Clock size={11}/>10+ yrs
                    </span>
                  </div>
                  <Link href="/booking" style={{textDecoration:'none',display:'flex',alignItems:'center',gap:'5px',fontFamily:'Montserrat,sans-serif',fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:hoveredId===barber.id?'#c41e3a':'rgba(158,155,148,0.4)',transition:'color 0.2s'}}>
                    Book <ArrowRight size={12}/>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          style={{marginTop:'64px',padding:'48px 60px',background:'#0a0a0f',border:'1px solid rgba(255,255,255,0.05)',display:'grid',gridTemplateColumns:'1fr auto',gap:'32px',alignItems:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:0,width:'3px',height:'100%',background:'#c41e3a'}}/>
          <div>
            <div style={{fontFamily:'Montserrat,sans-serif',fontSize:'10px',letterSpacing:'4px',textTransform:'uppercase',color:'#c41e3a',marginBottom:'10px'}}>Ready?</div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(1.3rem,3vw,1.9rem)',fontWeight:800,letterSpacing:'-0.02em',color:'#f5f0e8',marginBottom:'8px'}}>
              Book Your <span style={{fontStyle:'italic'}}>Transformation.</span>
            </h3>
            <p style={{color:'rgba(158,155,148,0.45)',fontSize:'13px'}}>Choose your master barber and schedule your session today.</p>
          </div>
          <Link href="/booking" style={{textDecoration:'none',flexShrink:0}}>
            <button className="btn-primary" style={{padding:'14px 32px',fontSize:'10px',letterSpacing:'2.5px',whiteSpace:'nowrap'}}>Book Now →</button>
          </Link>
        </motion.div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </section>
  );
};

export default Barbers;