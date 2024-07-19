import https from 'https';
import fs from 'fs';
import express from 'express';
import axios from 'axios';
import isvalidweb3address from "isvalidweb3address";
import {base58} from '@scure/base';

var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('crt.pem'),
    ca: fs.readFileSync('bundle.pem')
};
const maxHeaderSize = 800192;



var app = express();

app.use(express.json());


app.get('/abi-ninja/image',async(req,res)=>{
    
    const r = await axios.get("http://localhost:3000/api/og/?desc="+req.query.desc,{
        responseType: 'arraybuffer'
      });
    const img = Buffer.from(r.data, 'binary');     
    res.set('Content-Type','image/png');
    res.set('Content-Length', img.length);
    res.send(img);
})

app.get('/abi-ninja',async(req,res)=>{ 
  
    res.send(`<!DOCTYPE html><html><head>
      <title>ABI Ninja</title>
      <meta property="og:image" content="https://frames.cryptocheckout.co/abi-ninja/image?desc=Interact with any contract on Ethereum" />
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://frames.cryptocheckout.co/abi-ninja/image?desc=Interact with any contract on Ethereum" />
      <meta property="fc:frame:post_url" content="https://frames.cryptocheckout.co/abi-ninja/chain" />
      <meta property="fc:frame:input:text" content="Insert contract address" />
      <meta property="fc:frame:button:1" content="Next" />
      <meta property="fc:frame:button:1:action" content="post" />
      
      </head></html>`);
  });
  app.post('/abi-ninja',async(req,res)=>{ 
    res.send(`<!DOCTYPE html><html><head>
      <title>ABI Ninja</title>
      <meta property="og:image" content="https://frames.cryptocheckout.co/abi-ninja/image?desc=Interact with any contract on Ethereum" />
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://frames.cryptocheckout.co/abi-ninja/image?desc=Interact with any contract on Ethereum" />
      <meta property="fc:frame:post_url" content="https://frames.cryptocheckout.co/abi-ninja/chain" />
      <meta property="fc:frame:input:text" content="Insert contract address" />
      <meta property="fc:frame:button:1" content="Next" />
      <meta property="fc:frame:button:1:action" content="post" />
      </head></html>`);
  });
  app.post('/abi-ninja/chain',async(req,res)=>{ 
    try{
      if(isvalidweb3address(req.body.untrustedData.inputText)){
        const contract = req.body.untrustedData.inputText;
        res.send(`<!DOCTYPE html><html><head>
          <title>ABI Ninja</title>
          <meta property="og:image" content="https://frames.cryptocheckout.co/abi-ninja/image?desc=Ethereum | Optimistic | Base | Polygon | Arbitrum One | Gnosis | zkSync Era" />
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://frames.cryptocheckout.co/abi-ninja/image?desc=Ethereum | Optimistic | Base | Polygon | Arbitrum One | Gnosis | zkSync Era" />
          <meta property="fc:frame:post_url" content="https://frames.cryptocheckout.co/abi-ninja/get_results?contract=${contract}" />        
          <meta property="fc:frame:input:text" content="Insert your chain eg: Optimistic" />
          <meta property="fc:frame:button:1" content="Load Contract" />
          <meta property="fc:frame:button:1:action" content="post" />
          
          </head></html>`);
      }else{
         res.send(invalid());
      }
    }catch(e){
      res.send(error());
    }
    
    
  }); 
  app.post('/abi-ninja/get_results',async(req,res)=>{ 
    const chains = ['ethereum','optimistic','base','polygon','arbitrum one','gnosis','zksync era'];
    if(chains.indexOf(req.body.untrustedData.inputText.toLowerCase())>=0){
      const chainId = {
        'ethereum': 1,
        'optimistic': 10,
        'polygon': 137,
        'base': 8453,
        'arbitrum one': 42161,
        'gnosis': 100,
        'zksync era': 324
      }
      //console.log(req.query.contract);
      try{
        const r = await axios.get('https://anyabi.xyz/api/get-abi/'+chainId[req.body.untrustedData.inputText.toLowerCase()]+'/'+req.query.contract);
        //const abi = base58.encode(Buffer.from(JSON.stringify(r.data.abi)));
        console.log(r.data);
        const abi = '';
        res.send(`<!DOCTYPE html><html><head>
          <title>ABI Ninja</title>
          <meta property="og:image" content="https://frames.cryptocheckout.co/abi-ninja/image?desc=Read or Write functions?" />
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://frames.cryptocheckout.co/abi-ninja/image?desc=Read or Write functions?" />
          <meta property="fc:frame:button:1" content="Read" />
          <meta property="fc:frame:button:1:action" content="post" />
          <meta property="fc:frame:button:1:target" content="https://frames.cryptocheckout.co/abi-ninja/read_functions?abi=${abi}&contract=${req.query.contract}&chain=${chainId[req.body.untrustedData.inputText.toLowerCase()]}" />  
          <meta property="fc:frame:button:2" content="Write" />
          <meta property="fc:frame:button:2:action" content="post" />
          <meta property="fc:frame:button:2:target" content="https://frames.cryptocheckout.co/abi-ninja/write_functions?abi=${abi}&contract=${req.query.contract}&chain=${chainId[req.body.untrustedData.inputText.toLowerCase()]}" />        
          </head></html>`);
      }catch(e){
        if(e.response.status == 404){
          res.send(notfound());
        }
      }
      
    }else{
       res.send(invalid());
    }
    
  });  
  app.post('/abi-ninja/read_functions',async(req,res)=>{ 
    var sent = false;
    const r = await axios.get('https://anyabi.xyz/api/get-abi/'+req.query.chain+'/'+req.query.contract);
    const abi = r.data.abi;
    //const abi = JSON.parse(base58.decode(req.query.abi).toString());
    console.log(abi);
    var result = `<!DOCTYPE html><html><head>
      <title>ABI Ninja</title>
      <meta property="og:image" content="https://frames.cryptocheckout.co/abi-ninja/image?desc=Read functions" />
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://frames.cryptocheckout.co/abi-ninja/image?desc=Read functions" />`;
      var i=req.query.step?req.query.step:1;
      var step = req.query.step?req.query.step:4;
    abi.every( (element)=>{
      //console.log(element);
      if(element.type == 'function' && element.stateMutability == 'view' ){
        result += `<meta property="fc:frame:button:${i}" content="${element.name}" />
        <meta property="fc:frame:button:${i}:action" content="link" />
        <meta property="fc:frame:button:${i}:target" content="https://abi.ninja/${req.query.contract}/${req.query.chain}?methods=${element.name}" />`;
        i= i+1;
        if(i%step===0 ){
          step = step+4;
          if(abi[i]){
            console.log('ok');
            result += `<meta property="fc:frame:button:${i}" content="Next" />
            <meta property="fc:frame:button:${i}:action" content="post" />
            <meta property="fc:frame:button:${i}:target" content="https://frames.cryptocheckout.co/abi-ninja/read_functions?abi=${req.query.abi}&contract=${req.query.contract}&chain=${req.query.chain}&step=${step}" />`;
            return false;
            
          }
        }
        
      }
      return true;
    }
  );  
        result += `</head></html>`;

        res.send(result);
      
     
  });
  app.post('/abi-ninja/write_functions',async(req,res)=>{ 
    var sent = false;
    const r = await axios.get('https://anyabi.xyz/api/get-abi/'+req.query.chain+'/'+req.query.contract);
    const abi = r.data.abi;
    //const abi = JSON.parse(Buffer.from(decodeURIComponent(req.query.abi),'base64').toString());
    
    var result = `<!DOCTYPE html><html><head>
      <title>ABI Ninja</title>
      <meta property="og:image" content="https://frames.cryptocheckout.co/abi-ninja/image?desc=Write functions" />
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://frames.cryptocheckout.co/abi-ninja/image?desc=Write functions" />`;
      var i=req.query.step?req.query.step:1;
      var step = req.query.step?req.query.step:4;
    abi.every((element) => {
      console.log(element);
      if(element.type == 'function' && element.stateMutability == 'nonpayable' ){
        result += `<meta property="fc:frame:button:${i}" content="${element.name}" />
        <meta property="fc:frame:button:${i}:action" content="link" />
        <meta property="fc:frame:button:${i}:target" content="https://abi.ninja/${req.query.contract}/${req.query.chain}?methods=${element.name}" />`;
        i= i+1;
        if(i%step===0 ){
          step = step+4;
          if(abi[i]){
            result += `<meta property="fc:frame:button:${i}" content="Next" />
                <meta property="fc:frame:button:${i}:action" content="post" />
                <meta property="fc:frame:button:${i}:target" content="https://frames.cryptocheckout.co/abi-ninja/read_functions?abi=${req.query.abi}&contract=${req.query.contract}&chain=${req.query.chain}&step=${step}" />`;
                
                return false;
                
                
          }
        }
        
      }
      return true;
    }
  );  
      
  
    result += `</head></html>`;
    res.send(result);
  
  
  });
var server = https.createServer({...options,maxHeaderSize},app);
server.listen(443);
function invalid(){
  return `<!DOCTYPE html><html><head>
      <title>Invalid Input</title>
      <meta property="og:image" content="https://frames.cryptocheckout.co/abi-ninja/image?desc=Invalid entry!" />
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://frames.cryptocheckout.co/abi-ninja/image?desc=Invalid entry!" />
      <meta property="fc:frame:post_url" content="https://frames.cryptocheckout.co/abi-ninja" />
      <meta property="fc:frame:button:1" content="Restart" />
      <meta property="fc:frame:button:1:action" content="post" />
      
      </head></html>`;
}
function notfound(){
  return `<!DOCTYPE html><html><head>
      <title>ABI not found</title>
      <meta property="og:image" content="https://frames.cryptocheckout.co/abi-ninja/image?desc=Not found!" />
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://frames.cryptocheckout.co/abi-ninja/image?desc=Not found!" />
      <meta property="fc:frame:post_url" content="https://frames.cryptocheckout.co/abi-ninja" />
      <meta property="fc:frame:button:1" content="Restart" />
      <meta property="fc:frame:button:1:action" content="post" />
      
      </head></html>`;
}
function error(){
  return `<!DOCTYPE html><html><head>
      <title>An error occured</title>
      <meta property="og:image" content="https://frames.cryptocheckout.co/abi-ninja/image?desc=An error occured!" />
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://frames.cryptocheckout.co/abi-ninja/image?desc=An error occured!" />
      <meta property="fc:frame:post_url" content="https://frames.cryptocheckout.co/abi-ninja" />
      <meta property="fc:frame:button:1" content="Restart" />
      <meta property="fc:frame:button:1:action" content="post" />
      
      </head></html>`;
}