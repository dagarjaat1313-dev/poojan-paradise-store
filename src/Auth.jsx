import React,{useEffect,useState}from'react';
import { supabase } from './supabase';

export function AuthPage(){
 const [mode,setMode]=useState('login'); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [name,setName]=useState(''); const [loading,setLoading]=useState(false); const [message,setMessage]=useState('');
 const submit=async e=>{e.preventDefault();setLoading(true);setMessage('');
  const result=mode==='login'?await supabase.auth.signInWithPassword({email,password}):await supabase.auth.signUp({email,password,options:{data:{full_name:name}}});
  setLoading(false); if(result.error){setMessage(result.error.message);return;} setMessage(mode==='login'?'Login successful.':'Account created. Check your email if confirmation is enabled.'); if(mode==='login') location.href='/';
 };
 return <main className="auth-page"><div className="auth-card"><div className="auth-logo">ॐ <b>PP</b></div><div className="hero-kicker">POOJAN PARADISE</div><h1>{mode==='login'?'Welcome Back':'Create Your Account'}</h1><p>{mode==='login'?'Login to your Poojan Paradise account.':'Join Poojan Paradise for a smoother shopping experience.'}</p><form onSubmit={submit}>{mode==='register'&&<input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" required/>}<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" required/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" minLength="6" required/><button className="auth-submit" disabled={loading}>{loading?'Please wait…':mode==='login'?'Login':'Create Account'}</button></form>{message&&<div className="auth-message">{message}</div>}<button className="auth-switch" onClick={()=>{setMode(mode==='login'?'register':'login');setMessage('')}}>{mode==='login'?"Don't have an account? Register":"Already have an account? Login"}</button><a className="auth-home" href="/">← Back to website</a></div></main>;
}

export function useSession(){const [session,setSession]=useState(null);useEffect(()=>{let mounted=true;supabase.auth.getSession().then(({data})=>mounted&&setSession(data.session));const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,s)=>setSession(s));return()=>{mounted=false;subscription.unsubscribe()};},[]);return session;}
