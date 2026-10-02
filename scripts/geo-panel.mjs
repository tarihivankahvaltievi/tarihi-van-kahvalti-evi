import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const panel = JSON.parse(await readFile(new URL('../docs/seo-geo/ai-query-panel.json', import.meta.url), 'utf8'));
const [command, file] = process.argv.slice(2);
const keys = panel.platforms.flatMap(platform => panel.queries.flatMap(query =>
  Array.from({length:panel.repetitions},(_,i)=>({platform,queryId:query.id,repetition:i+1}))));
const key = row => `${row.platform}/${row.queryId}/${row.repetition}`;
if (!file || !['init','validate','summary'].includes(command)) {
  console.error('Usage: node scripts/geo-panel.mjs init|validate|summary PRIVATE_RESULTS.json'); process.exit(1);
}
if (command === 'init') {
  const repo = fileURLToPath(new URL('../', import.meta.url)).replace(/[\\/]$/, '');
  const target = path.resolve(file);
  if (target === repo || target.startsWith(`${repo}${path.sep}`)) throw Error('Raw AI observations must stay outside the public repository.');
  await writeFile(target, JSON.stringify({panelVersion:panel.version,observations:keys.map(row=>({
    ...row,status:'not_run',observedAt:null,mode:null,model:null,region:null,session:null,evidencePath:null,
    brandMentioned:null,correctEntity:null,priceCorrect:null,hoursCorrect:null,
    confusedWithCihangir:null,verifiedSources:null,reason:null,
  }))},null,2)+'\n',{flag:'wx'});
  console.log(`Created ${keys.length} unmeasured cells. None are counted as zero visibility.`); process.exit(0);
}
const data = JSON.parse(await readFile(file,'utf8'));
if (data.panelVersion !== panel.version) throw Error('Panel versions differ. Compare matching cohorts only.');
const expected = new Set(keys.map(key)), seen = new Set();
for (const row of data.observations) {
  if (!expected.has(key(row)) || seen.has(key(row))) throw Error(`Unexpected/duplicate observation ${key(row)}`);
  seen.add(key(row));
  if (!['not_run','unavailable','completed'].includes(row.status)) throw Error('Invalid observation status');
  const metrics = ['brandMentioned','correctEntity','priceCorrect','hoursCorrect','confusedWithCihangir'];
  for(const metric of metrics) if(row[metric] !== null && typeof row[metric] !== 'boolean') throw Error(`Invalid ${metric}`);
  if (row.status !== 'completed') {
    if (metrics.some(metric=>row[metric]!==null)||row.verifiedSources!==null) throw Error('Unmeasured rows must have null outcomes.');
    if (row.status === 'unavailable' && !row.reason) throw Error('Unavailable observations require a reason.');
    continue;
  }
  for(const field of ['observedAt','mode','model','region','session','evidencePath']) if(!row[field])throw Error(`Completed observation lacks ${field}`);
  if (!Number.isFinite(Date.parse(row.observedAt))) throw Error('Invalid observation date');
  if(typeof row.brandMentioned!=='boolean'||!Array.isArray(row.verifiedSources))throw Error('Completed rows require an observed mention outcome and checked sources.');
  await readFile(row.evidencePath);
  for(const source of row.verifiedSources) {
    const url = new URL(source.url);
    if(!['https:','http:'].includes(url.protocol)||typeof source.supportsClaim!=='boolean')throw Error('Each source needs an opened URL and claim-support check.');
  }
}
if(seen.size!==expected.size)throw Error('Missing panel cells; retain unavailable/not_run rows.');
if(command==='validate'){console.log(`Panel valid: ${seen.size} cells, ${data.observations.filter(r=>r.status==='completed').length} actual observations.`);process.exit(0);}
const rate = (rows, field) => {
  const measured = rows.filter(row=>typeof row[field]==='boolean');
  return {numerator:measured.filter(row=>row[field]).length,denominator:measured.length,
    rate:measured.length?measured.filter(row=>row[field]).length/measured.length:null};
};
const summary=panel.platforms.flatMap(platform=>['branded','unbranded'].map(group=>{
  const rows=data.observations.filter(row=>row.platform===platform && panel.queries.find(q=>q.id===row.queryId).group===group);
  const completed=rows.filter(row=>row.status==='completed');
  return {platform,group,planned:rows.length,completed:completed.length,unavailable:rows.filter(r=>r.status==='unavailable').length,
    mention:rate(completed,'brandMentioned'),correctEntity:rate(completed,'correctEntity'),price:rate(completed,'priceCorrect'),hours:rate(completed,'hoursCorrect'),
    confusion:rate(completed,'confusedWithCihangir'),ownDomainCitation:rate(completed.map(row=>({...row,ownDomain:row.verifiedSources.some(s=>new URL(s.url).hostname==='www.tarihivankahvaltievi.com'&&s.supportsClaim)})),'ownDomain')};
}));
console.log(JSON.stringify({panelVersion:panel.version,meaning:'Diagnostic panel only; not a global GEO rank, population share, or causal uplift.',summary},null,2));
