export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  try{
    const{amount,items}=req.body||{};
    const numericAmount=Number(amount);
    if(!Number.isFinite(numericAmount)||numericAmount<=0)return res.status(400).json({error:'Invalid order amount'});
    const keyId=process.env.RAZORPAY_KEY_ID||process.env.VITE_RAZORPAY_KEY_ID;
    const secret=process.env.RAZORPAY_KEY_SECRET;
    if(!keyId||!secret){
      console.error('[razorpay] missing server configuration',{hasKeyId:Boolean(keyId),hasSecret:Boolean(secret)});
      return res.status(500).json({error:'Razorpay server configuration is missing. Please redeploy after checking Production environment variables.'});
    }
    const auth=Buffer.from(keyId+':'+secret).toString('base64');
    const response=await fetch('https://api.razorpay.com/v1/orders',{
      method:'POST',
      headers:{Authorization:'Basic '+auth,'Content-Type':'application/json'},
      body:JSON.stringify({amount:Math.round(numericAmount*100),currency:'INR',receipt:'pp_'+Date.now().toString().slice(-10),notes:{items_count:String(Array.isArray(items)?items.length:0)}})
    });
    const data=await response.json().catch(()=>({}));
    if(!response.ok){
      console.error('[razorpay] order creation failed',{status:response.status,error:data?.error?.code,description:data?.error?.description});
      return res.status(response.status).json({error:data?.error?.description||'Razorpay order creation failed'});
    }
    return res.status(200).json({orderId:data.id,amount:data.amount,currency:data.currency,keyId});
  }catch(error){
    console.error('[razorpay] unexpected error',{message:error?.message});
    return res.status(500).json({error:'Unable to create Razorpay order. Please try again.'});
  }
}