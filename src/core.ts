import { PDFDocument } from 'pdf-lib';
export interface Output { name:string; blob:Blob; notes:string[] }
export async function sanitize(file:File):Promise<Output> {
  const allowed=['image/jpeg','image/png','image/webp','application/pdf'];
  if(!allowed.includes(file.type)) throw new Error('Formato inválido: use JPG, PNG, WebP ou PDF.');
  if(!file.size || file.size>30*1024*1024) throw new Error('Arquivo vazio ou maior que 30 MB.');
  const name=file.name.replace(/\.[^.]+$/,'')+'-metavoid';
  if(file.type==='application/pdf'){
    let doc:PDFDocument;
    try { doc=await PDFDocument.load(await file.arrayBuffer(),{updateMetadata:false}); }
    catch { throw new Error('PDF inválido ou protegido.'); }
    doc.setTitle('');doc.setAuthor('');doc.setSubject('');doc.setKeywords([]);
    doc.setCreator('');doc.setProducer('');
    const bytes=await doc.save();
    return {name:name+'.pdf',blob:new Blob([new Uint8Array(bytes)],{type:'application/pdf'}),notes:['Propriedades padrão redefinidas.','XMP, anexos e proveniência podem permanecer. Assinaturas digitais podem ser invalidadas.']};
  }
  const bitmap=await createImageBitmap(file);
  try {
    if(bitmap.width*bitmap.height>60_000_000)throw new Error('Imagem maior que 60 megapixels.');
    const canvas=document.createElement('canvas');canvas.width=bitmap.width;canvas.height=bitmap.height;
    const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas indisponível.');
    if(file.type==='image/jpeg'){ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);}
    ctx.drawImage(bitmap,0,0);
    const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Falha ao exportar.')),file.type,.94));
    const ext=file.type==='image/jpeg'?'jpg':file.type==='image/png'?'png':'webp';
    return {name:name+'.'+ext,blob,notes:['Imagem reexportada a partir dos pixels.','EXIF/XMP do arquivo original não são copiados intencionalmente.','Qualidade, cor, orientação ou animação podem mudar.']};
  } finally {bitmap.close();}
}
