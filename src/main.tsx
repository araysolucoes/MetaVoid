import React,{useState} from 'react';
import{createRoot}from'react-dom/client';
import{sanitize,type Output}from'./core';
import './style.css';
function App(){
 const[file,setFile]=useState<File|null>(null),[out,setOut]=useState<Output|null>(null),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 async function run(){if(!file)return;setBusy(true);setError('');setOut(null);try{setOut(await sanitize(file));}catch(e){setError(e instanceof Error?e.message:'Erro desconhecido');}finally{setBusy(false);}}
 function download(){if(!out)return;const url=URL.createObjectURL(out.blob);const a=document.createElement('a');a.href=url;a.download=out.name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 return <main><header><b>MetaVoid</b> · Aray Soluções</header><h1>Sanitização local de arquivos</h1><p>Selecione JPG, PNG, WebP ou PDF. Os arquivos são processados no navegador.</p><input type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" onChange={e=>{setFile(e.target.files?.[0]??null);setOut(null);setError('');}}/><p>{file?.name}</p><button disabled={!file||busy} onClick={run}>{busy?'Processando...':'Processar'}</button>{error&&<p role="alert">{error}</p>}{out&&<section><h2>Resultado</h2><ul>{out.notes.map(n=><li key={n}>{n}</li>)}</ul><button onClick={download}>Baixar arquivo</button></section>}<footer>Não garante remoção de marcas d'água, credenciais de proveniência ou identificação por IA. Confira o resultado.</footer></main>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
